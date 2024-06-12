import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Add security headers for COOP and COEP
app.use((_, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Define routes for each memory area
const memoryAreas = [
  'blink-gc',
  'cc',
  'discardable',
  'font-caches',
  'gpu',
  'leveldb',
  'malloc',
  'partitionalloc',
  'skia',
  'sqlite',
  'sync',
  'v8',
  'web-cache'
];

const memoryLeakTypes = [
  'global-variables',
  'timers',
  'closures',
  'dom-leaks',
  'circular-references',
  'accidental-references',
  'out-of-dom-references',
  'third-party-libraries'
];

app.get('/', (_: Request, res: Response) => {
  res.render('index', { memoryAreas, memoryLeakTypes });
});

memoryAreas.forEach(area => {
  app.get(`/${area}`, (_: Request, res: Response) => {
    res.render(area);
  });
});

// Define routes for memory leak demonstrations
app.get('/memory-leaks', (_: Request, res: Response) => {
  res.render('memory-leaks', { memoryLeakTypes });
});

memoryLeakTypes.forEach(type => {
  app.get(`/memory-leaks/${type}`, (_: Request, res: Response) => {
    res.render(`memory-leaks/${type}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

