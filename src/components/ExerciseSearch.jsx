
import React, { useState } from 'react';
import axios from 'axios';
import '../ExerciseSearch.css';

const ExerciseSearch = () => {
  const [bodyPart, setBodyPart] = useState('');
  const [exercises, setExercises] = useState([]);

  const bodyParts = [
    'back',
    'cardio',
    'chest',
    'lower arms',
    'lower legs',
    'neck',
    'shoulders',
    'upper arms',
    'upper legs',
    'waist',
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8daf42a14bmshf5afc417b6f26b4p127214jsne8a694a78004',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.get(url, options);
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="exercise-search">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="bodyPart" className="label">
          Select Body Part:
        </label>
        <select
          id="bodyPart"
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
          className="select"
        >
          <option value=""></option>
          {bodyParts.map((part) => (
            <option key={part} value={part}>
              {part.charAt(0).toUpperCase() + part.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="exercise-list-container">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <img src={exercise.gifUrl} alt={exercise.name} className="exercise-img" />
            <div className="exercise-details">
              <h2 className="exercise-name">{exercise.name}</h2>
              <p className="exercise-body-part">Body Part: {exercise.bodyPart}</p>
              <p className="exercise-equipment">Equipment: {exercise.equipment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSearch;