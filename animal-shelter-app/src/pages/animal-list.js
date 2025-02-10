'use client';
import Link from 'next/link';
import styles from './animal-list.module.css';

export default function AnimalList() {
  // Simulated animal data
  const animals = [
    { id: 1, name: 'Fluffy', species: 'Cat', age: 3 },
    { id: 2, name: 'Buddy', species: 'Dog', age: 5 },
  ];

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