import { useRef, useState } from "react";

const Modal = ({ id, title, body, handleSubmit, isLoading }) => {
  const closeBtn = useRef(null);

  const onSubmit = () => {
    handleSubmit();
    closeBtn.current.click();
  };

  return (
    <>
      <button
        className="button sm primary"
        data-bs-toggle="modal"
        data-bs-target="#addAmount"
      >
        click
      </button>
      <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeBtn}
              ></button>
            </div>
            <div className="modal-body my-3">{body}</div>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <button
                type="button"
                className="button"
                data-bs-dismiss="modal"
                ref={closeBtn}
              >
                Fermer
              </button>
              <button
                type="button"
                className="button primary"
                onClick={onSubmit}
                disabled={isLoading}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
