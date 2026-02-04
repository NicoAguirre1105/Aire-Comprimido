import Slider from "./_components/slider";
import ServiceCard from "./_components/serviceCard";

export default function Home() {

  const props = [
    {src:"/logos/airhorse.webp", alt:"Airhorse Compressor"},
    {src:"/logos/quincy.webp", alt:"Quincy Compressor"},
    {src:"/logos/atlas_copco.svg", alt:"Atlas Copco"},
    {src:"/logos/hertz.svg", alt:"Hertz Compressor"},
    {src:"/logos/kaeser.webp", alt:"Kaeser Compressor"},
    {src:"/logos/ir_short.webp", alt:"Ingersoll Rand"}
  ]

  return (
    <main>
      <div className="hero">
        <h1>AIRECOMPRIMIDO EC S.A.S</h1>
        <p>La fuerza del aire... nos mueve</p>
        <p>Nos dedicamos a la comercialización de compresores de aire, repuestos originales y servicio técnico de las marcas más prestigiosas a nivel mundial como son: Atlas Copco, Kaeser, Ingersoll Rand, Quincy, Airhorse, Hertz, entre otras</p>
        <Slider props={props}/>
        <button>Solicita una Cotización</button>
      </div>
      <div className="aboutUs">
        <p>Todos quienes formamos AIRECOMPRIMIDO EC S.A.S., trabajamos arduamente para conseguir de las distintas fábricas, a nivel mundial, los mejores precios y tiempos de entrega, tanto en equipos como en repuestos. Para nosotros lo más importante es satisfacer la necesidad que tenga nuestro cliente a un precio justo y acorde a la realidad que estamos viviendo.</p>
        <img src="Photos/img1.jpg" alt="Compresor" />
        <p>Queremos brindar a la Industria Ecuatoriana y de la Región, una ALTERNATIVA válida que les permita obtener un mejor precio por los mismos compresores, repuestos y mano de obra calificada que ofrecen los distribuidores de las diferentes marcas en el país.</p>
        <img src="Photos/img2.jpg" alt="Mantenimiento" />
      </div>
      <div className="services">
        <h2>Servicios</h2>
        <ServiceCard title="Equipos / Compresores" buttonText="Visita el Catálogo de Equipos">
          <p>Ofrecemos compresores de aire para toda aplicación en la industria.</p>
        </ServiceCard>
        <ServiceCard title="Repuestos" buttonText="Visita el Catálogo de Repuestos">
          <p>Disponemos en stock los repuestos que son de recambio frecuente en cada una de las marcas de compresores. Además, podemos importar los equipos y repuestos de cualquier país.</p>
        </ServiceCard>
        <ServiceCard title="Mantenimiento" buttonText="Visita el Catálogo de Mantenimiento">
          <p>Ofrecemos mantenimiento preventivo y correctivo para sus compresores, de modo que, se mantengan en un estado óptimo para su correcto funcionamiento.</p>
        </ServiceCard>
      </div>
    </main>
  );
}
