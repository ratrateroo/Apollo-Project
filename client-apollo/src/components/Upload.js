import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { gql, useMutation } from '@apollo/client';

import { FILES_QUERY } from './Files';

const uploadFileMutation = gql`
	mutation UploadFile($file: Upload!) {
		uploadFile(file: $file) {
			filename
			mimetype
			encoding
		}
	}
`;

const Upload = () => {
	const [uploadFile] = useMutation(uploadFileMutation, {
		refetchQueries: [{ query: FILES_QUERY }],
	});
	const onDrop = useCallback(
		([file]) => {
			uploadFile({ variables: { file } });
		},
		[uploadFile]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
};

export default Upload;
