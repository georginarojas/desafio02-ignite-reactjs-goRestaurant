import React from "react";
import { Container } from "./styles";
import { FoodFormat } from "../../types";
import { FiEdit3, FiTrash } from "react-icons/fi";

interface FoodProps {
  food: FoodFormat;
  handleDelete: (food: FoodFormat) => void;
  handleEditFood: (food: FoodFormat) => void;
  setToggleAvailable: (food:FoodFormat, isAvailable: boolean) => void;
}

export function Food({ food, handleDelete, handleEditFood, setToggleAvailable }: FoodProps) {
  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>

      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>

      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEditFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? "Disponível" : "Indiponível"}</p>
          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={() => setToggleAvailable(food, food.available)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span  className="slider"/>
          </label>
        </div>
      </section>
    </Container>
  );
}
