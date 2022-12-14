import { Route, Switch, Redirect } from "react-router-dom";
import Boards from "./Boards";
import TopNav from "./TopNav";

function App() {
  return (
    <div>
      <TopNav />
      <Switch>
        <Route exact path="/boards">
          <Boards />
        </Route>
        <Route exact path="/about"></Route>
        <Route exact path="/completed-Tasks"></Route>
        <Route exact path="/">
          <Redirect to="/boards" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
