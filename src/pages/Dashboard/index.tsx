import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { useFoods } from "../../hooks/useFoods";
import { RootState } from "../../state-management/store";
import { FoodFormat } from "../../types";
import { FoodsContainer } from "./styles";

const  Dashboard = (): JSX.Element =>  {
  const {
    toggleAvailable,
    // foods,
    deleteFood,
    addFood,
    updateFood,
  } = useFoods();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodFormat>({} as FoodFormat);
  let foods = useSelector((state: RootState) => state.foods.data) as FoodFormat[]

  // -- Toggle Modal Add Food
  function toggleModalAdd() {
    setIsOpenAdd(!isOpenAdd);
  }

  // -- Toggle Modal Edit Food
  function toggleModalEdit() {
    setIsOpenEdit(!isOpenEdit);
  }

  // -- Add food
  function handleAddFood(food: FoodFormat) {
    addFood(food);
  }

  // -- Delete food
  function handleDeleteFood(foodId: number) {
    deleteFood(foodId);
  }

  // -- Update food
  function handleUpdateFood(food: FoodFormat) {
    const newFood = { ...editingFood, ...food };
    updateFood(newFood);
  }

  // -- Edit food
  function handleEditFood(food: FoodFormat) {
    setEditingFood(food);
    toggleModalEdit();
  }

  // -- Toggle available
  function handleToggleAvailable(food: FoodFormat, isAvailable: boolean) {
    toggleAvailable({ food, isAvailable });
  }

  return (
    <>
      <Header openModal={toggleModalAdd} />
      <ModalAddFood
        isOpen={isOpenAdd}
        setIsOpen={toggleModalAdd}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isOpenEdit}
        setIsOpen={toggleModalEdit}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
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

export default Dashboard
