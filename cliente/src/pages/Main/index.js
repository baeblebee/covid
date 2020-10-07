import React, { Component } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { FaTrashAlt } from 'react-icons/fa';
import { Content, Form, List } from './styles';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            id: '',
            proteina: '',
            pesquisas: [],
            loading: false,
            change: 0
        };
    }
    async componentDidMount() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const id = localStorage.getItem('id');
        this.setState({ token, id});
        try {
            const response = await api.get(`/pesquisas/`);
            this.setState({pesquisas: response.data });
        }catch (error) {
            toast.error('Erro na comunicação com o servidor');
        }
    }
    async componentDidUpdate(_, prevState) {
        if(prevState.change !== this.state.change) {
            try {
                const response = await api.get(`/`);
                this.setState({pesquisas: response.data });
            }catch (error) {
                toast.error('Erro na comunicação com o servidor');
            }
        }
    }
    handleInputChange = e => {
        this.setState({ proteina: e.target.value });
    };
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = new FormData();
        data.append('proteina', this.state.proteina);
        try {
            await api.post(`/pesquisas/`, data);
            this.setState({ change: this.state.change+1, proteina: '' });
            toast.success('Pesquisa realizada com sucesso!');
        } catch (error) {
            toast.error('Falha ao realizar pesquisa!');
        }
        this.setState({ loading: false });
    };
    remover = async id => {
        this.setState({ loading: true });
        try {
            await api.delete(`/pesquisas/${id}`);
            this.setState({ change: this.state.change+1, proteina: ''});
            toast.success('Pesquisa apagada com sucesso!');
        } catch (error){
            toast.error('Falha ao remover pesquisa!');
        }
        this.setState({ loading: false });
    }
    render() {
        const { id, proteina, pesquisas, loading } = this.state;
        return (
            <Content>
                <Form onSubmit={this.handleSubmit} method="POST">
                    <textarea placeholder="Pesquisar" name="proteina" required
                    onChange={this.handleInputChange} value={proteina}></textarea>
                    <aside>
                        <button type="submit">{loading ? 'Carregando...' : 'Pesquisar'}</button>
                    </aside>
                </Form>

                <List>
                    {pesquisas.map(pesquisa => (
                        <li key={pesquisa.id}>
                            <div>
                                {parseInt(id) === pesquisa.user.id &&
                                    <span>
                                        <button id="remover" type="button" onClick={() => this.remover(pesquisa.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </span>
                                }
                                <Moment format="DD/MM/YYYY HH:mm:ss">{pesquisa.created_at}</Moment>
                            </div>
                            <div>
                                <h4>Proteína:</h4>
                                {pesquisa.proteina}
                            </div>
                        </li>
                    ))}
                </List>
            </Content>
        );
    }
}   