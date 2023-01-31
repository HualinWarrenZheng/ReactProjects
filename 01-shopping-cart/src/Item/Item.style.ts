import styled from "styled-components";

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
width: auto;
border: 5px solid lightblue;
border-radius: 10px;
height: 100%;

img{
    margin: 10%;
}
h3{
    text-align: center;
}
button {
    border-radius: 0 0 20px 20px;
  }
div{
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
}
`;