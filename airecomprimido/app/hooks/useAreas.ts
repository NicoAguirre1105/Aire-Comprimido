'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import type { Area } from '@/app/types/database'

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Error desconocido'
}

type RefetchOptions = {
  empresa?: string
  area?: string
}


export function useAreas() {
  const [data, setData] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async (options?:RefetchOptions) => {
    try {
      setLoading(true)
      setError(null)
  
      let query = supabase
        .from('areas')
        .select('*')
        .order('name', { ascending: true })
  
      if (options?.empresa) {
        query = query.eq('empresa', options.empresa)
      }

      if (options?.area) {
        query = query.eq('name', options.area)
      }
  
      const { data: rows, error: supabaseError } = await query
  
      if (supabaseError) throw supabaseError
  
      setData((rows as Area[]) ?? [])
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
