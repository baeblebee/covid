import  React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Content, Form, Footer } from './styles';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        try {
            const response = await api.post(`/authenticate`, data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user);
            localStorage.setItem('id', response.data.id);
            this.setState({ loading: false });
            this.props.history.push('/');
        } catch (error) {
            toast.error('Email ou senha incorretos');
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
                        <h1>ENTRAR</h1>
                        <input name="email" type="email" placeholder="E-mail" required
                        onChange={this.handleChange} value={this.state.email}/>
                        <input name="password" type="password" placeholder="Senha" required
                        onChange={this.handleChange} value={this.state.password}/>
                        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
                    </Form>
                </Content>
                <Footer>
                    Ainda não possui um cadastro? <Link to="/cadastrar">Cadastre-se agora</Link>
                </Footer>
            </>
        );
    }
}