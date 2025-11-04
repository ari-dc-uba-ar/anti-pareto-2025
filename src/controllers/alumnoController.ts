import { Request, Response } from 'express';
import { pool, Alumno } from '../database/db.js';

export const getAlumnos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY apellido, nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAlumno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { numero_libreta } = req.params;
    const result = await pool.query('SELECT * FROM alumnos WHERE numero_libreta = $1', [numero_libreta]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Alumno no encontrado' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createAlumno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { numero_libreta, apellido, nombre, fecha_inscripcion, edad_inscripcion }: Alumno = req.body;
    
    const result = await pool.query(
      'INSERT INTO alumnos (numero_libreta, apellido, nombre, fecha_inscripcion, edad_inscripcion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [numero_libreta, apellido, nombre, fecha_inscripcion, edad_inscripcion]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateAlumno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { numero_libreta } = req.params;
    const { apellido, nombre, fecha_inscripcion, edad_inscripcion }: Omit<Alumno, 'numero_libreta'> = req.body;
    
    const result = await pool.query(
      'UPDATE alumnos SET apellido = $1, nombre = $2, fecha_inscripcion = $3, edad_inscripcion = $4 WHERE numero_libreta = $5 RETURNING *',
      [apellido, nombre, fecha_inscripcion, edad_inscripcion, numero_libreta]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Alumno no encontrado' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteAlumno = async (req: Request, res: Response): Promise<void> => {
  try {
    const { numero_libreta } = req.params;
    
    const result = await pool.query(
      'DELETE FROM alumnos WHERE numero_libreta = $1 RETURNING *',
      [numero_libreta]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Alumno no encontrado' });
      return;
    }
    
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};