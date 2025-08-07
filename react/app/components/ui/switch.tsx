import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "~/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-300 border-none shadow-md h-6 w-11 rounded-full flex items-center disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block size-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 border border-gray-300 dark:bg-gray-100 dark:data-[state=checked]:bg-primary-foreground",
          "mx-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
