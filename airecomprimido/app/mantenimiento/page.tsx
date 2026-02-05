import Slider from "../_components/slider"
import ProductContainer from "../_components/productContainer"

export default function Mantenimiento()
{
  const props = [
    {src:"/img/mantenimiento1.jpg", alt:"Mantenimiento 1"},
    {src:"/img/mantenimiento2.webp", alt:"Mantenimiento 2"},
    {src:"/img/mantenimiento3.jpg", alt:"Mantenimiento 3"},
    {src:"/img/mantenimiento4.gif", alt:"Mantenimiento 4"},
    {src:"/img/mantenimiento5.jpg", alt:"Mantenimiento 5"}
  ]

  return (
    <main>
      <h1>Mantenimiento y otros servicios</h1>
      <Slider props={props}/>
      <ProductContainer>
        <h2>Mantenimiento y Servicio técnico</h2>
        {/*lista*/ }
        <p></p>
        {/*lista*/ }
        <h2>Diseño e instalación de redes de aire</h2>
        {/*lista*/ }
      </ProductContainer>
    </main>
  )
}