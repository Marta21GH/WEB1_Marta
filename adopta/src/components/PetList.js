import React from 'react';

const PetList = ({ pets, onSelectPet }) => {
  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-item" onClick={() => onSelectPet(pet)}>
          <img src={pet.image} alt={pet.name} />
          <h3>{pet.name}</h3>
          <p><strong>Tipo:</strong> {pet.type}</p>
          <p><strong>Raza:</strong> {pet.breed}</p>
          <p><strong>Edad:</strong> {pet.age}</p>
          <p><strong>Tamaño:</strong> {pet.size}</p>
        </div>
      ))}
    </div>
  );
};

export default PetList;
