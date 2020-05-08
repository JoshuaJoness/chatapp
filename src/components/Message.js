import React from 'react'
import ReactEmoji from 'react-emoji'

const Message = ({ message, username, time, name,  }) => {
	let isSentByCurrentUser = false

	if(name === username) {
		isSentByCurrentUser = true
	}

	return (
		<div style={styles.container}>
			{isSentByCurrentUser ?
			<div style={styles.userMessage}>	
				{ReactEmoji.emojify(message)} 
				<div style={{display:'flex'}}>
					<p style={{color:'#CAD2C5', diplay:'inline-block'}}>from {username}</p> 
					<p style={{color: '#84A98C', display:'inline-block', marginLeft:'2%'}}>{time}</p>
				</div>
			</div>
			:
			<div style={styles.otherUserMessage}>	
				{/* Splitting message to style user */}
				{message.includes('entered the' || 'left the') ? <div >
					<p style={{display:'inline', color:'#2F3E46', marginLeft:'2%', fontSize:'1.7rem'}}>
						{message.split(' ').shift()}
					</p>
					<p style={{display:'inline', marginLeft:'3%'}}>{message.split(' ').splice(1,4).join(' ')}</p>
				</div>
				: <p>{ReactEmoji.emojify(message)}</p> } 

				<div style={{display:'flex'}}>
					<p style={{color:'#52796F', diplay:'inline-block'}}>from {username}</p> 
					<p style={{color: '#84A98C', display:'inline-block', marginLeft:'2%'}}>{time}</p>
				</div>
			</div>
			}
		</div>
	)
}

const styles = {
	container: {display:'flex', flexDirection:'column'},
	userMessage: {
		alignSelf:'flex-end',
		backgroundColor:'#2F3E46', 
		color:'#84A98C',
		padding:'10px',
		marginRight:'5%',
		marginTop:'2.5%',
		borderRadius:'10px',
		fontFamily: "'Concert One', cursive",
		width:'50%'
	},
	otherUserMessage: {
		alignSelf:'flex-start',
		backgroundColor:'#eeeeee', 
		color:'#84A98C',
		padding:'10px',
		marginLeft:'5%',
		marginTop:'2.5%',
		borderRadius:'10px',
		fontFamily: "'Concert One', cursive",
		width:'50%'
	}
}

export default Message