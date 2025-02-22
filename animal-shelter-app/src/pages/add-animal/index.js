import { useState } from 'react';
import { AnimalSpecies } from '../../types/AnimalSpecies'; // Import the enum
import styles from './add-animal.module.css'; // Adjust the path if needed

export default function AddAnimal() {
  const [formData, setFormData] = useState({
    name: '',
    species: AnimalSpecies.Dog, // Default to one of the enum values
    age: '',
    picture: null,
  });
  
  const [preview, setPreview] = useState(null); // State for image preview
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const isSupportedFile = file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg');
      if (!isSupportedFile) {
        setErrorMessage('file format is not supported');
        return;
      }
      
      setFormData({ ...formData, picture: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    }
    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.species || !formData.age) {
      setErrorMessage('Name, species, and age are required');
      setConfirmationMessage('');
      return;
    }
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('species', formData.species);
    data.append('age', formData.age);
    if (formData.picture) {
      data.append('picture', formData.picture);
    }
    
    try {
      const response = await fetch('/api/animals/add-animal', {
        method: 'POST',
        body: data,
      });
      
      if (response.ok) {
        const result = await response.json();
        setConfirmationMessage('Animal added successfully');
        setErrorMessage('');
        console.log('Animal added:', result);
      } else {
        setErrorMessage('Failed to add animal');
      }
    } catch (error) {
      setErrorMessage('Failed to add animal');
    }
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
    <select
    name="species"
    value={formData.species}
    onChange={handleChange}
    className={styles.input}
    required
    >
    {Object.values(AnimalSpecies).map((species) => (
      <option key={species} value={species}>
      {species.charAt(0).toUpperCase() + species.slice(1)}
      </option>
    ))}
    </select>
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
    <label className={styles.label}>
    Picture:
    <input
    type="file"
    name="picture"
    onChange={handleFileChange}
    className={styles.input}
    accept="image/jpeg, image/png, image/gif"
    />
    </label>
    {preview && <img id="image-preview" src={preview} alt="Image Preview" className={styles.preview} />}
    <button type="submit" className={styles.button}>Add Animal</button>
    </form>
    {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
} 