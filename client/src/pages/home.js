import React, {useState, useEffect} from "react";
import Header from "../components/header";
import Slider from "react-slick"; // Importando o Slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const response = await fetch('http://localhost:3001/exercises');
        if (!response.ok) {
          throw new Error('Response network error!');
        }
        const data = await response.json();
        console.log(data)
        setExercicios(data);
      } catch (error) {
        console.error('Houve um problema ao buscar os exercícios:', error);
      }
    };

    fetchExercicios();
  }, []);

  // Organizando os exercícios por parte do corpo
  const exerciciosPorParte = exercicios.reduce((acc, exercicio) => {
    if (!acc[exercicio.bodyPart]) {
      acc[exercicio.bodyPart] = [];
    }
    acc[exercicio.bodyPart].push(exercicio);
    return acc;
  }, {});

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
    <Header showTabs={true} />
    {/* <div className="exercicios-container">
      {Object.entries(exerciciosPorParte).map(([parte, exercicios]) => (
        <div key={parte}>
          <h2 className="text-white">{parte}</h2>
          <Slider {...settings}>
            {exercicios.map((exercicio) => (
              <div key={exercicio.id} className="exercicio">
                <h3 className="text-white">{exercicio.name}</h3>
                <img src={exercicio.gifUrl} alt={exercicio.name} />
                <p className="text-white">Equipment: {exercicio.equipment}</p>
                <p className="text-white">Body Part: {exercicio.bodyPart}</p>
                <p className="text-white">Target: {exercicio.target}</p>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div> */}
  </>
  );
}

export default Home;