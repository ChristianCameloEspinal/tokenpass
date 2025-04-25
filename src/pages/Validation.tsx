import React from "react";
import * as Styled from '../components/style/style';
import { useUser } from "../contexts/UserContext";
/**
 * Aquí debo recibir el id del ticket y los datos de usuario, se debe hacer la petición al back para generar el qr de entrada al evento
 * @returns Validation page
 */
export default function ValidationPage() {

    const { user } = useUser();

    return (<>
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>Validate your ticket</Styled.Title>
                <Styled.FrameVerticalMain>

                </Styled.FrameVerticalMain>
            </Styled.Wrapper>
        </Styled.Page>
    </>)
}