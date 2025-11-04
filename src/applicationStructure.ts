export type TableName = 'alumnos' | 'materias' | 'etc...'
export type ColumnName = 'numero_libreta' | 'apellido' | 'etc...'
export type ColumnType = 'text' | 'int' | 'date' | 'etc...'

export interface ColumnDef {
    name: ColumnName
    type: ColumnType
    title?: string
    description?: string
}

export interface TableDef {
    name: TableName
    columns: ColumnDef[]
    pk: [ColumnName]
    title?: string
}

export const tableDefs: TableDef[] = [
    {
        name: 'alumnos',
        columns: [
            { name: 'numero_libreta'    as ColumnName, type: 'text'   , title:'L.U.'        },
            { name: 'apellido'          as ColumnName, type: 'text'                         },
            { name: 'nombre'            as ColumnName, type: 'text'                         },
            { name: 'fecha_inscripcion' as ColumnName, type: 'date'   , title: 'inscripción'},
            { name: 'edad_inscripcion'  as ColumnName, type: 'int'    , title: 'edad'       , 
                description: 'edad a la fecha de incripción'               
            },
        ],
        pk: ['numero_libreta' as ColumnName]
    },
    {
        name: 'materias',
        columns: [
            { name: 'cod_materia'       as ColumnName, type: 'text'   , title:'cod.mat.'    },
            { name: 'nombre_materia'    as ColumnName, type: 'text'   , title:'materia'     },
        ],
        pk: ['cod_materia' as ColumnName]
    }
]