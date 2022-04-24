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
import {File} from "web3.storage";

let address;
let dataNFTs = [{
  img: "https://ipfs.io/ipfs/bafybeihkfz4qxqmpwnpyiufwp3lysin54h4gf7xizatxntva6ncrmvhi6a/654927.jpeg",
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
  const [imageList, setImageList] = React.useState<any[]>(dataNFTs);

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
      });
      console.log(dataNFTs);

      setFileToUpload(null);
    }
  }

  return(
    <Container fixed>
      <Stack direction="column" spacing={2}>
        <input type="file" name="photo" id="image" onChange = {changeHandler}/>
        <button onClick = {uploadHandler} > Mint </button>
      </Stack>
      <Gallery imageList={imageList}/>
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
              crossOrigin="anonymous"
            src={item.img}
            //srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            //loading="lazy"
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
   return (
    <>
      <FileUpload/>

    </>
   );
}


ReactDOM.render(<App />, document.querySelector('#root'));