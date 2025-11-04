import { Router } from 'express';
import {
  getAlumnos,
  getAlumno,
  createAlumno,
  updateAlumno,
  deleteAlumno
} from '../controllers/alumnoController.js';

const router = Router();

router.get('/', getAlumnos);
router.get('/:numero_libreta', getAlumno);
router.post('/', createAlumno);
router.put('/:numero_libreta', updateAlumno);
router.delete('/:numero_libreta', deleteAlumno);

export default router;