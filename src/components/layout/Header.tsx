import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../../components/style/style';
import { useUser } from '../../contexts/UserContext';

export default function Header() {

    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return(<>
        <Styled.FrameHorizontal className="shadow padding xl sides m tops">
            <Styled.FrameVertical>
            <Styled.TextSubtitle >TokenPass</Styled.TextSubtitle>
            <Styled.TextHint >{user?.name}</Styled.TextHint>
            </Styled.FrameVertical>
            <Styled.ButtonSmall style={{flex:'1'}} onClick={()=>handleLogout()}>Logout</Styled.ButtonSmall>
        </Styled.FrameHorizontal>
    </>)

}