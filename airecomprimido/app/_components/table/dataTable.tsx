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

type TablePagination = {
  page: number
  totalPages: number
  totalCount: number
  pageSize: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

  interface DataTableProps {
  columns: Column[];
  filters?: Filter[];
  data: any[];
  pagination?: TablePagination;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

function TablePaginationControls({ pagination }: { pagination: TablePagination }) {
  const { page, totalPages, totalCount, pageSize, onPageChange, isLoading } = pagination
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  return (
    <nav
      className="flex flex-col items-center gap-3 mt-6 sm:flex-row sm:justify-between"
      aria-label="Paginación de reportes"
    >
      <p className="text-sm text-(--dark-blue)/70">
        {totalCount === 0
          ? 'Sin reportes'
          : `Mostrando ${from}–${to} de ${totalCount}`}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isLoading}
          className="px-3 py-1 rounded-sm font-semibold bg-(--grey-blue) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--light-blue) hover:text-white transition-colors cursor-pointer"
        >
          Anterior
        </button>
        <span className="text-sm font-medium min-w-28 text-center">
          Página {page} de {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || isLoading}
          className="px-3 py-1 rounded-sm font-semibold bg-(--grey-blue) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--light-blue) hover:text-white transition-colors cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </nav>
  )
}

export default function DataTable({ columns, data, pagination, onEdit, onDelete }: DataTableProps) {

  const { isMobile } = useViewport()
  const tdStyle = "py-3 px-2 text-center"

  const contentClass = pagination?.isLoading ? "opacity-50 pointer-events-none" : ""

  if (isMobile) return (
    <>
    <section className={`flex flex-col gap-5 my-7 items-center ${contentClass}`}>
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
            <button type="button" onClick={() => onEdit?.(informe)} className="bg-(--light-blue) px-1 transition-[scale] ease-in-out rounded-sm hover:scale-105 w-10">
              <Image
                src="/icons/edit_white.svg"
                alt="Editar reporte"
                width={150}
                height={150}
                className="cursor-pointer w-auto"
              />
            </button>
            <button type="button" onClick={() => onDelete?.(informe)} className="bg-(--red) px-1 transition-[scale] ease-in-out rounded-sm hover:scale-105 w-10">
              <Image
                src="/icons/delete_white.svg"
                alt="Eliminar reporte"
                width={150}
                height={150}
                className="cursor-pointer w-auto"
              />
            </button>
          </div>
        </article>
      ))}
    </section>
    {pagination && <TablePaginationControls pagination={pagination} />}
    </>
  )

  return (
    <>
    <div className={`w-full mt-10 rounded-lg border-3 border-(--dark-blue) overflow-hidden ${contentClass}`}>
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
          <tbody className="bg-white">
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
                  <div className="flex justify-center">
                    <Link
                    href={informe['filepath']}
                    target="_blank">
                      <Image
                        src="/icons/open_link_blue.svg"
                        alt="Abrir reporte"
                        width={150}
                        height={150}
                        className="hover:scale-110 cursor-pointer w-auto mx-auto"
                      />
                    </Link>
                    <button type="button" onClick={() => onEdit?.(informe)} className="cursor-pointer">
                      <Image
                        src="/icons/edit.svg"
                        alt="Editar reporte"
                        width={150}
                        height={150}
                        className="hover:scale-110 w-auto mx-auto"
                      />
                    </button>
                    <button type="button" onClick={() => onDelete?.(informe)} className="cursor-pointer">
                      <Image
                        src="/icons/delete.svg"
                        alt="Eliminar reporte"
                        width={150}
                        height={150}
                        className="hover:scale-105 w-auto mx-auto"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {pagination && <TablePaginationControls pagination={pagination} />}
    </>
  );
}