import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * PageTransition — Barba.js red curtain overlay.
 * Renders a fixed div that GSAP animates on route changes.
 * The App.tsx must call animateOut() / animateIn() via the exported helpers.
 */

let overlayEl: HTMLElement | null = null;

export function setOverlayRef(el: HTMLElement | null) {
    overlayEl = el;
}

/** Call before leaving current page */
export async function pageTransitionOut(): Promise<void> {
    if (!overlayEl) return;
    return new Promise<void>((resolve) => {
        gsap.timeline({ onComplete: resolve })
            .set(overlayEl!, { scaleY: 0, transformOrigin: 'bottom' })
            .to(overlayEl!, { scaleY: 1, duration: 0.55, ease: 'power3.inOut' });
    });
}

/** Call when entering new page */
export async function pageTransitionIn(): Promise<void> {
    if (!overlayEl) return;
    return new Promise<void>((resolve) => {
        gsap.timeline({ onComplete: resolve })
            .set(overlayEl!, { scaleY: 1, transformOrigin: 'top' })
            .to(overlayEl!, { scaleY: 0, duration: 0.55, ease: 'power3.inOut', delay: 0.1 });
    });
}

export function PageTransitionOverlay() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOverlayRef(ref.current);
        return () => setOverlayRef(null);
    }, []);

    return (
        <div
            ref={ref}
            className="barba-overlay"
            aria-hidden="true"
        />
    );
}
