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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TaskCard = ({
  name,
  description,
  id,
  onRemoveTask,
  onEditTask,
}: {
  name: string;
  description: string;
  id: string;
  onRemoveTask: () => void;
  onEditTask: (newName: string, newDescription: string) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab touch-none active:cursor-grabbing group m-3 bg-neutral-600/10 shadow-lg transition-opacity transition-colors duration-300 ease-in-out",
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100",
        isDragging && "bg-neutral-600/20"
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
