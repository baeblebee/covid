import React, { Component } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { FaTrashAlt } from 'react-icons/fa';
import { Content, Form, List } from './styles';
import Table from 'react-bootstrap/Table'


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
        this.setState({ token, id });

        try {
            const response = await api.get(`/pesquisas/`);
            this.setState({ pesquisas: response.data });
        } catch (error) {
            toast.error('Erro na comunicação com o servidor');
        }
    }

    async componentDidUpdate(_, prevState) {
        if (prevState.change !== this.state.change) {
            try {
                const response = await api.get(`/pesquisas/`);
                this.setState({ pesquisas: response.data });
            } catch (error) {
                toast.error('Erro na comunicação com o servidor');
            }
        }
    }

    handleInputChange = e => {
        this.setState({ proteina: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });

        const drugs = [{ "Drug": "Cyclosporine", "Score": 5.495257 }, { "Drug": "Silicon dioxide", "Score": 4.674581 }, { "Drug": "Tretinoin", "Score": 3.508562 }, { "Drug": "Acetaminophen", "Score": 2.981453 }, { "Drug": "Quercetin", "Score": 2.841376 }, { "Drug": "Valproic acid", "Score": 2.837451 }, { "Drug": "Vorinostat", "Score": 2.700724 }, { "Drug": "Pentanal", "Score": 2.305889 }, { "Drug": "Methotrexate", "Score": 1.778386 }, { "Drug": "Entinostat", "Score": 1.57523 }, { "Drug": "Cupric Chloride", "Score": 1.489271 }, { "Drug": "Dimethyl sulfoxide", "Score": 1.405213 }, { "Drug": "Amiodarone", "Score": 1.374072 }, { "Drug": "Alfacalcidol", "Score": 1.211453 }, { "Drug": "Diclofenac", "Score": 1.211453 }, { "Drug": "Irinotecan", "Score": 1.211453 }, { "Drug": "Capsaicin", "Score": 1.211453 }, { "Drug": "Prednisolone", "Score": 1.211453 }, { "Drug": "Clofibrate", "Score": 1.211453 }, { "Drug": "Estradiol", "Score": 0.763172 }, { "Drug": "Fluorouracil", "Score": 0.620379 }, { "Drug": "Bezafibrate", "Score": 0.609665 }, { "Drug": "Chlorpromazine", "Score": 0.500128 }, { "Drug": "Atenolol", "Score": 0.459321 }, { "Drug": "Clonidine", "Score": 0.459321 }, { "Drug": "Simvastatin", "Score": 0.404772 }, { "Drug": "Zinc", "Score": 0.404772 }, { "Drug": "Ibuprofen", "Score": 0.363777 }, { "Drug": "Losartan", "Score": 0.363777 }, { "Drug": "Benazepril", "Score": 0.363777 }, { "Drug": "Heparin", "Score": 0.361411 }, { "Drug": "Ethinylestradiol", "Score": 0.361411 }, { "Drug": "Hydrogen peroxide", "Score": 0.331263 }, { "Drug": "Folic acid", "Score": 0.318921 }, { "Drug": "Nicotine", "Score": 0.289115 }, { "Drug": "Dalteparin", "Score": 0.289115 }, { "Drug": "Chromium", "Score": 0.266055 }, { "Drug": "Troglitazone", "Score": 0.265562 }, { "Drug": "Alitretinoin", "Score": 0.265562 }, { "Drug": "Bexarotene", "Score": 0.265562 }, { "Drug": "Formaldehyde", "Score": 0.211013 }, { "Drug": "Phenytoin", "Score": 0.211013 }, { "Drug": "Arsenic trioxide", "Score": 0.211013 }, { "Drug": "Copper", "Score": 0.211013 }, { "Drug": "Estriol", "Score": 0.211013 }, { "Drug": "Chorionic Gonadotropin (Human)", "Score": 0.211013 }, { "Drug": "Urea", "Score": 0.211013 }, { "Drug": "Belinostat", "Score": 0.211013 }, { "Drug": "Phenol", "Score": 0.211013 }, { "Drug": "Ursodeoxycholic acid", "Score": 0.193759 }, { "Drug": "Fenofibrate", "Score": 0.193759 }, { "Drug": "Vitamin E", "Score": 0.193759 }, { "Drug": "Arachidonic Acid", "Score": 0.193759 }, { "Drug": "Ciprofibrate", "Score": 0.193759 }, { "Drug": "Nitroaspirin", "Score": 0.193759 }, { "Drug": "Ascorbic acid", "Score": 0.193759 }, { "Drug": "Acetylsalicylic acid", "Score": 0.193759 }, { "Drug": "Niacin", "Score": 0.193759 }, { "Drug": "Nandrolone decanoate", "Score": 0.193759 }, { "Drug": "beta-Naphthoflavone", "Score": 0.155136 }, { "Drug": "Progesterone", "Score": 0.155136 }, { "Drug": "Cisplatin", "Score": 0.150344 }, { "Drug": "Selenium", "Score": 0.078004 }, { "Drug": "Phenobarbital", "Score": 0.078004 }, { "Drug": "Norethisterone", "Score": 0.072296 }, { "Drug": "Aminocaproic acid", "Score": 0.072296 }, { "Drug": "Prednisone", "Score": 0.072296 }, { "Drug": "Antimony", "Score": 0.072296 }]
        const data = new FormData();
        let flag = 0;

        drugs.forEach(async (drug) => {
            if (drug.Drug === this.state.proteina) {
                data.append('proteina', this.state.proteina);
                data.append('score', drug.Score);
                flag = 1;
                try {
                    await api.post(`/pesquisas/`, data);
                    this.setState({ change: this.state.change + 1, proteina: '' });
                    toast.success('Pesquisa realizada com sucesso!');
                } catch (error) {
                    toast.error('Erro na comunicação com o servidor!');
                }
            }
            this.setState({ loading: false });
        })
        if(flag == 0) {
            toast.error('Nenhuma pesquisa encontrada!');
        }
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
                <Form onSubmit={this.handleSubmit}>
                    <textarea placeholder="Pesquisar" name="proteina" required
                        onChange={this.handleInputChange} value={proteina}></textarea>
                    <aside>
                        <button type="submit">{loading ? 'Carregando...' : 'Pesquisar'}</button>
                    </aside>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Proteína</th>
                            <th>Score</th>
                            <th>Data e Hora</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesquisas.map(pesquisa => (
                            <tr key={pesquisa.id}>
                                <td>{pesquisa.proteina}</td>
                                <td>{pesquisa.score}</td>
                                <td><Moment format="DD/MM/YYYY HH:mm:ss">{pesquisa.created_at}</Moment></td>
                                <td>                                
                                    {parseInt(id) === pesquisa.user.id &&
                                    <span>
                                        <button id="remover" type="button" onClick={() => this.remover(pesquisa.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </span>
                                }</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Content>
        );
    }
}   