import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {

  state = {
    isConnected:false,
    id:null,
    peeps: [],
    answer: "",
    text: "",
    name: ""
  }
  socket = null

  componentWillMount(){
    
    this.socket = io('https://codi-server.herokuapp.com');
    this.socket.on('youare',(answer)=>{
      this.setState({id:answer.id})
    })
    this.socket.emit('new connection',(answer)=>{
      this.setState({new: answer})
      console.log(answer) 
    })
    // this.socket.emit('answer', (answer)=>{
    //   this.setState({answers:a})

    // })
    this.socket.on("room_message", (c)=> {
      console.log(c)
    })
    this.socket.on('new connection', (n)=> {
      // let t = [1, 2];
      // t = [...t, 2]
      this.setState({peeps: [...this.state.peeps,n]})
       console.log("new connection", n)
    })

    this.socket.on('new disconnection', dis=>{
      var index= this.state.peeps.indexOf(dis)
      this.setState({peeps: [...this.state.peeps.splice(index,1)]})
      console.log("new disconnection", dis, index)
    })
    this.socket.on('new ')
    this.socket.on('connect', () => {
      this.setState({isConnected:true})
    })
    
    this.socket.on('peeps',(additionalStuff)=>{
      this.setState({peeps:additionalStuff})
      console.log('server answered!', additionalStuff)
    })
    

    this.socket.on('disconnect', () => {
      this.setState({isConnected:false})
    })

    this.socket.on('next',(message_from_server)=>console.log(message_from_server))
    /** this will be useful way, way later **/
    this.socket.on('room', old_messages => console.log(old_messages))


  }

  componentWillUnmount(){
    this.socket.close()
    this.socket = null
  }

 
  render() {
    return (<div className="App">
      <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
      {/* add: */}
      <div>id: {this.state.id}</div>
      <button onClick={()=>this.socket.emit('ping!')}>ping</button> */}
    
      // <button onClick={()=>this.socket.emit('whoami')}>Who am I?</button>
      
      <button onClick={()=>this.socket.emit('give me next')}>give me next</button>
      <button onClick={()=>this.socket.emit('addition')}>adittion</button>
      <button onClick={()=>this.socket.emit('message', this.state.answer)}>answer</button>
      <button onClick={()=>this.socket.emit('new connection')}>new connection</button>
      <button onClick={()=>this.socket.emit('messages', {id: this.state.id, name: this.state.name, text:this.state.text})}>send</button>
      <div>additionalStuff: <ul> {this.state.peeps.map( x=> {
        return(
         
           <li>{x}</li>
        
        )
      })}
       </ul>
       </div>
        
       <div> new: {this.state.new}</div>
       <div> answer: {this.state.answers}</div>
       <input  onChange={(e)=> {
         this.setState({answer: e.target.value});
         console.log(this.state.answer)
       }}/>
       <br></br>
       <label> Text:</label>
       <input type="text" onChange={(e)=> {
         this.setState({text: e.target.value});
         console.log(this.state.text)
       }}/>
      <br></br>
      <label> Text:</label>
       <input type="text" onChange={(e)=> {
         this.setState({name: e.target.value});
         console.log(this.state.name)
       }}/>

      
    </div>);
  }
}

export default App;



