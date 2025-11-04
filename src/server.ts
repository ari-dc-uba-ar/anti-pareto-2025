import express from 'express';
import cors from 'cors';
import { tableRoutes } from './routes/alumnoRoutes.js';
import { tableDefs } from './applicationStructure.js'
import { getMetadata } from './routes/metadataAPI.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/metadata', getMetadata);

// Routes
for (const tableDef of tableDefs) {
  app.use('/api/'+tableDef.name, tableRoutes(tableDef));
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});