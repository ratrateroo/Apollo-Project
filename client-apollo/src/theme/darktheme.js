import { createTheme } from '@mui/material/styles';

const darktheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#2d4a47',
		},
		secondary: {
			main: '#aa673f',
		},
		error: {
			main: '#f34642',
		},
		success: {
			main: '#96cc56',
		},
		warning: {
			main: '#ece0aa',
		},
		info: {
			main: '#608786',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
});
export default darktheme;
