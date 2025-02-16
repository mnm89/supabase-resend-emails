import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";

export interface LoadingButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

export function LoadingButton(props: LoadingButtonProps) {
  const { isLoading, loadingText, children, ...others } = props;

  const Loading = (
    <span className="flex gap-2 items-center">
      <Loader2 className="animate-spin" /> {loadingText || "Loading ..."}
    </span>
  );

  return <Button {...others}>{!isLoading ? children : Loading}</Button>;
}
