'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState, useEffect, useCallback } from "react"
import { adminColumns } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"
import Image from "next/image"
import NewReportForm from "../_components/newReportForm"

const SEARCH_DEBOUNCE_MS = 400

export default function Reportes() {

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)

  // Estados del formulario de filtros (para envío futuro)
  const [searchInput, setSearchInput] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [deviceFilter, setDeviceFilter] = useState("")
  
  const selectStyle = 'bg-(--grey-blue) pl-3 py-1 rounded-sm w-30 font-semibold md:py-2 cursor-pointer'

  useEffect(() => {
    const timer = setTimeout(() => setAppliedSearch(searchInput), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [searchInput])

  const applyFilters = useCallback(() => {
  }, [appliedSearch, companyFilter, deviceFilter])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const dataValue = [
    {
      id: 1,
      title:'Mantenimiento mensual del equipo A correspondiente a Enero', 
      company:'Company A',
      device:'Device A',
      model:'00001-A',
      date:'01/15/20',
      file:'/src/reporte.pdf'
    },
    {
      id: 2,
      title:'Titulo 2',
      company:'Company B',
      device:'Device A22',
      model:'00011-H',
      date:'16/5/22',
      file:'/src/reporte2.pdf'
    },
    {
      id: 3,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 4,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 5,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 6,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 7,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 8,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 9,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 10,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 11,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 12,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    },
    {
      id: 13,
      title:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    }
  ]
  const companyList = [
    {id: 1, label: "Company A"},
    {id: 2, label: "Company B"},
    {id: 3, label: "Company CCCCCCCCCC"},
    {id: 4, label: "Company D"}]
  
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
                <select
                  name="company"
                  id="companySelect"
                  className={selectStyle}
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  aria-label="Filtrar por empresa"
                >
                  <option value="">Empresa</option>
                  {companyList.map(comp => (
                    <option key={comp.id} value={String(comp.id)}>{comp.label}</option>
                  ))}
                </select>
                <select
                  name="device"
                  id="deviceSelect"
                  className={selectStyle}
                  value={deviceFilter}
                  onChange={(e) => setDeviceFilter(e.target.value)}
                  aria-label="Filtrar por equipo"
                >
                  <option value="">Equipo</option>
                  {deviceList.map(device => (
                    <option key={device.id} value={String(device.id)}>{device.label}</option>
                  ))}
                </select>
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
          <DataTable columns={adminColumns} data={dataValue} />
        </>    
        }
        </main>
      </div>
    </div>
  )}