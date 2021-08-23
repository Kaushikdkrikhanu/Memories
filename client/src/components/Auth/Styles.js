import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 1, 2),
  },
  googleButton: {
    margin: theme.spacing(0,1,2,1),
  },
  error: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1),
    borderColor: '#f50f0f',
    color: '#f50f0f',
    padding:'2%',
    backgroundColor: '#f5c1bc',
  },
  marginTop: {
    marginTop: theme.spacing(8),
  }
}));