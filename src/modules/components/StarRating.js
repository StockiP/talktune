import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
    1: "Strongly Disagree",
    2: "Disagree",
    3: "Fair",
    4: "Agree",
    5: "Strongly Agree",
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export default function StarRating(props) {
    const [rating, setRating] = React.useState(2);
    const [hover, setHover] = React.useState(-1);


    const handleRatingChange = (newValue) => {
        setRating(newValue);
        if (props.handleRatingChange) {
            props.handleRatingChange(newValue);
        }
    };

    return (
        <Box
            sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Rating
                name="hover-feedback"
                value={rating}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    handleRatingChange(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
        </Box>
    );
}