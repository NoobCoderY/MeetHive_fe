import { Button, ButtonProps } from "@/shadcn/components/ui/button";
import "./index.css";

const JAButton = (props: ButtonProps) => {
  return (
    <div
      className={`btn-container btn-container-${props.variant} ${props.className}`}
    >
      <Button {...props} className={`ja-button ${props.className}`}></Button>
    </div>
  );
};

export default JAButton;
