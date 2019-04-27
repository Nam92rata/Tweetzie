import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { CardActionArea } from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
      response: false,
      endpoint: "http://127.0.0.1:4001/"
    };
    this.handleClick= this.handleClick.bind(this);
    this.onChangeHandler= this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data =>{
    console.log("data", data);
    this.setState({ response: data });
    }
    )
  }
  handleClick(){
    console.log(this.state.value);
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit("ToAPI",this.state.value)
    this.setState({value:''});
    
  }

  onChangeHandler(e){
    e.preventDefault();
    this.setState({value:e.target.value});
    // this.state.value=e.target.value;
  }
  render() {
    const { response } = this.state;
    // console.log("console", this.state.value);
    return (
      <div style={{ textAlign: "center",alignContent:"center" }}>
       
        <br/>
        
          <h1 style={{color: '#3f51b5'}}> Welcome to Tweetzie !!</h1>
        
        <br/>
        
        <Paper style ={{padding: '2px 4px', display: 'flex', alignItems: 'center',marginLeft: '26%', width: 400,borderRadius:'30px',border:'#3f51b5'}} >        
          <InputBase style={{ marginLeft: 12, width: '80%'}} value={this.state.value} onChange={(e)=>{this.onChangeHandler(e)}} placeholder="Search on Twitter"/>
          <IconButton style={{ alignItems: 'right'}} aria-label="Search" value={this.state.value} onClick={this.handleClick}>
            <SearchIcon />
          </IconButton>        
        </Paper>
        
      <br/>
        {response
          ? <Grid container justify = "center">
            <Card style={{width:400, alignItems:"center",borderRadius:'30px',border:'solid #3f51b5'}}>
              <CardActionArea>
              <CardHeader title={response.user.name}></CardHeader>
              {response.extended_entities ? 
              <GridList cellHeight={200} spacing={1} >
        
              <GridListTile key={response.id} style={{width: 500,height: 450,}} >
                <img src={response.extended_entities.media[0].media_url_https} alt="http://www.lbsnaa.gov.in/upload/academy_souvenir/images/59031ff5e92caNo-image-available.jpg" />            
              </GridListTile>
            
              </GridList>:<img src="http://www.lbsnaa.gov.in/upload/academy_souvenir/images/59031ff5e92caNo-image-available.jpg" />           }
                  
              <CardContent>
                <Typography component="p">
                  <b>{response.text}</b>
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
              {/* {JSON.stringify(response.user.name)}<br/>
              {JSON.stringify(response.text)}<br/>
              {response.extended_entities ? 
              <img src={response.extended_entities.media[0].media_url_https} alt="some_image"/>:<p>No image</p>
              } */}
            </Grid>
          : <p style={{color:'#3f51b5',marginLeft: '26%', width: 400}}>Loading...</p>
            }  
                
      </div>
    );
  }
}
export default App;