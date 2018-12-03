import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ItemList from './ItemList';

class Produk extends Component {
    state = { listProduk: [], searchListProduk: [] }

    componentDidMount() {
        axios.get('http://localhost:1988/produk')
            .then((res) => {
                this.setState({ listProduk: res.data, searchListProduk: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value;
        var merk = this.refs.searchMerk.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.listProduk.filter((item) => {
            return item.brand.includes(merk) 
                    && item.harga >= hargaMin
                    && item.harga <= hargaMax
                    && item.model.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProduk: arrSearch })
        console.log(arrSearch)
    }

    renderListProduk = () => {
        var total = 12;
        var size = 4;
        var check = true;
        var listJSXProduk = this.state.searchListProduk.map((item) => {
            if(total === 0 && check === true) {
                size = 6;
                total = 12;
                check = false;
            }
            else if(total === 0 && check === false){
                size = 4;
                total = 12;
                check = true;
            }
            total -= size;

            return (
                <ItemList size={size} produk={item} />
            )
        })
        return listJSXProduk;
    }

    render() {
        if(this.props.username !== "") {
            if(this.props.produk.id !== 0) {
                return <Redirect to="/produkdetail" />
            }
            return (
                <div>
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">List Produk</h2>
                                <h3 className="section-subheading text-muted">Best produk in town.</h3>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <form>
                                        <input type="text" className="form-input" ref="searchNama" placeholder="Nama Popok" />
                                        <select ref="searchMerk">
                                            <option value="">All Merk</option>
                                            <option>Kawasaki</option>
                                            <option>Honda</option>
                                            <option>Yamaha</option>
                                        </select>
                                        Harga : <input type="number" ref="hargaMinSearch" defaultValue="0" /> - <input type="number" ref="hargaMaxSearch" defaultValue="9999999" />
                                        <input type="button" className="btn btn-success" 
                                        value="Search" onClick={this.onBtnSearchClick} />
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                   {this.renderListProduk()}
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        
        return <Redirect to='/login' />
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, produk: state.selectedProduk }
}

export default connect(mapStateToProps)(Produk);