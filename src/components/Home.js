import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

  render() {

    var msg1, msg2;
    if(this.props.username) {
      msg1 = 'Selamat datang, ' + this.props.username;
      msg2 = 'Email Anda: ' + this.props.email;
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