import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FoodsProvider } from "./hooks/useFoods";
import { Routes } from "./routes";

import GlobalStyle from "./styles/global";

export const App = (): JSX.Element => {
  return (
    <FoodsProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </FoodsProvider>
  );
};

export default App;
