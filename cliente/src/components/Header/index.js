import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { GiAtomicSlashes } from 'react-icons/gi';
import { Container, Content, Profile } from './styles';
export default class Header extends Component {
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        window.location.href = '/login';
    }
    render() {
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('user');
        return (
            <Container>
                <Content>
                    <nav>
                        <Link to="/login">
                            <GiAtomicSlashes/>
                        </Link>
                    </nav>

                    <aside>
                        <Profile>
                            {id > 0 &&
                                <div>
                                    <strong>{user}</strong>
                                    <button type="button" onClick={this.logout}>
                                        <FaSignOutAlt />
                                    </button>
                                </div>                            
                            }
                        </Profile>
                    </aside>
                </Content>
            </Container>
        );
    }
}