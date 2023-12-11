import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Box, Button, Pagination, TextField, Checkbox } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/allUsers?page=${currentPage}`);
        setUsers(result.data.users);
        setTotalPages(result.data.totalPages);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3001/searchUsers?name=${searchName}&page=${currentPage}`)
      .then((result) => {
        setUsers(result.data.users);
        setTotalPages(result.data.totalPages);
        setCurrentPage(result.data.currentPage);
      })
      .catch((err) => {
        console.error('Error searching users:', err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then(() => {
        setSelectedUsers((prevSelected) => prevSelected.filter((userId) => userId !== id));
        return axios.get(`http://localhost:3001/allUsers?page=${currentPage}`);
      })
      .then((result) => {
        setUsers(result.data.users);
        setTotalPages(result.data.totalPages);
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
      });
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    Promise.all(selectedUsers.map((id) => axios.delete(`http://localhost:3001/deleteUser/${id}`)))
      .then(() => {
        return axios.get(`http://localhost:3001/allUsers?page=${currentPage}`);
      })
      .then((result) => {
        setUsers(result.data.users);
        setTotalPages(result.data.totalPages);
        setCurrentPage(result.data.currentPage);
      })
      .catch((err) => {
        console.error('Error deleting selected users:', err);
      });
  };

  const buttonStyles = {
    variant: 'outlined',
    size: 'medium',
    textTransform: 'none',
    borderRadius: 20,
    color: 'white',
    marginRight: '30px',
    borderColor: 'green',
    backgroundColor: 'green',
  };

  const buttonStylesdDelete = {
    variant: 'outlined',
    size: 'medium',
    textTransform: 'none',
    borderRadius: 20,
    color: 'white',
    marginRight: '30px',
    borderColor: 'green',
    backgroundColor: 'red',
  };

  return (
    <div>
      <Container sx={{ marginTop: '20vh' }}>
        <Box
          paddingTop="4vh"
          paddingBottom="4vh"
          paddingLeft="30px"
          width="75vw"
          height="60vh"
          borderRadius={7}
          boxShadow="5"
          borderColor="#263238"
          bgcolor="#FFFF"
          position="relative"
          overflow="hidden"
          // Use the theme.breakpoints to adjust the height for smaller screens
          sx={{
            [theme.breakpoints.down('sm')]: {
              height: '80vh', // Adjust the height as needed for smaller screens
            },
          }}
        >
          <Grid item sm={12}>
            <TextField
              label="Search Name"
              id="outlined-size-small"
              size="small"
              onChange={(e) => setSearchName(e.target.value)}
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-70%)',
                top: '3.7vh',
              }}
            />
            <Button style={buttonStyles} sx={{ marginLeft: '43vw' }} onClick={handleSearch}>
              Search
            </Button>
          </Grid>

          <Link style={{ textTransform: 'none' }} to="/create">
            <Button style={buttonStyles} sx={{ marginBottom: '2vh' }}>
              Create User
            </Button>
          </Link>
          <Button
            style={buttonStylesdDelete}
            onClick={handleDeleteSelected}
            disabled={selectedUsers.length === 0}
            sx={{
              position: 'absolute',
              left: '85%',
              transform: 'translateX(-50%)',
              top: '9vh',
              backgroundColor: 'red',
            }}
          >
            Delete All Selected
          </Button>

          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Typography fontWeight={800}>Name</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography fontWeight={800}>Email</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography fontWeight={800}>Age</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography marginLeft="3.5vw" fontWeight={800}>
                Action
              </Typography>
            </Grid>
          </Grid>

          {users.map((user) => (
            <Grid container spacing={2} marginTop="0.1vh" key={user._id}>
              <Grid item sm={3}>
                {user.name}
              </Grid>
              <Grid item sm={3}>
                {user.email}
              </Grid>
              <Grid item sm={3}>
                {user.age}
              </Grid>
              <Grid item sm={3}>
                <Link style={{ textTransform: 'none' }} to={`/update/${user._id}`}>
                  <Button style={buttonStyles}>Edit</Button>
                </Link>
                <Button
                  style={buttonStylesdDelete}
                  onClick={() => handleDelete(user._id)}
                  sx={{ marginRight: '8px' }}
                >
                  Delete
                </Button>
                <Checkbox
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
              </Grid>
            </Grid>
          ))}

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '2vh',
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Users;
