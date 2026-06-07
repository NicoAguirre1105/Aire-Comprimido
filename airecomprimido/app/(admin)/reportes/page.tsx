'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState, useCallback, useMemo, useEffect } from "react"
import { adminColumns } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"
import Image from "next/image"
import NewReportForm from "../_components/newReportForm"
import Loader from "@/app/_components/loader"
import Alert from "@/app/_components/Alert"
import ReportFilters from "@/app/_components/ReportFilters"
import { useAlert } from "@/app/hooks/useAlert"
import { useInformes } from "@/app/hooks/useInformes"
import { useEmpresas } from "@/app/hooks/useEmpresas"
import { useAreas } from "@/app/hooks/useAreas"
import { useEquipos } from "@/app/hooks/useEquipos"
import { useDebounce } from "@/app/_hooks/useDebounce"

const SEARCH_DEBOUNCE_MS = 400

export default function Reportes() {

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [areaFilter, setAreaFilter] = useState("")
  const [deviceFilter, setDeviceFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [monthFilter, setMonthFilter] = useState("")
  const { alert, showAlert } = useAlert()

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
  useEffect(() => {
    if (informesError) {
      showAlert('error', informesError)
    } else if (empresasError) {
      showAlert('error', empresasError)
    } else if (areasError) {
      showAlert('error', areasError)
    } else if (equiposError) {
      showAlert('error', equiposError)
    }
  }, [informesError, empresasError, areasError, equiposError, showAlert])

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
        {alert && <Alert type={alert.type} message={alert.message} />}
        { isNewReportOpen ?
          <NewReportForm handleNewReport={handleNewReport} onReportCreated={handleReportCreated} />
        :
          <>
            <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start">
              <ReportFilters
                show={{ search: true, date: true, empresa: true, area: true, equipo: true }}
                searchValue={searchInput}
                onSearchChange={setSearchInput}
                monthValue={monthFilter}
                onMonthChange={setMonthFilter}
                yearValue={yearFilter}
                onYearChange={setYearFilter}
                empresas={empresas}
                empresaValue={companyFilter}
                onEmpresaChange={handleCompanyFilterChange}
                areas={areas}
                areaValue={areaFilter}
                onAreaChange={handleAreaFilterChange}
                equipos={equipos}
                equipoValue={deviceFilter}
                onEquipoChange={handleDeviceFilterChange}
              />
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
