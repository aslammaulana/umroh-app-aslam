"use client";

import React from 'react';
import NavbarMobile from './NavbarMobile';
import NavbarDekstop from './NavbarDekstop';

export default function Navbar() {
    return (
        <>
            <NavbarMobile />
            <NavbarDekstop />
        </>
    );
}