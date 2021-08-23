import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Input({name, halfSize, handleChange, type, handleShowPassword, autoFocus, label}) {
    return (
        <Grid item xs={12} sm={halfSize?6:12}>
            <TextField
                name = {name}
                onChange = {handleChange}
                type = {type}
                autoFocus = {autoFocus}
                label = {label}
                required
                fullWidth
                variant = "outlined"
                InputProps = {name==='password' ?{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility/>:<VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }:null}
            />
        </Grid>
    )
}

export default Input
