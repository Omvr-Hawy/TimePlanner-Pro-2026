// Footer Component
// TODO: Create a Footer component that displays:
//   - Copyright text (e.g., "TimePlanner Pro 2025")
//   - The browser language using navigator.language
// TODO: Style using Bootstrap classes
// TODO: Export the component as default
function Footer() {
  const browserLanguage = navigator.language || "en-US";

  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <p className="mb-0 small">
            &copy; {new Date().getFullYear()} TimePlanner Pro. All rights reserved.
          </p>

          <span className="badge bg-secondary rounded-pill px-3 py-2">
            🌐 Browser Language: {browserLanguage}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;