import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import ItemList from './ItemList';

const theCookies = new Cookies();

class Produk extends Component {

    state = { listProduk: [] }

    componentDidMount() {
      axios.get('http://localhost:1988/produk')
           .then((res) => {
             console.log(res);
             this.setState({ listProduk: res.data });
           }).catch((err) => {
             console.log(err);
           })
    }

    renderListProduk = () => {
      var listJSXProduk = this.state.listProduk.map((item) => {
        return (
                //====================START >> ITEM PRODUK=========================//
                <ItemList produk={item} />
                //====================END >> ITEM PRODUK=========================//
        )
      })
      return listJSXProduk;
    }

    render() {
      const thisCookie = theCookies.get('UserData'); //======> NGAMBIL DATA COOKIES
      if(thisCookie) {
        return (
          <div>
            {/* //===================START >> PRODUK LIST====================// */}
          
          <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
            <section className="bg-light" id="portfolio">
              <div className="container">
              
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Daftar Produk</h2>
                    <h4 className="section-subheading text-muted">Kendaraan favorit para millenial</h4>
                  </div>
                </div>
                <br/><br/>
                <div className="row">
                {this.renderListProduk()}
                </div>

              </div>
            </section>
            </div>
          //===================END >> PRODUK LIST======================//
        )
      } else {
        return (
          <Redirect to="/login" />
        )
      }
      
    }
}

export default Produk;