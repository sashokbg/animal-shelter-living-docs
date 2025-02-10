import { useState } from 'react';
import styles from './add-animal.module.css'; // Adjust the path if needed

export default function AddAnimal() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.species || !formData.age) {
      setErrorMessage('All fields are required');
      setConfirmationMessage('');
      return;
    }
    console.log('Animal added:', formData);
    setConfirmationMessage('Animal added successfully');
    setErrorMessage('');
    // Here you would typically send the form data to your server
  };

  return (
    <div className={styles.container}>
      <h1>Add a New Animal</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Species:
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <button type="submit" className={styles.button}>Add Animal</button>
      </form>
      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
} 