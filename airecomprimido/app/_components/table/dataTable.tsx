import Link from "next/link";
import { useViewport } from "@/app/_context/ViewportContext";
import Image from "next/image";

type Column = {
  key: string,
  label: string
}

type Filter = {
  key: string,
  label: string
}

interface DataTableProps {
  columns: Column[];
  filters?: Filter[];
  data: any[];
}

export default function DataTable({ columns, data }: DataTableProps) {

  const { isMobile } = useViewport()
  const tdStyle = "py-3 px-2 text-center"

  if (isMobile) return (
    <section className="flex flex-col gap-5 my-7 items-center">
      {data.map((informe) => (
        <article key={informe.id} className="flex flex-col bg-(--grey-blue) p-5 rounded-sm sm:px-10 w-full max-w-100">
          <h2 className="font-bold text-xl">{informe['titulo']}</h2>
          <p className="my-1 font-light">{informe['descripcion']}</p>
          {columns.flatMap((col) => {
            if (col.key !== 'titulo' && col.key !== 'filepath' && col.key !== 'descripcion') {
              if(informe[col.key] === 0 || informe[col.key] === null || informe[col.key] === "") return
              return (
              <div key={col.key} className="flex gap-2 pl-2">
                <h3 className="font-medium">{col.label}:</h3>
                <p className="font-light">{informe[col.key]}</p>
              </div>
            )}
          })}
          <div className="flex gap-2 mt-4 w-full justify-center">
            <Link className="text-white bg-(--dark-blue) w-full py-1 font-semibold text-center transition-[scale] ease-in-out rounded-sm hover:scale-102 max-w-75" href={informe['filepath']} target="_blank">Abrir</Link>
            {/* <button className="bg-(--light-blue) px-1 transition-[scale] ease-in-out rounded-sm hover:scale-105 w-10">
              <Image
                src="/icons/edit_white.svg"
                alt="Editicon"
                width={150}
                height={150}
                className="cursor-pointer w-auto"
              />
            </button>
            <button className="bg-(--red) px-1 transition-[scale] ease-in-out rounded-sm hover:scale-105 w-10">
              <Image
                src="/icons/delete_white.svg"
                alt="Editicon"
                width={150}
                height={150}
                className="cursor-pointer w-auto"
              />
            </button> */}
          </div>
        </article>
      ))}
    </section>
  )

  return (
    <div className="w-full mt-10 rounded-lg overflow-hidden">
      <div className="w-full overflow-x-auto relative">
        <table className="min-w-200 w-full">
          <thead className="bg-(--grey-blue)">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  className={`px-4 py-3 ${idx == 0 ? "sticky left-0 z-10 max-w-40 border-r-3 bg-(--grey-blue)" : ""}`} 
                  key={col.key}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(informe => (
              <tr key={informe.id} className="border-b-3">
                {columns.flatMap((col, idx) => {
                  if (col.key !== 'filepath') {
                    return (
                      <td 
                        className={`${tdStyle} ${idx == 0 ? "sticky left-0 z-10 bg-white max-w-40 border-r-3" : ""}`} 
                        key={col.key}
                      >
                        {informe[col.key] === null || informe[col.key] === 0 || informe[col.key] === "" ? '—' : informe[col.key]}
                      </td>
                    )
                  }
                })}
                <td className={`${tdStyle}`}>
                  <div className="flex">
                    <Image
                      src="/icons/open_link_blue.svg"
                      alt="Abrir reporte"
                      width={150}
                      height={150}
                      className="hover:scale-110 cursor-pointer w-auto mx-auto"
                    />
                    {/* <Image
                      src="/icons/edit.svg"
                      alt="Editicon"
                      width={150}
                      height={150}
                      className="hover:scale-110 cursor-pointer w-auto mx-auto"
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="Delete icon"
                      width={150}
                      height={150}
                      className="hover:scale-105 cursor-pointer w-auto mx-auto"
                    /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}