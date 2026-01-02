import * as React from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import styles from "./collapsible-base.module.css";
import { cn } from "~/lib/utils";

const CollapsibleBase = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Root>
>(({ className, ...props }, ref) => (
  <Collapsible.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
CollapsibleBase.displayName = "CollapsibleBase";

const CollapsibleBaseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Trigger>
>(({ className, ...props }, ref) => (
  <Collapsible.Trigger
    ref={ref}
    className={cn(styles.Trigger, className)}
    {...props}
  />
));
CollapsibleBaseTrigger.displayName = "CollapsibleBaseTrigger";

const CollapsibleBaseContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Panel>
>(({ className, ...props }, ref) => (
  <Collapsible.Panel
    ref={ref}
    className={cn(styles.Panel, className)}
    {...props}
  />
));
CollapsibleBaseContent.displayName = "CollapsibleBaseContent";

export { CollapsibleBase, CollapsibleBaseTrigger, CollapsibleBaseContent };
