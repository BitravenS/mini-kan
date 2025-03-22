import React from "react";
import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  return (
    <div>
      <h1 className="text-center mt-8 text-6xl" >Mini Kan</h1>
      <p className="text-center mt-4 text-2xl">Simple Kanban Board</p>
      <div className="h-16"></div>
      <KanbanBoard />
    </div>
  );
}
