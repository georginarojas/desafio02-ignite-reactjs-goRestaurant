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
}

export const FoodsContext = createContext<FoodsContextData>(
  {} as FoodsContextData
);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodFormat[]>([]);
  const [editingFood, setEditingFood] = useState();
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    api.get<FoodFormat[]>("foods").then((response) => setFoods(response.data));
  }, []);

  useEffect(() => {
    api.get<FoodFormat[]>("foods").then((response) => setFoods(response.data));
  }, [isChange]);

  // -- Toggle Available 
  const toggleAvailable = async ({
    food,
    isAvailable,
  }: ToggleAvailableFormat) => {
    try {
      const response = await api.put(`/foods/${food.id}`, {
        ...food,
        available: !isAvailable,
      });
      setIsChange(!isChange);
    } catch {
      toast.error("Erro no edição do produto");
    }
  };

  return (
    <FoodsContext.Provider value={{ foods, toggleAvailable }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}
