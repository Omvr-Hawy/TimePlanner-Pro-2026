// Layout Component
// TODO: Import Outlet from react-router-dom
// TODO: Import Navbar and Footer components
// TODO: Create a Layout component that renders:
//   - Navbar at the top
//   - Outlet in the middle (for nested page content)
//   - Footer at the bottom
// TODO: Export the component as default
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="app-wrapper d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;