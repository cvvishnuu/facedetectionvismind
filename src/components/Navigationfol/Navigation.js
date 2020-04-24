import React from 'react';
import './Navigation.css'

const Navigation = () => {
	return (
		<nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
			<p style = {{borderRadius: '12px', margin: '20px'}} className = 'f3 link white pa3 dim pointer btn-grad'>Sign Out</p>
		</nav>
	)
}

export default Navigation;