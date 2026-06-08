'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import { getSupabaseErrorMessage } from '@/app/utils/supabaseErrors'
import type { Informe } from '@/app/types/database'

export const INFORMES_PAGE_SIZE = 10
/** Años hacia atrás para filtro de mes sin año (debe coincidir con YEAR_OPTIONS en reportes) */
export const INFORMES_YEAR_SPAN = 5

export type InformesFilters = {
  search?: string
  empresa?: string
  area?: string
  equipo?: string
  year?: number
  month?: number
}

function getFilterYearRange(): number[] {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: INFORMES_YEAR_SPAN }, (_, i) => currentYear - i)
}

function escapeIlike(value: string): string {
  return value.replace(/[%_\\]/g, '\\$&')
}

function getMonthDateRange(year: number, month: number): { from: string; to: string } {
  const mm = String(month).padStart(2, '0')
  const lastDay = new Date(year, month, 0).getDate()
  const dd = String(lastDay).padStart(2, '0')
  return { from: `${year}-${mm}-01`, to: `${year}-${mm}-${dd}` }
}

export function useInformes(filters: InformesFilters = {}) {
  const [data, setData] = useState<Informe[]>([])
  const [loading, setLoading] = useState(true)
  const [isPaginating, setIsPaginating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const hasLoadedRef = useRef(false)
  const filtersRef = useRef(filters)

  filtersRef.current = filters

  const totalPages = Math.max(1, Math.ceil(totalCount / INFORMES_PAGE_SIZE))

  const fetchPage = useCallback(async (pageNumber: number, activeFilters: InformesFilters) => {
    try {
      setError(null)
      if (!hasLoadedRef.current) {
        setLoading(true)
      } else {
        setIsPaginating(true)
      }

      const from = (pageNumber - 1) * INFORMES_PAGE_SIZE
      const to = from + INFORMES_PAGE_SIZE - 1

      let query = supabase
        .from('informes')
        .select('*', { count: 'exact' })

      if (activeFilters.empresa) {
        query = query.eq('empresa', activeFilters.empresa)
      }
      if (activeFilters.area) {
        query = query.eq('area', activeFilters.area)
      }
      if (activeFilters.equipo) {
        query = query.eq('equipo', activeFilters.equipo)
      }
      if (activeFilters.year && activeFilters.month) {
        const { from: dateFrom, to: dateTo } = getMonthDateRange(activeFilters.year, activeFilters.month)
        query = query.gte('fecha', dateFrom).lte('fecha', dateTo)
      } else if (activeFilters.year) {
        query = query
          .gte('fecha', `${activeFilters.year}-01-01`)
          .lte('fecha', `${activeFilters.year}-12-31`)
      } else if (activeFilters.month) {
        const orParts = getFilterYearRange().map((year) => {
          const { from: dateFrom, to: dateTo } = getMonthDateRange(year, activeFilters.month!)
          return `and(fecha.gte.${dateFrom},fecha.lte.${dateTo})`
        })
        query = query.or(orParts.join(','))
      }
      const search = activeFilters.search?.trim()
      if (search) {
        const term = `%${escapeIlike(search)}%`
        query = query.or(
          `titulo.ilike.${term},descripcion.ilike.${term},empresa.ilike.${term},area.ilike.${term},equipo.ilike.${term}`
        )
      }

      const { data: rows, error: supabaseError, count } = await query
        .order('fecha', { ascending: false })
        .range(from, to)

      if (supabaseError) throw supabaseError

      setData((rows as Informe[]) ?? [])
      setTotalCount(count ?? 0)
      hasLoadedRef.current = true
    } catch (err: unknown) {
      setError(getSupabaseErrorMessage(err, 'No se pudieron cargar los reportes.'))
    } finally {
      setLoading(false)
      setIsPaginating(false)
    }
  }, [])

  const filtersKey = JSON.stringify(filters)
  const prevFiltersKeyRef = useRef(filtersKey)

  useEffect(() => {
    const filtersChanged = prevFiltersKeyRef.current !== filtersKey
    prevFiltersKeyRef.current = filtersKey

    const pageToFetch = filtersChanged ? 1 : page
    if (filtersChanged && page !== 1) {
      setPage(1)
    }
    fetchPage(pageToFetch, filtersRef.current)
  }, [page, filtersKey, fetchPage])

  const refetch = useCallback(() => {
    fetchPage(page, filtersRef.current)
  }, [fetchPage, page])

  const resetToFirstPage = useCallback(() => {
    if (page !== 1) {
      setPage(1)
    } else {
      fetchPage(1, filtersRef.current)
    }
  }, [page, fetchPage])

  const setPageSafe = useCallback((newPage: number) => {
    const maxPage = Math.max(1, Math.ceil(totalCount / INFORMES_PAGE_SIZE))
    setPage(Math.min(Math.max(1, newPage), maxPage))
  }, [totalCount])

  return {
    data,
    loading,
    isPaginating,
    error,
    refetch,
    resetToFirstPage,
    page,
    setPage: setPageSafe,
    totalCount,
    totalPages,
    pageSize: INFORMES_PAGE_SIZE,
  }
}
