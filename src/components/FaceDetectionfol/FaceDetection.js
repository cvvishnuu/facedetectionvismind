import React from 'react';

const FaceDetection = ({ imageUrl }) => {
	return (
		<div className = 'center1'>
			<div className = 'absolute mt2 ma2' > 
				<img alt = '' src = {imageUrl} width = '500px' height = 'auto' />
			</div>
		</div>
	)
}

export default FaceDetection;