import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import { Trans } from 'react-i18next';
import fire from '../firebase';
import {withStyles} from '@material-ui/core/styles';
import ListOf from './ListOf';

const styles = theme =>  ({
    box: {
      alignItems: 'center',
      marginRight: theme.spacing(2),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      flexGrow: 1,
    },
  });

class BussinessList extends Component {


    constructor(props) {
        super(props);
        this.state = { 
            items: [], 
            text: '',
            Bussinesses: 1
         };
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    delete(key){
        const userId = fire.auth().currentUser.uid;
        console.log(userId)
        const coupon = fire.database().ref("Bussinesses/"+ userId);
        coupon.child(key).remove();
       this.setState({items: this.state.items.filter(el => el.key !== key )});
     }

    componentDidMount(){
        const BussinessesData = [];
        fire.auth().onAuthStateChanged((user) => { if (user) {
         fire.database().ref('Bussinesses/' + fire.auth().currentUser.uid).once('value',(snapshot) => {
           snapshot.forEach((childSnapshot) => {
            BussinessesData.push({
               key: childSnapshot.key,
               id : childSnapshot.val().id,
               text: childSnapshot.val().bussiness
              });
    
            
          });
            this.setState({items :BussinessesData })
            
        })}});
      }
    render() {
        const { classes} = this.props;
        return (
            <div className={classes.box}>
            <Box  sx={{ width: '70%', bgcolor: 'background.paper', textAlign: 'right' }}>

            <CssBaseline />
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
            <Trans>Total of</Trans> : {this.state.items.length } <Trans>Bussinesses</Trans>
            </Typography>
            <Divider />
            <ListOf items={this.state.items} delete={this.delete} />
            <form >

              <TextField 
                variant="outlined"
                label={<Trans>Bussiness</Trans>}
                type="text"
                margin="normal"
                required
                fullWidth
                name="Bussiness"
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <Button variant="contained" onClick={this.handleSubmit}>
              <Trans>Add</Trans>
              </Button>
            </form>

          </Box>
          </div>
        );
      }
    
      handleChange(e) {
        this.setState({ text: e.target.value });
      }
    
      handleSubmit(e) {
        e.preventDefault();
        const BussinessName =this.state.text;
        if (BussinessName.length === 0) {
          return;
        }
        const newItem = {
          text: BussinessName,
          id: Date.now()
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          text: ''
        }));

        const currentUID = fire.auth().currentUser.uid;
        var ref =  fire.database().ref('Bussinesses/' +currentUID);
        ref
        .orderByChild('id')
        .equalTo(BussinessName)
        .once("value")
        .then(function(snapshot) {
            if (!snapshot.exists()) {
            fire.database().ref('Bussinesses/' +currentUID).push({
                id: Date.now(),
                Bussiness: BussinessName,
                user_id: currentUID
            }).then((data) =>{
            ///success callback
            
            }).then((error) =>{
            ///error callback

            })

        }});

        
      }
    }



  export default withStyles(styles)(BussinessList)