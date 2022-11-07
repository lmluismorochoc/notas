import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import './Notes.css'

const Notes = (notes) => {
    console.log("🚀 ~ file: Notes.jsx ~ line 6 ~ Notes ~ notes", notes.notes)
    return (
        <Grid container>
            <ul>
                <li key={notes.notes[0].id}>
                    <a href="#">
                        <h2>{notes.notes[0].title}</h2>
                        <p>{notes.notes[0].description}</p>
                        <Typography style={{ fontSize: 8 }}>{notes.notes[0].createdAt}</Typography>
                    </a>
                </li>
            </ul>
        </Grid>
    )
}

export default Notes