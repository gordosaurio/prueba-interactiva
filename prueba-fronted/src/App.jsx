import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [travels, setTravels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

      fetch('/api/get-travels/')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setTravels(data))
        .catch((error) => console.error('Error fetching travels:', error));
  }, []);
  
  const handleNext = () => {
    if (currentIndex < companies[0].feed_instagram.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Cuando llegue al final, vuelve al primer índice
    }
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/churroceballos/", "_blank");
  };

  return (
    <>
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

      <section className="about-us-section">
        <h1>Nosotros</h1>
        {companies[0] && companies[0].description && (
          <p className="companies-description">{companies[0].description}</p>
        )}

        <div className="carousel-container">
          <div className="carousel-left">
            <img
              src="/src/assets/instagram-logo.png" // Ruta de la imagen en la carpeta de assets
              alt="Instagram Logo"
              className="carousel-logo"
              onClick={openInstagram}
            />
          </div>

          <div className="instagram-carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 220}px)` }}
            >
              {companies[0]?.feed_instagram?.map((image, index) => (
                <div key={image.id} className="carousel-item">
                  <img
                    src={`https://api.test.interactiva.net.co${image.image}`}
                    alt={`Feed Instagram ${image.id}`}
                    className="carousel-image"
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-button right"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="carousel-container">
          <div className="instagram-carousel">
            {companies[0] && companies[0].instagram_account && (
              <div className="instagram-account-container">
                  {companies[0].instagram_account}
              </div>
            )}
          </div>
        </div>
      </section>




      <section className="travels-section">
        <h1>EXPERIENCIAS GRUPALES</h1>
        <div className="travels-container">
          {travels.map((travel) => (
            <div key={travel.id} className="travel-card">
              <img
                src={`https://api.test.interactiva.net.co${travel.image_cover}`}
                alt={travel.title}
                className="travel-image"
              />
              <div className="status-line" style={{ backgroundColor: travel.status.color, color: "white", fontSize: "0.9rem" }}>
                {travel.status.title}
              </div>
              <div className="travel-info">
                <h1>{travel.title}</h1>
                

                <h2>
                  {new Date(travel.date_start).getMonth() === new Date(travel.date_end).getMonth() &&
                  new Date(travel.date_start).getFullYear() === new Date(travel.date_end).getFullYear()
                    ? `${new Date(travel.date_start).toLocaleDateString('es-CO', { day: '2-digit' })} - ${new Date(travel.date_end).toLocaleDateString('es-CO', { day: '2-digit' })} de ${new Date(travel.date_start).toLocaleDateString('es-CO', { month: 'long' })} | DESDE 
                      ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(travel.cost)}`
                    : `${new Date(travel.date_start).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit' })} - 
                      ${new Date(travel.date_end).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit' })} | 
                      DESDE ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(travel.cost)}`}
                </h2>


                <p className="travel-category">{travel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>





    </>
  )
}

export default App
