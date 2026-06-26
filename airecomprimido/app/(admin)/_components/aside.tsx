"use client"

import Image from "next/image"
import { useViewport } from "@/app/_context/ViewportContext"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/utils/supabaseClient"

export default function Aside({
  isOpen,
  toggleAside
}: {
  isOpen: boolean,
  toggleAside: () => void
}) {

  const { isMobile } = useViewport()
  const hyperStyle = 'flex items-center gap-2 opacity-75 hover:opacity-100 hover:scale-[1.03] transition-all duration-200'
  const hyperIconStyle = 'h-8 w-fit'

  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error al cerrar sesión:', error.message)
    } else {
      router.push('/login')
    }
  }

  let asideStyle = ''
  if (isMobile) {
    asideStyle = "fixed top-0 w-full h-full z-50"
  } else {
    if(isOpen) {
      toggleAside()
    }
    asideStyle = "relative"
  }

  return (
    <aside className={`${isOpen || !isMobile ? 'left-0' : '-left-full'} ${asideStyle} bg-dark-blue flex flex-col transition-all duration-200 ease-in-out sm:px-10 md:w-2/5 md:max-w-80 md:min-w-60`}>
      <div className="md:fixed md:z-10 flex flex-col h-dvh px-10 py-8 md:px-0 md:py-10">
        <Image
          src="/icons/right_arrow_white.svg"
          alt="Right arrow icon"
          width={150}
          height={150}
          className={`absolute md:hidden top-7 right-7 w-10 h-auto hover:scale-110 transition-all duration-200 cursor-pointer`}
          onClick={toggleAside}
        />
        <Image
          src="/logos/logo.png"
          alt="AIRECOMPRIMIDO EC logo"
          width={150}
          height={150}
          className="h-[3.75rem] w-fit mb-20"
        />
        <nav className="text-white flex flex-col text-xl font-semibold gap-7 py-5">
          <a href='/reportes' className={hyperStyle}>
            <Image
              src="/icons/docs.svg"
              alt="Docs icon"
              width={150}
              height={150}
              className={hyperIconStyle}
            />
            Reportes
          </a>
          <a href='/generador_qr' className={hyperStyle}>
            <Image
              src="/icons/qr_code.svg"
              alt="QR code icon"
              width={150}
              height={150}
              className={hyperIconStyle}
            />
            Generador QR
          </a>
        </nav>
        <button 
          onClick={handleLogout}
          className="text-brand-red font-medium text-left mt-auto mb-5 flex items-center gap-1 cursor-pointer transition-transform ease-in-out hover:scale-105"
        >
          <Image
              src="/icons/exit_red.svg"
              alt="Exit"
              width={150}
              height={150}
              className={hyperIconStyle}
            />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}