"use client"

import { NumberTicker } from "@/components/ui/number-ticker"

const stats = [
  { value: 25, suffix: '+', label: 'Años de experiencia' },
  { value: 15, suffix: '+', label: 'Empresas atendidas' },
  { value: 24, suffix: '/7', label: 'Soporte técnico' },
]

export function StatsClient() {
  return (
    <section className="bg-light-blue py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-4xl font-bold text-white mb-1">
              <NumberTicker value={s.value} className="text-white" />
              {s.suffix}
            </p>
            <p className="text-blue-100 text-sm font-light">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
