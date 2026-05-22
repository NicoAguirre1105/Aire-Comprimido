export type Informe = {
  id: number
  created_at: string
  titulo: string
  fecha: string
  descripcion: string
  empresa: string
  area: string
  equipo: string
  conteo_horas: number
  filepath: string
}

export type Empresa = {
  id: number
  created_at: string
  name: string
  public_uuid: string
}

export type Equipo = {
  id: number
  created_at: string
  name: string
  modelo: string
  empresa: string
  area: string
  public_uuid: string
}

export type Area = {
  id: number
  created_at: string
  name: string
  empresa: string
  public_uuid: string
}
