import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import './Notes.css'

const Notes = (notes) => {
    console.log("🚀 ~ file: Notes.jsx ~ line 6 ~ Notes ~ notes", notes)
    return (
        <Grid container>
            {notes.notes && notes.notes.map(note => (
                <ul>
                    <li key={note.id}>
                        <a href="#">
                            <h2>{note.title}</h2>
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