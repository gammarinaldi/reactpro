import React, { Component } from 'react';

class ItemList extends Component {

    convertToRupiah = (angka) => {
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 === 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    render() {

        const { img, brand, model, desc, harga } = this.props.produk;
        

        return (
            //====================START >> ITEM PRODUK=========================//
            <div className="col-md-4 col-sm-6 portfolio-item">
            <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div className="portfolio-hover">
                <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x" />
                </div>
                </div>
                <img className="img-fluid" src={img} alt="img1" />
            </a>
            <div className="portfolio-caption">
                <h4>{brand}</h4>
                <h5>{model}</h5>
                <p className="text-muted">{desc}</p>
                <p className="text-muted">{this.convertToRupiah(harga)}</p>
            </div>
            </div>
            //====================END >> ITEM PRODUK=========================//
        )
    }
}

export default ItemList;