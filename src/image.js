import React, { useState, useEffect } from 'react';
import { addImage } from './DataStore';

export const ImageUpload = () => {
	const [selectedImage, setselectedImage] = useState();

	const setImage = (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append('file', image);
		formData.append('title', image.name);
		formData.append('type', image.type);
		addImage(formData);
		setselectedImage(URL.createObjectURL(image));
	};

	return (
		<div className="image-uploader">
			<input type="file" name="file" onChange={setImage} />
			{selectedImage && <img src={selectedImage} alt="" />}
		</div>
	);
};
