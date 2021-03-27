import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { FoodFormat } from "../types";

interface FoodsProviderProps {
  children: ReactNode;
}

interface ToggleAvailableFormat {
  food: FoodFormat;
  isAvailable: boolean;
}

interface FoodsContextData {
  foods: FoodFormat[];
  toggleAvailable: ({
    food,
    isAvailable,
  }: ToggleAvailableFormat) => Promise<void>;
  deleteFood: (foodId: number) => Promise<void>;
  addFood: (food: FoodFormat) => Promise<void>;
  updateFood: (food: FoodFormat) => Promise<void>;
}

export const FoodsContext = createContext<FoodsContextData>(
  {} as FoodsContextData
);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodFormat[]>([]);

  useEffect(() => {
    api.get<FoodFormat[]>("foods").then((response) => setFoods(response.data));
  }, []);

  // -- Toggle Available --
  const toggleAvailable = async ({
    food,
    isAvailable,
  }: ToggleAvailableFormat) => {
    try {
      const response = await api.put(`/foods/${food.id}`, {
        ...food,
        available: !isAvailable,
      });

      if (!response.data) {
        throw new Error();
      }

      let index = foods.findIndex((el) => el.id === food.id);
      foods[index].available = !isAvailable;
      setFoods([...foods]);
    } catch {
      toast.error("Erro no edição do prato");
    }
  };

  // -- Delete a food --
  const deleteFood = async (foodId: number) => {
    try {
      const response = await api.delete(`/foods/${foodId}`);
      if (!response) {
        throw new Error();
      }
      let newFoods = foods.filter((food) => food.id !== foodId);
      setFoods(newFoods);
    } catch {
      toast.error("Erro na remoção do prato");
    }
  };

  // -- Add a new food
  const addFood = async (food: FoodFormat) => {
    try {
      const response = await api.post("foods", {
        ...food,
        available: true,
      });
      if (!response) {
        throw new Error();
      }
      console.log("addFood ", food, response.data);
      setFoods([...foods, response.data]);
    } catch {
      toast.error("Erro na adição de um novo prato");
    }
  };

  // -- Update a food --
  const updateFood = async (food: FoodFormat) => {
    try {
      const response = await api.put(`/foods/${food.id}`, { ...food });
      if (!response) {
        throw new Error();
      }
      let index = foods.findIndex((el) => el.id === food.id);
      foods[index] = food;
      setFoods([...foods]);
    } catch {
      toast.error("Erro na edição do prato");
    }
  };

  return (
    <FoodsContext.Provider
      value={{ foods, toggleAvailable, deleteFood, addFood, updateFood }}
    >
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}
