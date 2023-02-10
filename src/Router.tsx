import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      {/*한 번에 하나의 Route를 렌더링할 수 있는 방법*/}
      <Switch>
        <Route path={"/:coinId"}>
          <Coin />
        </Route>
        <Route path={"/"}>
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
