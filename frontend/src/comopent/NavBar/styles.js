import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
        padding:"0px",
        marginBottom:"0px"
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
      fontWeight: 100,
    },
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      height:"20px"
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      justifyContent: 'space-between'
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 0,
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  logout: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      height:"30px",
    
    },
    
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  imge1:{
    height:"45px",

    [theme.breakpoints.down('sm')]: {
      height:"25px",
      marginTop:"5px"
    },
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    
    [theme.breakpoints.down('sm')]: {
      marginTop:"0px",
     width:"30px",
     height:"30px",
     marginRight:"10px"
     
    },
  },
}));