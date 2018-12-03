import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, Row, Col } from 'reactstrap'; 
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const theCookies = new Cookies();

class ManageProduk extends Component {

    state = { listProduk: [], selectedIdEdit: 0, filterForm: '' }

    componentDidMount() {
        this.showProduk();
    }

    showProduk = () => {
    axios.get('http://localhost:1988/produk')
            .then((res) => {
                console.log(res);
                this.setState({ listProduk: res.data, selectedIdEdit: 0 });
            }).catch((err) => {
                console.log(err);
            })
    }

    onBtnAddClick = () => {
        const brand = this.refs.addBrand.value;
        const model = this.refs.addModel.value;
        const harga = this.refs.addHarga.value;
        const desc = this.refs.addDesc.value;
        const img = this.refs.addImg.value;

        axios.post('http://localhost:1988/produk', {
            brand, model, harga, desc, img
        }).then((res) => {
            console.log(res);
            this.getProduk();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnSaveClick = (id) => {
        const brand = this.refs.updateBrand.value;
        const model = this.refs.updateModel.value;
        const harga = this.refs.updateHarga.value;
        const desc = this.refs.updateDesc.value;
        const img = this.refs.updateImg.value;

        axios.put('http://localhost:1988/produk/' + id, {
            brand, model, harga, desc, img
        }).then((res) => {
            console.log(res);
            this.getProduk();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnDeleteClick = (id, brand, model) => {
        if(window.confirm('Are you sure want to delete: ' + brand + ' ' + model + ' ?')) {
            axios.delete('http://localhost:1988/produk/' + id)
                .then((res) => {
                    console.log(res);
                    this.getProduk();
                })
                .catch((err) => {
                    console.log(err);
                })
            }
    }

    convertToRupiah = (angka) => {
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 === 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    formSearch = () => {
        var filtered = this.refs.query.value;
        this.setState({ filterForm: filtered });
    }

    filterProduk = () => {
        var listFilteredProduk = this.state.listProduk.filter((item) => {
            return (
                item.brand.includes(this.state.filterForm)
            )
        })
        return listFilteredProduk;
    }
  
    renderListProduk = () => {
    var listJSXProduk = this.filterProduk().map((item) => {

        //====================START >> EDIT ITEM PRODUK=========================//
        if(item.id === this.state.selectedIdEdit) {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td><input type="text" defaultValue={item.brand} size="4"
                    ref="updateBrand" className="form-control" /></td>
                    <td><input type="text" defaultValue={item.model}  size="4"
                    ref="updateModel" className="form-control" /></td>
                    <td><input type="number" defaultValue={item.harga} 
                    ref="updateHarga" className="form-control" /></td>
                    <td><textarea name="desc" cols="4" defaultValue={item.desc} 
                    ref="updateDesc" className="form-control"></textarea></td>
                    <td><input type="text" defaultValue={item.img}  size="4"
                    ref="updateImg" className="form-control" /></td>
                    <td>
                        <button className="btn btn-success"
                            onClick={() => this.onBtnSaveClick(item.id)}>
                            <i className="fa fa-save fa-sm"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-secondary"
                            onClick={() => this.setState( { selectedIdEdit:0 } )}>
                            <i className="fa fa-times fa-sm"></i>
                        </button>
                    </td>
                </tr>
            )
        }
        //====================END >> EDIT ITEM PRODUK=========================//

        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{this.convertToRupiah(item.harga)}</td>
                <td>{item.desc}</td>
                <td><img src={item.img} alt={item.model} width="150px" height="100px" /></td>
                <td>
                    <button className="btn btn-info" 
                        onClick={ () => this.setState({ selectedIdEdit: item.id }) }>
                        <i className="fa fa-edit fa-sm"></i>
                    </button>
                    &nbsp;
                    <button className="btn btn-danger"
                        onClick={ () => this.onBtnDeleteClick(item.id, item.brand, item.model) }>
                        <i className="fa fa-trash fa-sm"></i>
                    </button>
                </td>
            </tr>
        )

    })
        return listJSXProduk;
    }

        
    render() {

        const thisCookie = theCookies.get('UserData'); //======> NGAMBIL DATA COOKIES
        if(thisCookie) { 
            return(
                <div>
                    <h1>Manage Produk</h1>
                    <br/>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <InputGroup>
                            <input type="text" className="form-control" 
                            placeholder="Cari produk berdasarkan brand"
                            ref="query" onKeyUp={() => {this.formSearch()}} />
                        </InputGroup>
                        </Col>
                    </Row>
                    <br/>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Harga</th>
                                <th>Desc</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListProduk()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><button className="btn btn-success" onClick={() => this.onBtnAddClick()}>
                                <i className="fa fa-plus"></i> Add</button></td>
                                <td><input type="text" size="8" placeholder="Input brand" ref="addBrand" 
                                    className="form-control" /></td>
                                <td><input type="text" size="8" placeholder="Input model" ref="addModel" 
                                    className="form-control" /></td>
                                <td>
                                    <input type="number" placeholder="Input harga" ref="addHarga"
                                    className="form-control"/>
                                </td>
                                <td>
                                    <textarea name="desc" cols="10" placeholder="Input description" 
                                    ref="addDesc" className="form-control"></textarea>
                                </td>
                                <td><input type="text" size="8" placeholder="Input link gambar" ref="addImg"
                                    className="form-control"/></td>
                                <td align="center">
                                <button className="btn btn-success" onClick={() => this.onBtnAddClick()}>
                                <i className="fa fa-plus"></i> Add</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }

}

export default ManageProduk;