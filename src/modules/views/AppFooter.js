import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Icon from '@mui/material/Icon';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <React.Fragment>
      <Link color="white.main" href="https://talktune.stockidev.com">
        ©TalkTune {new Date().getFullYear()}
      </Link>{''}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mr: 1,
  color: 'white.main',
  visited: {
    color: 'inherit',
  }
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
  },
];

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'primary.dark' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://github.com/StockiP" sx={iconStyle} icon={GithubIcon}>
                  <Icon component={GithubIcon} sx={iconStyle} />
                </Box>
                <Box component="a" href="https://www.linkedin.com/in/philip-stockerer-461b11112" sx={iconStyle}>
                    <Icon component={LinkedInIcon} sx={iconStyle} />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom sx={{color: 'white.main'}}>
              Language
            </Typography>
            <TextField
              select
              size="small"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150, }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}