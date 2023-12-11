import {React,useState} from 'react'
import { Grid, Typography, Container, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const CreateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();
    const navigate=useNavigate();
    //CREATE
    const Submit=(e)=>{
        e.preventDefault();
        axios.post('https://user-database-manager.onrender.com/createUser',{
            "name":name,
            "email":email,
            "age":age
        })
        .then(result=>{
            console.log(result)
            navigate('/');
        })
        .catch(err=>console.log(err))
    }

    // button style
    const buttonStyles = {
        variant: "outlined",
        size: "medium",
        textTransform: 'none', // This will keep the text in lowercase
        borderRadius: 20,
        color: 'white',
        marginRight: '30px',
        borderColor: 'green',
        backgroundColor: 'green' // Use backgroundColor for setting the background color
    };
  return (
    <div>
        {/* Container */}
            <Container sx={{ marginTop: "20vh" }}> 

            {/* Box */}
                <Box
                    paddingTop="4vh"
                    paddingBottom="4vh"
                    paddingLeft='30px'
                    width="75vw"
                    height="60vh"
                    borderRadius={7}
                    boxShadow="5"
                    borderColor='#263238'
                    bgcolor="#FFFF"
                    position="relative">
                    <Link style={{ textTransform: "none" }} to="/">
                      <Button style={buttonStyles} sx={{ marginBottom: "2vh" }}>
                        Go Back
                      </Button>
                    </Link>  
                    <Typography variant="h3">Add User</Typography>

                    {/* Grid Container inside box */}
                    <Grid container>
                        <Grid item sm={7} sx={{ marginTop: '30px' }}>
                            <Typography>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                            fullWidth
                            id="outlined-size-small"
                            size="small"
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={7} sx={{ marginTop: '30px' }}>
                            <Typography>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                            fullWidth
                            id="outlined-size-small"
                            size="small"
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={7} sx={{ marginTop: '30px' }}>
                            <Typography>
                                Age
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                            fullWidth
                            id="outlined-size-small"
                            size="small"
                            onChange={(e)=>setAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button style={buttonStyles} sx={{ marginTop: "2vh" }} onClick={Submit}>
                            Submit
                    </Button>
                </Box>
            </Container>
        </div>
  )
}

export default CreateUser
