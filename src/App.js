import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Chip from '@material-ui/core/Chip';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

class CounterApp extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
       counterCount: 0,
       delete_index:[],
       value:0
     };

     this.handleMathInput = this.handleMathInput.bind(this);
     this.resetRows = this.resetRows.bind(this);
     this.resetNumbers = this.resetNumbers.bind(this);

  }

  handleMathInput(id, operation) {
    let value = this.state[id] !== undefined ? this.state[id] : 0;
    const {delete_index} = this.state;
    switch(operation) {
      case 'add': 
      this.setState({
        [id]: value+1
      });
      break;

      case 'sub': 
      this.setState({
        [id]: value > 0 ? value-1 : undefined
      });

      break;

      case 'delete': 
      this.setState({
        delete_index: [...delete_index + parseInt(id)]
      });
    }
    
  }


  resetRows() {
    this.setState({
      delete_index: []
    });
  }

  resetNumbers() {
    for(let i=0;i<4;i++) {
      this.setState({
        [i]:0
      });
    }
  }

  render() {
    
    const row_arr = [
      {id:0,value: this.state[0]},
      {id:1,value: this.state[1]},
      {id:2,value: this.state[2]},
      {id:3,value: this.state[3]}
    ];
    const delete_arr = this.state.delete_index;
    var count_arr = [];
    for(let i=0;i<4;i++) {
      if(this.state[i]) {
        count_arr.push(i);
      }
    }
    return (
      <div className="root">
        <AppBar position="static" className="topBar">
          <Toolbar>
            <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <Typography variant="h6" className="title">
            <Chip label={count_arr.length} /> Items
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="col-sm-12 action-sec">
          <Button onClick={this.resetNumbers} className="actionBtn refreshBtn" variant="contained">
            <i className="fa fa-refresh"></i>
          </Button>

          <Button disabled={delete_arr.length < 5} className="actionBtn" onClick={this.resetRows} variant="contained" color="primary">
            <i className="fa fa-recycle"></i>
          </Button>
        </div>
        <div className="col-sm-12 count-sec">
          <Table>
            <TableBody>
            {row_arr.map(function(arg,index) {
            if(delete_arr.indexOf(arg.id.toString()) === -1) {
              return (
                <TableRow>
                  <TableCell>
                    <Chip className="countChip" label={(arg.value === undefined || arg.value === 0 ) ? 'Zero': arg.value} />
                  </TableCell>
                  <TableCell>
                    <Button className="countBtn" variant="contained" color="primary"><AddBoxIcon onClick={() => {this.handleMathInput(arg.id, 'add')}} className="addBtn" /></Button>
                    <Button className="countBtn"  variant="contained" color="primary"><IndeterminateCheckBoxIcon onClick={() => {this.handleMathInput(arg.id, 'sub')}} className="subBtn" /></Button>
                    <Button className="countBtn"  variant="contained" color="secondary"><DeleteIcon onClick={() => {this.handleMathInput(arg.id, 'delete')}} className="delBtn" /></Button>
                  </TableCell>
                </TableRow>
                )
              }
            }, this)}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}


export default CounterApp;
