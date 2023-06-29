import "./style/main.scss";
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
import axios from 'axios';
import NavigationContainer from "./components/navigation/navigation-container";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import PortfolioManager from "./components/pages/portfolio-manager";
import PortfolioDetail from "./components/portfolio/portfolio-detail";
import Auth from "./components/pages/auth";
import NoMatch from "./components/pages/no-match";
export default class App extends Component {
  
constructor(props) {
  super(props);


  this.state = {
    loggedInStatus: "NOT_LOGGED_IN"
  };

  this. handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  this. handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
  this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
}
   
  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

   handleSuccessfulLogout() {
    this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  })
   }

  checkLoginStatus() {
    return axios
    .get ("https://api.devcamp.space/logged_in", {
      withCredentials: true
    })
    .then(response => {
     const loggedIn = response.data.logged_in;
     const loggedInStatus = this.state.loggedIn;

    //  if loggedIn and the status LOGGED_IN => return data 
    //  if loggedIn status NOT_LOGGEDF_IN => update state
    //  if not loggedIn and status LOGGED_IN => update state
    
     if (loggedIn && loggedInStatus === 'LOGGED_IN') {
      return loggedIn;
     } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
       this.setState({
        loggedInStatus: "LOGGED_IN"
       });
     } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
        loggedInStatus: "NOT_LOGGED_IN"
       });
     }
   })
   .catch(error => {
     console.log("Error", error);
   })
   
  }


  componentDidMount() {
    this.checkLoginStatus();
  }
  authorizedPages() {
     return [
      <Route key="port-manager" path="/portfolio-manager" element={<PortfolioManager/>}/>
      ];
  }


render() {
  return (
    <div className="container">
        <Router>
          <div>
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

          <Routes>
            <Route exact path="/" element={<Home/>}/>

            <Route 
              path="/auth"
              element={
                <Auth
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />
              }
            />

            <Route path="/about-me" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/blog" element={<Blog/>}/>
            {this.state.loggedInStatus === "LOGGED_IN" ? (
            this.authorizedPages() 
            ) : null }
            <Route exact="/portfolio/:slug" element={<PortfolioDetail/>}/>
            <Route component={PortfolioDetail}/>
          </Routes>
        </div>
      </Router>
    
    
    </div>
  );
}

}