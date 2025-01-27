import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/get-categories/') // El prefijo '/api' activa el proxy en Vite
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  
  


  return (
    <div className="header-container">
      <div className="background-image">
        <div className='text-header'>
          <h1>
            THE TRAVEL
          </h1>
          <h2> EXPERIENCE</h2>
        </div>
      </div>
        <div className="cards-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="card-border"
            >
              <div className="card"
                style={{
                  backgroundImage: `url(https://api.test.interactiva.net.co${category.image_banner})`,
                }}
              >
                <div className="card-text">{category.name}</div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default App
