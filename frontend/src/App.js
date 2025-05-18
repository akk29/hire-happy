import React , {Component} from 'react';
import Route from '../src/main/route'
import "./App.css"
import "../src/static/site.css"
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component{

  constructor() {
    super()
    this.state = {
      text : 'hello world'
    }
  }

  render(){
    return(
      <Provider store={store}>
        <div className="container main-container">
           <ToastContainer pauseOnFocusLoss={false} />
          <Route />
        </div>
      </Provider>
    )
  }

}

export default App;
