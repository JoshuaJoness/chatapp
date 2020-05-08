import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../components/Message'
import axios from 'axios'
import { css } from 'glamor';

let width = window.innerWidth < 500 ? '90vw' : '40vw'
let height = window.innerWidth < 500 ? '70vh' : '50vh'

// Styling for scrollbar 
const ROOT_CSS = css({
  height:height,
  width:width,
  border:'1px solid #d3d3d3',
  borderRadius:'6px',
  backgroundColor: '#fff',
  marginBottom: '2%',
  paddingTop:'5%',
  paddingBottom:'5%'
});

// This creates the socket connect
const socket = io(process.env.REACT_APP_API, {name:'name'});

const Chat = ({ location }) => {
  const [name, setName] = useState('')
	const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  {/* Emit message to server */}
  const emitMessage = async () => {
    setMessage('')
    await socket.emit('msg', message, name, room)
    await axios.post(`${process.env.REACT_APP_API}/message`, 
      {name, message, room})
      .then(res => {console.log(res.data)})
      .catch(err => {console.log(err)})  
   }

   {/* Before component mounts, we set name & room, send name with 'join' event, and receive welcome message from server */}
   useEffect(() => {
     const { name, room } = queryString.parse(location.search)
     setName(name)
     setRoom(room)
     axios.get(`${process.env.REACT_APP_API}/messages`,{
        headers: {
          room
        }
      })
      .then(res => {
        setMessages(res.data)
        socket.emit('join', name)
      }).catch(err => {
        console.log(err);
        })   
   }, [])

  {/* Listens for 'msg' event, updates messages array */}
  socket.on('msg', (msg) => {
    setMessages([...messages,msg])
  })

  return(
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>
        {window.innerWidth < 500 ? <p style={styles.title}>Zen Chat</p> : <div style={{display:'flex', alignSelf:'center'}}>
          <p style={styles.bigTitle}>Zen Chat</p>
          <img style={styles.image} src='./yogaGreen.png' alt='Girl doing yoga' />
        </div>}
        <ScrollToBottom className={ ROOT_CSS }>
            {messages.map((message, index) => {
              return <Message 
                      key={index} 
                      message={message.text} 
                      username={message.username} 
                      time={message.time} 
                      name={name} 
                     />})}   
        </ScrollToBottom >
        <div style={styles.inputContainer}>
          <input 
            style={styles.input} 
            className='input'
            type='text'
            placeholder='Type a message...'
            value={message} 
            onChange={(event) => setMessage(event.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? emitMessage(event) : null } 
          />
          <button style={styles.button} onClick={(event) => emitMessage(event)}>SEND</button>
        </div> 
      </div>   
    </div>  
  )
}

const styles = {
  outerContainer: {
    backgroundColor:'#CAD2C5',
    height:'100vh',
    border:'1px solid black',
    display:'flex',
    paddingTop:'4%'
  },
  innerContainer: {
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    marginBottom:'10%'
  },
	title: {
    fontSize:30, 
    fontFamily: "'Concert One', cursive",
    color:'#2F3E46',
    alignSelf:'center'
  },
  bigTitle: {
    fontSize:50, 
    fontFamily: "'Concert One', cursive",
    color:'#2F3E46',
    alignSelf:'center'
  },
  image: {
    height:'200px',
    marginBottom:'2.5%'
  },
  input: {
    width:'70%',
    height:'90%',
    border:'none',
    fontSize:'1.2rem',
    fontFamily: "'Concert One', cursive", 
    paddingLeft:'5%',
  },
  button: {
    width:'30%',
    height:'100%',
    border:'none',
    backgroundColor:'#354F52',
    color: '#84A98C',
    fontSize:'1.4rem',
    fontFamily: "'Concert One', cursive",
  },
  inputContainer: {
    height:'5vh',
    border:'1px solid #84A98C',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  scrollBox: {
    height:'50vh',
    width:'40vw',
    border:'1px solid #d3d3d3',
    borderRadius:'6px',
    backgroundColor: '#fff',
    marginBottom: '2%',
    paddingTop:'5%'
  }
}

export default Chat  

// be mindful, stay present, and keep it zen Built with love

