import type { Empresa, Equipo, Area } from "@/app/types/database"
import { Dispatch, SetStateAction } from "react"

export default function DataList({
  options,
  placeholder,
  state,
  handleChange,
  id,
  required=false,
}:{
  options: Empresa[] | Equipo[] | Area[],
  placeholder: string,
  state: string,
  handleChange: (name: string) => void,
  id: string,
  required?:boolean
}) {



  return (
    <>
      <input type="search" required={required} placeholder={placeholder} list={id} value={state} className="border-b-[3px] border-dark-blue focus:border-light-blue" onChange={(e) =>  {
              handleChange(e.target.value)
            }}/>
      <datalist id={id}>
        {
          options.map(opt => (
            <option key={opt.id} value={String(opt.name)}
            >{opt.name}</option>
          ))
        }
      </datalist>
    </>
  )

}