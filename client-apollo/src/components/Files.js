import React from 'react';
//old import { useQuery } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
//old import gql from 'graphql-tag'
import { gql } from '@apollo/client';

export const filesQuery = gql`
	{
		files
	}
`;

export const Files = () => {
	const { data, loading } = useQuery(filesQuery);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{data.files.map((x) => {
				return (
					<img
						style={{ width: 200 }}
						key={x}
						src={`http://localhost:4000/images/${x}`}
						alt={x}
					/>
				);
			})}
		</div>
	);
};
