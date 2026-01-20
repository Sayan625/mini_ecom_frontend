import Login from "../pages/Login";

export default function LoginModal({ show, onClose, path }) {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        onClick={handleBackdropClick}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content px-0 py-5 ">
            <div className="modal-body p-0">
              <Login path={path} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
