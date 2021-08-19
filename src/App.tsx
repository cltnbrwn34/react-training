import { Home } from "./Home";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./About";
import { Nav } from "./Nav";
import { FoodForm } from "./FoodForm";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserContextProvider, UserContextType } from "./UserContext";

// HTML                         vs  JSX
// class                            className
// for                              htmlFor
// inline styles are strings        Inline styles are objects, Numbers = px.
// <!-- comments like this -->      {/* comments like this */}
// attributes are kebab-cased       props are camelCased
// options accept selected          select accepts value
const user: UserContextType = {
  email: "C@b.com",
  name: "Colton",
  role: "admin",
  token: "123456",
};
export function App() {
  const queryCLient = new QueryClient();

  return (
    <UserContextProvider value={user}>
      <QueryClientProvider client={queryCLient}>
        <BrowserRouter>
          <Nav />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/food" exact>
            <FoodForm />
          </Route>
          <Route path="/food/:foodId">
            <FoodForm />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
