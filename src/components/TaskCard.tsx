"use client";
import React, { useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TaskCard = ({
  name,
  description,
  onRemoveTask,
  onEditTask,
}: {
  name: string;
  description: string;
  onRemoveTask: () => void;
  onEditTask: (newName: string, newDescription: string) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleRemoveTask = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveTask();
    }, 300);
  };
  const handleSaveTask = () => {
    onEditTask(editedName, editedDescription);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedDescription(description);
  };

  return (
    <Card
      className={cn(
        "group m-3 bg-neutral-600/10 shadow-lg transition-all duration-300",
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      )}
    >
      <CardHeader className="flex items-center justify-between">
        {isEditing ? (
          <div>
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
        ) : (
          <>
            <CardTitle className="top-1/2">{name}</CardTitle>
            <div className="flex gap-2 justify-around opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="size-4" />
              </Button>

              <Button
                variant="ghost"
                className="p-0"
                onClick={handleRemoveTask}
              >
                <Trash2 className="size-4 text-red-400" />
              </Button>
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className="flex gap-2 items-right justify-end mt-2 -mb-4">
              <Button variant="ghost" className="p-0" onClick={handleSaveTask}>
                <Check className="size-4" />
              </Button>
              <Button
                variant="ghost"
                className="p-0"
                onClick={handleCancelEdit}
              >
                <X className="size-4" />
              </Button>
            </div>
          </>
        ) : (
          <CardDescription>{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
