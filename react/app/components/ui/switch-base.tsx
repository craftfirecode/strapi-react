import * as React from "react";
import { Switch } from "@base-ui/react/switch";
import styles from "./switch-base.module.css";
import { cn } from "~/lib/utils";

const SwitchBase = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Switch.Root>
>(({ className, ...props }, ref) => (
  <Switch.Root
    ref={ref}
    className={cn(styles.Switch, className)}
    {...props}
  >
    <Switch.Thumb className={styles.Thumb} />
  </Switch.Root>
));
SwitchBase.displayName = "SwitchBase";

export { SwitchBase };
