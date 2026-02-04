export default function ContactCard()
{
  return (
    <div className="contact-card">
      <span>X</span> {/*Close icon*/}
      <h3>Información de contacto</h3>
      <h4>Dirección</h4>
      <p></p>
      <button>Abrir en el mapa</button>
      <h4>Números de contacto</h4>
      <p>(02) 2021262 / 0991848293</p>
      <h4>Correo electrónico</h4>
      <p>ventas@airecomprimidoec.com</p>
      <div className="social-section">
        <p>Escríbenos</p>
        <span>whatsapp</span>
        <span>Correo</span>
      </div>
    </div>
  )
}