'use client';

import Image from "next/image";
import Link from "next/link";
import ContactCard from "./contactCard";

export default function Header({
  state,
  handler
}:{
  state: boolean,
  handler: () => void
}) {
  const linkStyle = "text-white text-lg font-medium  transition-all duration-100 hover:scale-110"

  return (
    <>
      <header className="fixed top-0 w-full bg-(--light-blue) flex h-16 px-10 py-2.5 z-50">
        <Link href="/">
          <Image 
            src="/logos/logo.png"
            alt="AireComprimido EC S.A.S"
            width={1383}
            height={1598}
            className="h-full w-auto"
            priority
          />
        </Link>
        <div className="mr-5 ml-auto flex">
          <nav className="flex items-center gap-10 mr-15">
            <Link href="/" className={linkStyle}>Inicio</Link>
            <Link href="/equipos" className={linkStyle}>Equipos</Link>
            <Link href="/repuestos" className={linkStyle}>Repuestos</Link>
            <Link href="/mantenimiento" className={linkStyle}>Mantenimiento</Link>
          </nav>
          <button onClick={handler} className="bg-white text-(--dark-blue) rounded-4xl px-5 text-lg font-medium hover:bg-(--dark-blue) hover:text-white transition-all duration-300 hover:cursor-pointer">Contáctanos</button>
        </div>
      </header>
      <ContactCard state={state} handler={handler}/>
    </>
  );
}