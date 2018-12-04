import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { select_produk } from '../actions';
import queryString from 'query-string';

class ProdukDetail extends Component {

    componentDidMount() {
        //var produkId = this.props.match.params.id;
        var params = queryString.parse(this.props.location.search);
        console.log(params);
        var produkId = params.id;
        axios.get('http://localhost:1988/produk/' + produkId)
                .then((res) => {
                    this.props.select_produk(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
    }

    render() {
        if(this.props.username !== "") {
            var { brand, model, desc, harga, img} = this.props.produk;
            return(
                    <div className="container">
                        <img src={img} alt={img} />
                        <br/><br/>
                        <h1>{brand}</h1>
                        <h3>{model}</h3>
                        <br/><br/>
                        <h2>Rp. {harga}</h2>
                        <br/><br/>
                        <p>{desc}</p>
                    </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { produk: state.selectedProduk }
}

export default connect(mapStateToProps, { select_produk })(ProdukDetail);