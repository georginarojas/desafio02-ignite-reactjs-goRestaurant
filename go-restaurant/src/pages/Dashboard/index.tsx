import React, { useState } from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { useFoods } from "../../hooks/useFoods";
import { FoodFormat } from "../../types";
import { FoodsContainer } from "./styles";

export function Dashboard() {
  const { foods, toggleAvailable, deleteFood, addFood } = useFoods();
  const [isOpen, setIsOpen] = useState(false);

  // -- Toggle Modal
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // -- Add food
  function handleAddFood(food: FoodFormat) {
    addFood(food);
  }

  // -- Delete food
  function handleDeleteFood(foodId: number) {
    deleteFood(foodId);
  }

  // -- Edit food
  function handleEditFood(food: FoodFormat) {
    //   console.log("FOOd **** ", food);
  }

  // -- Toggle available
  function handleToggleAvailable(food: FoodFormat, isAvailable: boolean) {
    toggleAvailable({ food, isAvailable });
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <FoodsContainer>
        {foods.map((food) => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
            handleToggleAvailable={handleToggleAvailable}
          />
        ))}
      </FoodsContainer>
    </>
  );
}
