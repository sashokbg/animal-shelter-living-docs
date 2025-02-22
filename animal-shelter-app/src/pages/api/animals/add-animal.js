import { promises as fs } from 'fs';
import path from 'path';
import multer from 'multer';

const animalsFilePath = path.join(process.cwd(), 'data', 'animals.json');
const upload = multer({ dest: 'public/uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('picture')(req, {}, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }

      try {
        const { name, species, age } = req.body;
        const pictureUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const data = await fs.readFile(animalsFilePath, 'utf8');
        let animals = [];
        if (data) {
          animals = JSON.parse(data);
        }

        const newAnimal = {
          id: animals.length + 1,
          name,
          species,
          age,
          pictureUrl,
        };

        animals.push(newAnimal);

        await fs.writeFile(animalsFilePath, JSON.stringify(animals, null, 2));

        res.status(201).json(newAnimal);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add animal' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 