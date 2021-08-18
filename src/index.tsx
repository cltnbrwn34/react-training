import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./about";
import { Nav } from "./Nav";

render(
  <BrowserRouter>
    <Nav />
    <Route path="/about">
      <About />
    </Route>
    <Route path="/" exact>
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);

//HTML                      V JSX
//class                     V className
//for                       V htmlFor
//inline Styles are strings V inline Styles are objects, values can be numbers=px
//attributes are kebab-case V probs are camelCase

//const headStyle = { color: "blue", marginBottom: 10 };
//first react component
// function Heading(props: any) {
//     return <h1 className="head" style={headStyle}>{props.children}</h1>;
// }

//render something JSX, into root ID in index.html
