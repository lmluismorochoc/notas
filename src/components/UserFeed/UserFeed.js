import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './UserFeed.css';
import { Grid, Typography } from '@material-ui/core';

class UserFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem("userData")),
      showFormUpdateFeedUser: true,
      returnLog: false,
      returnHome: false
    }
    this.deleteUserFeed = this.deleteUserFeed.bind(this);
    this.editUserFeed = this.editUserFeed.bind(this);
  }
  deleteUserFeed(id) {
    axios.post('http://162.243.161.34:8080/api/users/delete', {
      "id": id,
    }
    ).then((response) => {
      console.log("🚀 ~ file: UserFeed.js ~ line 22 ~ UserFeed ~ ).then ~ response", response)
      if (response.data.message) {
        alert(response.data.message)
        this.setState({ returnLog: true })
      } else {
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }
  editUserFeed(data) {

    console.log("🚀 ~ file: UserFeed.js ~ line 16 ~ UserFeed ~ deleteUserFeed ~ id", data)

  }
  render() {
    if (this.state.returnLog) {
      return <Navigate to='/' />;
    }
    if (this.state.returnHome) {
      return <Navigate to='/home' />;
    }
    return (
      <Grid container>
        <Grid item className="medium-12 columns" key={3}>
          <div className="people-you-might-know">
            <div className="row add-people-section">
              <div className="small-12 medium-10 columns about-people">
                <Grid item className="about-people-author">
                  <p className="author-name">
                    <Typography>
                      <strong>Usuario:</strong> {this.state.data.name}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {this.state.data.email}
                    </Typography>
                    <Typography>
                      <strong>Teléfono:</strong> {this.state.data.phone}
                    </Typography>
                    <Typography>
                      <strong>Fecha de creación/Actualizacion:</strong> {this.state.data.updatedAt}
                    </Typography>
                    <br />
                  </p>

                </Grid>
              </div>
              <Grid container className="small-12 medium-2 columns add-friend">
                <Grid item className="add-friend-action">
                  <button className="button success small" onClick={() => this.editUserFeed(this.state.data)} color='primary' >
                    Editar
                  </button>
                  <button className="button primary small" onClick={() => this.deleteUserFeed(this.state.data.id)} >
                    Eliminar
                  </button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item container sx={12} sm={6} className="row" id="Body">
          <Grid item className="medium-5 columns left box-container">
            <form onSubmit={this.signup}>
              <Grid item className='container-form'>
                <h4>Registro</h4>
                <label>Nombre</label>
                <input type="text" name="name" placeholder="Name" onChange={this.onChange} />
                <label>Direccion</label>
                <input type="text" name="direction" placeholder="Dirección" onChange={this.onChange} />
                <label>Email</label>
                <input type="text" name="email" placeholder="Email" onChange={this.onChange} />
                <label>Teléfono</label>
                <input type="text" name="phone" placeholder="Teléfono" onChange={this.onChange} />
                <label>Nombre de usuario</label>
                <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
                <label>Contraseña</label>
                <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                <input type="submit" disabled={this.state.isFormComplete} className="button" value="Registrate" onClick={this.signup} />
                <a href="/">Cancelar</a>
              </Grid>
            </form>
          </Grid >
        </Grid>
      </Grid>
    );
  }

}

export default UserFeed;