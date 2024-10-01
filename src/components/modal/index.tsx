import { CloseCircle } from "iconsax-react";
import {Theme} from "@/store/data/mockTheme";
import { useEffect } from "react";

const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        className={`fixed inset-0 backdrop-blur-sm`} onClick={onClose}
        style={{ backgroundColor: Theme.colors.background_modal_bg }}
      />
      <div
        className={`w-[40%] p-8 rounded-lg z-10 shadow-lg max-w-lg mx-auto relative`}
        style={{ backgroundColor: Theme.colors.modal_bg }}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        >
          <CloseCircle size="32" color="#FF8A65" variant="Bulk" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
