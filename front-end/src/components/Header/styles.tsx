import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      justifyContent: 'space-between'
    },
    appbar: {
      background: '#fff'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flex: 1
    },
    buttons: {
      flex: 1,
      color: '#173457'
    },
    imageIcon: {
      height: '40px',
      width: 'auto'
    },
    iconRoot: {
      textAlign: 'center'
    }
  })
);
export default useStyles;
