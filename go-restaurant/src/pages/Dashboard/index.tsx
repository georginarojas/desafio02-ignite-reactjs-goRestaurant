import React from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { useFoods } from "../../hooks/useFoods";
import { FoodFormat } from "../../types";
import { FoodsContainer } from "./styles";

export function Dashboard() {
  const { foods, toggleAvailable, deleteFood } = useFoods();
//   console.log("DASHBOARD ", foods);
  function toggleModal() {}

  function handleDeleteFood(food : FoodFormat) {
      deleteFood(food);
  }

  function handleEditFood(food : FoodFormat) {
    //   console.log("FOOd **** ", food);
  }

  function handleToggleAvailable(food :FoodFormat, isAvailable : boolean){
    toggleAvailable({food, isAvailable});
  }

  return (
    <>
      <Header openModal={toggleModal} />
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
