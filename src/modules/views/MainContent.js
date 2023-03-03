import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '../components/Typography';
import Button from "@mui/material/Button";
import APIService from "../helpers/APIService";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';

function MainContent() {

    const [remainingCharacters, setRemainingCharacters] = React.useState(2500);
    const [textInput, setTextInput] = React.useState('');
    const [isWaiting, setIsWaiting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [result, setResult] = React.useState('');

    const handleChange = (event) => {
        setTextInput(event.target.value);
        setRemainingCharacters(2500 - event.target.value.length);
    }

    function apiCall(text) {
        setIsWaiting(true);
        try {
            APIService.getAnalysis(text)
                .then((response) => {
                    console.log(response[0].data);
                    setResult(response[0].data.text.trim());
                    setIsWaiting(false);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsWaiting(false);
                });

        } catch (error) {
            console.log(error);
            setIsWaiting(false);
        }
    }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}  component="main">
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography align="center" variant="h3" gutterBottom marked="center" sx={{ mb: 4 }}>
            Unlock your communication
          </Typography>
            <TextField
                label={"Enter or copy your text here"}
                id={"text"}
                multiline
                rows={10}
                margin={"normal"}
                variant={"outlined"}
                style={{width: "100%"}}
                inputProps={{ maxLength: 2500, style: {fontSize: 18}}}
                helperText={"Remaining characters: " + remainingCharacters}
                onChange={handleChange}
                value={textInput}
            />
            <Grid container justifyContent={"flex-end"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item>
                <Box sx={{position: 'relative' }}>
                    <Button
                        onClick={() => apiCall(textInput)}
                        disabled={isWaiting}
                        size="large"
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 2, mb: 4 }}>
                        Analyze
                    </Button>
                    {isWaiting && (
                        <CircularProgress
                            size={26}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-20px',
                                marginLeft: '-11px',
                            }}
                        />
                    )}
                </Box>
            </Grid>
            </Grid>
            <Box>
                {isWaiting && (
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width='100%'
                        height={100}
                    />
                )}
                {!isWaiting && success && (
                    <TextField
                    id={"text"}
                    multiline
                    label={"Sentiment Analysis"}
                    maxRows={10}
                    margin={"normal"}
                    variant={"outlined"}
                    style={{width: "100%"}}
                    inputProps={{ readOnly: true, style: {fontSize: 18}}}
                    helperText={"Your sentiment analysis will appear here"}
                    value={result}
                    disabled={isWaiting} />
                )}
            </Box>
        </Box>
    </Container>
  );
}

export default MainContent;