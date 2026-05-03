import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shadcn/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "rounded-md border-transparent bg-primary px-2.5 py-0.5 text-primary-foreground shadow hover:bg-primary/85",
        secondary:
          "rounded-md border-transparent bg-secondary px-2.5 py-0.5 text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "rounded-md border-transparent bg-destructive px-2.5 py-0.5 text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "rounded-md px-2.5 py-0.5 text-foreground",
        pill:
          "rounded-full border-primary/35 bg-primary/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-primary shadow-none hover:border-primary/60 hover:bg-primary/15 hover:shadow-glow-sm dark:text-primary",
        chip:
          "rounded-full border-border/80 bg-muted/50 px-3 py-1 text-foreground/90 hover:border-primary/40 hover:bg-muted hover:text-foreground",
        ghost:
          "rounded-full border-transparent bg-transparent px-2 py-0.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
