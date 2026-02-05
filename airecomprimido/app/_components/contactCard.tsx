export default function ContactCard({
  state,
}: {
  state: string
})
{
  const titleStyle = "text-(--dark-blue) text-xl font-medium"
  const infoStyle = "font-light text-lg ml-4"
  const buttonStyle = "min-w-35 text-center py-2 px-4 rounded-4xl text-white font-medium hover:cursor-pointer transition-all duration-300"

  return (
    <div className={`absolute ${state} flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-10`}> {/*Contact Card*/ }
      <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-(--dark-blue) w-7 h-7 text-white text-center rounded-4xl hover:cursor-pointer">X</span> {/*Close icon*/}
      <h3 className="text-(--dark-blue) text-center text-3xl font-medium mb-4">Información de contacto</h3>
      <h4 className={titleStyle}>Dirección</h4>
      <p className={infoStyle}>José Mogro Oe10D s/n y Matilde Hidalgo</p>
      <button className={`${buttonStyle} w-45 self-center my-3 bg-(--light-blue) hover:bg-(--dark-blue)`}>Abrir en el mapa</button>
      <h4 className={titleStyle}>Números de contacto</h4>
      <p className={infoStyle}>(02) 2021262 / 0991848293</p>
      <h4 className={titleStyle}>Correo electrónico</h4>
      <p className={infoStyle}>ventas@airecomprimidoec.com</p>
      <div className="w-full border-t-3 mt-7 pt-4">
        <p className="text-center text-(--dark-blue) text-xl">Escríbenos</p>
        <div className="flex justify-center px-5 my-3 gap-15">
          <span className={`bg-(--green) hover:bg-(--hover-green) ${buttonStyle}`}>WhatsApp</span>
          <span className={`bg-(--red) hover:bg-(--hover-red) ${buttonStyle}`}>Correo</span>
        </div>
      </div>
    </div>
  )
}