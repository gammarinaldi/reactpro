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
import ProdukDetail from './components/ProdukDetail';

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

      var currentPage;
      if(this.props.path === '/produk') currentPage = 'Product Cards';
      else if(this.props.path === '/manageproduk') currentPage = 'Product List';
      else if(this.props.path === '/table') currentPage = 'Table List';

      console.log(this.props.location.pathname)
      
      var breadCrumb;
      if(this.props.location.pathname !== '/login' && this.props.location.pathname !== '/register' ) {
        breadCrumb = 
        <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
              </ol>
            </nav>
          </div>;
      } 

      return (
        <div className={"container"}>
        <h1>{this.props.contentHeader}</h1>

        <HeaderReact NavBrand={'Learning Performance Indicator'} />

        {breadCrumb}
        
        <Route exact path="/" component={Home}/>
        <Route path="/table" component={Table}/>
        <Route path="/produk" component={Produk}/>
        <Route path="/login" component={LoginReact}/>
        <Route path="/register" component={RegisterReact}/>
        <Route path="/admin" component={''}/>
        <Route path="/manageproduk" component={ManageProduk}/>
        <Route path="/produkdetail" component={ProdukDetail}/>
        
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
  return { 
           cookie: state.auth.cookie,
           path: state.auth.path 
          }
}
export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));
