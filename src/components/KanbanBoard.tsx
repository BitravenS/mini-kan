"use client";
import React, { useState } from "react";
import Column from "@/components/Column";
import { col, task } from "@/models";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Array<col>>([
    {
      title: "To Do",
      color: "gray",
      tasks: [
        new task("Task 1", "Description 1"),
        new task("Task 2", "Description 2"),
      ],
    },
    {
      title: "In Progress",
      color: "yellow",
      tasks: [
        new task("Task 3", "Description 3"),
        new task("Task 4", "Description 4"),
      ],
    },
    {
      title: "Done",
      color: "green",
      tasks: [
        new task("Task 5", "Description 5"),
        new task("Task 6", "Description 6"),
      ],
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const addTask = (columnTitle: string, newTask: task) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  const removeTask = (columnTitle: string, taskId: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
  };

  const editTask = (columnTitle: string, taskId: number, newTask: task) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? newTask : task
              ),
            }
          : column
      )
    );
  };

  const findColumnByTaskId = (Id: string) => {
    if (!Id) return null;

    const [columnTitle, taskIdStr] = Id.split("-");
    const taskId = parseInt(taskIdStr, 10);

    return columns.find(
      (col) =>
        col.title === columnTitle &&
        col.tasks.some((task) => task.id === taskId)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragMove = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = findColumnByTaskId(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns((prevColumns) => {
      const activeTask = activeColumn.tasks.find(
        (task) => task.id === parseInt(activeId.split("-")[1], 10)
      );
      if (!activeTask) return prevColumns;

      return prevColumns.map((column) => {
        if (column === activeColumn) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeTask.id),
          };
        } else if (column === overColumn) {
          return {
            ...column,
            tasks: [...column.tasks, activeTask],
          };
        }
        return column;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = findColumnByTaskId(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn === overColumn) {
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          if (column === activeColumn) {
            const activeIndex = column.tasks.findIndex(
              (task) => task.id === parseInt(activeId.split("-")[1], 10)
            );
            const overIndex = column.tasks.findIndex(
              (task) => task.id === parseInt(overId.split("-")[1], 10)
            );

            if (activeIndex !== overIndex) {
              return {
                ...column,
                tasks: arrayMove(column.tasks, activeIndex, overIndex),
              };
            }
          }
          return column;
        });
      });
    }
  };
  const [newColName, setNewColName] = useState("");
  const [newColColor, setNewColColor] = useState("gray");
  const handleAddColumn = () => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { title: newColName, color: newColColor, tasks: [] },
    ]);
    setNewColColor("");
    setNewColName("");
  };
  return (
    <div className="flex gap-8 p-4 min-h-screen">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column: col) => (
          <Column
            key={column.title}
            title={column.title}
            color={column.color}
            tasks={column.tasks}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onEditTask={editTask}
          />
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-16 text-center text-3xl w-92 bg-neutral-600/10 p-8 border-neutral-200/10 border-1">
              Add Column
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Column</DialogTitle>
              <DialogDescription>
                Fill in the details of the Column
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Color
                </Label>
                <Input
                  id="color"
                  value={newColColor}
                  onChange={(e) => setNewColColor(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={handleAddColumn}>
                  Save Column
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
