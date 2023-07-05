
import "./style/main.scss";
import React, { Component } from "react";


import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


import NavigationContainer from "./components/navigation/navigation-container";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import BlogDetail from "./components/pages/blog-detail";
import PortfolioManager from "./components/pages/portfolio-manager";
import PortfolioDetail from "./components/portfolio/portfolio-detail";
import Auth from "./components/pages/auth";
import NoMatch from "./components/pages/no-match";
import Icons from "../src/helpers/icons";


export default class App extends Component {
  
constructor(props) {
  super(props);

  Icons();

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
      <Route key="portfolio-manager" path="/portfolio-manager" element={<PortfolioManager/>}/>
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
  
            <h2>{this.state.loggedInStatus}</h2>
  
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/auth"
                element={
                  <Auth
                    {...this.props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                    history={this.props.history}
                  />
                }
              />
              <Route path="/about-me" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route
                path="/blog"
                render={props => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />


              <Route path="/b/:slug" element={BlogDetail} />
              {this.state.loggedInStatus === "LOGGED_IN" ? (
                this.authorizedPages()
              ) : null}
              <Route
                exact
                path="/portfolio/:slug"
                element={PortfolioDetail}
              />

                    {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
                    <Route exact path="/portfolio/:slug" element={<PortfolioDetail/>} />
                    { <Route path="/:slug" element={<NoMatch />} /> }
                  </Routes>
                </div>
              </Router>
            </div>
          );
        }
      }  