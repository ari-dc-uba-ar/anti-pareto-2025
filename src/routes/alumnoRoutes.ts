import { Router } from 'express';
import {
    getAlumnos,
    getAlumno,
    createAlumno,
    updateAlumno,
    deleteAlumno
} from '../controllers/alumnoController.js';

import { TableDef } from '../applicationStructure.js';

export function routes(tableDef:TableDef) {
    const pkPath = tableDef.pk.map(column => `/:${column}`).join('')
    const router = Router();
    router.get('/', getAlumnos);
    router.get(pkPath, getAlumno);
    router.post('/', createAlumno);
    router.put(pkPath, updateAlumno);
    router.delete(pkPath, deleteAlumno);
    return router
}
