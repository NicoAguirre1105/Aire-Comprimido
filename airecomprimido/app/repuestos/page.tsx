import Slider from "../_components/slider"

export default function Repuestos ()
{
  const props = [
    {id: 1, src:"/img/repuestos1.jpg", alt:"Repuesto 1"},
    {id: 2, src:"/img/repuestos2.jpg", alt:"Repuesto 2"},
    {id: 3, src:"/img/repuestos3.jpg", alt:"Repuesto 3"},
    {id: 4, src:"/img/repuestos4.jpg", alt:"Repuesto 4"},
    {id: 5, src:"/img/repuestos5.webp", alt:"Repuesto 5"},
    {id: 6, src:"/img/repuestos6.webp", alt:"Repuesto 6"},
    {id: 7, src:"/img/repuestos7.webp", alt:"Repuesto 7"},
    {id: 8, src:"/img/repuestos8.jpg", alt:"Repuesto 8"},
    {id: 9, src:"/img/repuestos9.jpg", alt:"Repuesto 9"},
    {id: 10, src:"/img/repuestos10.jpg", alt:"Repuesto 10"},
    {id: 11, src:"/img/repuestos11.jpg", alt:"Repuesto 11"},
    {id: 12, src:"/img/repuestos12.jpg", alt:"Repuesto 12"},
    {id: 13, src:"/img/repuestos13.webp", alt:"Repuesto 13"},
    {id: 14, src:"/img/repuestos14.jpg", alt:"Repuesto 14"},
    {id: 15, src:"/img/repuestos15.webp", alt:"Repuesto 15"}
  ]

  const h2Style = "font-bold text-3xl my-5"
  const ulStyle = "mx-20 list-disc font-light text-xl"

  return (
    <main className="flex flex-col justify-center pt-15 gap-15">
      <h1 className="text-center text-5xl font-bold text-(--dark-blue)">Catálogo de repuestos</h1>
      <Slider props={props} className="w-auto h-50"/>
      <div className="bg-(--dark-blue) py-15 text-white pl-20">
        <h2 className={h2Style}>Repuestos</h2>        
        <p className="font-light text-xl">Disponemos de los siguientes repuestos originales en marcas como: Atlas Copco, Kaeser, Ingersoll Rand, Quincy, Airhorse, entre otras</p>
        <ul className={ulStyle}>
          <li>Filtros de Aceite</li>
          <li>Filtros de Aire</li>
          <li>Horómetros</li>
          <li>Kits de bandas</li>
          <li>Kits de buje y retenedor</li>
          <li>Kits de rodamientos (elementos compresores)</li>
          <li>Kits de rodamientos (motores eléctricos)</li>
          <li>Kits de válvulas Check</li>
          <li>Kits de válvulas de admisión</li>
          <li>Kits de válvulas de cierre de aceite</li>
          <li>Kits de válvulas de drenaje</li>
          <li>Kits de válvulas de presión continua</li>
          <li>Kits de válvulas de regulación</li>
          <li>Kits de válvulas solenoides</li>
          <li>Kits de válvulas termostáticas</li>
          <li>Manómetros</li>
          <li>Módulos electrónicos</li>
          <li>Poleas</li>
          <li>Post Enfriadores de aire y/o aceite</li>
          <li>Presóstatos</li>
          <li>Sensores de presión</li>
          <li>Sensores de temperaturas</li>
          <li>Separadores de Aceite</li>
          <li>Switch de temperaturas</li>
        </ul>
        <h2 className={h2Style}>Líneas de aire y accesorios</h2>        
        <ul className={ulStyle}>
          <li>Filtros de alta eficacia para líneas de aire</li>
          <li>Reguladores de presión</li>
          <li>Válvulas de drenaje condensado</li>
          <li>Conjuntos de mantenimiento</li>
          <li>Pistolas de soplado</li>
        </ul>
      </div>
    </main>
  )
}