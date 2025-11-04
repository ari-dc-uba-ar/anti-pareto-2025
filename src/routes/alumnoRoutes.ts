import { Router } from 'express';
import { controllers } from '../controllers/alumnoController.js';

import { TableDef } from '../applicationStructure.js';

export function tableRoutes(tableDef:TableDef) {
    const pkPath = tableDef.pk.map(column => `/:${column}`).join('')
    const router = Router();
    const {
        getAlumnos,
        getAlumno,
        createAlumno,
        updateAlumno,
        deleteAlumno
    } = controllers(tableDef);
    router.get('/', getAlumnos);
    router.get(pkPath, getAlumno);
    router.post('/', createAlumno);
    router.put(pkPath, updateAlumno);
    router.delete(pkPath, deleteAlumno);
    return router
}
