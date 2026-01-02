import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import {cn} from "~/lib/utils"
import styles from "./sheet.module.css"

function Sheet({...props}: React.ComponentProps<typeof SheetPrimitive.Root>) {
    return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
                          ...props
                      }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
    return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
                        ...props
                    }: React.ComponentProps<typeof SheetPrimitive.Close>) {
    return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
                         ...props
                     }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
    return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
                          className,
                          ...props
                      }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
    return (
        <SheetPrimitive.Overlay
            data-slot="sheet-overlay"
            className={cn(styles.Overlay, className)}
            {...props}
        />
    )
}

function SheetContent({
                          className,
                          children,
                          side = "right",
                          ...props
                      }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left"
}) {
    const sideClass = side === "top" ? styles.ContentTop :
                      side === "bottom" ? styles.ContentBottom :
                      side === "left" ? styles.ContentLeft :
                      styles.ContentRight;

    return (
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Content
                data-slot="sheet-content"
                className={cn(styles.Content, sideClass, className)}
                {...props}
            >
                {children}
                <SheetPrimitive.Close className={styles.Close}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
            </SheetPrimitive.Content>
        </SheetPortal>
    )
}

function SheetHeader({className, ...props}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-header"
            className={cn(styles.Header, className)}
            {...props}
        />
    )
}

function SheetFooter({className, ...props}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn(styles.Footer, className)}
            {...props}
        />
    )
}

function SheetTitle({
                        className,
                        ...props
                    }: React.ComponentProps<typeof SheetPrimitive.Title>) {
    return (
        <SheetPrimitive.Title
            data-slot="sheet-title"
            className={cn(styles.Title, className)}
            {...props}
        />
    )
}

function SheetDescription({
                              className,
                              ...props
                          }: React.ComponentProps<typeof SheetPrimitive.Description>) {
    return (
        <SheetPrimitive.Description
            data-slot="sheet-description"
            className={cn(styles.Description, className)}
            {...props}
        />
    )
}

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
}
