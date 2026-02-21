import { useSearchParams } from "react-router-dom";

export const useModalParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const modalType = searchParams.get("modal");

  const openModal = (type: string) => setSearchParams({ modal: type });
  const closeModal = () => {
    searchParams.delete("modal");
    setSearchParams(searchParams);
  };

  return { modalType, openModal, closeModal };
};
