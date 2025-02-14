'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './animal-list.module.css';

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Fetch animal data from the API
    fetch('/api/animals/list-animals')
      .then(response => response.json())
      .then(data => setAnimals(data))
      .catch(error => console.error('Error fetching animal data:', error));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Animal List</h1>
      <ul className={styles.list}>
        {animals.map((animal) => (
          <li key={animal.id} className={`${styles.listItem} animal-item`}>
            <Link href={`/animal-profile?id=${animal.id}`} className={styles.link}>
              {animal.name} - {animal.species}, {animal.age} years old
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 