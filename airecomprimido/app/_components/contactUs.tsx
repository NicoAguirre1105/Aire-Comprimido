import { useContactVisibility } from "../_context/ContactVisibilityContext"


export default function ContactUs() {
  const buttonStyle = "text-center w-fit text-xl max-sm:text-lg py-3 px-7 rounded-4xl font-bold hover:cursor-pointer transition-all duration-300 bg-(--light-blue) text-white hover:bg-(--dark-blue) hover:text-white"

  const {isVisible, toggleContact } = useContactVisibility()
  
  return (
    <div className="bg-(--grey-blue) flex flex-col py-25 px-40 max-md:px-20 max-md:py-20 items-center gap-10">
      <p className="text-center text-(--dark-blue) text-2xl max-sm:text-xl font-light">Solicita ahora una visita técnica para la inspección de sus compresores o déjanos tu duda directamente con nuestro personal.</p>
      <button onClick={toggleContact} className={buttonStyle}>Contáctanos</button>
    </div>
  )
}