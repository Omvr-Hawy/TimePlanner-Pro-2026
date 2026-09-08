// About Page
// NOTE: This page will be lazy-loaded using React.lazy in App.jsx
// TODO: Create an About component with information about the application
// TODO: Style using Bootstrap classes
// TODO: Export the component as default

function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <div className="display-4 mb-3">💡</div>

              <h2 className="fw-bold text-primary">
                About TimePlanner Pro
              </h2>

              <p className="text-muted">
                A simple and powerful task management application.
              </p>
            </div>

            <hr />

            <div className="mb-4">
              <h5 className="fw-bold">🎯 Project Mission</h5>

              <p className="text-secondary">
                TimePlanner Pro helps users organize their daily tasks,
                deadlines, and schedules while providing real-time validation,
                reminders, filtering, and browser storage.
              </p>
            </div>

            <div>
              <h5 className="fw-bold">✨ Key Capabilities</h5>

              <ul className="list-group rounded-3">
                <li className="list-group-item">
                  ✅ Real-time form validation
                </li>

                <li className="list-group-item">
                  ✅ LocalStorage persistence
                </li>

                <li className="list-group-item">
                  ✅ Cross-tab synchronization
                </li>

                <li className="list-group-item">
                  ✅ Category filtering and statistics
                </li>

                <li className="list-group-item">
                  ✅ Inline task editing
                </li>

                <li className="list-group-item">
                  ✅ Automatic task reminders
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;