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

type Module = {
  id?: string;
  _id?: string;
  title: string;
};

interface ModuleFormProps {
  module?: Module | null;
}

export default function ModuleForm({
  module,
}: ModuleFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);


  const onCreate = (data: Module) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Module created:", data);
      setLoading(false);
    }, 1000);
  };

  const onUpdate = (data: Module) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Module updated:", data);
      setLoading(false);
    }, 1000);
  };

  const onCancel = () => {
    setTitle("");
  };


  useEffect(() => {
    if (module) {
      setTitle(module.title);
    } else {
      setTitle("");
    }
  }, [module]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const data = {
      id: module?.id,
      _id: module?._id,
      title: title.trim(),
    };

    if (module?._id) {
      // Update API call
      onUpdate(data);
    } else {
      // Create API call
      onCreate(data);
      setTitle("");
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Module Title</Label>

            <Input
              id="title"
              placeholder="Enter module title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            {module && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("");
                  onCancel?.();
                }}
              >
                Cancel
              </Button>
            )}

            <Button type="button" disabled={loading || !title.trim()} onClick={handleSubmit}>
              {loading
                ? module
                  ? "Updating..."
                  : "Creating..."
                : module
                ? "Update Module"
                : "Create Module"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}