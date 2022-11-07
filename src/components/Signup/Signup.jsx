import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Grid, Typography } from '@material-ui/core'
// import {Redirect} from 'react-router-dom';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      name: '',
      redirectToReferrer: false
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  signup() {
    if (this.state.username && this.state.password && this.state.email && this.state.name) {
      PostData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      // return (<Redirect to={'/home'}/>)
    }
    return (
      <Grid container>
        <Grid item className='img-login' sx={12} sm={6} >
          <img ref='logo-inicial' src='/assets/img/9812.png'></img>
        </Grid>
        <Grid item container sx={12} sm={6} className="row" id="Body">
          <Grid item className="medium-5 columns left box-container">
            <Grid item className='container-form'>
              <h4>Registro</h4>
              <label>Email</label>
              <input type="text" name="email" placeholder="Email" onChange={this.onChange} />
              <label>Nombre</label>
              <input type="text" name="name" placeholder="Name" onChange={this.onChange} />
              <label>Nombre de usuario</label>
              <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
              <label>Contraseña</label>
              <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
              <input type="submit" className="button" value="Registrate" onClick={this.signup} />
              <a href="/">Cancelar</a>
            </Grid>
          </Grid >
        </Grid>
      </Grid>
    );
  }
}

export default Signup;