import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import useStyles from './styles';

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  const {
    enableWeb3,
    isWeb3Enabled,
    authenticate,
    isAuthenticated,
    logout,
    isAuthenticating
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) enableWeb3();
  }, [isAuthenticated]);

  async function handleAuth() {
    if (!isWeb3Enabled || !isAuthenticated) {
      enableWeb3();
      await authenticate();
    } else {
      logout();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Open articles!
          </Typography>

          <Typography variant="h6" className={classes.buttons}>
            <Button onClick={() => router.push('/mint')} color="inherit">
              mint article
            </Button>
            <Button onClick={() => router.push('/')} color="inherit">
              view all
            </Button>
            <Button onClick={() => router.push('/mine')} color="inherit">
              my articles
            </Button>
          </Typography>

          <Button
            disabled={isAuthenticating}
            onClick={handleAuth}
            color="inherit"
          >
            {!isWeb3Enabled || !isAuthenticated
              ? 'login with METAMASK'
              : 'Logout'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
