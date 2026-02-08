'use client'

import Slider from "./_components/slider";
import ServiceCard from "./_components/serviceCard";
import Image from "next/image";
import { useContactVisibility } from "./_context/ContactVisibilityContext";

export default function Home() {

  const props = [
    {id: 1, src:"/logos/airhorse.svg", alt:"Airhorse Compressor"},
    {id: 2, src:"/logos/quincy.svg", alt:"Quincy Compressor"},
    {id: 3, src:"/logos/atlas_copco.svg", alt:"Atlas Copco"},
    {id: 4, src:"/logos/hertz.svg", alt:"Hertz Compressor"},
    {id: 5, src:"/logos/kaeser.svg", alt:"Kaeser Compressor"},
    {id: 6, src:"/logos/IR_logo.svg", alt:"Ingersoll Rand"}
  ]
  const buttonStyle = "text-center py-2 px-5 rounded-4xl text-white font-medium hover:cursor-pointer transition-all duration-300"
  const sliderStyle = "w-100 h-30 max-sm:w-70 max-sm:h-20"
  const h2Style = "text-(--light-blue) font-bold text-5xl text-center max-sm:text-4xl"

  const { isVisible, toggleContact } = useContactVisibility();

  return (
    <main>
      <div className="flex flex-col items-center gap-10 p-18 max-sm:px-10 bg-[linear-gradient(200deg,var(--dark-blue)_10%,var(--light-blue)_100%)]">
        <div className="mb-10">
          <h1 className="text-4xl text-white font-bold text-center max-md:text-3xl">AIRECOMPRIMIDO EC S.A.S</h1>
          <p className="text-white text-center translate-x-70 italic text-lg w-fit max-md:text-base max-md:translate-x-0">La fuerza del aire... nos mueve</p>
        </div>
        <p className="text-center text-white font-light text-xl px-20 max-md:px-5 max-sm:px-0">Nos dedicamos a la comercialización de compresores de aire, repuestos originales y servicio técnico de las marcas más prestigiosas a nivel mundial como son: Atlas Copco, Kaeser, Ingersoll Rand, Quincy, Airhorse, Hertz, entre otras</p>
        <Slider props={props} className={sliderStyle}/>
        <button onClick={toggleContact} className={`${buttonStyle} w-fit mx-3 bg-(--light-blue) hover:bg-(--dark-blue) text-lg max-sm:text-base max-sm:mx-0`}>Solicita una Cotización</button>
      </div>
      <div className="flex flex-col items-center px-40 py-30 gap-10 max-md:px-25 max-sm:px-15 text-justify">
        <h2 className={h2Style}>Quienes somos</h2>
        <div className="flex gap-10 justify-center text-2xl max-xl:flex-wrap max-xl:text-xl">
          <p className="self-center font-light">Todos quienes formamos AIRECOMPRIMIDO EC S.A.S., trabajamos arduamente para conseguir de las distintas fábricas, a nivel mundial, los mejores precios y tiempos de entrega, tanto en equipos como en repuestos. Para nosotros lo más importante es satisfacer la necesidad que tenga nuestro cliente a un precio justo y acorde a la realidad que estamos viviendo.</p>
          
          <Image 
            src="/img/img1.jpg"
            alt="Compresor"
            width={150}
            height={150}
            className="rounded-lg h-60 w-auto my-auto"
          />
        </div>
        <div className="flex flex-row-reverse justify-center gap-10 text-2xl max-xl:flex-wrap max-xl:text-xl">
          <p className="font-light self-center">Queremos brindar a la Industria Ecuatoriana y de la Región, una ALTERNATIVA válida que les permita obtener un mejor precio por los mismos compresores, repuestos y mano de obra calificada que ofrecen los distribuidores de las diferentes marcas en el país.</p>
          <Image 
            src="/img/img2.jpg"
            alt="Mantenimiento"
            width={150}
            height={150}
            className="rounded-lg h-60 w-auto my-auto"
          />
        </div>
      </div>
      <div className="border-t-5 border-(--light-blue) mx-40 pt-30 pb-15 justify-items-center max-md:mx-20 max-sm:mx-10">
        <h2 className={h2Style}>Servicios</h2>
        <div className="flex justify-center gap-10 my-20 flex-wrap">
          <ServiceCard title="Equipos / Compresores" buttonText="Catálogo de Equipos" link="/equipos">
            Ofrecemos compresores de aire para toda aplicación en la industria.
          </ServiceCard>
          <ServiceCard title="Repuestos" buttonText="Catálogo de Repuestos" link="/repuestos">
            Disponemos en stock los repuestos que son de recambio frecuente en cada una de las marcas de compresores. Además, podemos importar los equipos y repuestos de cualquier país.
          </ServiceCard>
          <ServiceCard title="Mantenimiento" buttonText="Catálogo de Mantenimiento" link="/mantenimiento">
            Ofrecemos mantenimiento preventivo y correctivo para sus compresores, de modo que, se mantengan en un estado óptimo para su correcto funcionamiento.
          </ServiceCard>
        </div>
      </div>
    </main>
  );
}
