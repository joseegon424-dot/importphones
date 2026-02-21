import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonColorfulProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    label?: string;
}

const ButtonColorful = React.forwardRef<HTMLButtonElement, ButtonColorfulProps>(
    ({ className, variant, size, asChild = false, label = "Explore Components", ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    "relative h-10 px-6 overflow-hidden",
                    "bg-zinc-900 border border-white/10",
                    "transition-all duration-200",
                    "group",
                    className
                )}
                ref={ref}
                {...props}
            >
                {/* Gradient background effect - Adapted to brand (Red/Dark) */}
                <div
                    className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-r from-red-600 via-red-500 to-zinc-800",
                        "opacity-0 group-hover:opacity-100",
                        "blur-xl transition-opacity duration-500"
                    )}
                />

                {/* Content */}
                <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-bold tracking-wider uppercase text-xs">{label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </Comp>
        );
    }
);
ButtonColorful.displayName = "ButtonColorful";

export { ButtonColorful };
