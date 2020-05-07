import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const rooms = ['zen', 'yoga', 'strength', 'nutrition']
  return(
    <div style={styles.outerContainer}>
			<div style={styles.innerContainer}>
        <h1 style={styles.title}>Zen Chat</h1>
        <img style={styles.image} src='./yogaGreen.png' alt='Girl doing yoga' />			
				<form>
          <input placeholder='Name' style={styles.input} type='text' onChange={(event) => setName(event.target.value)} />
          <select onChange={(event) => setRoom(event.target.value)} style={styles.select}>
            <option disabled selected>Select a Room</option>
            {rooms.map((room, index) => {
              return <option key={index} value={room}>{room}</option>
            })}
          </select>
				</form>
				<Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
					<button 
            style={styles.button} 
            type='submit' 
            onClick={() => {if(!name || ! room) alert('Please complete all fields')}}
          >
          Sign In</button>
				</Link>
        <div style={styles.text}>FYI <p style={styles.zen}>'zen'</p> is our most popular room!</div>
			</div>
		</div>
  )
}

const styles = {
	outerContainer: {
		border:'1px solid #CAD2C5',
    backgroundColor:'#CAD2C5',
    height:'100vh'
	},
	innerContainer: {
    marginTop:'5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',  
	},
	title: {
    fontSize:55, 
    fontFamily: "'Concert One', cursive",
    color:'#2F3E46'
  },
  image: {
    height:'200px',
    marginBottom:'2.5%'
  },
  input: {
    width:'100%',
    height:'30px',
    marginBottom:'5%',
    paddingLeft:'5%',
    borderRadius:'6px',
    border:'1px solid #eeeeee',
    fontSize:16, 
    fontFamily: "'Concert One', cursive",
    color:'#2F3E46',
  },
  select: {
    width:'106%',
    height:'33px',
    marginBottom:'5%',
    paddingLeft:'5%',
    borderRadius:'6px',
    border:'1px solid #eeeeee',
    fontSize:16, 
    fontFamily: "'Concert One', cursive",
    color:'#2F3E46',
    justifyContent:'center'
  },
  button: {
    width:'150px',
    height:'45px',
    marginBottom:'5%',
    marginTop:'10%',
    paddingTop:'3%',
    paddingBottom:'5%',
    paddingLeft:'5%',
    borderRadius:'6px',
    border:'1px solid #eeeeee',
    backgroundColor:'#354F52',
    color: '#84A98C',
    fontSize:'1.4rem',
    fontFamily: "'Concert One', cursive",
  },
  text: {
    marginTop:'7%',
    fontFamily: "'Concert One', cursive",
    color:'#354F52',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100vw',
  },
  zen: {
    color: '#84A98C',
    fontSize:'2rem',
    marginLeft:'1%',
    marginRight:'1%',
  }
}

export default Join  
