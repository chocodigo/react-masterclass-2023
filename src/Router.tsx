import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
import Popular from "./pages/Popular";
import Comingsoon from "./pages/Comingsoon";
import NowPlaying from "./pages/NowPlaying";


function Router() {
  return (
    <BrowserRouter>
      {/*한 번에 하나의 Route를 렌더링할 수 있는 방법*/}
        <Header/>
        <Switch>
            <Route path={'/coming-soon'}>
                <Comingsoon/>
            </Route>
            <Route path={'/now-playing'}>
                <NowPlaying />
            </Route>
            <Route path={"/"}>
                <Popular/>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default Router;
