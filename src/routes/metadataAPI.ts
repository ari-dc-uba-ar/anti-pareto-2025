import { Request, Response } from 'express';
import { TableDef, tableDefs } from '../applicationStructure';

type PublicTableDef = TableDef;

function onlyPublicTableMetadata(tableDef:TableDef[]): PublicTableDef[]{
    return tableDef
}

export const getMetadata = async (_req: Request, res: Response): Promise<void> => {
    res.json({tables:onlyPublicTableMetadata(tableDefs)});
};
