import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
	return (
		<div>
			<p style = {{fontWeight: 'bold'}} className = 'f3 '>
				{'My brain here will detect the faces in your pictures. Give it a shot !!!'}
			</p>
			<div className = 'center1'>
				<div className = 'center1 form pa4 br3 shadow-5'>
					<input style = {{borderRadius: '5px'}} className = 'f4 pa2 w-70 center' type = 'text' />
					<button className = 'persb w-30 grow f4 link ph3 pv2 dib bg-light-purple'>Detect</button>
				</div>	
			</div>
		</div>	
	)
}

export default ImageLinkForm;