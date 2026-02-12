import Image from "next/image"
import { useContactVisibility } from "../_context/ContactVisibilityContext"

export default function EmailSentMessage() {

  const { isVisible, toggleContact } = useContactVisibility()

  return(
    <>
    <Image
      src="/img/paper-plane.png"
      alt="Close Icon"
      width={24}
      height={24} 
      className="h-3/5 w-fit mx-auto"
    />
    <p className="text-center py-5 px-5 text-xl font-light">El correo ha sido enviado exitosamente!</p>
    <button onClick={toggleContact} className="button-style bg-(--light-blue) text-white w-30 self-center">Hecho</button>
    </>
  )
}