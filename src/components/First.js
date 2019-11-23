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
   				// console.log(this.state.data);
  			 })
  			    .catch((error)=> {
    
    			 console.log(error);
  			 });
	 }
   handleTimeChange = (myTime)=>{
    const currentTime = new Date(Date.now());
    myTime = new Date(myTime)
    const diff = currentTime - myTime;
    // this.setState({diff})
    return Math.floor(diff);

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
              <Button className="m-2" variant="primary" onClick={this.handlePost}>Add a new card</Button>
            	<Button className="m-2" variant="success" onClick={()=>location.reload()}>Refresh</Button>
        	     {this.state.data.map((item, index)=>{
                const timePassed = this.handleTimeChange(item.isoDate)
                let time = ``;
                if(timePassed>=3600000){
                  time = `${Math.floor(timePassed/1000/60/60)} hrs` 
                  //`${Math.floor(timePassed/60)} Hrs` :`${timePassed} Mins`; 
                }else if(timePassed<3600000 && timePassed>=60000){
                  time = `${Math.floor(timePassed/1000/60)} mins`
                }else{
                  time = `${Math.floor(timePassed/1000)} secs`
                }
                return (<Card key={ index } className="m-2">
                            <Card.Body> <b>value</b>: {item.value} , <b>elapsed time:</b> {time}  </Card.Body>
                        </Card>)
               })}  	
            </div>
        );
    }
}
export default FirstPage ;