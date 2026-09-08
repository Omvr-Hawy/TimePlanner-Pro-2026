// App Component
// TODO: Import Routes, Route, and lazy/Suspense from React
// TODO: Import page components (Home, Tasks, NotFound) and Layout
// TODO: Lazy-load the About page using React.lazy
// TODO: Set up Routes with:
//   - A parent route using Layout
//   - Nested routes: Home ("/"), Tasks ("/tasks"), About ("/about"), NotFound ("*")
//   - Wrap the About route with Suspense and a loading fallback
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="tasks" element={<Tasks />} />

        <Route
          path="about"
          element={
            <Suspense
              fallback={
                <div className="container text-center py-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mt-3">
                    Loading About page...
                  </p>
                </div>
              }
            >
              <About />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;