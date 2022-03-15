import React, { useState, useEffect, useRef } from 'react';
import { addImage } from './DataStore';

export const ImageUpload = (props) => {
	const [selectedImage, setselectedImage] = useState();
	const fileRef = useRef();

	const setImage = async (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append('file', image);
		formData.append('title', image.name);
		formData.append('type', image.type);
		const resp = await addImage(formData);
		props.setImageID(resp.id);
		setselectedImage(URL.createObjectURL(image));
	};

	useEffect(() => {
		fileRef.current.value = '';
		setselectedImage('');
	}, [props.changed]);

	return (
		<div className="image-uploader">
			<input type="file" name="file" onChange={setImage} ref={fileRef} />
			{selectedImage && <img src={selectedImage} alt="" />}
		</div>
	);
};
