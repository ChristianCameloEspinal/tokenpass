// ModalContext.tsx
import React, { createContext, useContext, useState } from "react";
import ModalRegular from "../components/modals/modal-regular/ModalRegular";

type ModalContextType = {
    content: ModalContent;
    openModal: (content:ModalContent, onConfirm: () => void, onCancel?: () => void) => void;
    closeModal: () => void;
};

type ModalContent = {
    title: string;
    subtitle:string;
    message: string;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal must be used inside ModalProvider");
    return ctx;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {

    const [content, setContent] = useState<ModalContent>({
        title: '',
        subtitle: '',
        message: ''
      });
    const [isOpen, setIsOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<() => void>(() => { });
    const [onCancel, setOnCancel] = useState<() => void>(() => { });

    const openModal = (
        newContent: ModalContent,
        confirm: () => void,
        cancel?: () => void
      ) => {
        setContent(newContent);
        setOnConfirm(() => confirm);
        setOnCancel(() => cancel || (() => {}));
        setIsOpen(true);
      };
      

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ content, openModal, closeModal }}>
            {children}
            {isOpen && (
                <ModalRegular
                    content = {content}
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
