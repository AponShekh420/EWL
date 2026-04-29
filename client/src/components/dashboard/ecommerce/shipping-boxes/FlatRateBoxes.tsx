"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";

interface BoxProps {
  _id?: string;
  name: string;
  type: string;
  emptyWeight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  maxWeight: number;
  isActive: boolean;
}

const initialBoxes: BoxProps[] = [
  {
    name: "Flat Rate Small Box",
    type: "BOX",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Medium Box - 1",
    type: "BOX",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Medium Box - 2",
    type: "BOX",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Large Box",
    type: "BOX",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Envelope",
    type: "ENVELOPE",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Legal Envelope",
    type: "ENVELOPE",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Padded Envelope",
    type: "ENVELOPE",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Gift Card Envelope",
    type: "ENVELOPE",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Window Envelope",
    type: "ENVELOPE",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  },
  {
    name: "Flat Rate Small Envelope",
    type: "ENVELOPE",
    emptyWeight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    maxWeight: 0,
    isActive: true
  }
];

export default function FlatRateBoxes() {
  const [boxes, setBoxes] = useState<BoxProps[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load from DB (fallback to initial if empty)
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/ecommerce/usps/boxes`);
        const data = await res.json();

        if (data?.data?.length) {
          setBoxes(data.data);
        } else {
          setBoxes(initialBoxes);
        }
      } catch (err) {
        console.error(err);
        setBoxes(initialBoxes);
      }
    };

    fetchBoxes();
  }, []);

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...boxes];

    if (
      field === "length" ||
      field === "width" ||
      field === "height"
    ) {
      updated[index].dimensions = {
        ...updated[index].dimensions,
        [field]: value
      } as BoxProps["dimensions"];
    }

    else if (field === "emptyWeight") {
      updated[index].emptyWeight = value as unknown as number;
    } else if (field === "maxWeight") {
      updated[index].maxWeight = value as unknown as number;
    }

    setBoxes(updated);
  };

  // ✅ Save (bulk upsert)
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/ecommerce/usps/boxes/bulk-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boxes),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Boxes saved successfully");
      } else {
        alert("❌ Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Flat Rate Box Weights</h2>

          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <div>Name</div>
            <div>Empty Weight</div>
            <div>Max Weight</div>
            <div>Length</div>
            <div>Width</div>
            <div>Height</div>
          </div>

          {boxes.map((box, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 items-center py-3 border-b last:border-none">
              <div className="text-sm">{box.name}</div>

              <div className="flex items-center gap-1">
                <Input
                  value={box.emptyWeight}
                  type="number"
                  onChange={(e) => handleChange(index, "emptyWeight", e.target.value)}
                  className="w-20"
                />
                <span className="text-xs">lbs</span>
              </div>
              <div className="flex items-center gap-1">
                <Input
                  value={box.maxWeight}
                  type="number"
                  onChange={(e) => handleChange(index, "maxWeight", e.target.value)}
                  className="w-20"
                />
                <span className="text-xs">lbs</span>
              </div>

              <div className="flex items-center gap-1">
                <Input
                  value={box.dimensions.length}
                  type="number"
                  onChange={(e) => handleChange(index, "length", e.target.value)}
                  className="w-20"
                />
                <span className="text-xs">in</span>
              </div>

              <div className="flex items-center gap-1">
                <Input
                  value={box.dimensions.width}
                  type="number"
                  onChange={(e) => handleChange(index, "width", e.target.value)}
                  className="w-20"
                />
                <span className="text-xs">in</span>
              </div>

              <div className="flex items-center gap-1">
                <Input
                  value={box.dimensions.height}
                  type="number"
                  onChange={(e) => handleChange(index, "height", e.target.value)}
                  className="w-20"
                />
                <span className="text-xs">in</span>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
