import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import loadingGif from "../loading.gif";

const Detail = () => {
  // Состояния 
  const [error, setError] = useState(null);
  const { id, type } = useParams(); 
  const [item, setItem] = useState(null); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => { // Эффект применяется при изменении типа или идентификатора
    const loaddata = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${type}/${id}`);
        console.log("Данные загружены:", response.data);
        setItem({ ...response.data, type });
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setLoading(false);
        setError(error); 
      }
    };

    loaddata();
  }, [id, type]);

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

  let content = []; // Переменная для отображения деталей

  if (item.type === "sensors") {
    content = (
      <div>
        <h1>Информация о датчике</h1>
        <h2>{item.name}</h2>
        <p>Показания: {item.sensor}</p>
      </div>
    );
  } else if (item.type === "rules") {
    content = (
      <div>
        <h1>Информация о правиле</h1>
        <h2>{item.name}</h2>
        <ul>
          {item.rule.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  return <div className="maindiv">{content}</div>;
};

export default Detail;
