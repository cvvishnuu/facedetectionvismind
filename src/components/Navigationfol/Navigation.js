import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
		if(isSignedIn){
			return(
				<nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick = {() => onRouteChange('signout')} style = {{borderRadius: '12px', margin: '20px', paddingTop: '10px'}} className = 'b ph3 pv2 input-reset ba b--black link bg-transparent grow pointer f3 dib'>Sign Out</p>
				</nav>
			)
		} else {
			return (
				<nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick = {() => onRouteChange('signin')} style = {{borderRadius: '12px', margin: '20px', paddingTop: '10px'}} className = 'b ph3 pv2 input-reset ba b--black link bg-transparent grow pointer f3 dib'>Sign In</p>
					<p onClick = {() => onRouteChange('register')} style = {{borderRadius: '12px', margin: '20px', paddingTop: '10px'}} className = 'b ph3 pv2 input-reset ba b--black link bg-transparent grow pointer f3 dib'>Register</p>
				</nav>
			)
		}
}

export default Navigation;