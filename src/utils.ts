import { useEffect, useRef, useState } from "react";

export function useMobile() {
    const isMobile = () => window.innerWidth < 700;
    const [state, setState] = useState(isMobile());

    useEffect(() => {
        const handle = () => setState(isMobile());
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [])

    return state;
}

export function useHover() {
	const [hovered, setHovered] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const handleMouseEnter = () => setHovered(true);
		const handleMouseLeave = () => setHovered(false);

		node.addEventListener("mouseenter", handleMouseEnter);
		node.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			node.removeEventListener("mouseenter", handleMouseEnter);
			node.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [ref.current]);

	return [ref, hovered] as const;
}