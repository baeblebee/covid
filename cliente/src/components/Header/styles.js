import styled from 'styled-components';
export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
    border-bottom: 1px solid #aaa;
`;
export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    nav {
        display: flex;
        align-items: center;
        svg {
            color: #013ADF;
            width: 48px;
            height: 48px;
        }
        a{
            color: #013ADF;
            margin-left: 20px;
            text-decoration: none;
        }
    }
    aside {
        display: flex;
        align-items: center;
    }
`;
export const Profile = styled.div`
    display: flex;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #eee;
    div {
        text-align: right;
        margin-right: 10px;
        strong {
            display: block;
            color: #333;
        }
        button {
            padding: 4px 6px;
            border: 0;
            font-size: 16px;
            margin-top: 2px;
            color: #FFF;
            background: #013ADF;
            border-radius: 5px;
        }
    }
`;