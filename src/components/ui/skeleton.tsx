import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("bg-gray-200 animate-pulse rounded-md", {
  variants: {
    size: {
      default: "h-4 w-full",
      sm: "h-2 w-full",
      lg: "h-6 w-full",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
  },
  defaultVariants: {
    size: "default",
    rounded: false,
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, size, rounded, ...props }, ref) => (
    <div
      className={cn(skeletonVariants({ size, rounded, className }))}
      ref={ref}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
