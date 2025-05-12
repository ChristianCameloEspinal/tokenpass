import React, { createContext, useContext, useState } from "react";
import { ModalPropsCodeType } from "../utils/types";
import ModalCode from './../components/modals/modal-code/ModalCode';

// Tipos
type ModalContent = ModalPropsCodeType['content'];

type ModalCodeContextType = {
    content: ModalContent;
    openModalCode: (
        content: ModalContent,
        onConfirm: (code: string) => Promise<boolean> | boolean, 
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
    const [onConfirm, setOnConfirm] = useState<(code: string) => Promise<boolean> | boolean>(() => Promise.resolve(false)); // Actualizamos el tipo
    const [onCancel, setOnCancel] = useState<() => void>(() => {});
    const [currentCode, setCurrentCode] = useState<string>("");

    const openModalCode = (
        newContent: ModalContent,
        confirm: (code: string) => Promise<boolean> | boolean, // Actualizamos el tipo
        cancel?: () => void
    ) => {
        setContent(newContent);
        setOnConfirm(() => confirm);
        setOnCancel(() => cancel || (() => {}));
        setIsOpen(true);
        setCurrentCode("");
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ content, openModalCode, closeModal }}>
            {children}
            {isOpen && (
                <ModalCode
                    content={content}
                    onCodeChange={(code) => setCurrentCode(code)}
                    resolve={async () => {
                        const shouldClose = await onConfirm(currentCode);
                        if (shouldClose) {
                            closeModal();
                        }
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