import { useNavigate } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function FloatingWaiverButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate({ to: "/waiver" })}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 sm:h-14 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl rounded-full z-40 flex items-center gap-2 touch-manipulation"
      size="lg"
    >
      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="font-semibold text-sm sm:text-base">Sign Waiver</span>
    </Button>
  );
}
