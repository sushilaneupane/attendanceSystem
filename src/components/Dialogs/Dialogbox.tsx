// components/DialogBox.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface DialogBoxProps {
  triggerButtonText: ReactNode;

  children: ReactNode;
}

export function DialogBox({ triggerButtonText,  children }: DialogBoxProps) {
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button>{triggerButtonText}</Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Pass any content like form here */}
        <div className="mt-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
