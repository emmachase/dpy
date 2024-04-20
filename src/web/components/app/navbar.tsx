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
    const shouldMenu = useMediaQuery("(max-width: 550px)");
    const [menuOpen, setMenuOpen] = useState(false);

    // Make sure that the menu gets closed between layout shifts
    useEffect(() => {
        if (menuOpen) setMenuOpen(false);
    }, [shouldMenu]);

    const pageOrder = [...navPages];
    if (shouldMenu) {
        const idx = pageOrder.findIndex(([menu]) => menu === props.activePage);
        const activeItem = pageOrder.splice(idx, 1)[0];
        pageOrder.unshift(activeItem);
    }

    return (
        <header className={clazz(menuOpen && "open")}>
            <nav>{pageOrder.map(([pageTitle, pageLink]) =>
                <a key={pageTitle}
                    className={clazz(pageTitle === props.activePage && "active")}
                    href={pageLink}
                >{pageTitle}</a>
            )}</nav>
            <div className="nav-right">
                <a href="#" onClick={handleLogout}>Logout</a>
                <div className="hamburger">
                    <HamburgerMenu
                        isOpen={menuOpen}
                        menuClicked={() => setMenuOpen(!menuOpen)}
                        color="#000"
                        width={24} height={20}
                    />
                </div>
            </div>
        </header>
    );
};
