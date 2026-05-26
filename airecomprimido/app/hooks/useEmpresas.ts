'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import { getSupabaseErrorMessage } from '@/app/utils/supabaseErrors'
import type { Empresa } from '@/app/types/database'

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

      if (supabaseError) throw supabaseError

      setData((rows as Empresa[]) ?? [])
    } catch (err: unknown) {
      setError(getSupabaseErrorMessage(err, 'No se pudieron cargar las empresas.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
