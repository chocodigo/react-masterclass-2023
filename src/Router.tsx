import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import Popular from "./pages/Popular";


function Router() {
  return (
    <BrowserRouter>
      {/*한 번에 하나의 Route를 렌더링할 수 있는 방법*/}
          <Header/>
      <Switch>
        <Route path={"/"}>
            <Popular/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
