import Slider from "../_components/slider"

export default function Mantenimiento()
{
  const props = [
    {id:1, src:"/img/mantenimiento1.jpg", alt:"Mantenimiento 1"},
    {id:2, src:"/img/mantenimiento2.webp", alt:"Mantenimiento 2"},
    {id:3, src:"/img/mantenimiento3.jpg", alt:"Mantenimiento 3"},
    {id:4, src:"/img/mantenimiento4.gif", alt:"Mantenimiento 4"},
    {id:5, src:"/img/mantenimiento5.jpg", alt:"Mantenimiento 5"}
  ]

  const h2Style = "font-bold text-2xl my-5"
  const ulStyle = "mx-20 list-disc font-light text-xl"

  return (
    <main className="flex flex-col justify-center pt-15 gap-15">
      <h1 className="text-center text-5xl font-bold text-(--dark-blue)">Mantenimiento y otros servicios</h1>
      <Slider props={props} className="w-auto h-50"/>
      <div className="bg-(--dark-blue) py-15 text-white pl-20">
        <h2 className={h2Style}>Mantenimiento y Servicio técnico</h2>
        <ul className={ulStyle}>
          <li>Mantenimiento Básico</li>
          <li>Mantenimiento de válvulas</li>
          <li>Reparación de módulos eléctricos</li>
          <p className="mt-5">Además, contamos con mantenimiento y reparación de:</p>
          <ul className={ulStyle}>
            <li>Elementos compresores</li>
            <li>Secadores de aire</li>
            <li>Variadores de velocidad</li>
            <li>Motores eléctricos</li>
            <li>Cajas de arranque</li>
          </ul>
        </ul>
        <h2 className={h2Style}>Diseño e instalación de redes de aire</h2>
        <ul className={ulStyle}>
          <li>Diseñamos e instalamos redes de aire según la necesidad de nuestros clientes con materiales que se ajusten a su presupuesto y cumplan con los estándares requeridos para cada actividad productiva</li>
          <li>Trabajamos con: Aluminio, Hidroinox, Tubo negro, entre otros</li>
        </ul>
      </div>
    </main>
  )
}