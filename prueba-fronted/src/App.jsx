import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

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

    fetch('/api/get-companies/') // El prefijo '/api' activa el proxy en Vite
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCompanies(data);
          console.log(data);
        } else {
          console.error("Datos no válidos:", data);
        }
      })      
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  
  


  return (
    <div className="header-container">
      
      
      <header className="header">
        <img
          src="https://api.test.interactiva.net.co/media/logo.png"
          alt="Logo"
          className="logo"
        />
        <nav>
          <ul className="nav-list">
            <li><button>Inicio</button></li>
            <li><button>Nosotros</button></li>
            <li><button>Viajes</button></li>
            <li><button>Blogs</button></li>
            <li><button>Contacto</button></li>
          </ul>
        </nav>
      </header>


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
