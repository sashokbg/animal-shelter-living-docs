import { promises as fs } from 'fs';
import path from 'path';

const animalsFilePath = path.join(process.cwd(), 'data', 'animals.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(animalsFilePath, 'utf8');
      const animals = JSON.parse(data);
      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch animals' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 