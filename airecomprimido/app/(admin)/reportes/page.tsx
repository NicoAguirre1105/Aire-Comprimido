'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState, useCallback, useMemo } from "react"
import { adminColumns } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"
import Image from "next/image"
import NewReportForm from "../_components/newReportForm"
import Loader from "@/app/_components/loader"
import { useInformes, INFORMES_YEAR_SPAN } from "@/app/hooks/useInformes"
import { useEmpresas } from "@/app/hooks/useEmpresas"
import { useAreas } from "@/app/hooks/useAreas"
import { useEquipos } from "@/app/hooks/useEquipos"
import { useDebounce } from "@/app/_hooks/useDebounce"

const SEARCH_DEBOUNCE_MS = 400

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

export default function Reportes() {

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [areaFilter, setAreaFilter] = useState("")
  const [deviceFilter, setDeviceFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [monthFilter, setMonthFilter] = useState("")

  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS)

  const { data: empresas, loading: empresasLoading, error: empresasError, refetch: empresasRefetch } = useEmpresas()
  const { data: equipos, loading: equiposLoading, error: equiposError, refetch: equiposRefetch } = useEquipos()
  const { data: areas, loading: areasLoading, error: areasError, refetch: areasRefetch } = useAreas()

  const informesFilters = useMemo(() => ({
    search: debouncedSearch.trim() || undefined,
    empresa: companyFilter || undefined,
    area: areaFilter || undefined,
    equipo: deviceFilter || undefined,
    year: yearFilter ? Number(yearFilter) : undefined,
    month: monthFilter ? Number(monthFilter) : undefined,
  }), [debouncedSearch, companyFilter, areaFilter, deviceFilter, yearFilter, monthFilter])

  const {
    data: informes,
    loading: informesLoading,
    isPaginating,
    error: informesError,
    resetToFirstPage,
    page,
    setPage,
    totalCount,
    totalPages,
    pageSize,
  } = useInformes(informesFilters)

  const loading =
    (informesLoading && informes.length === 0) ||
    (empresasLoading && empresas.length === 0)
  const error = informesError ?? empresasError ?? areasError ?? equiposError

  const handleCompanyFilterChange = useCallback(
    (companyName: string) => {
      setCompanyFilter(companyName)
      setAreaFilter("")
      setDeviceFilter("")
      if (companyName) {
        areasRefetch({ empresa: companyName })
        equiposRefetch({ empresa: companyName })
      } else {
        areasRefetch()
        equiposRefetch()
      }
    },
    [areasRefetch, equiposRefetch]
  )

  const handleAreaFilterChange = useCallback(
    (areaName: string) => {
      setAreaFilter(areaName)
      setDeviceFilter("")
      if (areaName) {
        const area = areas.find((a) => a.name === areaName)
        const empresa = area?.empresa || companyFilter
        if (area?.empresa && area.empresa !== companyFilter) {
          setCompanyFilter(area.empresa)
          areasRefetch({ empresa: area.empresa })
        }
        equiposRefetch({ empresa: empresa || undefined, area: areaName })
      } else if (companyFilter) {
        equiposRefetch({ empresa: companyFilter })
      } else {
        equiposRefetch()
      }
    },
    [companyFilter, areas, areasRefetch, equiposRefetch]
  )

  const handleDeviceFilterChange = useCallback(
    (deviceName: string) => {
      setDeviceFilter(deviceName)
      if (!deviceName) return

      const equipo = equipos.find((e) => e.name === deviceName)
      if (!equipo) return

      setCompanyFilter(equipo.empresa || "")
      setAreaFilter(equipo.area || "")
      areasRefetch({ empresa: equipo.empresa })
      equiposRefetch({ empresa: equipo.empresa, area: equipo.area })
    },
    [equipos, areasRefetch, equiposRefetch]
  )

  const handleReportCreated = useCallback(() => {
    resetToFirstPage()
    empresasRefetch()
    equiposRefetch()
    areasRefetch()
  }, [resetToFirstPage, empresasRefetch, equiposRefetch, areasRefetch])

  if (loading) return <Loader />
  if (error) return <p>Error: {error}</p>

  const toggleAside = () => {
    setIsAsideOpen((prev) => (!prev))
  }

  const handleNewReport = () => {
    setIsNewReportOpen((prev) => (!prev))
    setSearchInput("")
    setCompanyFilter("")
    setAreaFilter("")
    setDeviceFilter("")
    setYearFilter("")
    setMonthFilter("")
    areasRefetch()
    equiposRefetch()
  }

  return (
    <div className="flex min-h-full flex-1">
      <Aside isOpen={isAsideOpen} toggleAside={toggleAside}/>
      <div className="flex w-full flex-col overflow-x-hidden">
        <Header title="Reportes" toggleAside={toggleAside}/>
        <main className="relative flex flex-col  mt-18 px-5 py-10 md:mt-0 sm:px-10 max-w-400 md:pt-0">
        { isNewReportOpen ?
          <NewReportForm handleNewReport={handleNewReport} onReportCreated={handleReportCreated} />
        :
          <>
            <form
              className="w-full flex flex-col justify-between gap-4 md:flex-row md:flex-wrap"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <span className="w-full max-w-140 flex bg-(--grey-blue) px-2 py-1 rounded-sm gap-2 md:py-2">
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  aria-label="Buscar reporte"
                />
              </span>
              <div className="w-full md:w-fit flex flex-wrap gap-3 justify-baseline">
                <div className="relative w-fit">
                  <select
                    name="month"
                    id="monthSelect"
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-30 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    aria-label="Filtrar por mes"
                  >
                    <option value="">Mes</option>
                    {MONTH_OPTIONS.map((month) => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por mes"
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
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-30 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    aria-label="Filtrar por año"
                  >
                    <option value="">Año</option>
                    {YEAR_OPTIONS.map((year) => (
                      <option key={year} value={String(year)}>{year}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por año"
                    width={150}
                    height={150}
                    className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  />
                </div>
                <div className="relative w-fit">
                  <select
                    name="company"
                    id="companySelect"
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-30 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={companyFilter}
                    onChange={(e) => handleCompanyFilterChange(e.target.value)}
                    aria-label="Filtrar por empresa"
                  >
                    <option value="">Empresa</option>
                    {empresas.map(empresa => (
                      <option key={empresa.name} value={empresa.name}>{empresa.name}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por empresa"
                    width={150}
                    height={150}
                    className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  />
                </div>
                <div className="relative w-fit">
                  <select
                    name="area"
                    id="areaSelect"
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-30 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={areaFilter}
                    onChange={(e) => handleAreaFilterChange(e.target.value)}
                    aria-label="Filtrar por area"
                    >
                    <option value="">Área</option>
                    {areas.map(area => (
                      <option key={area.name} value={area.name}>{area.name}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por área"
                    width={150}
                    height={150}
                    className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  />
                </div>
                <div className="flex items-center">
                  <select
                    name="device"
                    id="deviceSelect"
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-30 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={deviceFilter}
                    onChange={(e) => handleDeviceFilterChange(e.target.value)}
                    aria-label="Filtrar por equipo"
                    >
                    <option value="">Equipo</option>
                    {equipos.map(equipo => (
                      <option key={equipo.name} value={equipo.name}>{equipo.name}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por equipo"
                    width={150}
                    height={150}
                    className="absolute right-2 top-1/2 h-5 w-auto -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  />
                </div>
                <button
                  type="button"
                  className="bg-(--light-blue) fixed rounded-4xl p-2 bottom-10 right-10 z-40 cursor-pointer md:relative md:w-fit md:mr-0 md:ml-auto md:right-0 md:bottom-0 md:px-4 md:rounded-sm md:font-semibold hover:bg-(--dark-blue) transition-all duration-200 ease-in-out md:py-2"
                  onClick={handleNewReport}
                >
                  <Image
                    src="/icons/add.svg"
                    alt="Crear reporte"
                    width={150}
                    height={150}
                    className="h-9 w-auto cursor-pointer md:hidden"
                  />
                  <p className="hidden text-white md:inline">Crear reporte</p>
                </button>
              </div>
            </form>
          <DataTable
            columns={adminColumns}
            data={informes}
            pagination={{
              page,
              totalPages,
              totalCount,
              pageSize,
              onPageChange: setPage,
              isLoading: isPaginating,
            }}
          />
        </>    
        }
        </main>
      </div>
    </div>
  )
}
