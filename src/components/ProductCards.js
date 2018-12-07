import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ItemList from './ItemList';
import { sendCurrentPage } from '../actions';

class ProductCards extends Component {
    state = { listProduk: [], searchListProduk: [] }

    componentDidMount() {
        axios.get('http://localhost:1988/produk')
            .then((res) => {
                this.setState({ listProduk: res.data, searchListProduk: res.data })
            }).catch((err) => {
                console.log(err)
            })
            
        this.props.sendCurrentPage(this.props.location.pathname); //===========> KIRIM CURRENT PAGE KE ACTION CREATOR
    }

    onBtnSearchClick = () => {
        var brand = this.refs.searchBrand.value;
        var model = this.refs.searchModel.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.listProduk.filter((item) => {
            return item.brand.includes(brand)
                    && item.harga >= hargaMin
                    && item.harga <= hargaMax
                    && item.model.toLowerCase().includes(model.toLowerCase())
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
                return <Redirect to={`/productdetails?id=${this.props.produk.id}&brand=${this.props.produk.brand}`} />
            }
            return (
                <div>
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2 className="section-heading text-uppercase">Products in Cards</h2>
                                    <h3 className="section-subheading text-muted">Best produk in town.</h3>
                                </div>
                            </div>

                            <form className="form-inline">
                                <input type="text" className="form-control" ref="searchModel" 
                                placeholder="Cari Model Kendaraan" style={{ margin: '0 20px 0 0' }}/>
                                
                                <select ref="searchBrand" className="custom-select" style={{ margin: '0 20px 0 0' }}>
                                    <option value="">---Semua Brand---</option>
                                    <option>Kawasaki</option>
                                    <option>Honda</option>
                                    <option>Yamaha</option>
                                </select>
                                
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Min</div>
                                    </div>
                                    <input type="number" className="form-control" 
                                    ref="hargaMinSearch" defaultValue="0" style={{ margin: '0 20px 0 0' }}/>
                                </div>
                                
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Max</div>
                                    </div>
                                    <input type="number" className="form-control" 
                                    ref="hargaMaxSearch" defaultValue="999999999" style={{ margin: '0 20px 0 0' }}/>
                                </div>
                                
                                <input type="button" className="btn btn-success" 
                                value="Search" onClick={this.onBtnSearchClick} />  
                            </form>

                            <br/><br/>
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
    return { 
                username: state.auth.username,
                produk: state.selectedProduk
            }
}

export default connect(mapStateToProps, {sendCurrentPage})(ProductCards);