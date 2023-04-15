import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '../modules/components/Typography';
import Button from "@mui/material/Button";
import APIService from "../modules/helpers/APIService";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {FormHelperText} from "@mui/material";
import SurveyDialog from "../modules/components/SurveyDialog";
import AppAppBar from "../modules/views/AppAppBar";
import AppFooter from "../modules/views/AppFooter";

function MainContent() {

    const [remainingCharacters, setRemainingCharacters] = React.useState(2500);
    const [textInput, setTextInput] = React.useState('');
    const [isWaiting, setIsWaiting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [tone, setTone] = React.useState('neutral');
    const [textError, setTextError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isHover, setHover] = React.useState(false);

    const handleChange = (event) => {
        setTextInput(event.target.value);
        setRemainingCharacters(2500 - event.target.value.length);
    }

    const handleChangeTone = (event) => {
        setTone(event.target.value);
    }

    const handleShowSurvey = () => {
        setOpen(true);
    };

    const handleHideSurvey = () => {
        setOpen(false);
    };

    function apiCall(text) {
        setIsWaiting(true);
        setTextError(false);
        if (text.length === 0) {
            setSuccess(false);
            setIsWaiting(false);
            setTextError(true);
        } else {
            try {
                APIService.getAnalysis(text)
                    .then((response) => {
                        setResult(response[0].data.text.trim());
                        setIsWaiting(false);
                        setHover(false)
                        setSuccess(true);
                        //setTimeout(() => handleShowSurvey(), 10000);
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
    }

    function apiCallRephrase(text, tone) {
        setIsWaiting(true);
        setTextError(false);
        if (text.length === 0) {
            setSuccess(false);
            setIsWaiting(false);
            setHover(false)
            setTextError(true);
            return;
        }
            try {
                APIService.getRephrase(text, tone)
                    .then((response) => {
                        setResult(response[0].data.text.trim());
                        setIsWaiting(false);
                        setSuccess(true);
                        setTimeout(() => handleShowSurvey(), 15000);
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
      <React.Fragment>
          <AppAppBar />
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}  component="main">
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography align="center" variant="h3" gutterBottom marked="center" sx={{ mb: 4 }}>
            Unlock your communication
          </Typography>
            <SurveyDialog open={open} onClose={handleHideSurvey} />
            <TextField
                label={"Enter or copy your text here"}
                id={"text"}
                multiline
                rows={10}
                margin={"normal"}
                variant={"outlined"}
                style={{width: "100%"}}
                inputProps={{maxLength: 2500, style: {fontSize: 18}}}
                helperText={"Remaining characters: " + remainingCharacters}
                onChange={handleChange}
                value={textInput}
                error={textError}
            />
            {textError && (
                <FormHelperText error={true}>Please enter some text</FormHelperText>
            )}

            <Grid container justifyContent={"flex-end"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item>
                    <Box sx={{position: 'relative'}}>
                    <Button
                        onClick={() => apiCall(textInput)}
                        disabled={isWaiting}
                        size="large"
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 2, mb: 4 }}>
                        Analyze my Text
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
                <Grid item>
                    <Box sx={{position: 'relative'}} >
                        <FormControl variant="outlined" sx={{ mt: 2, mb: 4 }}>
                            <InputLabel htmlFor="tone">Tone</InputLabel>
                            <Select
                                defaultValue={"neutral"}
                                id="tone"
                                value={tone}
                                onChange={handleChangeTone}
                                label="tone"
                            >
                                <MenuItem value={"neutral"}>Neutral</MenuItem>
                                <MenuItem value={"positive"}>Positive</MenuItem>
                                <MenuItem value={"negative"}>Negative</MenuItem>
                                <MenuItem value={"confident"}>Confident</MenuItem>
                                <MenuItem value={"analytical"}>Analytical</MenuItem>
                                <MenuItem value={"happy"}>Happy</MenuItem>
                                <MenuItem value={"fearful"}>Fearful</MenuItem>
                                <MenuItem value={"sad"}>Sad</MenuItem>
                                <MenuItem value={"scientific"}>Scientific</MenuItem>
                            </Select>
                            <FormHelperText>Choose the tone you wish your text had</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid>
            <Grid item>
                <Box sx={{position: 'relative' }}>
                    <Button
                        onClick={() => apiCallRephrase(textInput, tone)}
                        disabled={isWaiting}
                        size="large"
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 2, mb: 4 }}>
                        Rephrase my Text
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
                    label={"Sentiment Analysis / Rephrasing"}
                    maxRows={20}
                    margin={"normal"}
                    variant={"outlined"}
                    style={{width: "100%"}}
                    inputProps={{ readOnly: true, style: {fontSize: 18}}}
                    helperText={"Your result will appear here"}
                    value={result}
                    disabled={isWaiting} />
                )}
            </Box>
            {success && (
            <Button
                fullWidth
                size={"large"}
                disabled={isWaiting}
                onClick={handleShowSurvey}
                variant={success ? "contained" : "outlined"}
                style={success && !isWaiting && !isHover ? {
                    animation: "blink 1s linear infinite"
                } : {}}
                sx={{ mt: 2, mb: 4 }}
                onMouseEnter={() => setHover(true)}
            >
                Participate in the survey
            </Button>
            )}
        </Box>
        </Container>
          <AppFooter />
      </React.Fragment>
  );
}

export default MainContent;