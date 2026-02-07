import { useViewport } from "../_context/ViewportContext"
import Image from "next/image"
import Link from "next/link"
import { useContactVisibility } from "../_context/ContactVisibilityContext"

export default function ContactCard({
  toggleMenu
}: {
  toggleMenu: () => void
})
{
  const titleStyle = "text-xl font-medium"
  const infoStyle = "font-light text-lg ml-4"
  const buttonStyle = "justify-center w-40 text-center text-base py-2 px-4 rounded-4xl text-white font-medium hover:cursor-pointer transition-all duration-300 flex items-center gap-2"
  const locationUrl = "https://www.google.com/maps/place/0%C2%B007'15.7%22S+78%C2%B026'10.7%22W/@-0.121031,-78.4371497,18z/data=!3m1!4b1!4m6!3m5!1s0x0:0x1252c7e1e7b5da43!7e2!8m2!3d-0.1210307!4d-78.4363065?hl=en"
  const WAUrl = "https://api.whatsapp.com/send?phone=593991848293"
  const mailUrl = "mailto:ventas@airecomprimidoec.com?Subject=Contacto%20desde%20sitio%20web"

  const { isMobile } = useViewport()
  const { isVisible, toggleContact} = useContactVisibility()

  return (
    <>
    {isMobile ?
      <div className={`${isVisible ? "fixed" : "hidden"} overflow-y-auto flex flex-col w-full h-full top-0 left-0 bg-(--dark-blue) px-20 py-20 z-100 text-white max-sm:px-15`}>
        <Image
          src="/icons/close.svg"
          alt="Close Icon"
          width={24}
          height={24} 
          className="h-10 w-auto fixed top-5 right-5 z-60 cursor-pointer"
          onClick={toggleContact}
        />
        <h3 className="text-center text-3xl font-medium mb-4">Información de contacto</h3>
        <h4 className={titleStyle}>Dirección</h4>
        <p className={infoStyle}>José Mogro Oe10D s/n y Matilde Hidalgo</p>
        <Link href={locationUrl} target="_blank" className={`${buttonStyle} w-50 self-center my-3 bg-(--light-blue) hover:bg-black`}>
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
        <p className={infoStyle}>(02) 2021262 / 0991848293</p>
        <h4 className={titleStyle}>Correo electrónico</h4>
        <p className={infoStyle}>ventas@airecomprimidoec.com</p>
        <div className="w-full border-t-3 mt-7 pt-4">
          <p className="text-center text-xl">Escríbenos</p>
          <div className="flex justify-center items-center px-5 my-3 gap-15 max-sm:flex-col max-sm:gap-5">
            <Link href={WAUrl} target="_blank" className={`bg-(--green) hover:bg-(--hover-green) ${buttonStyle}`}>
              <Image
                src="/icons/whatsapp.svg"
                alt="WhatsApp"
                width={24}
                height={24} 
                className="h-7 w-auto"
              />
              WhatsApp
            </Link>
            <Link href={mailUrl} target="_blank" className={`bg-(--red) hover:bg-(--hover-red) ${buttonStyle}`}>
              <Image
                src="/icons/mail.svg"
                alt="Mail"
                width={24}
                height={24} 
                className="h-7 w-auto"
              />
              Correo
            </Link>
          </div>
        </div>
      </div>
      :
      <div className={`${isVisible ? "fixed" : "hidden"} bg-black/40 backdrop-blur-xs w-full h-full top-0 left-0 z-100`}>
        <div className={`absolute flex flex-col w-2/3 max-w-120 max-h-9/10 h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-10 z-100`}>
          <Image
            src="/icons/close.svg"
            alt="Close Icon"
            width={24}
            height={24} 
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-(--dark-blue) w-9 h-9 rounded-4xl hover:cursor-pointer p-1"
            onClick={toggleContact}
          />
          <h3 className="text-(--dark-blue) text-center text-3xl font-medium mb-4">Información de contacto</h3>
          <h4 className={titleStyle}>Dirección</h4>
          <p className={infoStyle}>José Mogro Oe10D s/n y Matilde Hidalgo</p>
          <Link href={locationUrl} target="_blank" className={`${buttonStyle} w-50 self-center my-3 bg-(--light-blue) hover:bg-(--dark-blue)`}>
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
          <p className={infoStyle}>(02) 2021262 / 0991848293</p>
          <h4 className={titleStyle}>Correo electrónico</h4>
          <p className={infoStyle}>ventas@airecomprimidoec.com</p>
          <div className="w-full border-t-3 mt-7 pt-4">
            <p className="text-center text-(--dark-blue) text-xl">Escríbenos</p>
            <div className="flex justify-center items-center px-5 my-3 gap-15">
              <Link href={WAUrl} target="_blank" className={`bg-(--green) hover:bg-(--hover-green) ${buttonStyle}`}>
                <Image
                  src="/icons/whatsapp.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24} 
                  className="h-7 w-auto cursor-pointer"
                />
                WhatsApp
              </Link>
              <Link href={mailUrl} target="_blank" className={`bg-(--red) hover:bg-(--hover-red) ${buttonStyle}`}>
                <Image
                  src="/icons/mail.svg"
                  alt="Mail"
                  width={24}
                  height={24} 
                  className="h-7 w-auto cursor-pointer"
                />
                Correo
              </Link>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}