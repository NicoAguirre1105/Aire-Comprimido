import Slider from "../_components/slider"
import ProductContainer from "../_components/productContainer"

export default function Repuestos ()
{
  const props = [
    {src:"/img/repuestos1.jpg", alt:"Repuesto 1"},
    {src:"/img/repuestos2.jpg", alt:"Repuesto 2"},
    {src:"/img/repuestos3.jpg", alt:"Repuesto 3"},
    {src:"/img/repuestos4.jpg", alt:"Repuesto 4"},
    {src:"/img/repuestos5.webp", alt:"Repuesto 5"},
    {src:"/img/repuestos6.webp", alt:"Repuesto 6"},
    {src:"/img/repuestos7.webp", alt:"Repuesto 7"},
    {src:"/img/repuestos8.jpg", alt:"Repuesto 8"},
    {src:"/img/repuestos9.jpg", alt:"Repuesto 9"},
    {src:"/img/repuestos10.jpg", alt:"Repuesto 10"},
    {src:"/img/repuestos11.jpg", alt:"Repuesto 11"},
    {src:"/img/repuestos12.jpg", alt:"Repuesto 12"},
    {src:"/img/repuestos13.webp", alt:"Repuesto 13"},
    {src:"/img/repuestos14.jpg", alt:"Repuesto 14"},
    {src:"/img/repuestos15.webp", alt:"Repuesto 15"}
  ]

  return (
    <main>
      <h1>Catálogo de repuestos</h1>
      <Slider props={props}/>
      <ProductContainer>
        <h2>Repuestos</h2>        
        <p>Disponemos de los siguientes repuestos originales en marcas como: Atlas Copco, Kaeser, Ingersoll Rand, Quincy, Airhorse, entre otras</p>
        {/* lista */}
        <h2>Líneas de aire y accesorios</h2>        
        {/* lista */}
      </ProductContainer>
    </main>
  )
}