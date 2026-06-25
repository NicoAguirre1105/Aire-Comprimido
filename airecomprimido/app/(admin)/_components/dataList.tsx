import type { Empresa, Equipo, Area } from "@/app/types/database"

export default function DataList({
  options,
  placeholder,
  state,
  handleChange,
  id,
  required = false,
  inputClass,
}: {
  options: Empresa[] | Equipo[] | Area[]
  placeholder: string
  state: string
  handleChange: (name: string) => void
  id: string
  required?: boolean
  inputClass?: string
}) {
  return (
    <>
      <input
        type="search"
        required={required}
        placeholder={placeholder}
        list={id}
        value={state}
        className={inputClass ?? "border-b-[3px] border-dark-blue focus:border-light-blue focus:outline-none"}
        onChange={(e) => handleChange(e.target.value)}
      />
      <datalist id={id}>
        {options.map((opt) => (
          <option key={opt.id} value={String(opt.name)}>
            {opt.name}
          </option>
        ))}
      </datalist>
    </>
  )
}
