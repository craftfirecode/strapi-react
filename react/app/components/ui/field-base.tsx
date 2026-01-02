import * as React from "react";
import { Field } from "@base-ui/react/field";
import styles from "./field-base.module.css";
import { cn } from "~/lib/utils";

const FieldBase = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Field.Root>
>(({ className, ...props }, ref) => (
  <Field.Root
    ref={ref}
    className={cn(styles.Field, className)}
    {...props}
  />
));
FieldBase.displayName = "FieldBase";

const LabelBase = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof Field.Label>
>(({ className, ...props }, ref) => (
  <Field.Label
    ref={ref}
    className={cn(styles.Label, className)}
    {...props}
  />
));
LabelBase.displayName = "LabelBase";

export { FieldBase, LabelBase };
