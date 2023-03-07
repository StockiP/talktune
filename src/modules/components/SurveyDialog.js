import * as React from 'react';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "./Typography";
import Divider from '@mui/material/Divider';
import StarRating from "./StarRating";
import APIService from "../helpers/APIService";

export default function SurveyDialog(props) {
    const { open, onClose } = props;
    const [ratings, setRatings] = React.useState([2, 2, 2, 2, 2, 2, 2]);

    const handleRatingChange = (index, newValue) => {
        const newRatings = [...ratings];
        newRatings[index] = newValue;
        setRatings(newRatings);
    };

    function convertRatingsToJSON(ratings) {
        const survey = {};
        for (let i = 0; i < ratings.length; i++) {
            survey[`R${i+1}`] = ratings[i];
        }
        return { survey };
    }

    const handleSubmit = () => {
        try {
            const surveyJSON = convertRatingsToJSON(ratings);
            APIService.submitSurvey(surveyJSON);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Survey</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please rate your experience with GPT3 and this prototype.
                    </DialogContentText>
                    <Divider sx={{mb:2}}/>
                    <Stack spacing={1}>
                        <Typography variant="h6">
                            GPT3 efficiency
                        </Typography>
                        <Typography component="legend">
                            GPT3 efficiently analyzed your text.
                        </Typography>
                        <StarRating label="RQ1" value={ratings[0]} handleRatingChange={(newValue) => handleRatingChange(0, newValue)} />
                        <Typography component="legend">
                            GPT3 efficiently rephrased your text to the chosen style.
                        </Typography>
                        <StarRating label="RQ2" value={ratings[1]} handleRatingChange={(newValue) => handleRatingChange(1, newValue)} />
                        <Typography variant="h6">
                            User Experience
                        </Typography>
                        <Typography component="legend">
                            This website’s interface design is attractive.
                        </Typography>
                        <StarRating label="RQ3" value={ratings[2]} handleRatingChange={(newValue) => handleRatingChange(2, newValue)} />
                        <Typography component="legend">
                            This website has a consistent feel and look.
                        </Typography>
                        <StarRating label="RQ4" value={ratings[3]} handleRatingChange={(newValue) => handleRatingChange(3, newValue)} />
                        <Typography component="legend">
                            This website responds to my actions as expected.
                        </Typography>
                        <StarRating label="RQ5" value={ratings[4]} handleRatingChange={(newValue) => handleRatingChange(4, newValue)} />
                        <Typography component="legend">
                            The design of the website makes sense and it is easy to learn how to use it.
                        </Typography>
                        <StarRating label="RQ6" value={ratings[4]} handleRatingChange={(newValue) => handleRatingChange(5, newValue)} />
                        <Typography component="legend">
                            I can easily find what I want at this website.
                        </Typography>
                        <StarRating label="RQ7" value={ratings[4]} handleRatingChange={(newValue) => handleRatingChange(6, newValue)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}