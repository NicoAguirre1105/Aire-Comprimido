'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState, useEffect, useCallback } from "react"
import { adminColumns } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"
import Image from "next/image"
import NewReportForm from "../_components/newReportForm"
import { supabase } from "@/app/utils/supabaseClient"
import Loader from "@/app/_components/loader"
import Equipos from "@/app/(public)/equipos/page"

const SEARCH_DEBOUNCE_MS = 400

type Informe = {
  id: number,
  created_at: string,
  titulo: string,
  fecha: string,
  descripcion: string,
  empresa: string,
  area: string,
  equipo_id: number,
  equipo: string,
  conteo_horas: number,
  filepath: string;
}

type Empresa = {
  id: number,
  created_at: string,
  empresa: string,
  public_uuid: string
}

type Equipo = {
  id: number,
  created_at: string,
  equipo: string,
  modelo: string,
  empresa: string,
  area: string,
  public_uuid: string
}

type Area = {
  id: number,
  created_at: string,
  area: string,
  empresa: string,
  public_uuid: string
}

export default function Reportes() {

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)

  const [informes, setInformes] = useState<Informe[]>([])
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados del formulario de filtros (para envío futuro)
  const [searchInput, setSearchInput] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [deviceFilter, setDeviceFilter] = useState("")
  
  const selectStyle = 'bg-(--grey-blue) pl-3 py-1 rounded-sm w-30 font-semibold md:py-2 cursor-pointer'

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        setLoading(true)
        
        // Realizamos la consulta a la tabla 'informes'
        const { data, error: supabaseError } = await supabase
          .from('informes')
          .select('*')
          .order('fecha', { ascending: false })

        if (supabaseError) throw supabaseError

        if (data) {
          setInformes(data as Informe[])
        }
        console.log(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInformes()
  }, [])

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true)
        
        // Realizamos la consulta a la tabla 'informes'
        const { data, error: supabaseError } = await supabase
          .from('empresas')
          .select('*')
          .order('empresa', { ascending: true })

        if (supabaseError) throw supabaseError

        if (data) {
          setEmpresas(data as Empresa[])
        }
        console.log(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEmpresas()
  }, [])

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true)
        
        // Realizamos la consulta a la tabla 'informes'
        const { data, error: supabaseError } = await supabase
          .from('areas')
          .select('*')
          .order('area', { ascending: true })

        if (supabaseError) throw supabaseError

        if (data) {
          setAreas(data as Area[])
        }
        console.log(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAreas()
  }, [])

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        setLoading(true)
        
        // Realizamos la consulta a la tabla 'informes'
        const { data, error: supabaseError } = await supabase
          .from('equipos')
          .select('*')
          .order('equipo', { ascending: true })

        if (supabaseError) throw supabaseError

        if (data) {
          setEquipos(data as Equipo[])
        }
        console.log(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEquipos()
  }, [])

  if (loading) return <Loader />
  if (error) return <p>Error: {error}</p>

  // useEffect(() => {
  //   const timer = setTimeout(() => setAppliedSearch(searchInput), SEARCH_DEBOUNCE_MS)
  //   return () => clearTimeout(timer)
  // }, [searchInput])

  // const applyFilters = useCallback(() => {
  // }, [appliedSearch, companyFilter, deviceFilter])

  // useEffect(() => {
  //   applyFilters()
  // }, [applyFilters])

  
  const deviceList = [
    {id: 1, label: "Device A"},
    {id: 2, label: "Device 33333333333"},
    {id: 3, label: "Device C4"},
    {id: 4, label: "Device D55"}]
  
  const toggleAside = () => {
    setIsAsideOpen((prev) => (!prev))
  }

  const handleNewReport = () => {
    setIsNewReportOpen((prev) => (!prev))
    setSearchInput("")
    setAppliedSearch("")
    setCompanyFilter("")
    setDeviceFilter("")
  }

  return (
    <div className="flex min-h-full flex-1">
      <Aside isOpen={isAsideOpen} toggleAside={toggleAside}/>
      <div className="flex w-full flex-col overflow-x-hidden">
        <Header title="Reportes" toggleAside={toggleAside}/>
        <main className="relative flex flex-col mt-18 px-5 py-10 md:mt-0 sm:px-10 max-w-400 md:pt-0">
        { isNewReportOpen ?
          <NewReportForm handleNewReport={handleNewReport}/>
        :
          <>
            <form
              className="w-full flex flex-col justify-between gap-4 md:flex-row md:flex-wrap"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <span className="w-full max-w-150 flex bg-(--grey-blue) px-2 py-1 rounded-sm gap-2 md:py-2">
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
              <div className="w-full md:w-fit flex gap-3">
                <div className="flex items-center">
                  <select
                    name="company"
                    id="companySelect"
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-35 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    aria-label="Filtrar por empresa"
                  >
                    <option value="">Empresa</option>
                    {empresas.map(empresa => (
                      <option key={empresa.id} value={String(empresa.id)}>{empresa.empresa}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por empresa"
                    width={150}
                    height={150}
                    className="h-5 w-auto -translate-x-7 pointer-events-none"
                  />
                </div>
                <div className="flex items-center">
                  <select
                    name="device"
                    id="deviceSelect"
                    className="bg-(--grey-blue) pl-3 py-1 appearance-none w-35 rounded-sm font-semibold md:py-2 cursor-pointer focus:outline-(--light-blue) pr-7"
                    value={deviceFilter}
                    onChange={(e) => setDeviceFilter(e.target.value)}
                    aria-label="Filtrar por equipo"
                    >
                    <option value="">Equipo</option>
                    {equipos.map(equipo => (
                      <option key={equipo.id} value={String(equipo.id)}>{equipo.equipo}</option>
                    ))}
                  </select>
                  <Image
                    src="/icons/arrow_drop_down_blue.svg"
                    alt="Filtro por empresa"
                    width={150}
                    height={150}
                    className="h-5 w-auto -translate-x-7 pointer-events-none"
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
          <DataTable columns={adminColumns} data={informes} />
        </>    
        }
        </main>
      </div>
    </div>
  )}