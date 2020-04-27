import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, box }) => {
	return (
		<div className = 'center1'>
			<div className = 'absolute mt2 ma2' > 
				<img id = 'inputimage' alt = '' src = {imageUrl} width = '500px' height = 'auto' />
				<div className = 'bounding-box' style = {{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
			</div>
		</div>
	)
}

export default FaceDetection;