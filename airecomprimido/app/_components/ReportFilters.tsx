'use client'

import Image from 'next/image'
import type { Empresa, Area, Equipo } from '@/app/types/database'
import { INFORMES_YEAR_SPAN } from '@/app/hooks/useInformes'

const MONTH_OPTIONS = [
  { value: '1', label: 'Enero' },
  { value: '2', label: 'Febrero' },
  { value: '3', label: 'Marzo' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Mayo' },
  { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
] as const

const CURRENT_YEAR = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: INFORMES_YEAR_SPAN }, (_, i) => CURRENT_YEAR - i)

const selectClass =
  'bg-grey-blue pl-3 py-1 appearance-none w-[7.5rem] rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-light-blue pr-7'

type ShowFilters = {
  search?: boolean
  date?: boolean
  empresa?: boolean
  area?: boolean
  equipo?: boolean
}

type ReportFiltersProps = {
  show: ShowFilters
  searchValue: string
  onSearchChange: (v: string) => void
  monthValue: string
  onMonthChange: (v: string) => void
  yearValue: string
  onYearChange: (v: string) => void
  empresas?: Empresa[]
  empresaValue?: string
  onEmpresaChange?: (v: string) => void
  areas?: Area[]
  areaValue?: string
  onAreaChange?: (v: string) => void
  equipos?: Equipo[]
  equipoValue?: string
  onEquipoChange?: (v: string) => void
}

export default function ReportFilters({
  show,
  searchValue,
  onSearchChange,
  monthValue,
  onMonthChange,
  yearValue,
  onYearChange,
  empresas = [],
  empresaValue = '',
  onEmpresaChange,
  areas = [],
  areaValue = '',
  onAreaChange,
  equipos = [],
  equipoValue = '',
  onEquipoChange,
}: ReportFiltersProps) {
  return (
    <form
      className="w-full flex flex-col justify-between gap-4 md:flex-row md:flex-wrap"
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      {show.search && (
        <span className="w-full max-w-[35rem] flex bg-grey-blue px-2 py-1 rounded-sm gap-2 md:py-2">
          <Image
            src="/icons/search.svg"
            alt="Buscar"
            width={150}
            height={150}
            className="h-5 w-auto cursor-pointer my-auto"
          />
          <input
            type="search"
            placeholder="Busca un reporte"
            className="w-full outline-0"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar reporte"
          />
        </span>
      )}

      <div className="w-full md:w-fit flex flex-wrap gap-3 justify-baseline">
        {show.date && (
          <>
            <div className="relative w-fit">
              <select
                name="month"
                id="monthSelect"
                className={selectClass}
                value={monthValue}
                onChange={(e) => onMonthChange(e.target.value)}
                aria-label="Filtrar por mes"
              >
                <option value="">Mes</option>
                {MONTH_OPTIONS.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <Image
                src="/icons/arrow_drop_down_blue.svg"
                alt=""
                width={150}
                height={150}
                className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
                aria-hidden
              />
            </div>

            <div className="relative w-fit">
              <select
                name="year"
                id="yearSelect"
                className={selectClass}
                value={yearValue}
                onChange={(e) => onYearChange(e.target.value)}
                aria-label="Filtrar por año"
              >
                <option value="">Año</option>
                {YEAR_OPTIONS.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
              <Image
                src="/icons/arrow_drop_down_blue.svg"
                alt=""
                width={150}
                height={150}
                className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
                aria-hidden
              />
            </div>
          </>
        )}

        {show.empresa && (
          <div className="relative w-fit">
            <select
              name="company"
              id="companySelect"
              className={selectClass}
              value={empresaValue}
              onChange={(e) => onEmpresaChange?.(e.target.value)}
              aria-label="Filtrar por empresa"
            >
              <option value="">Empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.name} value={empresa.name}>
                  {empresa.name}
                </option>
              ))}
            </select>
            <Image
              src="/icons/arrow_drop_down_blue.svg"
              alt=""
              width={150}
              height={150}
              className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
              aria-hidden
            />
          </div>
        )}

        {show.area && (
          <div className="relative w-fit">
            <select
              name="area"
              id="areaSelect"
              className={selectClass}
              value={areaValue}
              onChange={(e) => onAreaChange?.(e.target.value)}
              aria-label="Filtrar por área"
            >
              <option value="">Área</option>
              {areas.map((area) => (
                <option key={area.name} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
            <Image
              src="/icons/arrow_drop_down_blue.svg"
              alt=""
              width={150}
              height={150}
              className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
              aria-hidden
            />
          </div>
        )}

        {show.equipo && (
          <div className="relative w-fit">
            <select
              name="device"
              id="deviceSelect"
              className={selectClass}
              value={equipoValue}
              onChange={(e) => onEquipoChange?.(e.target.value)}
              aria-label="Filtrar por equipo"
            >
              <option value="">Equipo</option>
              {equipos.map((equipo) => (
                <option key={equipo.name} value={equipo.name}>
                  {equipo.name}
                </option>
              ))}
            </select>
            <Image
              src="/icons/arrow_drop_down_blue.svg"
              alt=""
              width={150}
              height={150}
              className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
              aria-hidden
            />
          </div>
        )}
      </div>
    </form>
  )
}
