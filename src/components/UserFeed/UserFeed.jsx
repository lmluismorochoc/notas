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
      name: '',
      direction: '',
      email: '',
      phone: '',
      password: '',
    };
    this.deleteUserFeed = this.deleteUserFeed.bind(this);
    this.getUserFeed = this.getUserFeed.bind(this);
    this.editUserFeed = this.editUserFeed.bind(this);
    this.clearData = this.clearData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  deleteUserFeed(id) {
    axios.post('http://162.243.161.34:8080/api/users/delete', {
      "id": id,
    }
    ).then((response) => {
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
      } else {
        alert('Ocurrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }

  editUserFeed() {
    this.setState({
      name: this.state.dataUsers.name,
      email: this.state.dataUsers.email,
      phone: this.state.dataUsers.phone,
      password: this.state.dataUsers.password
    })
    if (this.state.name &&
      this.state.direction &&
      this.state.email &&
      this.state.phone &&
      this.state.password) {
      console.log('Entre')
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
        if (response.data) {
          this.setState({ returnHome: true })
          this.clearData
          this.getUserFeed
          alert(response.data.message);
        } else {
          this.clearData
          alert('Ocusrrio un error')
        }
      }).catch((error) => {
        console.log('error:', error);
        this.clearData
      });
    }
  }
  clearData() {
    this.setState({
      name: '',
      direction: '',
      email: '',
      phone: '',
      password: '',
    })
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
            <a type="button" className="button-info info" href="/home">Volver</a>
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
                <input type="text" name="name" placeholder={this.state.dataUsers.name} onChange={this.onChange} />
                <label>Direccion</label>
                <input type="text" name="direction" placeholder={'Direccion'} onChange={this.onChange} />
                <label>Email</label>
                <input type="text" name="email" placeholder={this.state.dataUsers.email} onChange={this.onChange} />
                <label>Teléfono</label>
                <input type="text" name="phone" placeholder={this.state.dataUsers.phone} onChange={this.onChange} />
                <label>Contraseña</label>
                <input type="password" name="password" placeholder={this.state.dataUsers.password} onChange={this.onChange} />
                <input type="submit" className="button" value="Editar" onClick={() => this.editUserFeed()} />
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