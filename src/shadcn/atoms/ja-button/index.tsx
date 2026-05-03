import { Button, ButtonProps } from "@/shadcn/components/ui/button";
import { cn } from "@shadcn/lib/utils";

const JAButton = ({ className, variant = "default", ...props }: ButtonProps) => {
  return (
    <Button
      variant={variant}
      {...props}
      className={cn(
        "relative h-12 rounded-xl font-semibold tracking-wide shadow-glow-sm transition-all duration-300",
        "hover:shadow-glow-md hover:brightness-[1.03] active:scale-[0.99]",
        "dark:shadow-[0_0_40px_-12px_hsl(187_100%_50%/0.5)]",
        className
      )}
    />
  );
};

export default JAButton;
