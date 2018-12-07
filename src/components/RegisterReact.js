import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserRegister } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { sendCurrentPage } from '../actions';

const cookies = new Cookies();

class RegisterReact extends Component {

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password = this.refs.password.value;
        this.props.onUserRegister({username, email, phone, password});
    }

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('UserData', newProps.username, { path: '/' });
        }
    }

    // componentDidMount() {
    //     this.props.sendCurrentPage({
    //         username: this.props.username, 
    //         path: this.props.location.pathname
    //     }); //===========> KIRIM CURRENT PAGE KE ACTION CREATOR
    // }

    render () {
        if(this.props.username === "") {
            
            var load;
            if(this.props.loading) {
                load = <center><FontAwesomeIcon icon={faSpinner} size="lg" /></center>;
            } else {
                load = <center><Button color="primary" 
                        onClick={this.onBtnRegisterClick}>Register</Button></center>;
            }

            var alertRegister = this.props.errorRegister;

            if(alertRegister) {
                var alertReg = <p align='left' style={{ fontSize: '13px' }} 
                                    className="alert alert-danger">
                                    <FontAwesomeIcon icon={faExclamationTriangle} size="md" />
                                    &nbsp;{this.props.errorRegister}</p>;
              }

            return (
            
                <div>
                    <div className="card bg-light">
                    <article className="card-body mx-auto" style={{maxWidth: 400}}>
                        <h4 className="card-title mt-3 text-center">Register Account</h4><br/>
                        {/* <p>
                        <a href className="btn btn-block btn-twitter" style={{ color:'#ffffff' }}> 
                        <i className="fab fa-twitter" style={{ color:'#ffffff' }}/> 
                        &nbsp; Login via Twitter</a>
                        <a href className="btn btn-block btn-facebook" style={{ color:'#ffffff' }}> 
                        <i className="fab fa-facebook-f" style={{ color:'#ffffff' }}/>
                            &nbsp; Login via facebook</a>
                        </p> */}
                        
                        <form>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user" /> </span>
                            </div>
                            <input ref="username" className="form-control" 
                            placeholder="Username" type="text" />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                            </div>
                            <input ref="email" className="form-control" 
                            placeholder="Email address" type="email" />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-phone" /> </span>
                            </div>
                            <input ref="phone" className="form-control" 
                            placeholder="Phone number" type="text" />
                        </div>
                    
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                            </div>
                            <input ref="password" className="form-control" 
                            placeholder="Create password" type="password" />
                        </div>
                                                            
                        <div className="form-group">
                            {load}
                            <br/>
                            {alertReg}
                        </div>      

                        </form>

                        <p className="divider-text">
                        <span className="bg-light">OR</span>
                        </p>

                        <p className="text-center">Have an account? &nbsp;
                        <Link to="/login">Login</Link> </p>

                    </article>
                    </div>
                </div>
    
            )

        } 
        
        return <Redirect to="/" />

    }
    
}

const mapStateToProps = (state) => {
    return { username: state.auth.username,
             loading: state.auth.loading, 
             errorRegister: state.auth.errorRegister 
            };
}
    
export default connect(mapStateToProps, { onUserRegister, sendCurrentPage })(RegisterReact);