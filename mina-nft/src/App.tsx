import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

let Add;

function App() {
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
}


ReactDOM.render(<App />, document.querySelector('#root'));