import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles/react-confirm-alert.css';
import { Grid, IconButton, Typography } from '@material-ui/core';
import Notes from '../Notes/Notes';
import Contacts from '../Contacts/Contacts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      notes: '',
      contacts: '',
      userFeed: '',
      redirectToReferrer: false,
      name: '',
      title: '',
      description: '',
      showForm: true,
      showFormEdit: true,
      titleUpdate: '',
      descriptionUpdate: '',
      logout: false,
      showFormContact: true,
      showFormContactUpdate: true

    };

    this.getUserFeed = this.getUserFeed.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNoteAction = this.updateNoteAction.bind(this);
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.updateContactAction = this.updateContactAction.bind(this);
    this.createContact = this.createContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.clearData = this.clearData.bind(this);
    this.getContact = this.getContact.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("userData")) {
      this.getUserFeed();
      this.getContact();
    }
    else {
      this.setState({ redirectToReferrer: true });
    }
  }
  clearData() {
    this.state({
      data: [],
      notes: '',
      contact: '',
      userFeed: '',
      redirectToReferrer: false,
      name: '',
      title: '',
      description: '',
      showForm: true,
      showFormEdit: true,
      titleUpdate: '',
      descriptionUpdate: '',
      name: '',
      email: '',
      phone: '',
      idUpdate: '',
      nameUpdate: '',
      emailUpdate: '',
      phoneUpdate: '',
    })
  }
  getUserFeed() {
    var dataParams = JSON.parse(localStorage.getItem("userData"));
    this.setState({ data: dataParams });
    axios.post(`http://162.243.161.34:8080/api/notes/find`, {
      "idUser": dataParams.id
    }
    ).then((response) => {
      if (response && response.data.code === 1) {
        this.setState({ notes: response.data })
      } else {
        alert('Ocurrió un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }
  updateNote(data) {
    this.setState({ showFormEdit: !this.state.showFormEdit, showForm: this.state.showFormEdit ? true : false, titleUpdate: data.title, descriptionUpdate: data.description, data: data })
  }
  updateNoteAction() {
    var data = this.state.data
    console.log("🚀 ~ file: Home.jsx ~ line 82 ~ Home ~ updateNoteAction ~ data", data)
    if (this.state.descriptionUpdate && this.state.titleUpdate) {
      axios.post('http://162.243.161.34:8080/api/notes/update', {
        "id": data.id,
        "title": this.state.titleUpdate,
        "description": this.state.descriptionUpdate,
        "idUser": data.idUser
      }
      ).then((response) => {
        if (response.data.code === 1) {
          alert(response.data.message)
          this.getUserFeed
          window.location.reload(false)

        } else {
          alert('Ocusrrio un error')
        }
      }).catch((error) => {
        console.log('error:', error);
      });
    }
  }

  createNote() {
    if (this.state.title && this.state.description) {
      axios.post('http://162.243.161.34:8080/api/notes/create', {
        "title": this.state.title,
        "description": this.state.description,
        "idUser": this.state.data.id
      }
      ).then((response) => {
        if (response.data) {
          alert('Nota Creada exitosamente')
        } else {
          alert('Ocusrrio un error')
        }
      }).catch((error) => {
        console.log('error:', error);
      });
    } else {
      alert('Ocurrio un Error')
    }
  }
  onChange(e) {
    console.log("🚀 ~ file: Home.jsx ~ line 139 ~ Home ~ onChange ~ e", e)
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteNote(id) {
    axios.post('http://162.243.161.34:8080/api/notes/delete', {
      "id": id
    }
    ).then((response) => {
      if (response.data) {
        this.getUserFeed()
        alert(response.data.message)
      } else {
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }
  getContact() {
    var dataParams = JSON.parse(localStorage.getItem("userData"));
    this.setState({ data: dataParams });
    axios.post(`http://162.243.161.34:8080/api/users/find`, {
      "idUser": dataParams.id
    }
    ).then((response) => {
      if (response && response.data.code === 1) {
        this.setState({ contacts: response.data })
      } else {
        alert('Ocurrió un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }
  updateContact(data) {
    console.log("🚀 ~ file: Home.jsx ~ line 175 ~ Home ~ updateContact ~ data", data)
    this.setState({
      showFormContactUpdate: !this.state.showFormEdit,
      showFormContact: this.state.showFormEdit ? true : false,
      nameUpdate: data.name,
      emailUpdate: data.email,
      phoneUpdate: data.phone,
      idUpdate: data.id,
    })
  }
  updateContactAction() {
    axios.post('http://162.243.161.34:8080/api/users/update', {
      "id": this.state.idUpdate,
      "name": this.state.nameUpdate,
      "phone": this.state.phoneUpdate,
      "mail": this.state.emailUpdate,
      "type": "user"
    }
    ).then((response) => {
      console.log("🚀 ~ file: UserFeed.js ~ line 89 ~ UserFeed ~ ).then ~ response", response)
      if (response.data.code === 1) {
        this.setState({ returnHome: true })
        this.clearData
        this.getUserFeed
        alert(response.data.message);
        window.location.reload(false)
      } else {
        this.clearData
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
      this.clearData
    });
  }
  createContact() {
    if (this.state.name && this.state.email && this.state.phone) {
      axios.post('http://162.243.161.34:8080/api/users/create', {
        "idUser": this.state.data.id,
        "name": this.state.name,
        "phone": this.state.phone,
        "email": this.state.email,
      }
      ).then(response => {
        if (response.data.code === 1) {
          this.getContact
          alert('!Contacto creado')
          window.location.reload(false)
        }
      }).catch((error) => {
        console.log('error:', error);
      });
    } else {
      alert('Ocurrio un Error')
    }
  }
  deleteContact(id) {
    axios.post('http://162.243.161.34:8080/api/users/delete', {
      "id": id,
    }
    ).then((response) => {
      if (response.data.message) {
        alert('Contacto eliminado')
        window.location.reload(false)
      } else {
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
  }
  logout() {
    localStorage.setItem("userData", '');
    localStorage.clear();
    this.setState({ redirectToReferrer: true });
  }

  render() {
    if (this.state.logout) {
      return <Navigate to='/' />;
    }

    return (
      <Grid container className="row" id="Body">
        <Grid item className="medium-12 columns">
          <Grid container spacing={10} direction='row' justifyContent='space-between' >
            <Grid item>
              <IconButton onClick={() => <a href={`/user/${this.state.data.id}`} />}>
                <img alt='logout' src='/assets/img/user.png' width={'30px'} height={'30px'} />
              </IconButton>
              <a>{this.state.data.name}</a>

            </Grid>
            <Grid item>
              <IconButton onClick={() => this.setState({ logout: true })}>
                <img alt='logout' src='/assets/img/logout.png' width={'30px'} height={'30px'} />
              </IconButton>
              {/* <a href="/" onClick={this.logout} className="logout">Logout</a> */}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <form hidden={this.state.showForm}>
                <Grid item container sx={12} sm={6} className="row" id="Body">
                  <Grid item className="medium-5 columns left box-container">
                    <Grid item className='container-form'>
                      <h4>Nueva nota</h4>
                      <label>Título</label>
                      <input type="text" name="title" placeholder="Identifica tu nota" onChange={this.onChange} />
                      <label>Descripción</label>
                      <input type="text" name="description" placeholder="Descripción" onChange={this.onChange} />
                      <input type="button" className="button submit" value="Crear" onClick={this.createNote} />
                      <input type="button" className="button info" value="Cancelar" onClick={() => this.setState({ showForm: true })} />
                    </Grid>
                  </Grid >
                </Grid>
              </form>
              <form hidden={this.state.showFormEdit}>
                <Grid item container sx={12} sm={6} className="row" id="Body">
                  <Grid item className="medium-5 columns left box-container">
                    <Grid item className='container-form'>
                      <h4>Edición</h4>
                      <label>Título</label>
                      <input type="text" name="titleUpdate" value={this.state.titleUpdate} onChange={this.onChange} />
                      <label>Descripción</label>
                      <input type="text" name="descriptionUpdate" value={this.state.descriptionUpdate} onChange={this.onChange} />
                      <input type="button" className="button submit" value="Aceptar" onClick={this.updateNoteAction} />
                      <input type="button" className="button info" value="Cancelar" onClick={() => this.setState({ showFormEdit: true })} />
                    </Grid>
                  </Grid >
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <form hidden={this.state.showFormContact}>
                <Grid item container sx={12} sm={6} className="row" id="Body">
                  <Grid item className="medium-5 columns left box-container">
                    <Grid item className='container-form'>
                      <h4>Nuevo Contacto</h4>
                      <label>Nombre</label>
                      <input type="text" name="name" placeholder="Nombre del contancto" onChange={this.onChange} />
                      <label>Email</label>
                      <input type="text" name="email" placeholder="Correo electrónico" onChange={this.onChange} />
                      <label>Telefono</label>
                      <input type="text" name="phone" placeholder="Telefono" onChange={this.onChange} />
                      <input type="button" className="button submit" value="Añadir contacto" onClick={this.createContact} />
                      <input type="button" className="button info" value="Cancelar" onClick={() => this.setState({ showFormContact: true })} />
                    </Grid>
                  </Grid >
                </Grid>
              </form>
              <form hidden={this.state.showFormContactUpdate}>
                <Grid item container sx={12} sm={6} className="row" id="Body">
                  <Grid item className="medium-5 columns left box-container">
                    <Grid item className='container-form'>
                      <h4>Edición</h4>
                      <label>Nombre</label>
                      <input type="text" name="nameUpdate" value={this.state.nameUpdate} onChange={this.onChange} />
                      <label>Email</label>
                      <input type="text" name="emailUpdate" value={this.state.emailUpdate} onChange={this.onChange} />
                      <label>Telefono</label>
                      <input type="text" name="phoneUpdate" value={this.state.phoneUpdate} onChange={this.onChange} />
                      <input type="button" className="button submit" value="Aceptar" onClick={this.updateContactAction} />
                      <input type="button" className="button info" value="Cancelar" onClick={() => this.setState({ showFormContactUpdate: true })} />
                    </Grid>
                  </Grid >
                </Grid>
              </form>
            </Grid>
          </Grid>

          <Grid container justifyContent='space-between' >
            <Grid item hidden={!this.state.showForm} hidden={!this.state.showFormEdit || !this.state.showForm}>
              <input
                type="submit"
                value="Nueva nota"
                className="button"
                onClick={() => this.setState({ showForm: false, showFormEdit: true })} />
            </Grid>
            <Grid item hidden={!this.state.showForm} hidden={!this.state.showFormEdit || !this.state.showForm}>
              <input
                type="submit"
                value="Nuevo Contacto"
                className="button"
                onClick={() => this.setState({ showFormContact: false, showFormEdit: true, })} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography>
              Notas
            </Typography>
            {
              this.state.notes.data ?
                <Notes notes={this.state.notes.data} deleteNote={this.deleteNote} updateNote={this.updateNote} />
                :
                <Grid>
                  No hay notas
                </Grid>
            }
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              Contactos
            </Typography>
            {
              this.state.notes.data ?
                <Contacts contacts={this.state.contacts.data} deleteContact={this.deleteContact} updateContact={this.updateContact} />
                :
                <Grid>
                  No hay notas
                </Grid>
            }
          </Grid>
        </Grid>
      </Grid >
    );
  }
}

export default Home;