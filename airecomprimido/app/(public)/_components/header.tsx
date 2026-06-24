'use client';

import Image from "next/image";
import Link from "next/link";
import { useViewport } from "../../_context/ViewportContext";
import { useState, useEffect } from "react";
import { useContactVisibility } from "../../_context/ContactVisibilityContext";

export default function Header() {
  const linkStyle = "text-white text-lg font-medium  transition-all duration-100 hover:scale-110"
  const linkMobile = "text-white font-medium w-full hover:underline"

  const { isMobile } = useViewport()
  const [isOpen, setIsOpen] = useState(false)
  const { isVisible, toggleContact } = useContactVisibility()

  const toggleMenu = () => {
    setIsOpen((prev) => (!prev))
  }

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 w-full bg-light-blue flex h-16 px-10 py-2.5 z-50 max-sm:px-5">
        <Link href="/" onClick={toggleMenu} className="flex items-center">
          <Image 
            src="/logos/company_white.png"
            alt="AireComprimido EC S.A.S"
            width={1383}
            height={1598}
            className="md:h-full md:w-auto h-auto w-[12.5rem]"
            priority
          />
        </Link>
        {!isMobile && 
          <div className="mr-5 ml-auto flex">
            <nav className="flex items-center gap-10 mr-[3.75rem]">
              <Link href="/" className={linkStyle}>Inicio</Link>
              <Link href="/equipos" className={linkStyle}>Equipos</Link>
              <Link href="/repuestos" className={linkStyle}>Repuestos</Link>
              <Link href="/mantenimiento" className={linkStyle}>Mantenimiento</Link>
            </nav>
            <button onClick={toggleContact} className="bg-white text-dark-blue rounded-[2rem] px-5 my-0.5 text-lg font-medium hover:bg-dark-blue hover:text-white transition-all duration-300 hover:cursor-pointer">Contáctanos</button>
          </div>}
      </header>
      {isMobile && (
      <>
        <Image
          src="/icons/menu.svg"
          alt="Menu Icon"
          width={24}
          height={24} 
          className="h-14 w-auto fixed right-10 fill-white top-0 z-[60] my-1 max-sm:right-5 cursor-pointer"
          onClick={toggleMenu}
        />
        <div className={`${isOpen ? "translate-y-0" : "-translate-y-full"} fixed top-0 flex flex-col transition-transform duration-700 ease-in-out w-full h-screen bg-dark-blue left-0 z-40 text-lg items-center`}>
          <nav className="flex flex-col text-center items-center gap-5 my-10">
            <Link href="/" onClick={toggleMenu} className={linkMobile}>Inicio</Link>
            <Link href="/equipos" onClick={toggleMenu} className={linkMobile}>Equipos</Link>
            <Link href="/repuestos" onClick={toggleMenu} className={linkMobile}>Repuestos</Link>
            <Link href="/mantenimiento" onClick={toggleMenu} className={linkMobile}>Mantenimiento</Link>
          </nav>
          <button onClick={() => {
            toggleContact()
            toggleMenu()
            }}
            className="button-style bg-light-blue text-white">Contáctanos</button>
        </div>
      </>)}
    </>
  );
}