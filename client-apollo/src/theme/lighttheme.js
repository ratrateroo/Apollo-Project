import { createTheme } from '@mui/material/styles';

const lighttheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#51a3a3',
			contrastText: '#fff',
		},
		secondary: {
			main: '#cb904d',
		},
		error: {
			main: '#e92424',
		},
		success: {
			main: '#c3e991',
		},
		warning: {
			main: '#dfcc74',
		},
		info: {
			main: '#466362',
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
export default lighttheme;
