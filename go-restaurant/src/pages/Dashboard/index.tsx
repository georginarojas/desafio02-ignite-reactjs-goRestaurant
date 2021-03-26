import React, { useState } from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { useFoods } from "../../hooks/useFoods";
import { FoodFormat } from "../../types";
import { FoodsContainer } from "./styles";

export function Dashboard() {
  const { foods, toggleAvailable, deleteFood } = useFoods();
  const [isOpen, setIsOpen] = useState(false);


  // -- Toggle Modal
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // -- Delete food
  function handleDeleteFood(food : FoodFormat) {
      deleteFood(food);
  }

  // -- Edit food
  function handleEditFood(food : FoodFormat) {
    //   console.log("FOOd **** ", food);
  }

  // -- Toggle available
  function handleToggleAvailable(food :FoodFormat, isAvailable : boolean){
    toggleAvailable({food, isAvailable});
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood 
        isOpen={isOpen}
        setIsOpen={toggleModal}
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
