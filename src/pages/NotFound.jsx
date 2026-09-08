// 404 Not Found Page
// NOTE: This page will be rendered for any URL that does not match a defined route
// TODO: Create a NotFound component with a "Page Not Found" message
// TODO: Include a link back to the Home page
// TODO: Style using Bootstrap classes
// TODO: Export the component as default
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm rounded-4 p-5">
            <div className="display-1 fw-bold text-primary">
              404
            </div>

            <h2 className="fw-bold mb-3">
              🔍 Page Not Found
            </h2>

            <p className="text-muted mb-4">
              The page you are looking for does not exist or has been moved.
            </p>

            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-pill px-4"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;