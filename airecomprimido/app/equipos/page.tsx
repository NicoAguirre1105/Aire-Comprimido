import Slider from "../_components/slider"
import ProductCard from "../_components/productCard"
import Image from "next/image"
import equipos from "@/public/equipos.json"

interface Product {
  id: number,
  name: string,
  src: string,
  props: PropductProps[]
}

interface PropductProps {
  title: string,
  description: string
}

export default function Equipos()
{
  const props = [
    {id:1, src:"/logos/airhorse.webp", alt:"Airhorse Compressor"},
    {id:2, src:"/logos/quincy.webp", alt:"Quincy Compressor"},
    {id:3, src:"/logos/atlas_copco.svg", alt:"Atlas Copco"},
    {id:4, src:"/logos/hertz.svg", alt:"Hertz Compressor"},
    {id:5, src:"/logos/kaeser.webp", alt:"Kaeser Compressor"},
    {id:6, src:"/logos/ir_large.png", alt:"Ingersoll Rand"}
  ]

  const productList = equipos as Product[]

return (
  <main className="flex flex-col justify-center pt-15 gap-15">
      <h1 className="text-center text-5xl font-bold text-(--dark-blue)">Catálogo de equipos</h1>
    <Slider props={props} className="h-30 w-auto"/>
    <div className="bg-(--dark-blue) py-25 text-white">
      <div className="flex flex-col items-center gap-15">
        {productList.map((product, index) => (
          <ProductCard key={product.id}>
            <Image
              src={product.src}
              alt={`Equipo ${product.id}`}
              width={150}
              height={150} 
              className="" 
            />
            <div className="my-2">
              <h2 className="text-2xl font-medium italic mb-2">{product.name}</h2>
              {product.props.map((property, idx) => (
                <p key={property.title + product.id} className="font-light"><strong className="font-medium">{property.title}:</strong> {property.description}</p>
              ))}
            </div>
          </ProductCard>
        ))}
      </div>
    </div>
  </main>
)
}