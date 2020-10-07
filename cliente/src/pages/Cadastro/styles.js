import styled from 'styled-components';
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    max-width: 400px;
    h1{
        color: #013ADF;
    }
    input {
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        margin: 5px 0;
    }
    button {
        margin: 5px 0 0;
        padding: 6px 16px;
        background: #013ADF;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 100px;
        font-size: 16px;
    }
`;
export const Footer = styled.aside`
    background-color: #f5f8fa;
    color: #333;
    text-align: left;
    padding: 30px;
    font-size: 16px;
    a {
        color: #5882FA;
        text-decoration: none;
        :hover{
            text-decoration: underline;
        }
    }
`;