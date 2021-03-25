import React from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { useFoods } from "../../hooks/useFoods";
import { FoodFormat } from "../../types";
import { FoodsContainer } from "./styles";

export function Dashboard() {
  const { foods } = useFoods();
  console.log("DASHBOARD ", foods);
  function toggleModal() {}

  function handleDeleteFood() {}

  function handleEditFood(food : FoodFormat) {
    //   console.log("FOOd **** ", food);
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
          />
        ))}
      </FoodsContainer>
    </>
  );
}
