"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

const slides = [
  {
    src: "/img/compresor1.webp",
    label: "Compresores Exentos de Aceite",
    sub: "Atlas Copco · Kaeser · Ingersoll Rand · y más",
  },
  {
    src: "/img/compresorTornillo.webp",
    label: "Compresores de Tornillo",
    sub: "Atlas Copco · Kaeser · Ingersoll Rand · y más",
  },
  {
    src: "/img/compresorTornillo.png",
    label: "Compresores Lubricados",
    sub: "Desde 7.5HP hasta 700HP · Multimarca",
  },
  {
    src: "/img/compresorVelocidad.webp",
    label: "Compresores de Velocidad Variable",
    sub: "Mayor eficiencia energética · VSD",
  },
]

const INTERVAL = 4000

export function HeroClient() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center bg-dark-blue overflow-hidden">

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--light-blue) 1px, transparent 1px),
            linear-gradient(90deg, var(--light-blue) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-light-blue opacity-[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-light-blue opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-4"
          >
            Ecuador · Compresores Industriales
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            La fuerza del aire
            <span className="block text-light-blue">nos mueve</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-300 text-xl font-light leading-relaxed mb-10 max-w-lg"
          >
            Importamos, comercializamos y mantenemos compresores de aire industriales multimarca. Más de 25 años respaldando la producción de la industria ecuatoriana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contacto"
              className="px-7 py-3.5 bg-light-blue text-white font-semibold rounded-full hover:bg-blue-500 transition-colors duration-200 cursor-pointer text-base"
            >
              Solicitar cotización
            </a>
            <a
              href="#servicios"
              className="px-7 py-3.5 border border-slate-500 text-white font-medium rounded-full hover:border-light-blue hover:text-light-blue transition-colors duration-200 cursor-pointer text-base"
            >
              Ver servicios
            </a>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex flex-col items-center gap-4"
        >
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].src}
                  alt={slides[current].label}
                  fill
                  className="object-cover"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-linear-to-t from-dark-blue/70 via-transparent to-transparent pointer-events-none" />

            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 left-6 right-6 bg-dark-blue/80 backdrop-blur-sm border border-slate-600 rounded-2xl p-4"
              >
                <p className="text-white font-semibold text-sm">{slides[current].label}</p>
                <p className="text-slate-400 text-xs mt-1">{slides[current].sub}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 h-2 bg-light-blue"
                    : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
