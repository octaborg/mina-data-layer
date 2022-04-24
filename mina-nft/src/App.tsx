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
import {mint, NFTMetaData} from "./NFT.js";
import {isReady, Mina, Field} from "snarkyjs";
import {deployWallet} from "./wallet.js";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

let Add;
let address;
let dataNFTs = [{
  img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  title: "test1",
},];
let name: string;

await isReady;
const Local = Mina.LocalBlockchain();
Mina.setActiveInstance(Local);
const account1 = Local.testAccounts[0].privateKey;
const account2 = Local.testAccounts[1].privateKey;

let wallet = await deployWallet(account1, account2, Field.zero);

function FileUpload() {
  
  const [fileToUpload, setFileToUpload] = React.useState<File>();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;
    //console.log(fileList);
    setFileToUpload(fileList[0]);
  }
  
  
  async function uploadHandler(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileToUpload) {
      const formData = new FormData();
      formData.append("image", fileToUpload, fileToUpload.name);
      name = fileToUpload.name;
      console.log(formData.values());

      address = await mint(account1, account2, new NFTMetaData(fileToUpload, new Map()));
      await wallet.update(account1, address.address);
      console.log(address.ipfsUrl);

      dataNFTs.push({
        img: address.ipfsUrl,
        title: name,
      })
      console.log("worked");
    }
  }

  return(
    <Container fixed>
      <Stack direction="column" spacing={2}>
        <input type="file" name="photo" id="image" onChange = {changeHandler}/>
        <button onClick = {uploadHandler} > Mint </button>
      </Stack>
    </Container>
  );
}

interface BorrowTableProps {
  children?: React.ReactNode;
  imageList: Array<any>;
}

function Gallery(props: BorrowTableProps) {

  const {imageList} = props;


  return (
    <ImageList>
      {imageList.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}



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
    Add = await import('../dist/NFT.js');
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
    <>
      <FileUpload/>
      <Gallery imageList={dataNFTs}/>

    </>
   );
}


ReactDOM.render(<App />, document.querySelector('#root'));