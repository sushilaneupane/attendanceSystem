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
  triggerButtonText?: React.ReactNode;
  children: ReactNode;
  header?: React.ReactNode;
  open?: boolean;
  width?: string;
  variant: string;
  footer?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function DialogBox({
  triggerButtonText,
  children,
  open,
  header,
  width = "max-w-lg",
  footer,
  onOpenChange,
}: DialogBoxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost">{triggerButtonText}</Button>
      </DialogTrigger>

     <DialogContent className={`${width} max-w-none max-h-[80vh] flex flex-col`}>

        {header && (
          <DialogHeader>
            <DialogTitle className="text-sm">{header}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
        )}

        {/* SCROLL AREA ONLY FOR CONTENT */}
        <div className="mt-4 overflow-y-auto flex-1 pr-1">
          {children}
        </div>

        {footer && <div className="mt-4">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
