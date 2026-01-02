import * as React from "react";
import { Button } from "@base-ui/react";
import styles from "./button-base.module.css";
import { cn } from "~/lib/utils";

const ButtonBase = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(styles.Button, className)}
    {...props}
  />
));
ButtonBase.displayName = "ButtonBase";

export { ButtonBase };
