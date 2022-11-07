import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import '../../styles/react-confirm-alert.css';
import { Grid, Typography } from '@material-ui/core';
import Notes from '../Notes/Notes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      notes: '',
      userFeed: '',
      redirectToReferrer: false,
      name: '',
      title: '',
      description: '',
      showForm: true,
      showFormEdit: true,
      titleUpdate: '',
      descriptionUpdate: '',
    };

    this.getUserFeed = this.getUserFeed.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNoteAction = this.updateNoteAction.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("userData")) {
      this.getUserFeed();
    }
    else {
      this.setState({ redirectToReferrer: true });
    }
  }

  updateNote(data) {
    console.log("🚀 ~ file: Home.jsx ~ line 44 ~ Home ~ updateNote ~ data", data)
    this.setState({ showFormEdit: false, titleUpdate: data.title, descriptionUpdate: data.description, data: data })
  }
  updateNoteAction() {
    var data = this.state.data
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
        } else {
          alert('Ocusrrio un error')
        }
      }).catch((error) => {
        console.log('error:', error);
      });
    }
  }

  getUserFeed() {
    let data = JSON.parse(localStorage.getItem("userData"));
    this.setState(data);
    axios.post(`http://162.243.161.34:8080/api/notes/find`
    ).then((response) => {
      if (response && response.data.code === 1) {
        this.setState({ notes: response.data })
      } else {
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
    if (data) {
      this.setState({ data: data })
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
          alert(response.data.message)
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
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteNote(id) {
    console.log("🚀 ~ file: Home.jsx ~ line 91 ~ Home ~ deleteNote ~ id", id)
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

  logout() {
    localStorage.setItem("userData", '');
    localStorage.clear();
    this.setState({ redirectToReferrer: true });
  }

  render() {
    if (this.state.redirectToReferrer) {
      // return (<Redirect to={'/login'}/>)
    }

    return (
      <Grid container className="row" id="Body">
        <Grid item className="medium-12 columns">
          <Grid item container spacing={10} alignItems='center' direction='row' >
            <Grid item>
              <a href={`/user/${this.state.data.id}`}>{this.state.data.name}</a>
            </Grid>
            <Grid item>
              <a href="/" onClick={this.logout} className="logout">Logout</a>
            </Grid>
          </Grid>
          <form onSubmit={this.createNote} hidden={this.state.showForm}>
            <Grid item container sx={12} sm={6} className="row" id="Body">
              <Grid item className="medium-5 columns left box-container">
                <Grid item className='container-form'>
                  <h4>Nueva nota</h4>
                  <label>Título</label>
                  <input type="text" name="title" placeholder="Identifica tu nota" onChange={this.onChange} />
                  <label>Descripción</label>
                  <input type="text" name="description" placeholder="Descripción" onChange={this.onChange} />
                  <input type="submit" className="button submit" value="Crear" onClick={() => this.createNote} />
                  <input type="button" className="button info" value="Cancelar" onClick={() => this.setState({ showForm: true })} />
                </Grid>
              </Grid >
            </Grid>
          </form>
          <form onSubmit={this.updateNoteAction} hidden={this.state.showFormEdit}>
            <Grid item container sx={12} sm={6} className="row" id="Body">
              <Grid item className="medium-5 columns left box-container">
                <Grid item className='container-form'>
                  <h4>Edición</h4>
                  <label>Título</label>
                  <input type="text" name="titleUpdate" placeholder={this.state.titleUpdate} onChange={this.onChange} />
                  <label>Descripción</label>
                  <input type="text" name="descriptionUpdate" placeholder={this.state.descriptionUpdate} onChange={this.onChange} />
                  <input type="submit" className="button submit" value="Aceptar" onClick={() => this.updateNoteAction} />
                  <input type="button" className="button info" value="Cancelar" onClick={() => this.setState({ showFormEdit: true })} />
                </Grid>
              </Grid >
            </Grid>
          </form>
          <Grid item hidden={!this.state.showForm}>
            <input
              type="submit"
              value="New"
              className="button"
              onClick={() => this.setState({ showForm: false, showFormEdit: true })} />
          </Grid>
        </Grid>
        <Grid container>
          {
            this.state.notes.data ?
              <Notes notes={this.state.notes.data} deleteNote={this.deleteNote} updateNote={this.updateNote} />
              :
              <Grid>
                No hay notas
              </Grid>
          }
        </Grid>
      </Grid >
    );
  }
}

export default Home;