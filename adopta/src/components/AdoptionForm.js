// src/components/AdoptionForm.js
import React from 'react';

const AdoptionForm = ({ pet, onBack }) => {
  if (!pet) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Formulario enviado!');
  };

  return (
    <div className="adoption-form-container">
      <button onClick={onBack} className="back-button">Volver</button>
      <h2>Formulario de Adopción para {pet.name}</h2>
      <form onSubmit={handleSubmit} className="adoption-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input type="tel" required />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" required />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default AdoptionForm;
