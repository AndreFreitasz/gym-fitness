import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Slider from "react-slick"; // Importando o Slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [exerciciosPorParte, setExerciciosPorParte] = useState({});

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const response = await fetch('http://localhost:3001/exercises');
        if (!response.ok) {
          throw new Error('Response network error!');
        }
        const data = await response.json();
        console.log(data)
        setExerciciosPorParte(data); 
      } catch (error) {
        console.error('Houve um problema ao buscar os exercícios:', error);
      }
    };

    fetchExercicios();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
<>
  <Header showTabs={true} />
  <div className="w-full overflow-hidden"> {/* Adiciona overflow-hidden para evitar ultrapassar a largura da tela */}
    <div className="px-4 ml-2"> {/* Mantém o padding e a margem, mas move para dentro do container */}
      {Object.entries(exerciciosPorParte).map(([parte, data]) => (
        <div key={parte} className="mb-8 w-full"> {/* Garante que o carrossel ocupe a largura total */}
          <h2 className="text-white text-2xl font-bold mb-4">{parte}</h2>
          <Slider {...settings} className="w-full"> {/* Garante que o Slider ocupe a largura total */}
            {Array.isArray(data.exercises) ? data.exercises.map((exercicio) => (
              <div key={exercicio.id} className="p-6 bg-gray-800 m-4 rounded-lg w-full"> {/* Ajusta os itens do carrossel para ocupar a largura total */}
                <h3 className="text-white text-xl mb-2">{exercicio.name}</h3>
                <img src={exercicio.gifUrl} alt={exercicio.name} className="max-w-xs max-h-60 w-auto h-auto mx-auto" />
                <p className="text-white">Equipment: {exercicio.equipment}</p>
                <p className="text-white">Body Part: {exercicio.bodyPart}</p>
                <p className="text-white">Target: {exercicio.target}</p>
              </div>
            )) : <p className="text-white">Nenhum exercício encontrado para esta parte do corpo.</p>}
          </Slider>
        </div>
      ))}
    </div>
  </div>
</>
  );
}

export default Home;