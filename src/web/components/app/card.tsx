import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
        <div 
            onClick={props.onClick} 
            className={clazz(
                "fixed inset-0 bg-black/30 z-10", 
                props.in ? "visible animate-fade-in" : "opacity-0 pointer-events-none"
            )}
        />
    );
};

export enum CardContentType {
    IMAGE, VIDEO
}

export const Card: FC<{
    url?: string
    type?: CardContentType
    hide?: boolean
}> = React.memo((props) => {
    const [imLoaded, setLoaded] = useState(false);
    const [fullImageLoaded, setFullImageLoaded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const thumbImageRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
    const portalRoot = typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

    // Calculate the position and size for the expanded animation
    const getExpandedStyle = () => {
        if (!thumbImageRef.current) return {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            zIndex: 1000
        };
        
        const img = thumbImageRef.current;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate dimensions that maintain aspect ratio and fill most of the screen
        const aspectRatio = img instanceof HTMLImageElement 
            ? img.naturalWidth / img.naturalHeight 
            : (img as HTMLVideoElement).videoWidth / (img as HTMLVideoElement).videoHeight;

        const maxWidth = windowWidth * 0.9;
        const maxHeight = windowHeight * 0.9;
        let targetWidth = maxWidth;
        let targetHeight = maxWidth / aspectRatio;
        
        if (targetHeight > maxHeight) {
            targetHeight = maxHeight;
            targetWidth = maxHeight * aspectRatio;
        }
        
        return {
            top: (windowHeight - targetHeight) / 2,
            left: (windowWidth - targetWidth) / 2,
            width: targetWidth,
            height: targetHeight,
            zIndex: 1000,
            immediate: false,

            config: { tension: 600, friction: 40, clamp: false },
            onRest: () => {}
        };
    };

    const [expandedStyle, setExpandedStyle] = useSpring(() => ({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 1000,
        config: { tension: 600, friction: 40 },
    }));

    useEffect(() => {
        if (isExpanded) {
            disableScroll();
            const handleResize = () => {
                setExpandedStyle(getExpandedStyle());
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
                enableScroll();
            };
        } else {
            enableScroll();
        }
        return () => enableScroll();
    }, [isExpanded]);

    const onImageLoad = (e: React.SyntheticEvent) => {
        setLoaded(true);
    };

    const onFullImageLoad = (e: React.SyntheticEvent) => {
        setFullImageLoaded(true);
    };

    const contentProps = {
        src: props.url ? props.url + "?size=200" : "",
        draggable: false, 
        hidden: !imLoaded,
        onLoad: onImageLoad,
        onCanPlay: onImageLoad,
    };

    const expandedContentProps = {
        draggable: false,
        src: props.url || "",
        hidden: false,
        onLoad: onFullImageLoad,
        onCanPlay: onFullImageLoad,
    };

    const handleClick = () => {
        if (!imLoaded || !props.url) return;
        if (!isExpanded) {
            setIsExpanded(true);
            setFullImageLoaded(false);

            setExpandedStyle({
                immediate: true,
                top: cardRef.current?.getBoundingClientRect().top,
                left: cardRef.current?.getBoundingClientRect().left,
                width: cardRef.current?.getBoundingClientRect().width,
                height: cardRef.current?.getBoundingClientRect().height,
                config: { tension: 600, friction: 40, clamp: false },
                onRest: () => {
                    setExpandedStyle(getExpandedStyle());
                }
            });
        }
    };

    const handleClose = () => {
        if (!cardRef.current) return;
        setIsClosing(true);
        const rect = cardRef.current.getBoundingClientRect();
        setExpandedStyle({
            immediate: false,
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,

            config: { tension: 600, friction: 40, clamp: true },
            onRest: () => {
                setIsExpanded(false);
                setIsClosing(false);
            }
        });
    };

    const renderContent = (isExpanded = false) => (
        <div className="relative w-full h-full rounded-sm overflow-hidden">
            {props.type === CardContentType.VIDEO ? (
                <video 
                    {...(isExpanded ? expandedContentProps : contentProps)} 
                    ref={!isExpanded ? thumbImageRef : null}
                    controls={isExpanded}
                    className="absolute left-0 top-0 w-full h-full object-cover select-none"
                />
            ) : (
                <>
                    <img 
                        {...contentProps} 
                        ref={!isExpanded ? thumbImageRef : null}
                        className="absolute left-0 top-0 w-full h-full object-cover select-none"
                    />
                    {isExpanded && (
                        <img 
                            {...expandedContentProps} 
                            className="absolute left-0 top-0 w-full h-full object-cover select-none"
                            style={{ display: fullImageLoaded ? 'block' : 'none' }}
                        />
                    )}
                </>
            )}
        </div>
    );

    return (
        <>
            <div 
                ref={cardRef}
                className={clazz(
                    "relative w-40 h-40 transition-shadow duration-250 shadow-card hover:shadow-card-hover rounded-xl overflow-hidden", 
                    imLoaded && props.url && "cursor-pointer"
                )}
                onClick={handleClick}
                style={{
                    visibility: props.hide ? "hidden" : "visible",
                    opacity: (isExpanded || isClosing) ? 0 : 1
                }}>
                {renderContent()}
                {<Skeleton fading={imLoaded}/>}
            </div>
            {(isExpanded || isClosing) && portalRoot && createPortal(
                <>
                    <Backdrop in={!isClosing} onClick={handleClose} />
                    <animated.div 
                        className={clazz(
                            "rounded-xl overflow-hidden", 
                            isClosing ? "" : "shadow-card-hover"
                        )}
                        style={{
                            ...expandedStyle, 
                            position: 'fixed',
                            opacity: 1
                        }}
                        onClick={handleClose}
                    >
                        {renderContent(true)}
                    </animated.div>
                </>,
                portalRoot
            )}
        </>
    );
});
