import { useState, useMemo } from 'react';
import { ColorModeContext } from './ColorModeContext';

const ColorModeProvider = ({ children }) => {
	const [mode, setMode] = useState('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	let value;
	return (
		<ColorModeContext.Provider value={colorMode}>
			{children}
		</ColorModeContext.Provider>
	);
};

export default ColorModeProvider;
