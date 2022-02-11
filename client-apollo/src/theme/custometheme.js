import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#4c4320',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			//light: '#0066ff',
			main: '#244a51',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
		//morecolors
		cadetblue: {
			main: '#51a3a3',
		},
		aztecgold: {
			main: '#cb904d',
		},
		deepspacesparcle: {
			main: '#466362',
		},
		straw: {
			main: '#dfcc74',
		},
		mediumspringbud: {
			main: '#c3e991',
		},

		carlstongreen: {
			main: '#2d2d2a',
		},
		honeydew: {
			main: '#f1f7ee',
		},
		englishgreen: {
			main: '#19535f',
		},
		eggshell: {
			main: '#eaf0ce',
		},
		sheldonblue: {
			main: '#7d98a1',
		},

		darksmoke: {
			main: '#707070',
		},
		redwine: {
			main: '#e92424',
		},

		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	typography: {
		subtitle1: {
			fontSize: 12,
		},
		subtitle2: {
			color: 'red',
		},

		body1: {
			fontWeight: 500,
		},
		button: {
			fontStyle: 'italic',
		},
	},
});
export default theme;
