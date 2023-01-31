import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;

    div{
        flex: 1;
    }

    .information, 
    .buttons {
        display: flex;
        justify-content: space-between;
    }

    img{
        max-width: 120px;
        margin: 5%;
    }
`;