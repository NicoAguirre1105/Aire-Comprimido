'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import type { Informe } from '@/app/types/database'

export const INFORMES_PAGE_SIZE = 10

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Error desconocido'
}

export function useInformes() {
  const [data, setData] = useState<Informe[]>([])
  const [loading, setLoading] = useState(true)
  const [isPaginating, setIsPaginating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const hasLoadedRef = useRef(false)

  const totalPages = Math.max(1, Math.ceil(totalCount / INFORMES_PAGE_SIZE))

  const fetchPage = useCallback(async (pageNumber: number) => {
    try {
      setError(null)
      if (!hasLoadedRef.current) {
        setLoading(true)
      } else {
        setIsPaginating(true)
      }

      const from = (pageNumber - 1) * INFORMES_PAGE_SIZE
      const to = from + INFORMES_PAGE_SIZE - 1

      const { data: rows, error: supabaseError, count } = await supabase
        .from('informes')
        .select('*', { count: 'exact' })
        .order('fecha', { ascending: false })
        .range(from, to)

      if (supabaseError) throw supabaseError

      setData((rows as Informe[]) ?? [])
      setTotalCount(count ?? 0)
      hasLoadedRef.current = true
    } catch (err: unknown) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
      setIsPaginating(false)
    }
  }, [])

  useEffect(() => {
    fetchPage(page)
  }, [page, fetchPage])

  const refetch = useCallback(() => {
    fetchPage(page)
  }, [fetchPage, page])

  const resetToFirstPage = useCallback(() => {
    if (page !== 1) {
      setPage(1)
    } else {
      fetchPage(1)
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
