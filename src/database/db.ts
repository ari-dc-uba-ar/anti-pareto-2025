import { Pool } from 'pg';

export const pool = new Pool(
  /*{
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
}*/);

export interface Alumno {
  numero_libreta: string;
  apellido: string;
  nombre: string;
  fecha_inscripcion: string;
  edad_inscripcion: number;
}