import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const theCookies = new Cookies();

class tableList extends Component {

    state = { listTerapis: [] }

    componentDidMount() {
      axios.get('http://localhost:1988/terapis')
           .then((res) => {
             console.log(res);
             this.setState({ listTerapis: res.data });
           }).catch((err) => {
             console.log(err);
           })
    }

    renderListTerapis = () => {
      var listJSXTerapis = this.state.listTerapis.map((item) => {
        return (

            <tr>
              <td>{item.nocan}</td>
              <td>{item.face}</td>
              <td>{item.body}</td>
              <td>{item.pm}</td>
              <td>{item.hj}</td>
              <td>{item.bj}</td>
              <td>{item.fj}</td>
              <td>{item.gfe}</td>
              <td>{ `${(item.face+item.body+item.pm+item.hj+item.bj+item.fj+item.gfe)}` }</td>
              <td>{item.price}</td>
            </tr>
          
        )
      })
      return listJSXTerapis;
    }

    render() {
      const thisCookie = theCookies.get('UserData'); //======> NGAMBIL DATA COOKIES
      if(thisCookie) {
        return (
          <div>
              <h3>Table List: </h3>
              <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">NOCAN</th>
                  <th scope="col">FACE</th>
                  <th scope="col">BODY</th>
                  <th scope="col">PM</th>
                  <th scope="col">HJ</th>
                  <th scope="col">BJ</th>
                  <th scope="col">FJ</th>
                  <th scope="col">GFE</th>
                  <th scope="col">SCORE</th>
                  <th scope="col">PRICE</th>
                </tr>
              </thead>
              <tbody>
              {this.renderListTerapis()}
              </tbody>
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

export default tableList;