"use client"

import { motion } from "motion/react"
import Image from "next/image"

export function HeroClient() {
  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center bg-[var(--dark-blue)] overflow-hidden">

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
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[var(--light-blue)] opacity-[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--light-blue)] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-4"
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
            <span className="block text-[var(--light-blue)]">nos mueve</span>
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
              className="px-7 py-3.5 bg-[var(--light-blue)] text-white font-semibold rounded-full hover:bg-blue-500 transition-colors duration-200 cursor-pointer text-base"
            >
              Solicitar cotización
            </a>
            <a
              href="#servicios"
              className="px-7 py-3.5 border border-slate-500 text-white font-medium rounded-full hover:border-[var(--light-blue)] hover:text-[var(--light-blue)] transition-colors duration-200 cursor-pointer text-base"
            >
              Ver servicios
            </a>
          </motion.div>
        </div>

        {/* Image / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-700">
            <Image
              src="/img/compresorTornillo.png"
              alt="Compresor de tornillo industrial"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-blue)]/70 via-transparent to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[var(--dark-blue)]/80 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
              <p className="text-white font-semibold text-sm">Compresores de Tornillo</p>
              <p className="text-slate-400 text-xs mt-1">Atlas Copco · Kaeser · Ingersoll Rand · y más</p>
            </div>
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
