import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Skeleton } from "./skeleton";
import { useSpring, animated } from "react-spring";
import { dim } from "chalk";
import { clazz, computePlainPosition } from "../layout/utils";
import { disableScroll, enableScroll } from "../layout/scroll";

const Backdrop: FC<{
    in: boolean
    onClick?: () => void
}> = (props) => {
    return (
        <div onClick={props.onClick} className={clazz("backdrop", props.in && "in")}/>
    );
};

export enum CardContentType {
    IMAGE, VIDEO
}

export const Card: FC<{
    url?: string
    type?: CardContentType
    hide?: boolean
}> = (props) => {
    const [bigView, setBigView] = useState(false);

    // const imref = useRef<HTMLImageElement>(null);
    const [imLoaded, setLoaded] = useState(false);
    // useEffect(() => {
    //     console.log("helo2", props);
    //     if (!props.url) return;

    //     const im = imref.current;
    //     if (!im) return;

    //     console.log("helo");

    //     im.src = props.url + "?size=200";
    //     im.onload = () => {
    //         console.log("yea");
    //         setLoaded(true);
    //     };
    // }, [imref.current, props.url]);

    const calc = (t: HTMLDivElement, x: number, y: number, h: boolean) => {
        const r = t.getBoundingClientRect();

        return [
            -(y - (r.y + r.height / 2)) / (h ? 8 : 15),
            (x - (r.x + r.width / 2)) / (h ? 8 : 15),
            h ? 1.08 : 1.1
        ];
    };
    const trans = ([x, y, s]: number[]) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    const [anim, set] = useSpring(() => ({ xys: [0, 0, 1], config: {mass: 1, tension: 300, friction: 25} }));

    const updateAnim = ({ clientX: x, clientY: y, target: t, buttons }: React.MouseEvent) => {
        if (bigView) {
            set({ xys: [0, 0, 1] });
        } else {
            set({ xys: calc(t as HTMLDivElement, x, y, buttons > 0) });
        }
    };

    const [pos, setPos] = useSpring(() => ({ wh: [160, 160], xy: [-1, -1], config: {mass: 1, tension: 600, friction: 50}}));

    const dims = useRef({w:0, h:0});

    const recalcBig = () => {
        const idim = dims.current;
        const validView = [window.innerWidth - 80, window.innerHeight - 80 - 260];
        const sfW = Math.min(Math.max(1, 160 / idim.w), validView[0] / idim.w);
        const sfH = Math.min(Math.max(1, 160 / idim.w), validView[1] / idim.h);

        let finalW, finalH;
        if (idim.h*sfW <= validView[1]) {
            // We can scale by height safely
            finalW = idim.w*sfW;
            finalH = idim.h*sfW;
        } else {
            // Or by width safely
            finalW = idim.w*sfH;
            finalH = idim.h*sfH;
        }

        setPos({
            xy: [
                (window.innerWidth - finalW)/2,
                (window.innerHeight - finalH - 260)/2,
            ],
            wh: [finalW, finalH],
            immediate: false
        });

        // setPos({
        //     wh: [rect.width, rect.height]
        // });
    };

    const [isThumb, setThumb] = useState(true);
    const loadBackBounce = useRef<number | NodeJS.Timeout>();
    const trueBackPosition = useRef([0, 0]);
    const [isReturning, setReturning] = useState(false);

    const onImageLoad = (e: React.SyntheticEvent) => {
        clearTimeout(loadBackBounce.current as number);
        const img = (e.target as HTMLImageElement | HTMLVideoElement);

        if (img instanceof HTMLImageElement) {
            dims.current.w = img.naturalWidth;
            dims.current.h = img.naturalHeight;
        } else {
            dims.current.w = img.videoWidth;
            dims.current.h = img.videoHeight;

            if (bigView) return;
        }

        if (dims.current.w !== 0 && !isThumb) {
            // Big load
            console.log(img.src);
            // TODO: This is an issue caused by the element being recreated
            // as "big" and position: fixed which alters the position unnecessarily;
            // there should be a better way to fix this, but the element seems to be
            // limited in terms of state at this point in the computation.
            console.log(img.className);
            if (img.className === "big") return;
            // const rect = img.parentElement!.getBoundingClientRect();
            // const trueLeft = (rect.left + rect.width/2) - 160/2;
            // const trueTop = (rect.top + rect.height/2) - 160/2;
            const {x: trueLeft, y: trueTop} = computePlainPosition(img.parentElement!);
            console.log("Original", trueTop, trueTop - window.scrollY);
            trueBackPosition.current = [trueLeft, trueTop - window.scrollY, window.scrollY];

            set({ xys: [0, 0, 1] });
            setPos({
                xy: trueBackPosition.current.slice(0, 2),
                immediate: true
            });

            recalcBig();
            setBigView(true);
        }

        setLoaded(true);
    };

    const expandContent = () => {
        if (isThumb) {
            disableScroll();

            setThumb(false);
            loadBackBounce.current = setTimeout(() => setLoaded(false), 1000);
        }
    };

    const contentProps = {
        className: clazz(bigView && "big"),
        src: props.url ? props.url + (isThumb ? "?size=200" : "") : "",
        draggable: false, hidden: !imLoaded,
        onClick: expandContent,
        onLoad: onImageLoad,
        onCanPlay: onImageLoad,
        controls: bigView
    };

    const regularView = <animated.div
        className={clazz("im-card", (bigView && !isReturning) && "big")}
        style={{
            position: bigView ? "fixed" : "relative",
            visibility: props.hide ? "hidden" : "visible",
            // props.hide ? {visibility: "hidden"} : {},
            transform: imLoaded ?
                anim.xys.interpolate(((...args: number[]) => trans(args)) as any): "",
            cursor: (imLoaded && !bigView) ? "pointer" : "default",
            zIndex: bigView ? 100: "initial",
            left:   bigView ? pos.xy.interpolate(((x: number           ) => x) as any) : "",
            top:    bigView ? pos.xy.interpolate(((_: number, y: number) => y) as any) : "",
            width:  bigView ? pos.wh.interpolate(((w: number           ) => w) as any) : "",
            height: bigView ? pos.wh.interpolate(((_: number, h: number) => h) as any) : "",
        }}

        onMouseMove={updateAnim}
        onMouseDown={updateAnim}
        onMouseUp={updateAnim}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}>

        <div className="main-content">
            {props.type === CardContentType.VIDEO
                ? <video {...contentProps}/>
                : <img {...contentProps}/>}
        </div>
        {<Skeleton fading={imLoaded}/>}
    </animated.div>;

    const retargetReturn = () => {
        if (window.scrollY !== trueBackPosition.current[2]) {
            const pageTop = trueBackPosition.current[1] + trueBackPosition.current[2];
            trueBackPosition.current[1] = pageTop - window.scrollY;
            trueBackPosition.current[2] = window.scrollY;
        }

        setPos({
            xy: trueBackPosition.current.slice(0, 2),
            wh: [160, 160]
        });
    };

    // Compensate for scroll during animation
    useEffect(() => {
        const unreg = () => window.removeEventListener("scroll", retargetReturn);

        if (isReturning) {
            window.addEventListener("scroll", retargetReturn);
        } else {
            unreg();
        }

        return unreg;
    }, [isReturning]);

    return (
        bigView
            ? <div className="im-card" style={{visibility: "hidden"}}>
                <Backdrop in={!isReturning} onClick={() => {
                    if (isReturning) return;

                    retargetReturn();

                    setReturning(true);
                    setTimeout(() => {
                        console.log("hlelojiojojiojioj");
                        setBigView(false);
                        setReturning(false);
                        setThumb(true);

                        enableScroll();
                    }, 350);
                }}/>
                {regularView}
            </div> /* placeholder */
            : regularView
    );
};
