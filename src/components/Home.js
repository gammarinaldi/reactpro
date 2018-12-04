import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const theCookies = new Cookies();

class Home extends Component {

  render() {

    var msg1, msg2;
    const usernameCookie = theCookies.get('UserData'); //======> NGAMBIL COOKIE USERNAME
    const emailCookie = theCookies.get('UserEmail'); //======> NGAMBIL COOKIE EMAIL
    if(usernameCookie) {
      msg1 = 'Selamat datang, ' + usernameCookie;
      msg2 = 'Email Anda: ' + emailCookie;
    } else {
      msg1 = 'Ini adalah halaman Home. Anda belum login.';
      msg2 = '';
    }

    return (
      <div>
          <h3>{msg1}</h3>
              {msg2}
      </div>
    )
  }
}
  
    
const mapStateToProps = (state) => {
  return {
      username: state.auth.username,
      email: state.auth.email
  }
}

export default connect(mapStateToProps)(Home);