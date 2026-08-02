"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/utils/envVariable";
import toast from "react-hot-toast";

interface Module {
  id: string;
  _id?: string;
  name: string;
  price?: number;
};

interface ModuleFormProps {
  module?: Module | null;
  moduleStatus: number;
  setModuleStatus: React.Dispatch<React.SetStateAction<number>>;
  setSelectedModule: React.Dispatch<React.SetStateAction<Module | null>>;
}

export default function ModuleForm({
  module,
  setModuleStatus,
  setSelectedModule,
}: ModuleFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  const onCreate = async (data: Omit<Module, "id">) => {
    setLoading(true);
    // Simulate API call
    try {
      const response = await fetch(BASE_URL + "/api/e-learning/courses/modules/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create module");
      }

      const result = await response.json();
      // console.log("Module created:", result);
      toast.success("Module created successfully");
      setName(""); // Clear the name input after successful creation
      setModuleStatus(Math.random()); // Reset module status to create mode
      setSelectedModule(null); // Clear the selected module after creation
    } catch (error) {
      console.error("Error creating module:", error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = (data: Module) => {
    setLoading(true);
    // Simulate API call
    fetch(BASE_URL + "/api/e-learning/courses/modules/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update module");
        }
        return response.json();
      })
      .then((result) => {
        // console.log("Module updated:", result);
        toast.success("Module updated successfully");
        setName(""); // Clear the name input after successful update
        setModuleStatus(Math.random()); // Reset module status to create mode
        setSelectedModule(null); // Clear the selected module after update
      })
      .catch((error) => {
        console.error("Error updating module:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCancel = () => {
    setName("");
    setModuleStatus(Math.random()); // Reset module status to create mode
    setSelectedModule(null); // Clear the selected module on cancel
  };


  useEffect(() => {
    if (module) {
      setName(module.name);
    } else {
      setName("");
    }
  }, [module]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (module?._id) {
      const data = {
        id: module?.id,
        _id: module?._id,
        name: name.trim(),
      };
      // Update API call
      onUpdate(data);
    } else {
      const data = {
        name: name.trim(),
      };
      // Create API call
      onCreate(data);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          {module ? "Update Module" : "Create New Module"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Module Name</Label>

            <Input
              id="name"
              placeholder="Enter module name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            {module && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setName("");
                  onCancel?.();
                }}
              >
                Cancel
              </Button>
            )}

            <Button type="button" onClick={handleSubmit}  disabled={loading || !name.trim()}>
              {loading
                ? module
                  ? "Updating..."
                  : "Creating..."
                : module
                ? "Update Module"
                : "Create Module"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}