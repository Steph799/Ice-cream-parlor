import React from 'react'
import Rating from '@mui/material/Rating';
import { Grid, Paper } from '@mui/material';


function Comment({ name, title, content, date, rate }) {
    const dateConversion = new Date(date)
    const year = dateConversion.getFullYear()
    const month = dateConversion.getMonth() + 1
    const day = dateConversion.getDate();
    const hour = dateConversion.getHours()
    const minute = dateConversion.getMinutes()

    const newMinuteFormat = minute < 10 ? `0${minute}` : minute
    const newDateFormat = `${day}/${month}/${year}  ${hour}:${newMinuteFormat}`

    return (
        <div style={{ padding: 14, width: "80%", margin: "auto", backgroundColor: "lightblue" }} className="App">
            <Paper style={{ padding: "1rem 2rem", backgroundColor: "ivory" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{name}</h4>
                        <Rating value={rate} precision={0.5} disabled />
                        <h3>{title}</h3>
                        <p style={{ textAlign: "left" }}> {content} </p>
                        <p style={{ textAlign: "left", color: "gray" }}>posted on {newDateFormat} </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Comment
