import Image from "next/image"
import { FadeIn } from "../_components/FadeIn"

const maintenanceServices = [
  {
    title: "Mantenimiento Básico",
    description: "Cambio de filtros de aire, aceite y separadores. Revisión de correas, presóstatos y ajuste general del equipo.",
    image: "/img/mantenimiento1.jpg",
  },
  {
    title: "Mantenimiento de Válvulas",
    description: "Revisión, limpieza y reemplazo de válvulas de admisión, check, solenoides y termostáticas con piezas originales.",
    image: "/img/mantenimiento3.jpg",
  },
  {
    title: "Reparación de Módulos Electrónicos",
    description: "Diagnóstico y reparación de controladores electrónicos, variadores de velocidad, PLCs y sistemas de arranque.",
    image: "/img/mantenimiento5.jpg",
  },
]

const specialties = [
  {
    title: "Elementos Compresores",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
  },
  {
    title: "Secadores de Aire",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Variadores de Velocidad",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    title: "Motores Eléctricos",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Cajas de Arranque",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
]

const networkMaterials = ["Aluminio", "Hidroinox", "Tubo Negro"]

export default function Mantenimiento() {
  return (
    <main className="overflow-x-hidden">

      {/* Hero */}
      <section className="bg-[var(--dark-blue)] py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--light-blue) 1px, transparent 1px), linear-gradient(90deg, var(--light-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
            Servicios técnicos
          </p>
          <h1 className="text-5xl font-bold text-white mb-4 max-sm:text-4xl">
            Mantenimiento
          </h1>
          <p className="text-slate-300 text-lg font-light max-w-xl mx-auto">
            Mantenimiento preventivo y correctivo multimarca. Técnicos especializados con más de 25 años de experiencia en compresores de aire industriales.
          </p>
        </div>
      </section>

      {/* Main service cards */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
              Mantenimiento y servicio técnico
            </p>
            <h2 className="text-4xl font-bold text-[var(--dark-blue)]">
              Nuestros servicios de mantenimiento
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {maintenanceServices.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-blue)]/60 to-transparent" />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold text-[var(--dark-blue)] mb-2">{s.title}</h3>
                    <p className="text-slate-500 font-light text-sm leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Specialties */}
          <FadeIn>
            <div className="bg-[var(--dark-blue)] rounded-2xl p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-2">
                También realizamos
              </p>
              <h3 className="text-2xl font-bold text-white mb-8">
                Mantenimiento y reparación especializada
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {specialties.map((s) => (
                  <div key={s.title} className="flex flex-col items-center gap-3 bg-slate-800 rounded-xl p-4 text-center">
                    <div className="w-11 h-11 rounded-xl bg-[var(--dark-blue)] border border-slate-600 text-[var(--light-blue)] flex items-center justify-center">
                      {s.icon}
                    </div>
                    <p className="text-slate-200 text-sm font-light leading-snug">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Network installation */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/img/mantenimiento2.webp"
                alt="Instalación de redes de aire"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-blue)]/50 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
              Infraestructura
            </p>
            <h2 className="text-4xl font-bold text-[var(--dark-blue)] mb-5">
              Diseño e instalación de redes de aire
            </h2>
            <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
              Diseñamos e instalamos redes de aire a medida, adaptadas a los requerimientos de presión y caudal de su planta, cumpliendo con los estándares industriales para cada actividad productiva.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-slate-50">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--dark-blue)] mb-4">
            ¿Necesita mantenimiento para su compresor?
          </h2>
          <p className="text-slate-600 font-light text-lg mb-8">
            Contáctenos hoy. Nuestro equipo técnico evalúa su equipo y le propone la mejor solución.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=593991848293"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--light-blue)] text-white font-semibold rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar visita técnica
          </a>
        </FadeIn>
      </section>

    </main>
  )
}
