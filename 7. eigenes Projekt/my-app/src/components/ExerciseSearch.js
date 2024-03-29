import React, { useState, useEffect } from 'react';
import '../styles/style.css';

function ExerciseSearch() {
  const [data, setData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(false);

  useEffect(() => {

  }, []);

  const handleSearch = event => {
    const searchTerm = event.target.value;
    if (!searchTerm) {
      return;
    }

    fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + searchTerm, {
      headers: {
        'X-Api-Key': '0OYDidzDI/O9S2U8efeDSA==vfqX55xOhxT87DFp'
      }
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error));
  };

  const openPopup = exercise => {
    setSelectedExercise(exercise);
  };

  const closePopup = () => {
    setSelectedExercise(false);
  };

  return (
    <div className='row'>
      <div className='col-4'>
        <div className='select'>
          <select className='custom-select' onChange={handleSearch} required>
            <option selected disabled>Select Muscle...</option>
            <option value='abdominals'>Abdominals</option>
            <option value='abductors'>Abductors</option>json
            <option value='adductors'>Adductors</option>
            <option value='biceps'>Biceps</option>
            <option value='calves'>Calves</option>
            <option value='chest'>Chest</option>
            <option value='forearms'>Forearms</option>
            <option value='glutes'>Glutes</option>
            <option value='hamstrings'>Hamstrings</option>
            <option value='lats'>Lats</option>
            <option value='lower_back'>Lower Back</option>
            <option value='middle_back'>Middle Back</option>
            <option value='neck'>Neck</option>
            <option value='quadriceps'>Quadriceps</option>
            <option value='traps'>Traps</option>
            <option value='triceps'>Triceps</option>
          </select>
          <span className='select-icon'></span>
        </div>

        <div className='options'>
          {data.length > 0 ? (
            <div>
              {data.map(exercise => (
                <p key={exercise.id}>
                  <button className='popupbtnOpen' onClick={() => openPopup(exercise)}>{exercise.name}</button>
                </p>
              ))}
            </div>
          ) : (
            <p>Wähle einen Muskel!</p>

          )}
        </div>
      </div>
      <div className='col-7'>
        {selectedExercise && (
          <div className='popup'>
            <div className='popup-content'>
              <h2>{selectedExercise.name}</h2>
              <div className='row'>
                <div className='col-10'>
                  <p><b>Typ:</b> {selectedExercise.type}</p>
                  <p><b>Muskel:</b> {selectedExercise.muscle}</p>
                  <p><b>Schwierigkeit:</b> {selectedExercise.difficulty}</p>
                  <p><b>Ausrüstung:</b> {selectedExercise.equipment}</p>
                </div>
                <div className='col-1'>
                  <button className='popupbtnClose' onClick={closePopup}>Schließen</button>
                </div>
              </div>
              <p className='Anleitung'><b>Anleitung:</b><br />{selectedExercise.instructions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseSearch;