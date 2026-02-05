
export default function ContactUs() 
{
  const buttonStyle = "text-center w-fit text-xl py-3 px-7 rounded-4xl font-bold hover:cursor-pointer transition-all duration-300 bg-(--light-blue) text-white hover:bg-(--dark-blue) hover:text-white"
  
  return (
    <div className="bg-(--grey-blue) flex flex-col py-30 px-40 items-center gap-10">
    <p className="text-center text-(--dark-blue) text-3xl font-light">Solicita ahora una visita técnica para la inspección de sus compresores o déjanos tu duda directamente con nuestro personal.</p>
    <button className={buttonStyle}>Contáctanos</button>
    </div>
  )
}