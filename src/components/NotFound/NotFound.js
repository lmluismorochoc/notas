import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <Grid container
        justifyContent='center'
        alignContent='center'
        direction='column'
        className='img-dim'>
        <Grid item >
          <h1>404</h1>
          <h5>Página no encontrada</h5>
        </Grid>
        <Grid item sx={{ paddigTop: '23px' }}>
          <a type="button" className="button-info info" href="/">Ir a la pagina principal</a>
        </Grid>
      </Grid>
    );
  }
}

export default NotFound;