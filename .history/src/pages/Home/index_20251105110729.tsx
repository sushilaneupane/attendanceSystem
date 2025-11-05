import React, { JSX } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Welcome to the Attendance System
        </h1>
      </section>
    </div>
  );
}
