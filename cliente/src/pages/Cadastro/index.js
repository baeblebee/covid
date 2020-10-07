import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Content, Form, Footer } from './styles';
export default class Cadastro extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,
        };
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        try {
            await api.post(`/register`, data);
            toast.success('Usuário inserido com sucesso');
            this.setState({ loading: false });
            this.props.history.push('/login');
        }catch (error){
            toast.error('Falha ao inserir usuário');
            this.setState({ loading: false });
        }
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { loading } = this.state;
        return (
            <>
                <Content>
                    <Form method="POST" onSubmit={this.handleSubmit}>
                        <h1>Criar sua conta</h1>
                        <input name="username" type="text" placeholder="Nome" required 
                        onChange={this.handleChange} value={this.state.username}/>
                        <input name="email" type="email" placeholder="E-mail" required 
                        onChange={this.handleChange} value={this.state.email}/>
                        <input name="password" type="password" placeholder="Senha" required 
                        onChange={this.handleChange} value={this.state.password}/>

                        <button type="submit">{loading ? 'Carregando...': 'Cadastrar'}</button>
                    </Form>
                </Content>
                <Footer>
                    Já tenho um cadastro? <Link to="/login">Faça o seu login agora</Link>
                </Footer>
            </>
        );
    }
}