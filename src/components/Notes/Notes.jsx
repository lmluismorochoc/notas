import { Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import axios from 'axios'
import './Notes.css'

const Notes = ({ notes, deleteNote }) => {
    console.log("🚀 ~ file: Notes.jsx ~ line 6 ~ Notes ~ notes", notes)
    return (
        <Grid container>
            {notes && notes.map(note => (
                <ul>
                    <li key={note.id}>
                        <a href="#">
                            <Grid container direction='row' justifyContent='space-around'>
                                <Grid item sx={8}>
                                    <h2>{note.title}</h2>
                                </Grid>
                                <Grid item sx={2}>
                                    <IconButton
                                        type="button"
                                        style={{ border: 'none' }}
                                        value="x"
                                        onClick={() => deleteNote(note.id)}
                                        color="secondary"
                                        size="small">
                                        <Typography style={{ fontSize: 12 }}>X</Typography>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <p>{note.description}</p>
                            <Typography style={{ fontSize: 8 }}>{note.createdAt}</Typography>
                        </a>
                    </li>
                </ul>
            ))
            }

        </Grid>
    )
}

export default Notes