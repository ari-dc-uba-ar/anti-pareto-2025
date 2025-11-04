import express from 'express';
import cors from 'cors';
import { routes } from './routes/alumnoRoutes.js';
import { tableDefs } from './applicationStructure.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
for (const tableDef of tableDefs) {
  app.use('/api/'+tableDef.name, routes(tableDef));
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});