import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '../modules/components/Typography';
import AppAppBar from '../modules/views/AppAppBar';
import AppFooter from '../modules/views/AppFooter';
import withRoot from '../modules/withRoot';
import privacy from '../modules/views/privacy.md';
import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from "react";

function Privacy() {
    const [postMarkdown, setPostMarkdown] = useState('');
    useEffect(() => {
        fetch(privacy)
            .then((response) => response.text())
            .then((text) => {
                setPostMarkdown(text);
            });
    }, []);
    
    return (
        <React.Fragment>
            <AppAppBar />
            <Container>
                <Box sx={{ mt: 7, mb: 12 }}>
                    <Typography variant="h3" gutterBottom marked="center" align="center">
                        Privacy Policy
                    </Typography>
                    <ReactMarkdown>{postMarkdown}</ReactMarkdown>
                </Box>
            </Container>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Privacy);