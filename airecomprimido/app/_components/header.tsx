import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Image 
        src="/logos/logo.png"
        alt="AireComprimido EC S.A.S"
        width={250}
        height={250}
        priority
      />
      <div className="nav-container">
        <ul>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/equipos">Equipos</Link></li>
          <li><Link href="/repuestos">Repuestos</Link></li>
          <li><Link href="/mantenimiento">Mantenimiento</Link></li>
        </ul>
        <button>Contáctanos</button>
      </div>
    </header>
  );
}