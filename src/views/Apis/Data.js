
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


function Data() {
  const [data, setData] = useState([])
  // const navigate = useNavigate();
  let getData = () => {
    axios.get('https://newsapi.org/v2/everything?q=tesla&from=2022-12-28&sortBy=publishedAt&apiKey=7fcc07cb6b024d4f8898c27ffb0e59b1',{}).then((success) => {
      console.log(success.data.articles);
      setData(success.data.articles)
    }).catch((err) => {
      alert(err)
    })
  }
  useEffect(() => {
    getData();
    console.log(data)
  }, [])
  const navigate = useNavigate();
  let Datatransfer = (e) => {
    navigate('/details', {
        state: {
            item:{e}
        }
    })
}

let location = useLocation();
console.log(location.state)


  return (
    <div >
      <header className="App-header">

          <Box sx={{ p: 5 }}>
            <Typography variant='h3' align='center' sx={{ p: 3, color: 'crimson' }}>Breaking News</Typography>
            <Box sx={{ p: 6 }}>

              <Grid container rowSpacing={3}>
                {
                  data.map((item, index) => (
                    <Grid key={index} item md={3}   >
                      <Box sx={{ border: "1px solid black", p: 2, width: "75%", height: "80%" }} onClick={() => Datatransfer(item)}>

                       
                     
                    
                        <Typography align='center' variant='p'>News : {item.title}</Typography>
                       
                  
                </Box>
                    </Grid>
                  ))
                }




              </Grid>


            </Box>

          </Box>
         


      </header>
    </div>
  );
}

export default Data;