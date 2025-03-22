import React, { useState } from "react";
import TaskCard from "@/components/TaskCard";
import { task } from "@/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Column = ({
  title,
  color,
  tasks,
  onAddTask,
  onRemoveTask,
  onEditTask,
}: {
  title: string;
  color: string;
  tasks: Array<task>;
  onAddTask: (columnTitle: string, newTask: task) => void;
  onRemoveTask: (columnTitle: string, taskId: number) => void;
  onEditTask: (columnTitle: string, taskId: number, newTask: task) => void;
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const colorMap: Record<string, string> = {
    red: "text-red-200",
    blue: "text-blue-200",
    green: "text-green-200",
    yellow: "text-yellow-200",
    gray: "text-gray-100",
  };

  const textColorClass = colorMap[color] || "text-black";

  const handleAddTask = () => {
    if (taskName.trim() && taskDescription.trim()) {
      const newTask: task = new task(taskName, taskDescription);
      onAddTask(title, newTask);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const handleRemoveTask = (taskId: number) => {
    onRemoveTask(title, taskId);
  };

  const handleEditTask = (taskId: number, newTask: task) => {
    onEditTask(title, taskId, newTask);
  };

  return (
    <div>
      <div className="wrapper w-92">
        <div className="title-container flex gap-6 justify-between text-2xl m-4">
          <div className={`text-center ${textColorClass}`}>{title}</div>
          <div className="text-right w-max">{tasks.length}</div>
        </div>
        <div className={`p-0 m-0 overflow-y-auto hide-scrollbar`}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onRemoveTask={() => handleRemoveTask(task.id)}
                onEditTask={(newName: string, newDescription: string) =>
                  handleEditTask(task.id, { ...task, name: newName, description: newDescription })
                }
            />
          ))}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Fill in the details of the task
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={handleAddTask}>
                Save Task
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Column;
