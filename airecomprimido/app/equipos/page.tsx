import Slider from "../_components/slider"
import ProductCard from "../_components/productCard"
import ContactUs from "../_components/contactUs"

export default function Equipos()
{
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
            <h1>Catálogo de equipos</h1>
            <Slider props={props}/>
            <div className="products">
                <ProductCard />
            </div>
        </main>
    )
}