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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
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
      className="fixed inset-0 z-50 m-auto flex w-[calc(100%-32px)] max-w-[480px] flex-col overflow-visible rounded-lg border border-lines bg-bg-page p-0 shadow-2xl outline-none backdrop:bg-black/50"
    >
      <div className="flex flex-col max-h-[90vh] overflow-y-auto p-6 md:p-8">
        {children}
      </div>
    </dialog>,
    document.body,
  );
};
