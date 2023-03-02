import * as React from 'react';
import Logo from '../../logo.png'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
    fontSize: 18,
    color: 'common.white',
    ml: 3,
};

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
    children: PropTypes.node,
};

function AppAppBar() {
    return (
        <div>
            <AppBar sx={{bgcolor: 'primary.dark'}}>
                <Toolbar sx={{ justifyContent: 'space-between'}}>
                    <Box sx={{ flex: 1 }} />
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                            width: 64,
                            justifyContent: 'flex-start',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        alt="TalkTune"
                        src={Logo}
                    />
                    <Link component={RouterLink} to={'/'}
                        variant="h6"
                        underline="none"
                        color="inherit"
                        sx={{
                            fontSize: 35,
                            justifyContent: 'flex-end'
                        }}
                    >
                        {'TalkTune'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link component={RouterLink} to={'/FAQ'}
                            variant="h6"
                            underline="none"
                            color="inherit"
                            sx={{
                                ...rightLink,
                            }}
                        >
                            {'FAQ'}
                        </Link>
                        <Link component={RouterLink} to={'/privacy'}
                            variant="h6"
                            underline="none"
                            color="inherit"
                            sx={{
                                ...rightLink,
                            }}
                        >
                            {'Privacy'}
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppAppBar;