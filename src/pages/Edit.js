import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [error, setError] = useState(null);
  const { id, type } = useParams(); // Получаем ID и тип из URL
  const navigate = useNavigate();
  const valueRef = useRef(null); // Ref для поля ввода
  const [data, setData] = useState({}); 

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${type}/${id}`);
        setData(response.data); 

        // Заполняем поле для ввода
        if (valueRef.current) {
          if (type === "sensors") {
            valueRef.current.value = response.data.sensor || ""; // Для датчиков
          } else if (type === "rules") {
            valueRef.current.value = response.data.rule?.join("\n") || ""; // Преобразование массива в строку
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setError(error); 
      }
    };

    loadItem(); 
  }, [id, type]); 

  // Функция обновления данных
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valueRef.current.value.trim()) {
      alert("Введите новое значение!");
      return;
    }

    let updatedData;
    if (type === "sensors") {
      updatedData = { ...data, sensor: valueRef.current.value }; 
    } else if (type === "rules") {
      updatedData = { ...data, rule: valueRef.current.value.split("\n") }; 
    }
    // Отправка данных на сервер
    axios
      .put(`http://localhost:5000/${type}/${id}`, JSON.stringify(updatedData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Обновленные данные:", response.data);
        navigate("/"); // Переход на главную страницу
      })
      .catch((error) => console.error("Ошибка обновления данных:", error));
  };
  // Вывод статуса ошибки
  if (error){
    return (
      <div className="loading">
        <p>Ошибка {error.status}</p>
      </div>
    )
  }

  return (
    <div className="edit">
      <h2>Редактирование</h2>
      <form onSubmit={handleSubmit}>
        <p>Введите новые данные:</p>
        <textarea ref={valueRef} rows={5} required />
        <p></p>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default Edit;