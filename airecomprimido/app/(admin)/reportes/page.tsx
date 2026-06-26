'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState, useCallback, useMemo, useEffect } from "react"
import { adminColumns } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"
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
    <div className="flex min-h-full flex-1 bg-slate-50">
      <Aside isOpen={isAsideOpen} toggleAside={toggleAside} />
      <div className="flex w-full flex-col overflow-x-hidden">
        <Header title="Reportes" toggleAside={toggleAside} />

        <main className="flex flex-col mt-[4.5rem] px-4 py-6 md:mt-0 sm:px-8 max-w-[100rem] md:pt-6 gap-5">
          {alert && <Alert type={alert.type} message={alert.message} />}

          {/* Delete confirmation modal */}
          {deletingInforme && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full flex flex-col gap-4 shadow-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-dark-blue">Eliminar reporte</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      ¿Estás seguro de que deseas eliminar{' '}
                      <span className="font-medium text-dark-blue">&quot;{deletingInforme.titulo}&quot;</span>?
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setDeletingInforme(null)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-50 cursor-pointer transition-colors duration-150"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-red text-white hover:opacity-85 disabled:opacity-50 cursor-pointer transition-opacity duration-150 flex items-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <Spinner size="sm" variant="ring" />
                        Eliminando...
                      </>
                    ) : 'Eliminar'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {isNewReportOpen ? (
            <NewReportForm handleNewReport={handleNewReport} onReportCreated={handleReportCreated} />
          ) : editingInforme ? (
            <EditReportForm
              informe={editingInforme}
              onClose={() => setEditingInforme(null)}
              onReportUpdated={() => {
                setEditingInforme(null)
                handleReportUpdated()
                showAlert('success', 'El reporte ha sido actualizado correctamente.')
              }}
            />
          ) : (
            <>
              {/* Toolbar */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Filtros</h2>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-light-blue hover:bg-dark-blue text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                    onClick={handleNewReport}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nuevo reporte
                  </button>
                </div>
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
              </div>

              {/* Results count */}
              {!informesLoading && (
                <p className="text-sm text-slate-500 px-1">
                  {totalCount} {totalCount === 1 ? 'reporte encontrado' : 'reportes encontrados'}
                </p>
              )}

              {/* Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
