import React, { Component } from "react";
import './App.css';
import moment from 'moment';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink
} from 'react-router-dom';
// import axios from 'axios';
import NavigationContainer from "./components/navigation/navigation-container";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import PortfolioDetail from "./components/portfolio/porfolio-detail";
import NoMatch from "./components/pages/no-match";
export default class App extends Component {
render() {
  return (
    <div className="App">
      <Router>
        <div>
        <h1>Isabella Perez Portfolio </h1>
     <div>
      {moment().format('MMMM Do YYYY, h:mm:ss a')}
     </div>
          <NavigationContainer />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/about-me" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route exact="/portfolio/:slug" element={<PortfolioDetail/>}/>
            <Route component={PortfolioDetail}/>
          </Routes>
        </div>
      </Router>
    
    
    </div>
  );
}
}
