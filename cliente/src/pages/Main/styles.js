import styled from 'styled-components';
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    textarea, input {
        flex: 1;
        border: 1px solid #808080;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        margin: 2px;
    }
    aside {
        display: flex;
        justify-content: flex-end;
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
    }
`;
export const List = styled.ul`
    list-style: none;
    h4{
        text-align: left;
    }
    li {
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        & + li {
            border-top: 1px solid #eee;
        }
        div {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 10px 0;
        }
        #remover {
            padding: 8px 10px;
            background: #dc3545;
            color: #fff;
            border: 0;
            font-size: 16px;
            border-radius: 5px;
        }
        #editar {
            padding: 8px 10px;
            background: #31B404;
            color: #fff;
            border: 0;
            font-size: 16px;
            border-radius: 5px;
            margin: 4px;
        }
        #usuario{
            font-size: 18px;
            color: #013ADF;
            font-weight: bold;
        }
    }
`;