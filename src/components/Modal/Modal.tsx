import { createPortal } from "react-dom";
import { useEffect, useRef, type ReactNode } from "react";
import { useModalParams } from "../../hooks/useModalParams";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const Modal = ({ children }: Props) => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { closeModal } = useModalParams();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
      navigate("/");
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={closeModal}
      className="inset-0 m-auto z-50 w-[500px] max-h-[90vh] outline-none
                 bg-bg-page border border-lines rounded-lg shadow-2xl 
                 overflow-visible animate-dropdown-in"
    >
      <div className="size-full p-lg">{children}</div>
    </dialog>,
    document.body,
  );
};
