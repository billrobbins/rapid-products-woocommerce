import React, { useState, useEffect, useRef } from 'react';
import { addImage } from '../DataStore';

export const ImageUpload = (props) => {
	const [selectedImage, setSelectedImage] = useState();
	const [uploading, setUploading] = useState(false);
	const fileRef = useRef();

	// Sets the loading indicator for the image and disables the add product button wile uploading
	const toggleUploading = (bol) => {
		setUploading(bol);
		props.setProcessing(bol);
	};

	/*
	 * Image Handler
	 * Handles our upload indicator, sends the file to the server,
	 * and passes the image id to AddProductForm
	 */

	const setImage = async (e) => {
		const image = e.target.files[0];
		toggleUploading(true);
		const formData = new window.FormData();
		formData.append('file', image);
		formData.append('title', image.name);
		formData.append('type', image.type);
		try {
			const resp = await addImage(formData);
			props.setImageID(resp.id);
			setSelectedImage(URL.createObjectURL(image));
		} catch (error) {
			props.updateMessage(error.message);
			props.setImageID(null);
		} finally {
			toggleUploading(false);
		}
	};

	// Resets image when new product is created.
	useEffect(() => {
		fileRef.current.value = '';
		setSelectedImage('');
		setUploading(false);
	}, [props.changed]);

	return (
		<div className={`image-uploader ${uploading ? 'loading' : 'waiting'}`}>
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
