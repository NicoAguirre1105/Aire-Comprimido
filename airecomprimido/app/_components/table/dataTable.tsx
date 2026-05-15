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
    <section className="flex flex-col gap-5 my-7">
      {data.map((informe) => (
        <article key={informe.id} className="flex flex-col bg-(--grey-blue) p-5 rounded-sm sm:px-10">
          <h2 className="font-bold text-xl">{informe['titulo']}</h2>
          <p className="my-1 font-light">{informe['descripcion']}</p>
          {columns.flatMap((col) => {
            if (col.key !== 'titulo' && col.key !== 'filepath' && col.key !== 'descripcion') {
              return (
              <div key={col.key} className="flex gap-2 pl-2">
                <h3 className="font-medium">{col.label}:</h3>
                <p className="font-light">{informe[col.key] == null ? 'N/A' : informe[col.key]}</p>
              </div>
            )}
          })}
          <Link className="text-(--light-blue) underline font-semibold text-right" href={informe['filepath']} target="_blank">Abrir reporte ↗</Link>
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
                  className={`py-1 ${idx == 0 ? "md:sticky md:left-0 md:z-10 md:bg-(--grey-blue) md:shadow-[2px_0_5px_rgba(0,0,0,0.1)]" : ""}`} 
                  key={col.key}
                >
                  {col.label}
                </th>
              ))}
              <th key="actions"></th>
            </tr>
          </thead>
          <tbody>
            {data.map(informe => (
              <tr key={informe.id} className="border-b-3">
                {columns.flatMap((col, idx) => {
                  if (col.key !== 'filepath') {
                    return (
                      <td 
                        className={`${tdStyle} ${idx == 0 ? "sticky left-0 z-10 bg-white max-w-40 shadow-[2px_0_5px_rgba(0,0,0,0.1)]" : ""}`} 
                        key={col.key}
                      >
                        {informe[col.key] == null ? 'N/A' : informe[col.key]}
                      </td>
                    )
                  }
                })}
                <td className={tdStyle}><Link className="text-(--light-blue) underline font-semibold text-right" href={informe['filepath']} target="_blank">Abrir reporte ↗</Link></td>
                <td className={`${tdStyle}`}>
                  <div className="flex justify-end">
                    <Image
                      src="/icons/edit.svg"
                      alt="Editicon"
                      width={150}
                      height={150}
                      className="hover:scale-110 cursor-pointer w-auto"
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="Delete icon"
                      width={150}
                      height={150}
                      className="hover:scale-105 cursor-pointer w-auto"
                    />
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