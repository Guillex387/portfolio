import express from 'express';
import cors from 'cors';
import programsRouter from './routes/programs';
import programRouter from './routes/program';

// Config
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/programs', programsRouter);
app.use('/program', programRouter);
app.get('/', (req, res) =>
  res.send('Welcome to the Guillex387 portfolio API 👨‍💻')
);

export default app;
