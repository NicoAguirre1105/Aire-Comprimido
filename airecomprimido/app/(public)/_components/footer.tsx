export default function Footer() 
{
  const textStyle = "text-white font-light text-md max-sm:text-sm"

  return (
    <footer className="bg-black flex flex-col py-10 px-10 text-center items-center max-sm:py-7">
      <p className={textStyle}>AIRECOMPRIMIDO EC S.A.S. Todos los derechos reservados © 2021</p>
      <p className={textStyle}>Sitio web elaborado por Nicolas Aguirre</p>
      <p className={`${textStyle} text-xs`}>v2.0.0</p>
    </footer>
  );
}