import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserLogout, keepLogin } from '../actions';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class HeaderReact extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogoutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('UserData', 'UserEmail');
    }

    render() {
        console.log(this.props.username);
        if(this.props.username === "") {

            return (
                <div style={{ margin: '0 0 70px 0' }}>
                    <Navbar color="light" light expand="md" fixed="top">
                    <NavbarBrand href="/">{this.props.NavBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                        <NavItem>
                        <Link to="/register"><NavLink>Register</NavLink></Link>
                        </NavItem>
                        <NavItem>
                        <Link to="/login"><NavLink>Login</NavLink></Link>
                        </NavItem>

                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )

        } else {
            const usernameCookie = cookies.get('UserData'); //======> NGAMBIL COOKIE USERNAME
            return (
                
                <div style={{ margin: '0 0 70px 0' }}>
                    <Navbar color="light" light expand="md" fixed="top">
                    <NavbarBrand href="/">{this.props.NavBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                        <NavItem>
                        <NavLink>Hello, {usernameCookie}</NavLink>
                        </NavItem>
                        <NavItem>
                        <Link to="/table"><NavLink>Table</NavLink></Link>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/produk">Product Cards</NavLink>
                        </NavItem>
                        <NavItem>
                        <Link to="/manageproduk"><NavLink>Product List</NavLink></Link>
                        </NavItem>
                        <NavItem>
                        <Link to="#"><NavLink onClick={this.onLogoutSelect}>Logout</NavLink></Link>
                        </NavItem>
                        
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin})(HeaderReact);