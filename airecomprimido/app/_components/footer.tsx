export default function Footer() 
{
  const textStyle = "text-white font-light text-md"

  return (
    <footer className="bg-black flex flex-col py-10 items-center">
      <p className={textStyle}>AIRECOMPRIMIDO EC S.A.S. Todos los derechos reservados © 2021</p>
      <p className={textStyle}>Sitio web elaborado por Nicolas Aguirre</p>
    </footer>
  );
}