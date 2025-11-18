
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
  variant: string;
  triggerButtonText: ReactNode;
  children: ReactNode;
  header? : ReactNode;
  open?: boolean; 
  onOpenChange?: (open: boolean) => void; 
  
}

export function DialogBox({
  triggerButtonText,
  children,
  open,
  header,
  onOpenChange,
}: DialogBoxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
     
      <DialogTrigger asChild>
        <Button variant="ghost">{triggerButtonText}</Button>
      </DialogTrigger>

    
      <DialogContent >
     {header && (
      <DialogHeader> 
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

     )}
        
        <div className="mt-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
