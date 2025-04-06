// Modal.tsx
import React from "react";
import './ModalRegular.css';

type ModalProps = {
    content: {
        title: string;
        subtitle: string;
        message: string;
      };
      resolve: () => void;
      reject: () => void;
    };

export default function ModalRegular({content, resolve, reject }: ModalProps) {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="frame-flex vertical border shadow padding l all">
          <button className="close-button" onClick={reject}></button>
          <span className="text-title">{content.title}</span>
          <span className="text-subtitle">{content.subtitle}</span>
          <span className="text-body">{content.message}</span>
          <div className="frame-flex horizontal gap-m space-between">
            <button className="button secondary" onClick={reject}>Cancel</button>
            <button className="button primary" onClick={resolve}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}
