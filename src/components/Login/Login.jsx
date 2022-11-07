import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from "axios";
import { Navigate } from "react-router-dom"
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      dataUser: '',
      stateAuth: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  login() {
    if (this.state.username && this.state.password) {
      axios.post(`http://162.243.161.34:8080/api/users/login`, {
        "email": this.state.username,
        "password": this.state.password
      }
      ).then((response) => {
        if (response && response.data.code === 1) {
          localStorage.setItem('userData', JSON.stringify(response.data.data))
          this.setState({ stateAuth: true })
        } else {
          alert('Ocusrrio un error')
        }
      }).catch((error) => {
        console.log('error:', error);
      });
    }
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { stateAuth } = this.state;
    if (stateAuth) {
      return <Navigate to='/home' />;
    }
    return (
      <Grid container>
        <Grid item className='img-login' sx={12} sm={6}>
          <img ref='logo-inicial' src='/assets/img/6316.png'></img>
          <Typography className='title-txt'>Organizate</Typography>
          <Typography className='body-txt'>Toma notas y usalo como un tablero personal</Typography>
        </Grid>
        <Grid item container sx={12} sm={6} className="row" id="Body" >
          <Grid item className="medium-5 columns left box-container">
            <Grid item className='container-form'>
              <Typography className='title-form' >Login</Typography>
              <label>Usuario</label>
              <input type="text" name="username" placeholder="Usuario" onChange={this.onChange} />
              <label>Contraseña</label>
              <input type="password" name="password" placeholder="Contraseña" onChange={this.onChange} />
              <input type="submit" className="button success" value="Login" onClick={this.login} />
              <a type="button" className="button-info info" href="/Registro">Registrate</a>
            </Grid>
          </Grid>
        </Grid>
        {
          this.state.dataUser && console.log(this.state.dataUser)

        }
      </Grid >
    );
  }
}

export default Login;