import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import { PostData } from '../../services/PostData';
import axios from 'axios';
import UserFeed from "../UserFeed/UserFeed";
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
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
      showForm: false
    };

    this.getUserFeed = this.getUserFeed.bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.deleteFeedAction = this.deleteFeedAction.bind(this);
    this.convertTime = this.convertTime.bind(this);
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

  feedUpdate(e) {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("userData"));
    // let postData = { user_id: data.userData.user_id, token: data.userData.token, feed: this.state.userFeed };
    console.log("🚀 ~ file: Home.jsx ~ line 48 ~ Home ~ feedUpdate ~ data", data)
    if (this.state.userFeed) {
      // PostData('feedUpdate', postData).then((result) => {
      //   let responseJson = result;
      //   let K = [responseJson.feedData].concat(this.state.data);
      //   console.log(K);
      //   this.setState({ data: K, userFeed: '' });
      // } 
      // );
    }
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  deleteFeedAction(e) {
    console.log("HI");
    let updateIndex = e.target.getAttribute('value');
    let feed_id = e.target.getAttribute('data');

    let data = JSON.parse(sessionStorage.getItem("userData"));

    let postData = { user_id: data.userData.user_id, token: data.userData.token, feed_id: feed_id };
    if (postData) {
      PostData('feedDelete', postData).then((result) => {
        this
          .state
          .data.splice(updateIndex, 1);
        this.setState({
          data: this
            .state
            .data
        });
      });
    }
  }

  deleteFeed(e) {
    confirmAlert({
      title: '',
      message: 'Are you sure?',
      childrenElement: () => '',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      onConfirm: () => this.deleteFeedAction(e),
      onCancel: () => '',
    })
  }

  getUserFeed() {
    let data = JSON.parse(localStorage.getItem("userData"));
    this.setState(data);
    axios.post(`http://162.243.161.34:8080/api/notes/find`
    ).then((response) => {
      console.log("🚀 ~ file: Login.jsx ~ line 28 ~ Login ~ ).then ~ response", response)
      if (response && response.data.code === 1) {
        this.setState({ notes: response.data })
      } else {
        alert('Ocusrrio un error')
      }
    }).catch((error) => {
      console.log('error:', error);
    });
    // let postData = { user_id: data.userData.user_id, token: data.userData.token };

    if (data) {
      this.setState({ data: data })
      console.log(this.state);
    }
  }

  onChange(e) {
    this.setState({ userFeed: e.target.value });
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
              <Typography>{this.state.data.name}</Typography>
            </Grid>
            <Grid item>
              <a href="/" onClick={this.logout} className="logout">Logout</a>
            </Grid>
          </Grid>
          <form onSubmit={this.feedUpdate} method="post">
            <Grid item container sx={12} sm={6} className="row" id="Body">
              <Grid item className="box-container">
                <Grid item className='container-form'>
                  <h4>Nueva Nota</h4>
                  <label>Título</label>
                  <input type="text" name="title" placeholder="Identifica tu nota" onChange={this.onChange} />
                  <label>Descripción</label>
                  <input type="text" name="description" placeholder="Descripción" onChange={this.onChange} />
                  <input type="submit" className="button submit" value="Crear" onClick={this.signup} />
                  <input type="button" className="button info" value="Cancelar" onClick={this.signup} />
                </Grid>
              </Grid >
            </Grid>
            {/* <input name="userFeed" onChange={this.onChange} value={this.state.userFeed} type="text" placeholder="Ingresar una nueva nota" /> */}
            <input
              type="submit"
              value="New"
              className="button"
              onClick={this.feedUpdate} />
          </form>

        </Grid>
        <Grid container>
          {
            this.state.notes.data ?
              <Notes notes={this.state.notes.data} />
              :
              <Grid>
                No hay notas
              </Grid>
          }

        </Grid>
        {/* <UserFeed feedData={this.state.data} deleteFeed={this.deleteFeed} convertTime={this.convertTime} name={this.state.name} /> */}
      </Grid>
    );
  }
}

export default Home;