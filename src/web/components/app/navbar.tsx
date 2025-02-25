import React, { FC, useEffect, useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { doLogout } from "../../services/auth";
import { clazz, useMediaQuery } from "../layout/utils";

export type NAV_PAGE = typeof navPages[number][0];
export const navPages = [
    ["GALLERY", "/gallery"],
    ["LIST", "/list"],
    ["LINKS", "/links"],
    ["UPLOAD", "/upload"]
] as const;

async function handleLogout() {
    await doLogout();
    window.location.href = "/login";
}

export const NavBar: FC<{
    activePage: NAV_PAGE
}> = (props) => {
    const shouldMenu = useMediaQuery("(max-width: 40rem)");
    const [menuOpen, setMenuOpen] = useState(false);

    // Make sure that the menu gets closed between layout shifts
    useEffect(() => {
        if (menuOpen) setMenuOpen(false);
    }, [shouldMenu]);

    let pageOrder = [...navPages];
    if (shouldMenu) {
        const idx = pageOrder.findIndex(([menu]) => menu === props.activePage);
        const activeItem = pageOrder.splice(idx, 1)[0];
        pageOrder.unshift(activeItem);

        if (!menuOpen) {
            pageOrder = pageOrder.slice(0, 1);
        }
    }

    return (
        <div className="px-safe border-b border-gray-200">
            <header className={clazz(
                "flex justify-between items-start p-4 bg-white", 
            )}>
                <nav className={clazz(
                    "flex", 
                    // shouldMenu ? (menuOpen ? "flex-col w-full" : "flex-row") : "flex-row space-x-6"
                    "flex-col sm:flex-row"
                )}>
                    {pageOrder.map(([pageTitle, pageLink]) =>
                        <a key={pageTitle}
                            className={clazz(
                                "px-3 py-2 font-bold transition-colors duration-200",
                                pageTitle === props.activePage 
                                    ? "text-primary" 
                                    : "text-text/70 hover:text-primary/80"
                            )}
                            href={pageLink}
                        >{pageTitle}</a>
                    )}
                </nav>
                <div className="flex items-center space-x-6">
                    <a 
                        href="#" 
                        onClick={handleLogout}
                        className="px-3 py-2 font-bold text-text/70 hover:text-primary/80 transition-colors duration-200"
                    >
                        LOGOUT
                    </a>
                    <div className={clazz("md:hidden", shouldMenu ? "block" : "hidden")}>
                        <HamburgerMenu
                            isOpen={menuOpen}
                            menuClicked={() => setMenuOpen(!menuOpen)}
                            color="#000"
                            width={24} height={20}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
};
