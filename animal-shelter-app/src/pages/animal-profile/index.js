'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './animal-profile.module.css';

export default function AnimalProfile() {
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch animal details from the server
      fetch(`/api/animals/get-animal?id=${id}`)
        .then(response => response.json())
        .then(data => setAnimal(data))
        .catch(error => console.error('Error fetching animal data:', error));
    }
  }, [id]);

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
      {animal.pictureUrl && <img src={animal.pictureUrl} alt={`${animal.name}'s profile`} className={styles.profileImage} />}
      <p className={`${styles.text} notes`}><strong>Notes:</strong> {animal.notes}</p>
    </div>
  );
} 