import { useEffect, useState } from "react";
import { useHover } from "./utils";

function ScrollWidget() {

    const { scroll, height } = useScrollHeight();

    let [pos, setPos] = useState(0);

    useEffect(() => {
        setPos(Math.round(scroll / height));
    }, [scroll, height])

    let move = (pos: number) => {
        window.scrollTo({
            top: pos * window.innerHeight,
            left: 0,
            behavior: "smooth"
        });
    }

    return <div style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none"
    }}>
        <div style={{position:"fixed", bottom:0, right:0}}>
            <div style={{margin: 16, display:"flex", flexDirection:"column", gap:8}}>
                <Button icon="fa-solid fa-arrow-up" visible={scroll > 100} onClick={() => {
                    move(pos - 1)
                }}/>
                <Button icon="fa-solid fa-arrow-down" visible={scroll + height < document.documentElement.scrollHeight - 10} onClick={() => {
                    move(pos + 1)
                }}/>
            </div>
        </div>
    </div>
}

function Button({onClick, visible, icon} : {onClick: () => void, visible: boolean, icon: string}) {
    const [ref, hovered] = useHover();

    return <div ref={ref} style={{
        width: 48,
        height: 48,
        visibility: visible ? "visible" : "hidden",
        background: hovered ? "none" : "white", borderRadius:48,
        color: hovered ? "white" : "black",
        outline: hovered ? "white 2px solid" : undefined,

        display: "flex",
        textAlign:"center",
        justifyContent: "center",
        alignItems:"center",
        cursor: "pointer",
        pointerEvents: "auto"
    }} onClick={onClick}>
        <i className={icon}/>
    </div>
}

function useScrollHeight() : {scroll: number, height: number} {
	const [scroll, setScrollY] = useState(0);
	const [height, setWindowHeight] = useState(window.innerHeight);

	const handleScroll = () => setScrollY(window.scrollY);
	const handleResize = () => setWindowHeight(window.innerHeight);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		handleScroll();
		handleResize();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return { scroll, height };
}

export default ScrollWidget;
