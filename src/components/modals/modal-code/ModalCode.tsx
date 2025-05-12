import React, { useState } from "react";
import './ModalCode.css'
import { ModalPropsCodeType } from "../../../utils/types";
import * as Styled from '../../style/style';
import { FrameFloating } from './../../style/style';

type ModalPropsType = Omit<ModalPropsCodeType, 'expectedCode'> & {
    onCodeChange: (code: string) => void;
    resolve: () => Promise<void> | void; // Resolve ahora puede ser async
};

export default function ModalCode({ content, resolve, reject, onCodeChange }: ModalPropsType) {
    const [code, setCode] = useState("");
    // Puedes recibir el error como una prop si lo prefieres, o manejarlo en el componente padre

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        onCodeChange(e.target.value);
    };

    const handleSubmit = () => {
        resolve(); // Llama a la función resolve del contexto
    };

    return (<>
        <Styled.Overlay>
            <Styled.FrameFloating>
                <Styled.FrameVertical className="gap-l">
                    <Styled.Title>{content.title}</Styled.Title>
                    <Styled.InputBox>
                        <Styled.TextSubtitle>{content.subtitle}</Styled.TextSubtitle>
                        <Styled.TextHint>{content.message}</Styled.TextHint>
                        <Styled.InputField>
                            <Styled.Input>
                                <input value={code} onChange={handleChange} type="string" required />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.FrameHorizontal>
                            <Styled.ButtonAlternate onClick={reject}>Cancel</Styled.ButtonAlternate>
                            <Styled.Button onClick={handleSubmit}>Check</Styled.Button>
                        </Styled.FrameHorizontal>
                    </Styled.InputBox>
                </Styled.FrameVertical>
            </Styled.FrameFloating>
        </Styled.Overlay>
    </>);
}