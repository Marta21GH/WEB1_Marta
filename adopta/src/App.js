import React, { useState } from 'react';
import FilterForm from './components/FilterForm';
import PetList from './components/PetList';
import AdoptionForm from './components/AdoptionForm';
import { dogBreeds, catBreeds } from './constants/breeds';
import './styles.css';

const allPets  = [
  { id: 1, name: 'Fido', type: 'dog', breed: 'Labrador', age: 'Adulto', size: 'Grande', image: 'images/labradorFido.jpeg' },
  { id: 2, name: 'Whiskers', type: 'cat', breed: 'Siamés', age: 'Cachorro', size: 'Pequeño', image: 'images/siamesWhiskers.jpg' },
  { id: 3, name: 'Bella', type: 'dog', breed: 'Beagle', age: 'Adulto', size: 'Mediano', image: 'images/bellaBeagle.jpg' },
  { id: 4, name: 'Simba', type: 'cat', breed: 'Persa', age: 'Adulto', size: 'Mediano', image: 'images/simbaPersa.jpg' },
  { id: 5, name: 'Rocky', type: 'dog', breed: 'Bulldog', age: 'Cachorro', size: 'Mediano', image: 'images/rockyBulldog.jpg' },
  { id: 6, name: 'Luna', type: 'cat', breed: 'Bengalí', age: 'Adulto', size: 'Pequeño', image: 'images/lunaBengali.jpg' },
  { id: 7, name: 'Charlie', type: 'dog', breed: 'Poodle', age: 'Adulto', size: 'Pequeño', image: 'images/charliePoodle.jpg' },
  { id: 8, name: 'Max', type: 'dog', breed: 'Golden Retriever', age: 'Cachorro', size: 'Grande', image: 'images/maxGolden.jpg' },
  { id: 9, name: 'Milo', type: 'cat', breed: 'Maine Coon', age: 'Adulto', size: 'Grande', image: 'images/miloMaine.jpg' },
  { id: 10, name: 'Daisy', type: 'dog', breed: 'Shih Tzu', age: 'Adulto', size: 'Pequeño', image: 'images/daisyShih.jpg' },
  { id: 11, name: 'Oscar', type: 'cat', breed: 'Ragdoll', age: 'Cachorro', size: 'Mediano', image: 'images/oscarRagdoll.jpg' },
  { id: 12, name: 'Buddy', type: 'dog', breed: 'Dachshund', age: 'Adulto', size: 'Pequeño', image: 'images/buddyDachshund.jpeg' },
  { id: 13, name: 'Tiger', type: 'cat', breed: 'Sphynx', age: 'Adulto', size: 'Pequeño', image: 'images/tigerSphynx.jpg' },
  { id: 14, name: 'Coco', type: 'dog', breed: 'Chihuahua', age: 'Cachorro', size: 'Pequeño', image: 'images/cocoChihuahua.jpg' },
  { id: 15, name: 'Lilly', type: 'cat', breed: 'Scottish Fold', age: 'Cachorro', size: 'Pequeño', image: 'images/lillyScottish.jpg' },
  { id: 16, name: 'Buster', type: 'dog', breed: 'Boxer', age: 'Adulto', size: 'Grande', image: 'images/busterBoxer.jpeg' },
  { id: 17, name: 'Nala', type: 'cat', breed: 'Birmano', age: 'Cachorro', size: 'Mediano', image: 'images/nalaBirmano.jpg' },
  { id: 18, name: 'Rex', type: 'dog', breed: 'Rottweiler', age: 'Adulto', size: 'Grande', image: 'images/rexRottweiler.jpg' },
  { id: 19, name: 'Shadow', type: 'cat', breed: 'Azul Ruso', age: 'Adulto', size: 'Mediano', image: 'images/shadowAzul.jpeg' },
  { id: 20, name: 'Ginger', type: 'dog', breed: 'Cocker Spaniel', age: 'Cachorro', size: 'Mediano', image: 'images/gingerCocker.jpg' },

  //{ id: 1, name: '', type: '', breed: '', age: '', size: '', image: '' },
  // Agrega más mascotas según sea necesario
];

const App = () => {
  const [pets, setPets] = useState(allPets);
  const [filters, setFilters] = useState({
    type: '',
    breed: '',
    age: '',
    size: ''
  });
  const [selectedPet, setSelectedPet] = useState(null);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filterPets = () => {
    let filteredPets = allPets;

    if (filters.type) {
      filteredPets = filteredPets.filter(pet => pet.type === filters.type);
    }

    if (filters.breed) {
      filteredPets = filteredPets.filter(pet => pet.breed === filters.breed);
    }

    if (filters.age) {
      filteredPets = filteredPets.filter(pet => pet.age === filters.age);
    }

    if (filters.size) {
      filteredPets = filteredPets.filter(pet => pet.size === filters.size);
    }

    setPets(filteredPets);
  };

  const getBreedOptions = () => {
    if (filters.type === 'dog') {
      return dogBreeds.map(breed => <option key={breed} value={breed}>{breed}</option>);
    } else if (filters.type === 'cat') {
      return catBreeds.map(breed => <option key={breed} value={breed}>{breed}</option>);
    }
    return null;
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
  };

  const handleBack = () => {
    setSelectedPet(null);
  };

  return (
    <div className="container">
      <h1 className="title">¡Adopta un amigo peludo!</h1>
      {selectedPet ? (
        <AdoptionForm pet={selectedPet} onBack={handleBack} />
      ) : (
        <>
          <div className="filters">
            <label>
              Tipo:
              <select name="type" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
              </select>
            </label>
            <label>
              Raza:
              <select name="breed" onChange={handleFilterChange}>
                <option value="">Todas</option>
                {getBreedOptions()}
              </select>
            </label>
            <label>
              Edad:
              <select name="age" onChange={handleFilterChange}>
                <option value="">Todas</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Adulto">Adulto</option>
              </select>
            </label>
            <label>
              Tamaño:
              <select name="size" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </label>
            <button onClick={filterPets}>Aplicar Filtros</button>
          </div>
          <PetList pets={pets} onSelectPet={handleSelectPet} />
        </>
      )}
    </div>
  );
};

export default App;