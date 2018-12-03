import React, { Component } from 'react';
import HeaderReact from './components/HeaderReact';
import LoginReact from './components/LoginReact';
import RegisterReact from './components/RegisterReact';
import Table from './components/Table';
import Home from './components/Home';
import { Route, withRouter } from 'react-router-dom';
import Produk from './components/Produk';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ManageProduk from './components/ManageProduk';

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    const newCookie = cookies.get('UserData');
    if(newCookie) {
        this.props.keepLogin(newCookie);
    } else {
      this.props.cookieChecked();
    }
  }

  render() {

    if(this.props.cookie) {
      return (
        <div className={"container"}>
        <h1>{this.props.contentHeader}</h1>

        <HeaderReact NavBrand={'Learning Performance Indicator'} />

        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/table" component={Table}/>
          <Route path="/produk" component={Produk}/>
          <Route path="/login" component={LoginReact}/>
          <Route path="/register" component={RegisterReact}/>
          <Route path="/admin" component={''}/>
          <Route path="/manageproduk" component={ManageProduk}/>
        </div>

      </div>
      )
    }

    return (
      <div>
        <br/><br/>
        <center><FontAwesomeIcon icon={faSpinner} size="lg" /></center>
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie }
}
export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));
