import React, { useState, useEffect, useRef } from 'react';
import { addImage } from './DataStore';

export const ImageUpload = (props) => {
	const [selectedImage, setselectedImage] = useState();
	const [uploading, setUploading] = useState('waiting');
	const fileRef = useRef();

	const setImage = async (e) => {
		const image = e.target.files[0];
		setUploading('loading');
		const formData = new FormData();
		formData.append('file', image);
		formData.append('title', image.name);
		formData.append('type', image.type);
		const resp = await addImage(formData);
		setUploading('waiting');
		props.setImageID(resp.id);
		setselectedImage(URL.createObjectURL(image));
	};

	useEffect(() => {
		fileRef.current.value = '';
		setselectedImage('');
	}, [props.changed]);

	return (
		<div className={'image-uploader ' + uploading}>
			<input type="file" name="file" onChange={setImage} ref={fileRef} />
			<p className="image-upload-instructions">
				<span className="default">
					Click to select a file, or drag it here.
				</span>
				<span className="loading-image">Uploading image.</span>
			</p>
			{selectedImage && <img src={selectedImage} alt="" />}
		</div>
	);
};
