import * as React from "react";
import { Accordion } from "@base-ui/react";
import styles from "./accordion-base.module.css";
import { cn } from "~/lib/utils";

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}

const AccordionBase = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Root>
>(({ className, ...props }, ref) => (
  <Accordion.Root
    ref={ref}
    className={cn(styles.Accordion, className)}
    {...props}
  />
));
AccordionBase.displayName = "AccordionBase";

const AccordionBaseItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, ...props }, ref) => (
  <Accordion.Item
    ref={ref}
    className={cn(styles.Item, className)}
    {...props}
  />
));
AccordionBaseItem.displayName = "AccordionBaseItem";

const AccordionBaseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className={styles.Header}>
    <Accordion.Trigger
      ref={ref}
      className={cn(styles.Trigger, className)}
      {...props}
    >
      {children}
      <PlusIcon className={styles.TriggerIcon} />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionBaseTrigger.displayName = "AccordionBaseTrigger";

const AccordionBaseContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Panel>
>(({ className, children, ...props }, ref) => (
  <Accordion.Panel
    ref={ref}
    className={cn(styles.Panel, className)}
    {...props}
  >
    <div className={styles.Content}>{children}</div>
  </Accordion.Panel>
));
AccordionBaseContent.displayName = "AccordionBaseContent";

export { AccordionBase, AccordionBaseItem, AccordionBaseTrigger, AccordionBaseContent };
