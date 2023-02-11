import React from 'react';
import HeaderTopBar from "./HeaderTopBar/HeaderTopBar";
import SideBar from "./SideBar/SideBar";


function MenuBar(): JSX.Element {
    return (
        <>
            <HeaderTopBar />
            <SideBar />
        </>
    );
}

export default MenuBar;