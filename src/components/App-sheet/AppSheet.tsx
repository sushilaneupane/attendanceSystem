import React, { ReactNode, forwardRef, useState, useImperativeHandle } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface SlideSheetProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  showSubmit?: boolean;
  submitText?: string;
  onSubmit?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export interface SlideSheetRef {
  openSheet: () => void;
  closeSheet: () => void;
}
export const SlideSheet = React.forwardRef<SlideSheetRef, SlideSheetProps>(
  (
    {
      title,
      children,
      width = "",
      showSubmit = true,
      submitText = "Save",
      onSubmit,
      open,
      onOpenChange,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = open !== undefined;
    const sheetOpen = isControlled ? open : internalOpen;
    const setSheetOpen = (value: boolean) => {
      if (isControlled) onOpenChange?.(value);
      else setInternalOpen(value);
      onOpenChange?.(value);
    };

    React.useImperativeHandle(ref, () => ({
      openSheet: () => setSheetOpen(true),
      closeSheet: () => setSheetOpen(false),
    }));

    return (
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className={width}>
          <SheetHeader className="border-b">
            <SheetTitle className="text-left">{title}</SheetTitle>
          </SheetHeader>

          <div className="mx-4 flex flex-col h-full max-h-[calc(100vh-150px)] overflow-y-auto">
            {children}
          </div>

          <SheetFooter className="border-t">
            <div className="flex w-full justify-between gap-2">
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>

              {showSubmit && (
                <Button onClick={onSubmit}>{submitText}</Button>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
);

SlideSheet.displayName = "SlideSheet";