import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  const {
    Moralis,
    isWeb3Enabled,
    authenticate,
    isAuthenticated,
    logout,
    isAuthenticating
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) (Moralis as any).enableWeb3();
  }, [isAuthenticated]);

  async function handleAuth() {
    if (!isWeb3Enabled || !isAuthenticated) {
      (Moralis as any).enableWeb3();
      await authenticate();
    } else {
      logout();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            container
          >
            <Grid item>
              <img
                className={classes.imageIcon}
                src="/owl_logo.png"
                alt="logo"
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.buttons}
                onClick={() => router.push('/mint')}
                color="inherit"
              >
                mint article
              </Button>
              <Button
                className={classes.buttons}
                onClick={() => router.push('/')}
                color="inherit"
              >
                view all
              </Button>
              <Button
                className={classes.buttons}
                onClick={() => router.push('/mine')}
                color="inherit"
              >
                my articles
              </Button>
              <Button
                className={classes.buttons}
                onClick={() => router.push('/market')}
                color="inherit"
              >
                market
              </Button>
            </Grid>

            <Grid item>
              <Button
                className={classes.buttons}
                disabled={isAuthenticating}
                onClick={handleAuth}
                color="inherit"
              >
                {!isWeb3Enabled || !isAuthenticated
                  ? 'login with METAMASK'
                  : 'Logout'}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
