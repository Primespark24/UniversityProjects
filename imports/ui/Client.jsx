import React from 'react';
import {
    Input, Button, Checkbox, ListItem, Divider, Paper, Grid, Dialog,
} from '@material-ui/core';
import { theme } from "../api/theme";
import { ImageDisplay } from "./ImageDisplay";
import {FormDialog} from "./Form";

export const Client = ({ clientData, onCheckBoxClick, onDeleteClick }) => (

    <ListItem>
        <Paper
            style={{
                padding: 5,
                width: '100%',
            }}
            elevation={3}
        >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item sm={4}>
                    {clientData.text}
                </Grid>
                <Grid item sm={4}>
                    <FormDialog clientId={clientData && clientData._id} />
                </Grid>
                <Grid item sm={4}>
                    <Button onClick={() => onDeleteClick(clientData)}>Delete Client</Button>
                </Grid>
            </Grid>
        </Paper>
    </ListItem>

);
