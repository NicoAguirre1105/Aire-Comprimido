'use client'

import { useSearchParams, notFound } from 'next/navigation'
import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { useEntityByUuid } from '@/app/hooks/useEntityByUuid'
import { useInformes } from '@/app/hooks/useInformes'
import { useAreas } from '@/app/hooks/useAreas'
import { useEquipos } from '@/app/hooks/useEquipos'
import { useDebounce } from '@/app/_hooks/useDebounce'
import ReportFilters from '@/app/_components/ReportFilters'
import DataTable from '@/app/_components/table/dataTable'
import Loader from '@/app/_components/loader'
import Alert from '@/app/_components/Alert'
import { useAlert } from '@/app/hooks/useAlert'
import { companyColumns, areaColumns, deviceColumns } from '@/app/_components/table/tableProps'

const SEARCH_DEBOUNCE_MS = 400

function HistorialContent() {
  const searchParams = useSearchParams()
  const uuid = searchParams.get('uuid')

  const { entityResult, loading: entityLoading, error: entityError } = useEntityByUuid(uuid)

  const [searchInput, setSearchInput] = useState('')
  const [monthFilter, setMonthFilter] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [areaFilter, setAreaFilter] = useState('')
  const [equipoFilter, setEquipoFilter] = useState('')

  const { alert, showAlert } = useAlert()
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS)

  const { data: areas, refetch: areasRefetch, error: areasError } = useAreas()
  const { data: equipos, refetch: equiposRefetch, error: equiposError } = useEquipos()

  useEffect(() => {
    if (!entityResult) return

    if (entityResult.entityType === 'empresa') {
      areasRefetch({ empresa: entityResult.entity.name })
      equiposRefetch({ empresa: entityResult.entity.name })
    } else if (entityResult.entityType === 'area') {
      const area = entityResult.entity
      equiposRefetch({ empresa: area.empresa, area: area.name })
    }
  }, [entityResult, areasRefetch, equiposRefetch])

  const informesFilters = useMemo(() => {
    if (!entityResult) return {}

    const base = {
      search: debouncedSearch.trim() || undefined,
      year: yearFilter ? Number(yearFilter) : undefined,
      month: monthFilter ? Number(monthFilter) : undefined,
    }

    if (entityResult.entityType === 'empresa') {
      return { ...base, empresa: entityResult.entity.name, area: areaFilter || undefined, equipo: equipoFilter || undefined }
    }
    if (entityResult.entityType === 'area') {
      return { ...base, area: entityResult.entity.name, equipo: equipoFilter || undefined }
    }
    return { ...base, equipo: entityResult.entity.name }
  }, [entityResult, debouncedSearch, yearFilter, monthFilter, areaFilter, equipoFilter])

  const {
    data: informes,
    loading: informesLoading,
    isPaginating,
    error: informesError,
    page,
    setPage,
    totalCount,
    totalPages,
    pageSize,
  } = useInformes(informesFilters)

  useEffect(() => {
    const err = informesError || areasError || equiposError
    if (err) showAlert('error', err)
  }, [informesError, areasError, equiposError, showAlert])

  const handleAreaChange = useCallback(
    (areaName: string) => {
      setAreaFilter(areaName)
      setEquipoFilter('')
      if (entityResult?.entityType === 'empresa') {
        equiposRefetch({ empresa: entityResult.entity.name, area: areaName || undefined })
      }
    },
    [entityResult, equiposRefetch]
  )

  const handleEquipoChange = useCallback((equipoName: string) => {
    setEquipoFilter(equipoName)
  }, [])

  if (entityLoading) return <Loader />

  if (!uuid || !entityResult) {
    notFound()
  }

  const { entityType, entity } = entityResult

  const columns =
    entityType === 'empresa' ? companyColumns
    : entityType === 'area' ? areaColumns
    : deviceColumns

  const showFilters = {
    search: true,
    date: true,
    area: entityType === 'empresa',
    equipo: entityType === 'empresa' || entityType === 'area',
  }

  const loading = informesLoading && informes.length === 0

  return (
    <main className="flex flex-col px-5 py-16 sm:px-10 max-w-280 mx-auto min-h-screen">
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--dark-blue)">{entity.name}</h1>
        <p className="text-sm text-(--dark-blue)/60">
          {entityType === 'area' ? 'Área' : entityType === 'empresa' ? 'Empresa' : 'Equipo'}
        </p>
      </div>

      <ReportFilters
        show={showFilters}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        monthValue={monthFilter}
        onMonthChange={setMonthFilter}
        yearValue={yearFilter}
        onYearChange={setYearFilter}
        areas={areas}
        areaValue={areaFilter}
        onAreaChange={handleAreaChange}
        equipos={equipos}
        equipoValue={equipoFilter}
        onEquipoChange={handleEquipoChange}
      />

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
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
      )}
    </main>
  )
}

export default function HistorialPage() {
  return (
    <Suspense fallback={<Loader />}>
      <HistorialContent />
    </Suspense>
  )
}
