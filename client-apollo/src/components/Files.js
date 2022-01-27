import React from 'react';
//old import { useQuery } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
//old import gql from 'graphql-tag'
import { gql } from '@apollo/client';

export const FILES_QUERY = gql`
	query FilesQuery {
		files
	}
`;

const Files = () => {
	const { data, loading, error } = useQuery(FILES_QUERY);
	console.log(data);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{error ? (
				<div>Can't find files.</div>
			) : (
				data.files.map((x) => {
					return (
						<img
							style={{ width: 200 }}
							key={x}
							src={`http://localhost:8000/freefiles/images/${x}`}
							alt={x}
						/>
					);
				})
			)}
		</div>
	);
};

export default Files;
