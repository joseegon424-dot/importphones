"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"

interface NavItem {
    to?: string
    text: string
    items?: {
        icon?: React.ReactNode
        text: string
        description?: string
        to: string
    }[]
}

interface HeaderProps {
    className?: string
    logo?: React.ReactNode
    menuItems?: NavItem[]
    rightContent?: React.ReactNode
}

const Navigation: React.FC<{ items: NavItem[] }> = ({ items }) => {
    const location = useLocation();

    return (
        <nav className="hidden lg:block">
            <ul className="flex gap-x-10">
                {items.map(({ to, text, items }, index) => {
                    const isActive = to ? location.pathname === to : false;

                    return (
                        <li
                            className={cn('relative [perspective:2000px]', items?.length ? 'group' : '')}
                            key={index}
                        >
                            {to ? (
                                <Link
                                    className={cn(
                                        'flex items-center gap-x-1 whitespace-pre text-sm font-bold uppercase tracking-widest transition-colors',
                                        isActive ? 'text-red-500' : 'text-white hover:text-red-500'
                                    )}
                                    to={to}
                                >
                                    {text}
                                    {items?.length ? <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" /> : null}
                                </Link>
                            ) : (
                                <button
                                    className={cn(
                                        'flex items-center gap-x-1 whitespace-pre text-sm font-bold uppercase tracking-widest text-white hover:text-red-500 transition-colors'
                                    )}
                                >
                                    {text}
                                    {items?.length ? <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" /> : null}
                                </button>
                            )}

                            {items?.length ? (
                                <div
                                    className={cn(
                                        'absolute -left-5 top-full w-[300px] pt-5',
                                        'pointer-events-none opacity-0',
                                        'origin-top-left transition-all duration-300 [transform:rotateX(-12deg)_scale(0.9)]',
                                        'group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:[transform:none]'
                                    )}
                                >
                                    <ul
                                        className={cn(
                                            'relative flex min-w-[248px] flex-col gap-y-0.5 rounded-xl border border-white/10 p-2.5',
                                            'bg-zinc-950 shadow-[0px_14px_20px_0px_rgba(0,0,0,.5)] backdrop-blur-xl'
                                        )}
                                    >
                                        {items.map(({ icon, text, description, to }, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    className={cn(
                                                        'group/link relative flex items-center overflow-hidden whitespace-nowrap rounded-lg p-3 transition-colors hover:bg-white/5',
                                                        'text-white'
                                                    )}
                                                    to={to}
                                                >
                                                    {icon && (
                                                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-red-500">
                                                            {icon}
                                                        </div>
                                                    )}
                                                    <div className="relative z-10 ml-3">
                                                        <span className="block text-sm font-bold uppercase tracking-tight group-hover/link:text-red-500 transition-colors">{text}</span>
                                                        {description && (
                                                            <span className="mt-0.5 block text-xs text-zinc-500">
                                                                {description}
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export const Header: React.FC<HeaderProps> = ({
    className,
    logo,
    menuItems = [],
    rightContent,
}) => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 z-[100] w-full transition-all duration-300',
                isScrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-6',
                className
            )}
        >
            <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="relative z-[101]">
                            {logo || <span className="text-xl font-black tracking-tighter italic">IMPORTPHONES<span className="text-red-500">.NET</span></span>}
                        </Link>
                    </div>

                    <Navigation items={menuItems} />

                    <div className="flex items-center gap-x-6">
                        <div className="hidden lg:block">
                            {rightContent}
                        </div>

                        <button
                            className="lg:hidden relative z-[101] p-2 text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-black z-[100] lg:hidden transition-transform duration-500 ease-expo",
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {menuItems.map((item, i) => (
                        <Link
                            key={i}
                            to={item.to || "#"}
                            className="text-3xl font-black uppercase tracking-tighter hover:text-red-500 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.text}
                        </Link>
                    ))}
                    {rightContent}
                </div>
            </div>
        </header>
    )
}

export default Header;
