// Navbar Component
// TODO: Import useState from React
// TODO: Import Link or NavLink from react-router-dom
// TODO: Create a Navbar component that:
//   - Displays the app name "TimePlanner Pro"
//   - Has navigation links: Home, Tasks, About
//   - Uses useState to toggle mobile menu open/close
//   - Uses Bootstrap navbar classes for styling
// TODO: Export the component as default
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
          to="/"
          onClick={closeMenu}
        >
          <span>⏳</span>
          TimePlanner Pro
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-controls="mainNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="mainNavbar"
          className={`collapse navbar-collapse ${
            isOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/"
                end
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/tasks"
                onClick={closeMenu}
              >
                Tasks
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/about"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;