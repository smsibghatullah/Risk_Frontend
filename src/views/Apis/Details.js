import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useLocation } from 'react-router-dom';

function Details() {
    let location = useLocation();
    let data = location.state.item.e;
    console.log(data)
    return (
        <div>
            <header className='App-header '>
                <Box sx={{ p: 15 }}>
                    <Box sx={{ border: "1px solid white", p: 2 }}>
                        <Typography align='center' variant='h4'>{data.title}</Typography>
                        <Typography align='right'>PublishedAt: {data.publishedAt}</Typography>
                        <hr/>
                        <Typography variant='body1' >{data.description}</Typography>
                        <Typography>{data.content}</Typography>
                        <Typography align='right'>Author: {data.author}</Typography>
                        <Typography align='right'>Source: {data.source.name}</Typography>
                    </Box>
                </Box>

            </header>
        </div>
    )
}

export default Details;