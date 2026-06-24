'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState, useCallback, useMemo, useEffect } from "react"
import { adminColumns } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Spinner } from "@/app/_components/Spinner"

const NewReportForm = dynamic(() => import("../_components/newReportForm"), {
  loading: () => <div className="flex justify-center py-20"><Spinner size="lg" variant="ring" /></div>,
  ssr: false,
})
const EditReportForm = dynamic(() => import("../_components/editReportForm"), {
  loading: () => <div className="flex justify-center py-20"><Spinner size="lg" variant="ring" /></div>,
  ssr: false,
})
import Loader from "@/app/_components/loader"
import Alert from "@/app/_components/Alert"
import ReportFilters from "@/app/_components/ReportFilters"
import { useAlert } from "@/app/hooks/useAlert"
import { useInformes } from "@/app/hooks/useInformes"
import { useEmpresas } from "@/app/hooks/useEmpresas"
import { useAreas } from "@/app/hooks/useAreas"
import { useEquipos } from "@/app/hooks/useEquipos"
import { useDebounce } from "@/app/_hooks/useDebounce"
import { supabase } from "@/app/utils/supabaseClient"
import { getSupabaseErrorMessage } from "@/app/utils/supabaseErrors"
import type { Informe } from "@/app/types/database"

const SEARCH_DEBOUNCE_MS = 400

export default function Reportes() {

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)
  const [editingInforme, setEditingInforme] = useState<Informe | null>(null)
  const [deletingInforme, setDeletingInforme] = useState<Informe | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
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

  const handleReportUpdated = useCallback(() => {
    resetToFirstPage()
    empresasRefetch()
    equiposRefetch()
    areasRefetch()
  }, [resetToFirstPage, empresasRefetch, equiposRefetch, areasRefetch])

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingInforme) return
    setIsDeleting(true)
    try {
      const url = deletingInforme.filepath
      const marker = '/storage/v1/object/public/Informes/'
      const idx = url.indexOf(marker)

      if (idx === -1) {
        showAlert('error', 'No se pudo determinar la ruta del archivo. Eliminación cancelada.')
        return
      }

      const filePath = url.slice(idx + marker.length)
      const { error: storageError } = await supabase.storage.from('Informes').remove([filePath])

      if (storageError) {
        showAlert('error', getSupabaseErrorMessage(storageError, 'No se pudo eliminar el archivo del reporte. Intente nuevamente.'))
        return
      }

      const { error: dbError } = await supabase.from('informes').delete().eq('id', deletingInforme.id)
      if (dbError) {
        showAlert('error', getSupabaseErrorMessage(dbError, 'No se pudo eliminar el reporte.'))
      } else {
        showAlert('success', 'El reporte ha sido eliminado.')
        resetToFirstPage()
      }
    } catch (err) {
      showAlert('error', getSupabaseErrorMessage(err, 'No se pudo eliminar el reporte.'))
    } finally {
      setIsDeleting(false)
      setDeletingInforme(null)
    }
  }, [deletingInforme, resetToFirstPage, showAlert])

  const toggleAside = useCallback(() => {
    setIsAsideOpen((prev) => !prev)
  }, [])

  const handleNewReport = useCallback(() => {
    setIsNewReportOpen((prev) => !prev)
    setSearchInput("")
    setCompanyFilter("")
    setAreaFilter("")
    setDeviceFilter("")
    setYearFilter("")
    setMonthFilter("")
    areasRefetch()
    equiposRefetch()
  }, [areasRefetch, equiposRefetch])

  if (loading) return <Loader />

  return (
    <div className="flex min-h-full flex-1">
      <Aside isOpen={isAsideOpen} toggleAside={toggleAside}/>
      <div className="flex w-full flex-col overflow-x-hidden">
        <Header title="Reportes" toggleAside={toggleAside}/>
        <main className="relative flex flex-col  mt-[4.5rem] px-5 py-10 md:mt-0 sm:px-10 max-w-[100rem] md:pt-0">
        {alert && <Alert type={alert.type} message={alert.message} />}
        {deletingInforme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
            <div className="bg-white rounded-md p-6 max-w-sm w-full flex flex-col gap-4 shadow-xl">
              <h3 className="text-lg font-semibold text-dark-blue">Eliminar reporte</h3>
              <p className="text-sm text-gray-600">
                ¿Estás seguro de que deseas eliminar el reporte{' '}
                <strong>&quot;{deletingInforme.titulo}&quot;</strong>? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeletingInforme(null)}
                  className="border border-gray-400 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteConfirm}
                  className="bg-brand-red text-white px-4 py-2 rounded text-sm hover:opacity-85 disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}
        { isNewReportOpen ?
          <NewReportForm handleNewReport={handleNewReport} onReportCreated={handleReportCreated} />
        : editingInforme ?
          <EditReportForm
            informe={editingInforme}
            onClose={() => setEditingInforme(null)}
            onReportUpdated={() => {
              setEditingInforme(null)
              handleReportUpdated()
              showAlert('success', 'El reporte ha sido actualizado correctamente.')
            }}
          />
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
                className="bg-light-blue fixed rounded-[2rem] p-2 bottom-10 right-10 z-40 cursor-pointer md:relative md:w-fit md:mr-0 md:ml-auto md:right-0 md:bottom-0 md:px-4 md:rounded-sm md:font-semibold hover:bg-dark-blue transition-all duration-200 ease-in-out md:py-2"
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
            onEdit={(item) => setEditingInforme(item)}
            onDelete={(item) => setDeletingInforme(item)}
          />
        </>
        }
        </main>
      </div>
    </div>
  )
}
