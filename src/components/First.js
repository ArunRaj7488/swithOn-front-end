import React, { Component } from 'react';
import {Button, Card} from 'react-bootstrap';
import Axios from 'axios';

class FirstPage extends Component {
    constructor(props){
	    super(props);
	    this.state = {
	    	data: [],
	    	value: 0,
	    	time: "00:00",
        diff: 0
	     }
	 }
	 componentDidMount(){
	 	Axios.get('http://localhost:8081/api/date')
  			    .then((res)=> {
    				this.setState({
    					data: res.data
    				});
  			 })
  			    .catch((error)=> {
    
    			 console.log(error);
  			 });
	 }
   handleTimeChange = (myTime)=>{
    const currentTime = new Date(Date.now());
    myTime = new Date(myTime)
    const diff = currentTime - myTime;
    let time = ``;
    if(diff>=3600000){
      time = `${Math.floor(diff/1000/60/60)} hrs` 
    }else if(diff<3600000 && diff>=60000){
      time = `${Math.floor(diff/1000/60)} mins`
    }else{
      time = `${Math.floor(diff/1000)} secs`
    }
    return time;

   }
	 handlePost (){
	 	Axios.post("http://localhost:8081/api/date")
	 	.then((res)=>{
      location.reload();
	 		console.log(res);
	 	})

	 }
    render() { 
        return (  
            <div className="container">
              <h1 style={{color:"#fff"}}>Time Card</h1>
              <Button className="m-2" variant="primary" onClick={this.handlePost}>Add a new card</Button>
            	<Button className="m-2" variant="success" onClick={()=>location.reload()}>Refresh</Button>
        	     {this.state.data.map((item, index)=>{
                const time = this.handleTimeChange(item.isoDate)
                return (<Card style={{boxShadow: "1px 1px 10px 8px #ddd"}} key={ index } className="m-4">
                            <Card.Body> <b>value</b>: {item.value} , <b>elapsed time:</b> {time}  </Card.Body>
                        </Card>)
               })}  	
            </div>
        );
    }
}
export default FirstPage ;