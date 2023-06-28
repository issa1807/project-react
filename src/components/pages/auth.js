import React, {Component} from 'react';
import Login from "../auth/login";
import loginImg from "../images/login.jpg";



export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }
  
  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    this.props.history.push("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }
  
  render() {
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
          style={{
            backgroundImage: `url(${loginImg})`
          }}
        />

        <div className="right-column">
          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
        </div>
      </div>
    );
  }
}
// export default class Auth extends Component {
//   constructor(props) {
//     super(props);

//     this.handleSuccessfulAuth = this.componentDidCatch.handleSuccessfulAuth.bind(this);
//     this.handleUnsuccessfulAuth = this.componentDidCatch.handleUnsuccessfulAuth.bind(this);
//   }
  
//    handleSuccessfulAuth(){
//     this.props.handleSuccessfulLogin();
//     this.props.history.push("/");
//    }

//    handleUnsuccessfulAuth() {
//      this.props.hansleUnsuccessfulLLogin();

//    }
//     render() {
//       return (
//         <div className="auth-page-wrapper">
//           <div
//             className="left-column"
//             style={{
//               backgroundImage: `url(${loginImg})`
//             }}
//           />
  
//           <div className="right-column">
//             <Login
//             handleeSuccessfulAuth={this.handleSuccessfulAuth}
//             handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
//             />
//           </div>
//         </div>
//       );
//     }
//   }










// export default class Auth extends Component {
//     constructor(props) {
//       super(props);
  
//       this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
//       this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
//     }
  
//     handleSuccessfulAuth() {
//       this.props.handleSuccessfulLogin();
//       this.props.history.push("/");
//     }
  
//     handleUnsuccessfulAuth() {
//       this.props.handleUnsuccessfulLogin();
//     }
  
//     render() {
//       return (
//         <div className="auth-page-wrapper">
//           <div
//             className="left-column"
//             style={{
//               backgroundImage: `url(${Loging})`
//             }}
//           />
  
//           <div className="right-column">
//             <Loging
//               handleSuccessfulAuth={this.handleSuccessfulAuth}
//               handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
//             />
//           </div>
//         </div>
//       );
//     }
//   }