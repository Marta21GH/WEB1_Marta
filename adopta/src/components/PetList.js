import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PetCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 150px;
  text-align: center;
`;

const PetList = ({ pets, onSelectPet }) => {
  return (
    <List>
      {pets.map(pet => (
        <PetCard key={pet.id} onClick={() => onSelectPet(pet)}>
          <img src={pet.image} alt={pet.name} style={{ width: '100%' }} />
          <h3>{pet.name}</h3>
          <p>{pet.breed}</p>
        </PetCard>
      ))}
    </List>
  );
};

export default PetList;