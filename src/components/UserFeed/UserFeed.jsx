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
      dataUsers: [],
      showFormUpdateFeedUser: true,
      returnLog: false,
      returnHome: false,
      nameUpdate: '',
      directionUpdate: '',
      emailUpdate: '',
      phoneUpdate: '',
      usernameUpdate: '',
      passwordUpdate: '',
    };
    this.deleteUserFeed = this.deleteUserFeed.bind(this);
    this.getUserFeed = this.getUserFeed.bind(this);
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
  getUserFeed(data) {
    this.setState({
      showFormUpdateFeedUser: false,
    })
    var { name, id } = data
    axios.post('http://162.243.161.34:8080/api/users/find', {
      "name": name,
    }
    ).then((response) => {
      if (response.data.code === 1) {
        var userFeed = response.data.data.find(element => element.id === id)
        this.setState({ dataUsers: userFeed })
        console.log("🚀 ~ file: UserFeed.js ~ line 68 ~ UserFeed ~ editUserFeed ~ his.state.dataUsers", this.state.dataUsers)
      } else {
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }

  editUserFeed(data) {
    this.setState({
      nameUpdate: this.state.dataUsers.name,
      emailUpdate: this.state.dataUsers.email,
      phoneUpdate: this.state.dataUsers.phone,
      passwordUpdate: this.state.dataUsers.password
    })
    console.log("🚀 ~ file: UserFeed.js ~ line 16 ~ UserFeed ~ deleteUserFeed ~ id", data)
    if (this.state.nameUpdate &&
      this.state.directionUpdate &&
      this.state.emailUpdate &&
      this.state.phoneUpdate &&
      this.state.usernameUpdate &&
      this.state.passwordUpdate) {
      axios.post('http://162.243.161.34:8080/api/users/update', {
        "id": this.state.data.id,
        "name": this.state.nameUpdate,
        "direction": this.state.directionUpdate,
        "phone": this.state.phoneUpdate,
        "mail": this.state.emailUpdate,
        "password": this.state.passwordUpdate,
        "type": "user"
      }
      ).then((response) => {
        console.log("🚀 ~ file: UserFeed.js ~ line 89 ~ UserFeed ~ ).then ~ response", response)
        if (response.data.code === 1) {
          alert(response.data.message);
          this.setState({ returnHome: true })
        } else {
          alert('Ocusrrio un error')
        }
      }).catch((error) => {
        console.log('error:', error);
      });
    }

  }
  onChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
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
          <Grid item className="people-you-might-know">
            <Grid item className="row add-people-section">
              <Grid item className="small-12 medium-10 columns about-people">
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
              </Grid>
              <Grid container className="small-12 medium-2 columns add-friend">
                <Grid item className="add-friend-action">
                  <button name='editButton' className="button success small" onClick={() => this.getUserFeed(this.state.data)} color='primary' >
                    Editar
                  </button>
                  <button name='deleteButton' className="button primary small" onClick={() => this.deleteUserFeed(this.state.data.id)} >
                    Eliminar
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container sx={12} sm={6} className="row" id="Body">
          <Grid item className="medium-5 columns left box-container">
            <form id='updateUser' onSubmit={this.editUserFeed} hidden={this.state.showFormUpdateFeedUser}>
              <Grid item className='container-form'>
                <h4>{`${this.state.data.name}`}</h4>
                <label>Nombre</label>
                <input type="text" name="nameUpdate" placeholder={this.state.dataUsers.name} onChange={this.onChange} />
                <label>Direccion</label>
                <input type="text" name="directionUpdate" placeholder={'Direccion'} onChange={this.onChange} />
                <label>Email</label>
                <input type="text" name="emailUpdate" placeholder={this.state.dataUsers.email} onChange={this.onChange} />
                <label>Teléfono</label>
                <input type="text" name="phoneUpdate" placeholder={this.state.dataUsers.phone} onChange={this.onChange} />
                <label>Nombre de usuario</label>
                <input type="text" name="usernameUpdate" placeholder={'Username'} onChange={this.onChange} />
                <label>Contraseña</label>
                <input type="password" name="passwordUpdate" placeholder={this.state.dataUsers.password} onChange={this.onChange} />

                <input type="submit" className="button" value="Editar" onClick={() => this.editUserFeed} />
                <input type="button" className="button primary" value="Cancelar" onClick={() => this.setState({ showFormUpdateFeedUser: true })} />
              </Grid>
            </form>
          </Grid >
        </Grid>
      </Grid>
    );
  }

}

export default UserFeed;