import { gql, useApolloClient, useMutation } from '@apollo/client';

const SINGLE_UPLOAD_MUTATION = gql`
	mutation uploadFile($file: Upload!) {
		uploadFile(file: $file) {
			filename
			mimetype
			encoding
		}
	}
`;

const InputUpload = () => {
	const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
	const apolloClient = useApolloClient();

	const onUploadHandler = ({
		target: {
			validity,
			files: [file],
		},
	}) => {
		validity.valid &&
			uploadFileMutation({ variables: { file: file } }).then(() => {
				apolloClient.resetStore();
			});
	};

	return <input type="file" onChange={onUploadHandler} />;
};

export default InputUpload;
