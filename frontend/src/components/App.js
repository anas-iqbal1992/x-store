import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoute from './AppRoute';
import Home from './home'
import Products from './products'
import HomeLayout from './layouts/Home'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="cointainer">
          <AppRoute exact path='/' component={Home} layout={HomeLayout} />
          <AppRoute exact path='/products/:id' component={Products} layout={HomeLayout} />
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
