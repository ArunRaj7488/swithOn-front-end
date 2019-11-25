import React, { Component } from 'react';
import {Button, Card} from 'react-bootstrap';
import Axios from 'axios';

class FirstPage extends Component {
    constructor(props){
	    super(props);
	    this.state = {
	    	data: [],
	    	value: 0,
	    	time: "00:00"
	     }
	 }  
	 componentDidMount(){
	 	Axios.get('http://localhost:8081/api/date')
  			    .then((res)=> { this.setState({ data: res.data });})
  			    .catch((error)=> {console.log(error); });
	 }
	 handlePost (){
	 	Axios.post("http://localhost:8081/api/date")
	 	.then((res)=>{
	 		console.log(res);
	 	})
	 }
    render() { 
        return (<div className="container">
            	<Button className="m-2" variant="primary" onClick={this.handlePost}>Primary</Button>
				{
				this.state.data.map((item,index) => (<Card key={ index } className="m-2">
        	  		<		Card.Body> value:{item.value} , time:{item.isoDate} </Card.Body>
					  </Card>))
				}
            </div>
        );
    }
}
export default FirstPage;