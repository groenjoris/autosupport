"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:translate-y-[1px] active:not-aria-[haspopup]:translate-y-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_0_0_#2c18d9] hover:shadow-[0_3px_0_0_#2c18d9] active:not-aria-[haspopup]:shadow-none hover:bg-primary/90",
        outline:
          "border-border bg-background shadow-[0_4px_0_0_oklch(0.82_0.025_285)] hover:shadow-[0_3px_0_0_oklch(0.82_0.025_285)] active:not-aria-[haspopup]:shadow-none hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_0_0_oklch(0.82_0.025_285)] hover:shadow-[0_3px_0_0_oklch(0.82_0.025_285)] active:not-aria-[haspopup]:shadow-none hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:translate-y-0 active:not-aria-[haspopup]:translate-y-0",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:translate-y-0 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline hover:translate-y-0 active:not-aria-[haspopup]:translate-y-0",
      },
      size: {
        default: "h-9 gap-1.5 px-4",
        xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-6 text-base",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
