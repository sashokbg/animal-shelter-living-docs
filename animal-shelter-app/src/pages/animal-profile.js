'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './animal-profile.module.css';

export default function AnimalProfile() {
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Simulate fetching animal data
      fetchAnimalData(id);
    }
  }, [id]);

  const fetchAnimalData = (animalId) => {
    // Simulate an API call to fetch animal data
    const animalData = {
      1: { name: 'Fluffy', species: 'Cat', age: 3, notes: 'Very friendly' },
      2: { name: 'Buddy', species: 'Dog', age: 5, notes: 'Loves to play' },
    };

    if (animalData[animalId]) {
      setAnimal(animalData[animalId]);
    } else {
      setError('This page could not be found.');
    }
  };

  if (error) {
    return (
      <div>
        <h1 className="next-error-h1" style={{ display: 'inline-block', margin: '0 20px 0 0', padding: '0 23px 0 0', fontSize: '24px', fontWeight: '500', verticalAlign: 'top', lineHeight: '49px' }}>404</h1>
        <div style={{ display: 'inline-block' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '400', lineHeight: '49px', margin: '0' }}>{error}</h2>
        </div>
      </div>
    );
  }

  if (!animal) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles.container} animal-profile`}>
      <h1 className={styles.title}>{animal.name}'s Profile</h1>
      <p className={`${styles.text} name`}><strong>Name:</strong> {animal.name}</p>
      <p className={`${styles.text} species`}><strong>Species:</strong> {animal.species}</p>
      <p className={`${styles.text} age`}><strong>Age:</strong> {animal.age}</p>
      <p className={`${styles.text} notes`}><strong>Notes:</strong> {animal.notes}</p>
    </div>
  );
} 