import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { FoodFormat } from "../types";


interface FoodsProviderProps{
    children: ReactNode;
}

interface FoodsContextData {
    foods:FoodFormat[];
}

export const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({children}: FoodsProviderProps){
    const [foods, setFoods] = useState<FoodFormat[]>([]);
    const [editingFood, setEditingFood] = useState();

    useEffect(() => {
        api.get<FoodFormat[]>("foods").then(response => setFoods(response.data));
    }, [])

    return(
        <FoodsContext.Provider value={{foods}}>
            {children}
        </FoodsContext.Provider>
    );
}

export function useFoods(){
    const context = useContext(FoodsContext); 
    return context;
}