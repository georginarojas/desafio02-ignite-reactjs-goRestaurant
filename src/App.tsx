import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FoodsProvider } from "./hooks/useFoods";
import { Routes } from "./routes";
import { Provider } from "react-redux";
import store from "./state-management/store";

import GlobalStyle from "./styles/global";

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <FoodsProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes />
        </BrowserRouter>
      </FoodsProvider>
    </Provider>
  );
};

export default App;
