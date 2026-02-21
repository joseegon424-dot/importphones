'use client';
import {
    motion,
    type VariantLabels,
    type Target,
    type TargetAndTransition,
    type Transition,
} from 'framer-motion';

export type TextRollProps = {
    children: string;
    duration?: number;
    getEnterDelay?: (index: number) => number;
    getExitDelay?: (index: number) => number;
    className?: string;
    transition?: Transition;
    variants?: {
        enter: {
            initial: Target | VariantLabels | boolean;
            animate: TargetAndTransition | VariantLabels;
        };
        exit: {
            initial: Target | VariantLabels | boolean;
            animate: TargetAndTransition | VariantLabels;
        };
    };

    onAnimationComplete?: () => void;
};

export function TextRoll({
    children,
    duration = 0.5,
    getEnterDelay = (i) => i * 0.05,
    getExitDelay = (i) => i * 0.05 + 0.1,
    className,
    transition = { ease: [0.16, 1, 0.3, 1] },
    variants,
    onAnimationComplete,
}: TextRollProps) {
    const defaultVariants = {
        enter: {
            initial: { rotateX: 0, y: 0, opacity: 1 },
            animate: { rotateX: 90, y: -20, opacity: 0 },
        },
        exit: {
            initial: { rotateX: 90, y: 20, opacity: 0 },
            animate: { rotateX: 0, y: 0, opacity: 1 },
        },
    } as const;

    const letters = children.split('');

    return (
        <span className={className}>
            {letters.map((letter, i) => {
                return (
                    <span
                        key={i}
                        className='relative inline-block [perspective:1000px] [transform-style:preserve-3d] [width:auto]'
                        aria-hidden='true'
                    >
                        <motion.span
                            className='absolute inline-block [backface-visibility:hidden]'
                            initial={
                                variants?.enter?.initial ?? defaultVariants.enter.initial
                            }
                            animate={
                                variants?.enter?.animate ?? defaultVariants.enter.animate
                            }
                            transition={{
                                ...transition,
                                duration,
                                delay: getEnterDelay(i),
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                        <motion.span
                            className='absolute inline-block [backface-visibility:hidden]'
                            initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
                            animate={variants?.exit?.animate ?? defaultVariants.exit.animate}
                            transition={{
                                ...transition,
                                duration,
                                delay: getExitDelay(i),
                            }}
                            onAnimationComplete={
                                letters.length === i + 1 ? onAnimationComplete : undefined
                            }
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                        <span className='invisible'>
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    </span>
                );
            })}
            <span className='sr-only'>{children}</span>
        </span>
    );
}
