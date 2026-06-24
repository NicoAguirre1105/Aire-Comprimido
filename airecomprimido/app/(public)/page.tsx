import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ContactSectionClient } from './_components/ContactSectionClient'
import { HeroClient } from './_components/HeroClient'
import { StatsClient } from './_components/StatsClient'
import { FadeIn } from './_components/FadeIn'
import { Marquee } from '@/components/ui/marquee'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://airecomprimidoec.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AIRECOMPRIMIDO EC S.A.S',
  description:
    'Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial a los diferentes equipos multimarca en Ecuador.',
  url: 'https://airecomprimidoec.com',
  logo: 'https://airecomprimidoec.com/logos/logo.png',
  image: 'https://airecomprimidoec.com/og-image.png',
  slogan: 'La fuerza del aire... nos mueve',
  areaServed: { '@type': 'Country', name: 'Ecuador' },
  knowsAbout: [
    'Compresores de aire', 'Mantenimiento industrial', 'Repuestos para compresores',
    'Atlas Copco', 'Kaeser', 'Ingersoll Rand', 'Quincy', 'Airhorse', 'Hertz',
  ],
}

const brands = [
  { src: '/logos/airhorse.svg', alt: 'Airhorse Compressor' },
  { src: '/logos/quincy.svg', alt: 'Quincy Compressor' },
  { src: '/logos/atlas_copco.svg', alt: 'Atlas Copco' },
  { src: '/logos/hertz.svg', alt: 'Hertz Compressor' },
  { src: '/logos/kaeser.svg', alt: 'Kaeser Compressor' },
  { src: '/logos/IR_logo.svg', alt: 'Ingersoll Rand' },
]

const clients = [
  { src: '/logos/favorita_logo.svg', alt: 'Corporación Favorita' },
  { src: '/logos/gira_logo.svg', alt: 'Gira' },
  { src: '/logos/north_logo.svg', alt: 'North' },
]

const services = [
  {
    title: 'Equipos y Compresores',
    description: 'Importamos y comercializamos compresores de aire para toda aplicación industrial. Equipos nuevos de las marcas más reconocidas a nivel mundial.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
    link: '/equipos',
    cta: 'Ver catálogo',
  },
  {
    title: 'Repuestos Originales',
    description: 'Stock permanente de repuestos originales multimarca. También importamos cualquier pieza o componente que necesite su equipo.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    link: '/repuestos',
    cta: 'Ver repuestos',
  },
  {
    title: 'Mantenimiento Industrial',
    description: 'Mantenimiento preventivo y correctivo para compresores multimarca. Servicio técnico especializado con contratos anuales y visitas técnicas periódicas.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    link: '/mantenimiento',
    cta: 'Ver servicios',
  },
]

const workSteps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Evaluamos el estado actual de sus compresores e infraestructura de aire comprimido para elaborar un plan personalizado.',
  },
  {
    number: '02',
    title: 'Contrato Anual',
    description: 'Formalizamos un contrato de mantenimiento preventivo que garantiza intervenciones programadas y precios fijos durante el año.',
  },
  {
    number: '03',
    title: 'Planificación',
    description: 'Elaboramos un calendario de mantenimientos que se adapta a sus turnos productivos, minimizando interrupciones operativas.',
  },
  {
    number: '04',
    title: 'Seguimiento',
    description: 'Realizamos los mantenimientos según el plan, reemplazando repuestos originales y registrando cada intervención digitalmente.',
  },
  {
    number: '05',
    title: 'Reporte Digital',
    description: 'Cada mantenimiento queda documentado en nuestro sistema. Usted accede al historial completo de cada equipo con un simple escaneo de QR.',
  },
]

const ecoPoints = [
  {
    title: 'Gestión de residuos',
    description: 'Manejamos correctamente los residuos contaminantes generados durante el mantenimiento de compresores: aceites usados, filtros y componentes.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
  },
  {
    title: 'Energía solar',
    description: 'Nuestras instalaciones operan con paneles solares, reduciendo nuestra huella de carbono y apostando por fuentes de energía limpia.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Cero papel',
    description: 'Nuestro sistema de reportes digitales elimina el uso de papel en los informes de mantenimiento, contribuyendo a la sostenibilidad.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <HeroClient />

        {/* ── STATS ────────────────────────────────────────────── */}
        <StatsClient />

        {/* ── CLIENTES ─────────────────────────────────────────── */}
        <section className="bg-slate-50 py-16 px-6">
          <FadeIn className="max-w-5xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
              Empresas que confían en nosotros
            </p>
            <h2 className="text-3xl font-bold text-dark-blue mb-12">
              La industria ecuatoriana nos respalda
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-14">
              {clients.map((c) => (
                <div key={c.alt} className="flex items-center justify-center">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={160}
                    height={60}
                    className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 [filter:brightness(0)]"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ── MARCAS ───────────────────────────────────────────── */}
        <section className="bg-dark-blue py-14 overflow-hidden">
          <FadeIn className="text-center mb-10 px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-2">
              Marcas
            </p>
            <h2 className="text-3xl font-bold text-white">
              Comercializamos las mejores marcas
            </h2>
          </FadeIn>
          <div className="relative">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]" repeat={3}>
              {brands.map((b) => (
                <div key={b.alt} className="flex items-center justify-center px-6">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={140}
                    height={50}
                    className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-dark-blue" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-dark-blue" />
          </div>
        </section>

        {/* ── SERVICIOS ────────────────────────────────────────── */}
        <section id="servicios" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
                Lo que ofrecemos
              </p>
              <h2 className="text-4xl font-bold text-dark-blue">
                Soluciones integrales para su industria
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <FadeIn key={s.title} delay={i * 0.1}>
                  <div className="group flex flex-col h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="w-14 h-14 rounded-xl bg-dark-blue text-light-blue flex items-center justify-center mb-6">
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-dark-blue mb-3">{s.title}</h3>
                    <p className="text-slate-600 font-light leading-relaxed flex-1">{s.description}</p>
                    <Link
                      href={s.link}
                      className="mt-6 inline-flex items-center gap-2 text-light-blue font-medium hover:gap-3 transition-all duration-200 cursor-pointer"
                    >
                      {s.cta}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMA DE TRABAJO ─────────────────────────────────── */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
                Nuestra metodología
              </p>
              <h2 className="text-4xl font-bold text-dark-blue mb-4">
                Mantenimiento que protege su producción
              </h2>
              <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
                Con un contrato anual, planificamos y ejecutamos el mantenimiento preventivo de sus compresores, evitando paradas inesperadas, reduciendo costos y prolongando la vida útil de sus equipos.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {workSteps.map((step, i) => (
                <FadeIn key={step.number} delay={i * 0.08}>
                  <div className="relative flex flex-col h-full rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                    <span className="text-5xl font-bold text-slate-100 leading-none mb-4 select-none">
                      {step.number}
                    </span>
                    <h3 className="text-base font-semibold text-dark-blue mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── HISTORIAL DIGITAL / QR ───────────────────────────── */}
        <section className="py-24 px-6 bg-dark-blue">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
                Innovación digital
              </p>
              <h2 className="text-4xl font-bold text-white mb-6">
                El historial de sus equipos, en un escaneo
              </h2>
              <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">
                Instalamos códigos QR en cada compresor, equipo y área de su planta. Con solo escanearlos, usted y su equipo acceden en segundos a fichas técnicas, historial de mantenimientos y reportes generados por nuestros técnicos.
              </p>
              <ul className="space-y-4">
                {[
                  'Acceso instantáneo desde cualquier dispositivo',
                  'Historial completo de intervenciones técnicas',
                  'Fichas técnicas siempre actualizadas',
                  'Disponible para clientes con contrato anual',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-200 font-light">
                    <svg className="w-5 h-5 text-light-blue mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn direction="right" className="flex justify-center">
              <div className="relative bg-slate-800 rounded-3xl p-10 flex flex-col items-center gap-6 border border-slate-700 max-w-sm w-full">
                <Image
                  src="/icons/qr_code.svg"
                  alt="Código QR de equipo"
                  width={140}
                  height={140}
                  className="opacity-90 brightness-0 invert"
                />
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Compresor Atlas Copco GA55</p>
                  <p className="text-slate-400 text-sm mt-1">Última revisión: Jun 2025 · Próxima: Dic 2025</p>
                </div>
                <div className="w-full border-t border-slate-700 pt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-700 rounded-xl p-3 text-center">
                    <p className="text-slate-400 text-xs mb-1">Horas operación</p>
                    <p className="text-white font-semibold">4,280 h</p>
                  </div>
                  <div className="bg-slate-700 rounded-xl p-3 text-center">
                    <p className="text-slate-400 text-xs mb-1">Mantenimientos</p>
                    <p className="text-white font-semibold">12 registros</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── QUIÉNES SOMOS ────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left" className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <Image
                  src="/img/general.webp"
                  alt="Técnico de AIRECOMPRIMIDO EC realizando mantenimiento"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-blue/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg">Técnicos especializados</p>
                  <p className="text-slate-300 text-sm">Más de 25 años de experiencia en compresores industriales</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
                Sobre nosotros
              </p>
              <h2 className="text-4xl font-bold text-dark-blue mb-6">
                Una empresa ecuatoriana comprometida con su industria
              </h2>
              <p className="text-slate-600 font-light text-lg leading-relaxed mb-6">
                En AIRECOMPRIMIDO EC S.A.S trabajamos directamente con las fábricas a nivel mundial para ofrecerle los mejores equipos, repuestos originales y servicio técnico a los mejores precios del mercado.
              </p>
              <p className="text-slate-600 font-light text-lg leading-relaxed">
                Queremos ser la alternativa más confiable para la industria ecuatoriana: la misma calidad de las grandes marcas, con el trato cercano y ágil de una empresa local.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── ECO / RSE ────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
                Responsabilidad ambiental
              </p>
              <h2 className="text-4xl font-bold text-dark-blue mb-4">
                Comprometidos con el medioambiente
              </h2>
              <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">
                Ser eficientes no se limita a los compresores. En AIRECOMPRIMIDO EC adoptamos prácticas sostenibles en cada aspecto de nuestra operación.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ecoPoints.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="flex flex-col items-start bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-dark-blue mb-3">{item.title}</h3>
                    <p className="text-slate-500 font-light leading-relaxed text-sm">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL + CONTACTO ─────────────────────────────── */}
        <ContactSectionClient />

      </main>
    </>
  )
}
