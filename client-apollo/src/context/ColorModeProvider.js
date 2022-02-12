import { ColorModeContext } from './ColorModeContext';

const ColorModeProvider = ({ children }) => {
	let value;
	return (
		<ColorModeContext.Provider value={value}>
			{children}
		</ColorModeContext.Provider>
	);
};

export default ColorModeProvider;
