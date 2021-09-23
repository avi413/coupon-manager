import React, { Component } from 'react'
import { ListItem ,ListItemText, List, ListItemAvatar} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';



export default class ListOf extends Component {
    
    removeItem(id) {
        console.log(id)
        this.props.delete(id);
      }

    render() {
      return (
        <List component="nav" aria-label="mailbox folders" >
        {this.props.items.map(item =>
        <ListItem  key={item.id} >
            <ListItemAvatar>
            <Avatar>
                <ShoppingCartIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText   className="itemText" primary={item.text} style={{textAlign: 'right'}}  />
            <IconButton edge="end" value={item.text} aria-label="delete" onClick={() => this.removeItem(item.key) }>
            <DeleteIcon />
            </IconButton>
            

        </ListItem>,
        )}
        </List>
      );
    }
  }
