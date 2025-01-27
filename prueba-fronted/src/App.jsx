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
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  
  


  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div className="cards-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card"
            style={{
              backgroundImage: `url(https://api.test.interactiva.net.co${category.image_banner})`,
            }}
          >
            <div className="card-text">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
