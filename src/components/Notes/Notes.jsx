import { Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import './Notes.css'

const Notes = ({ notes, deleteNote, updateNote }) => {
    return (
        <Grid container >
            <ul>
                {notes && notes.map(note => (
                    <li key={note.id}>

                        <Grid container direction='row' justifyContent='space-around'>
                            <Grid item sx={8}>
                                <a key={note.id} onClick={() => updateNote(note)}>{note.title}</a>
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
                    </li>
                ))
                }
            </ul>

        </Grid>
    )
}

export default Notes