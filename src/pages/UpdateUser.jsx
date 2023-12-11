import {React,useState, useEffect} from 'react'
import { Grid, Typography, Container, Box, Button, TextField } from '@mui/material';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {useParams,useNavigate} from "react-router-dom";
import axios from 'axios';

const UpdateUser = () => {
    const {id}=useParams();
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[age,setAge]=useState();
    const navigate=useNavigate();

    useEffect(() => {
        axios.get('https://user-database-manager.onrender.com/getuser/'+id)
          .then(result => {
            console.log(result);
            setName(result.data.name);
            setEmail(result.data.email);
            setAge(result.data.age);
          })
          .catch(err => console.log(err));
      }, [id]);

      const Update=(e)=>{
        e.preventDefault();
        axios.put('https://user-database-manager.onrender.com/updateUser/'+id,{
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
                    <Typography variant="h3">Update User</Typography>

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
                            defaultValue="Small"
                            size="small"
                            value={name}
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
                            defaultValue="Small"
                            size="small"
                            value={email}
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
                            defaultValue="Small"
                            size="small"
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button style={buttonStyles} sx={{ marginTop: "2vh" }} onClick={Update}>
                            Submit
                    </Button>
                </Box>
            </Container>
        </div>
  )
}

export default UpdateUser
