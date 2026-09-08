// Home Page
// TODO: Create a Home component with a Hero section
// TODO: Include a welcome heading, a short description, and a call-to-action button
// TODO: The button should link to the Tasks page
// TODO: Style using Bootstrap classes
// TODO: Export the component as default
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="hero-section bg-primary bg-gradient text-white text-center">
        <div className="container py-5">
          <span className="badge bg-white text-primary px-3 py-2 rounded-pill fw-bold mb-3">
            🚀 Ultimate Productivity Tool
          </span>

          <h1 className="display-4 fw-bold mb-3">
            Master Your Time with TimePlanner Pro
          </h1>

          <p className="lead text-white-50 mx-auto mb-4 hero-description">
            Organize tasks, set smart reminders, filter categories, and boost
            your daily workflow with real-time synchronization.
          </p>

          <Link
            to="/tasks"
            className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold shadow"
          >
            Get Started Now ⚡
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">
            Why Choose TimePlanner Pro?
          </h2>

          <p className="text-muted">
            Designed to keep your daily routines organized and productive.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <div className="fs-1 mb-3">⏱️</div>

              <h5 className="fw-bold">Timed Reminders</h5>

              <p className="text-muted small mb-0">
                Never miss an important task with automatic reminders.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <div className="fs-1 mb-3">🔄</div>

              <h5 className="fw-bold">Cross-Tab Sync</h5>

              <p className="text-muted small mb-0">
                Keep your tasks synchronized across multiple browser tabs.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <div className="fs-1 mb-3">🎨</div>

              <h5 className="fw-bold">Smart Categories</h5>

              <p className="text-muted small mb-0">
                Organize tasks using Work, Personal, and Study categories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;