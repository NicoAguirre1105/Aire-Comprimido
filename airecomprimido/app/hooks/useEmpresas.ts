'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import type { Empresa } from '@/app/types/database'

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Error desconocido'
}

type RefetchOptions = {
  empresa?: string
}

export function useEmpresas() {
  const [data, setData] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async (options?:RefetchOptions) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
      .from('empresas')
      .select('*')
      .order('name', { ascending: true })
  
      if (options?.empresa) {
        query = query.eq('name', options.empresa)
      }

      const { data: rows, error: supabaseError } = await query

      setData((rows as Empresa[]) ?? [])
    } catch (err: unknown) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
