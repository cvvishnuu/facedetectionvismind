import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import Logoicon from './Logoicon.png';

const Logo = () => {
	return (
		<div className = 'ma4 mt0'>
			<Tilt className = "Tilt br4 pa4 shadow-2" options={{ max : 75, perspective: 300 }} style={{ height: '150px', width: '150px' }} >
				<div className = "Tilt-inner">
					<img alt = 'Brain icon' src = {Logoicon} />
				</div>
			</Tilt>
		</div>
	)
}

export default Logo; 