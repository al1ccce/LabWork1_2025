import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const { type } = useParams(); // Получаем тип из URL
  const nameRef = useRef(null); // Ref для названия
  const dataRef = useRef(null); // Ref для данных объекта

  // Функция добавления объекта
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const data = dataRef.current.value.trim();
    // Проверка на заполненность полей для ввода
    if (!name || !data) {
      alert("Заполните все поля!");
      return;
    }
    // Формируем данные для отправки
    let newItem;
    if (type === "sensors") {
      newItem = {
        id: String(Math.floor(Math.random() * 10000)),
        name: name,
        sensor: data,
      };
    } else if (type === "rules") {
      newItem = {
        id: String(Math.floor(Math.random() * 10000)),
        name: name,
        rule: data.split("\n"),
      };
    }

    axios
      .post(`http://localhost:5000/${type}`, JSON.stringify(newItem), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Добавлен объект:", response.data);
        alert("Элемент успешно добавлен!"); 
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Ошибка создания:", error);
        alert("Произошла ошибка, повторите попытку."); 
      });
  };

  return (
    <div className="add">
      <h2>Добавление нового {type === "sensors" ? "датчика" : "правила"}</h2>
      <form onSubmit={handleSubmit}>
        <p>Название:</p>
        <textarea className="name" ref={nameRef} required />
        <br />
        <p>Данные:</p>
        <textarea className="extra" ref={dataRef} required />
        <p></p>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default Form;