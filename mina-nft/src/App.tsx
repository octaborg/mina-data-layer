import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

let Add;

/*
function FileUpload() {

  //
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
//


  const [fileSelected, setFileSelected] = React.useState<File>()
  
  
  
  //
  function changeHandler(event: Event) {
    setSelectedFile(event.currentTarget.files[0]);
    setIsFilePicked(true);
  };
  //

  
  function changeHandler(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
        const formData = new FormData();
        formData.append("image", fileSelected, fileSelected.name);
    }
  };
  

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  };
  
  function handleSubmission() {
    console.log("submission handled");
  }
  
  
  return(
    <Container fixed>
      <Stack direction="column" spacing={2}>
        <input type="file" name="file" onChange={changeHandler} />
        <button onClick = {handleSubmission} > Submit </button>
      </Stack>
    </Container>
  );
}
*/

/*
function InitialBox() {
  return(
    
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
        <Grid item xs={6}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>2</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>3</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>4</Paper>
        </Grid>
      </Grid>
    
  );
}
*/

/*
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
})
*/


function LoginBox() {


  const [FilecoinTokenAPI, setFilecoinTokenAPI] = useState("")

  return(
    <Container
      maxWidth = "sm"
      sx={{mt: 5}}
    >
      <Box
        bgcolor="secondary.main"
      >
      <Typography>
        field 1
      </Typography>
      <form>
        <TextField
          onChange = {(e) => setFilecoinTokenAPI(e.target.value)}
          sx={{mt: 2 }}
          variant="outlined"
          fullWidth
        >

        </TextField>
      </form>



      <Button
        onClick = {() => console.log(FilecoinTokenAPI)}
      >
        Submit
      </Button>
      </Box>
    </Container>
  )
}


function App() {
  /*
  let [snapp, setSnapp] = useState();
  let [isLoading, setLoading] = useState(false);
  let [isDeployed, setDeployed] = useState(false);
  let [num, setNum] = useState("0");

  async function deploy() {
    if (isLoading) return;
    setLoading(true);
    Add = await import('../dist/add.js');
    let snapp = await Add.deploy();
    setLoading(false);
    setDeployed(true);
    setSnapp(snapp);
    let state = await snapp.getSnappState();
    setNum(state.num.toString());
  }

  async function handleClick() {
    await snapp.update();
    let state = await snapp.getSnappState();
    setNum(state.num.toString());
  }

  
  return (
    <Container fixed>
      <Stack direction="column" spacing={2}>
        <Chip label={num} variant="outlined" onClick={handleClick} disabled={!isDeployed}/>
        <Button variant="contained" onClick={deploy} disabled={isDeployed}>Deploy</Button>
      </Stack>
    </Container>);
    */
    
   return (
      <LoginBox/>
   );
}


ReactDOM.render(<App />, document.querySelector('#root'));