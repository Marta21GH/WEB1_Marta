import React, { useState } from 'react';
import styled from 'styled-components';
import { dogBreeds, catBreeds } from '../constants/breeds';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterForm = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: '',
    breed: '',
    age: '',
    size: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const getBreedsOptions = () => {
    if (filters.type === 'dog') {
      return dogBreeds;
    } else if (filters.type === 'cat') {
      return catBreeds;
    } else {
      return [];
    }
  };

  return (
    <Form>
      <Label>
        Tipo:
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
        </select>
      </Label>
      <Label>
        Raza:
        <select name="breed" value={filters.breed} onChange={handleChange}>
          <option value="">Todas</option>
          {getBreedsOptions().map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </Label>
      <Label>
        Edad:
        <select name="age" value={filters.age} onChange={handleChange}>
          <option value="">Todas</option>
          <option value="puppy">Cachorro</option>
          <option value="adult">Adulto</option>
          <option value="senior">Mayor</option>
        </select>
      </Label>
      <Label>
        Tamaño:
        <select name="size" value={filters.size} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
      </Label>
    </Form>
  );
};

export default FilterForm;