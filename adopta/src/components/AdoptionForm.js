import React from 'react';

const AdoptionForm = () => {
  return (
    <form>
      <h2>Formulario de Adopción</h2>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default AdoptionForm;
