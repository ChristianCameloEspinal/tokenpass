import React, { useState } from "react";
import './ModalCode.css'
import { ModalPropsCodeType } from "../../../utils/types";
import * as Styled from '../../style/style';
import { FrameFloating } from './../../style/style';

type ModalPropsType = ModalPropsCodeType;

export default function ModalCode({ expectedCode, content, resolve, reject }: ModalPropsCodeType) {

    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (code === expectedCode) {
            resolve();
        } else {
            setError("Incorrect code. Please try again.");
        }
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
                                <input value={code} onChange={(e) => setCode(e.target.value)} type="string" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextError>{error}</Styled.TextError>
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
    </>)
}