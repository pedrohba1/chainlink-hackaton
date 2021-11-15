import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      justifyContent: 'space-between'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flex: 1
    },
    buttons: {
      flex: 1
    }
  })
);
export default useStyles;
