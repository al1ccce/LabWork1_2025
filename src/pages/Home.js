import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loadingGif from "../loading.gif";

const Home = () => {
  // Состояния для динамического изменения UI
  const [error, setError] = useState(null);
  const [rulesData, setRulesData] = useState([]); 
  const [sensorsData, setSensorsData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => { // Загрузка данных только при монтировании
    const loadData = async () => {
      try {
        const rules = await axios.get("http://localhost:5000/rules");
        const sensors = await axios.get("http://localhost:5000/sensors");
        console.log("Данные загружены:", rules.data, sensors.data);
        setRulesData(rules.data); // Обновляем состояние правил
        setSensorsData(sensors.data); // Обновляем состояние датчиков
        setLoading(false);
      } catch (error) {
        console.error("Ошибка запроса:", error);
        setLoading(false);
        setError(error); 
      }
    };

    loadData();
  }, []); 
  // Функция для удаления правила
  function deleteRule(id) {
    axios.delete(`http://localhost:5000/rules/${id}`)
      .then(() => {
        console.log(`Правило ${id} удалено`);
        setRulesData((prevRules) => prevRules.filter((item) => item.id !== id)); 
      })
      .catch((error) => console.error("Ошибка удаления:", error));
  };

  // Функция для удаления датчика
  function deleteSensor(id) {
    axios.delete(`http://localhost:5000/sensors/${id}`)
      .then(() => {
        console.log(`Датчик ${id} удален`);
        setSensorsData((prevSensors) => prevSensors.filter((item) => item.id !== id)); 
      })
      .catch((error) => console.error("Ошибка удаления:", error));
  };

  if (loading) {
    return <div className="loading">
      <p>Загрузка...</p>
      <br />
      <img src={loadingGif} alt="дратути" />
      </div>;
  }

  if (error){
    return (
      <div className="loading">
        <p>Ошибка {error.status}</p>
      </div>
    )
  }

  return (
    <div className="maindiv">
      <div>
        <h2>Показания датчиков</h2>
        <ul>
          {sensorsData.map((item) => (
            <li className="list" key={item.id}>
              <Link to={`/detail/sensors/${item.id}`}>{item.name}</Link>
              <div className="button-group">
                <button onClick={() => deleteSensor(item.id)}>
                  Удалить
                </button>
                <Link to={`/edit/sensors/${item.id}`}>
                  <button>Изменить</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/add/sensors">
          <button className="homebutt">Добавить Датчик</button>
        </Link>
      </div>

      <div>
        <h2>Памятка для экипажа</h2>
        <ul>
          {rulesData.map((item) => (
            <li className="list" key={item.id}>
              <Link to={`/detail/rules/${item.id}`}>{item.name}</Link>
              <div className="button-group">
                <button
                  onClick={() => deleteRule(item.id)}
                  style={{  }}
                >
                  Удалить
                </button>
                <Link to={`/edit/rules/${item.id}`}>
                  <button style={{  }}>Изменить</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/add/rules">
          <button className="homebutt">Добавить правило</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;