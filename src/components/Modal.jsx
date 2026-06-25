import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({children, title, isClose, onOpen}) {
    if (isClose) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(true)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button onClick={() => onOpen(true)}>
            <XCircleIcon className="modal__close-btn" />
          </button>
        </div>
        <div className="modal__content">
            {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
