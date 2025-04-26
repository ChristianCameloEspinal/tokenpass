// ModalContext.tsx
import React, { createContext, useContext, useState } from "react";
import { ModalPropsCodeType } from "../utils/types";
import ModalCode from './../components/modals/modal-code/ModalCode';

// Tipos
type ModalContent = ModalPropsCodeType['content'];

type ModalCodeContextType = {
  content: ModalContent;
  expectedCode: string;
  openModalCode: (
    content: ModalContent,
    expectedCode: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalCodeContextType | null>(null);

export const useModalCode = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};

// Provider
export const ModalCodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ModalContent>({
    title: '',
    subtitle: '',
    message: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});
  const [expectedCode, setExpectedCode] = useState<string>("");

  const openModalCode = (
    newContent: ModalContent,
    expectedCode: string,
    confirm: () => void,
    cancel?: () => void
  ) => {
    setContent(newContent);
    setExpectedCode(expectedCode);
    setOnConfirm(() => confirm);
    setOnCancel(() => cancel || (() => {}));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ content, expectedCode, openModalCode, closeModal }}>
      {children}
      {isOpen && (
        <ModalCode
          expectedCode={expectedCode}
          content={content}
          resolve={() => {
            onConfirm();
            closeModal();
          }}
          reject={() => {
            onCancel();
            closeModal();
          }}
        />
      )}
    </ModalContext.Provider>
  );
};
