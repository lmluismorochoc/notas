import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core'
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      redirectToReferrer: false,
      isFormComplete: true
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  signup() {
    if (this.state.name && this.state.email && this.state.phone && this.state.password) {
      axios.post('http://162.243.161.34:8080/api/users/create', {
        "name": this.state.name,
        "phone": this.state.phone,
        "email": this.state.email,
        "password": this.state.password,
        "type": "user"
      }
      ).then(response => {
        console.log("🚀 ~ file: Signup.jsx ~ line 35 ~ Signup ~ ).then ~ response", response)
        this.setState({ redirectToReferrer: true })
        alert('!Usuario creado')
      }).catch((error) => {
        console.log('error:', error);
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.name && this.state.email && this.state.phone && this.state.password) {
      this.setState({ isFormComplete: false })
    }
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Navigate to='/' />
    }
    return (
      <Grid container>
        <Grid item className='img-login' sx={12} sm={6} >
          <img alt='logo-inicial' src='/assets/img/9812.png'></img>
        </Grid>
        <Grid item container sx={12} sm={6} className="row" id="Body">
          <Grid item className="medium-5 columns left box-container">
            <form id='logRegisterForm'>
              <Grid item className='container-form'>
                <h4>Registro</h4>
                <label>Nombre</label>
                <input type="text" name="name" placeholder="Name" onChange={this.onChange} />
                <label>Email</label>
                <input type="text" name="email" placeholder="Email" onChange={this.onChange} />
                <label>Teléfono</label>
                <input type="text" name="phone" placeholder="Teléfono" onChange={this.onChange} />
                <label>Contraseña</label>
                <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                <input type="button" disabled={this.state.isFormComplete} className="button" value="Registrate" onClick={this.signup} />
                <a href="/">Cancelar</a>
              </Grid>
            </form>
          </Grid >
        </Grid>
      </Grid>
    );
  }
}

export default Signup;