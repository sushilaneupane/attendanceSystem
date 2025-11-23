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
  footer?: React.ReactNode;   // ✅ FIXED TYPE
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

      <DialogContent className={`${width} max-h-[80vh] overflow-y-auto`}>
        {header && (
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        )}

        <div className="mt-5">{children}</div>

        {footer && <div className="mt-6">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
