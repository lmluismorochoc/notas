import { Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import './Contacts.css'

const Contacts = ({ contacts, deleteContact, updateContact }) => {
    return (
        <Grid container >
            <ul>
                {
                    contacts && contacts.map(contact => {
                        return <li key={contact.id}>
                            <Grid container direction='row' justifyContent='space-around'>
                                <Grid item sx={8}>
                                    <a key={contact.id} onClick={() => updateContact(contact)}>{contact.name}</a>
                                </Grid>
                                <Grid item sx={2}>
                                    <IconButton
                                        type="button"
                                        style={{ border: 'none' }}
                                        value="x"
                                        onClick={() => deleteContact(contact.id)}
                                        color="secondary"
                                        size="small">
                                        <Typography style={{ fontSize: 12 }}>X</Typography>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <p>{contact.email}</p>
                            <p>{contact.phone}</p>
                        </li>
                    })
                }
            </ul>
        </Grid >
    )
}

export default Contacts