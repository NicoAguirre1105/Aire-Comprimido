
import { useViewport } from "../_context/ViewportContext"
import Image from "next/image"
import Link from "next/link"
import { useContactVisibility } from "../_context/ContactVisibilityContext"

export default function ContactInfo({
  handleWindowState
}: {
  handleWindowState: (newState:string) => void
}) {

  const titleStyle = "text-xl font-medium"
  const infoStyle = "font-light text-lg ml-4 text-wrap"
  const locationUrl = "https://www.google.com/maps/place/0%C2%B007'15.7%22S+78%C2%B026'10.7%22W/@-0.121031,-78.4371497,18z/data=!3m1!4b1!4m6!3m5!1s0x0:0x1252c7e1e7b5da43!7e2!8m2!3d-0.1210307!4d-78.4363065?hl=en"
  const WAUrl = "https://api.whatsapp.com/send?phone=593991848293"

  const { isVisible, toggleContact } = useContactVisibility()

  return (
    <>
    <h3 className="window-title">Información de contacto</h3>
    <h4 className={titleStyle}>Dirección</h4>
    <p className={infoStyle}>José Mogro Oe10D s/n y Matilde Hidalgo</p>
    <Link href={locationUrl} target="_blank" className="button-style self-center my-3 bg-(--light-blue) text-white">
      <Image
        src="/icons/location.svg"
        alt="Location"
        width={24}
        height={24} 
        className="h-7 w-auto"
        onClick={toggleContact}
      />
      Abrir en el mapa
    </Link>
    <h4 className={titleStyle}>Números de contacto</h4>
    <p className={infoStyle}>(02) 2021262 / (+593) 991848293</p>
    <div className="w-full border-t-3 mt-7 pt-4">
      <p className="text-center text-xl">Escríbenos</p>
      <div className="flex justify-center items-center px-5 my-3 gap-15 max-sm:flex-col max-sm:gap-5">
        <Link href={WAUrl} target="_blank" className=" button-style w-40 bg-(--green) text-white">
          <Image
            src="/icons/whatsapp.svg"
            alt="WhatsApp"
            width={24}
            height={24} 
            className="h-7 w-auto"
          />
          WhatsApp
        </Link>
        <button onClick={() => handleWindowState('email-form')} className="bg-(--red) button-style w-40 text-white">
          <Image
            src="/icons/mail.svg"
            alt="Mail"
            width={24}
            height={24} 
            className="h-7 w-auto"
          />
          Correo
        </button>
      </div>
    </div>
    </>
  )
}