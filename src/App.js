import React,{Component} from "react";
import Routes from './routes/index';
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";


export default class App extends Component {

//   componentDidMount(){
//   window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// /**
//  * Next we will register the CSRF Token as a common header with Axios so that
//  * all outgoing HTTP requests automatically have it attached. This is just
//  * a simple convenience so we don't have to attach every token manually.
//  */

// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//   console.log("token", token.content)
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }
//   }
  render() {
    return (
      <Router>
        <Routes/>
      </Router>
    )
  }
}
