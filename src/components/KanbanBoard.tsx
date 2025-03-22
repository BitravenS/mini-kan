"use client";
import React, { useState } from "react";
import Column from "@/components/Column";
import { col, task } from "@/models";

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

  return (
    <div className="flex gap-8">
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
    </div>
  );
};

export default KanbanBoard;
