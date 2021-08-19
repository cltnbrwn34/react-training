import { Link } from "react-router-dom";
export function Nav() {
  return (
    <nav>
      <h1>Restaurant Manager</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/foodForm">Food Form</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
