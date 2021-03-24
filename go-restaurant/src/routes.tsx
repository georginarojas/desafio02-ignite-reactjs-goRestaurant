import React from "react";
import { Switch, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};
