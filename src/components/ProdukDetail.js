import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProdukDetail extends Component {
    render() {
        var { brand, model, desc, harga, img} = this.props.produk;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img src={img} className="img-responsive" alt={img} />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{brand}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <h3>{model}</h3>
                    </div>
                    <div className="row">
                        <h2>Rp. {harga}</h2>
                    </div>
                    <div className="row">
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { produk: state.selectedProduk }
}

export default connect(mapStateToProps)(ProdukDetail);