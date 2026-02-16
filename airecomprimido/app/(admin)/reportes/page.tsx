'use client'

import Aside from "../_components/aside"
import Header from "../_components/header"
import { useState } from "react"
import { adminColumns, adminFilters } from "@/app/_components/table/tableProps"
import DataTable from "@/app/_components/table/dataTable"

export default function Reportes() {

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const dataValue = [
    {
      id: 1,
      name:'Titulo 1', 
      company:'Company A',
      device:'Device A',
      model:'00001-A',
      date:'01/15/20',
      file:'/src/reporte.pdf'
    },
    {
      id: 2,
      name:'Titulo 2',
      company:'Company B',
      device:'Device A22',
      model:'00011-H',
      date:'16/5/22',
      file:'/src/reporte2.pdf'
    },
    {
      id: 3,
      name:'Titulo 3',
      company:'Company A',
      device:'Device C',
      model:'00234-D',
      date:'1/1/23',
      file:'/src/reporte3.pdf'
    }
  ]

  const toggleAside = () => {
    setIsAsideOpen((prev) => (!prev))
  }

  return (
    <div className="flex min-h-full flex-1">
      <Aside isOpen={isAsideOpen} toggleAside={toggleAside}/>
      <div className="flex w-full flex-col">
        <Header title="Reportes" toggleAside={toggleAside}/>
        <main className="h-1500 mt-18 md:mt-0">
          <DataTable columns={adminColumns} data={dataValue} />
        </main>
      </div>
    </div>
  )
}