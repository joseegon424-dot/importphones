import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    /** If true, splits the heading inside and animates chars */
    splitHeading?: boolean;
    delay?: number;
}

/**
 * SectionReveal — wraps any section content and applies GSAP scroll-triggered
 * reveal animations. Optionally uses SplitType for character-level title animations.
 */
export function SectionReveal({
    children,
    className = '',
    splitHeading = false,
    delay = 0,
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Animate direct children (cards, paragraphs, images)
            const items = el.querySelectorAll<HTMLElement>(':scope > *:not(h1):not(h2):not(h3)');

            gsap.fromTo(
                items,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 75%',
                    },
                }
            );

            // SplitType on headings
            if (splitHeading) {
                const headings = el.querySelectorAll<HTMLElement>('h1, h2, h3');
                headings.forEach((heading) => {
                    heading.classList.add('split-target');
                    const split = new SplitType(heading, { types: 'words,chars' });

                    gsap.fromTo(
                        split.chars,
                        { y: '110%', opacity: 0 },
                        {
                            y: '0%',
                            opacity: 1,
                            duration: 0.7,
                            stagger: 0.02,
                            ease: 'power3.out',
                            delay,
                            scrollTrigger: {
                                trigger: heading,
                                start: 'top 80%',
                            },
                            onComplete: () => split.revert(),
                        }
                    );
                });
            }
        }, el);

        return () => ctx.revert();
    }, [splitHeading, delay]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
