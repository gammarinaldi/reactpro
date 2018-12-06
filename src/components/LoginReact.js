import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onUserLogin } from '../actions';
import { Button, Form, FormGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class LoginReact extends Component {

    onBtnSubmit = () => {
      var username = this.refs.username.value;
      var password = this.refs.password.value;
      this.props.onUserLogin({username, password}); //===========> PANGGIL ACTION CREATOR
    }

    componentWillReceiveProps(newProps) {
      if(newProps.username !== '') {
      cookies.set('UserData', newProps.username, { path: '/' });
      cookies.set('UserEmail', newProps.email, { path: '/' });
      console.log('Cookies sudah ada');
      }
    }

    render() {

      if(this.props.username === "") {

        var alertLogin = this.props.errorLogin;
        if(alertLogin) {
          var alertLog = <p align='left' style={{ fontSize: '13px' }} 
                        className="alert alert-danger">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="md" />
                        &nbsp;{this.props.errorLogin}</p>;
        }

        var load;
        if(this.props.loading) {
            load = <center><FontAwesomeIcon icon={faSpinner} size="lg" /></center>;

        } else {
            load = <center><Button color="primary" onClick={this.onBtnSubmit}>Sign In</Button></center>;
        }

        return (
          <div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" />
            <div className="card bg-light">
            <br/>
              <Form className="col-3" style={{ margin: '0 auto' }}>
              <h5 style={{ textAlign: 'center' }}>LOGIN</h5><br/>
              <FormGroup>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user" /> </span>
                </div>
                <input ref="username" className="form-control" placeholder="Input username" type="text" />
              </div>
              </FormGroup>
              <FormGroup>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                </div>
                <input ref="password" className="form-control" placeholder="Input password" type="password" />
              </div>
              </FormGroup>
              {alertLog}
              {load}
            </Form>
            <br/>
          </div>
        </div>
        )

      }

      return <Redirect to="/" />

    }
}

const mapStateToProps = (state) => { //===========> NGAMBIL DATA KE GLOBAL STATE
    return { 
      username: state.auth.username, 
      email: state.auth.email, 
      errorLogin: state.auth.errorLogin,
      loading: state.auth.loading
     };
}
    
export default connect(mapStateToProps, { onUserLogin })(LoginReact);