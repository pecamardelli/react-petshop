import React from 'react';

const Input	= ({ name, ...rest }) => {
	return (
		<input
			id={name}
			name={name}
			{...rest}
		/>
	);
}

export default Input;