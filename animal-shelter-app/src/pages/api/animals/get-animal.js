import { promises as fs } from 'fs';
import path from 'path';

const animalsFilePath = path.join(process.cwd(), 'data', 'animals.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const data = await fs.readFile(animalsFilePath, 'utf8');
      const animals = JSON.parse(data);

      const animal = animals.find((animal) => animal.id === parseInt(id, 10));

      if (animal) {
        res.status(200).json(animal);
      } else {
        res.status(404).json({ error: 'Animal not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch animal' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 