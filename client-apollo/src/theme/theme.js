import { createTheme } from '@mui/material/styles';
import cadetblue from './colors/cadetblue';

const theme = createTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#1976d2',
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
			main: cadetblue[400], //400
			light: cadetblue[200], //200
			dark: cadetblue[600], //600,
			contrastText: '#00020A', //test
		},
		aztecgold: {
			main: '#cb904d', //600
			light: '#d7a75d', //400
			dark: '#ba7843', //800
			contrastText: '#020A2B', //test
		},
		deepspacesparcle: {
			main: '#466362', //700
			light: '#608786', //500
			dark: '#283a39', //900
			contrastText: '#d9d9d9', //test
		},
		straw: {
			main: '#dfcc74', //200
			light: '#f7f3dd', //50
			dark: '#ccab00', //400
			contrastText: '#', //test
		},
		mediumspringbud: {
			main: '#c3e991', //300
			light: '#e5f6cf', //100
			dark: '#a7dd5f', //500
			contrastText: '#', //test
		},

		carlstongreen: {
			main: '#2d2d2a', //900
			light: '#aeaeaa', //500
			dark: '#6f6f6c', //700
			contrastText: '#', //test
		},
		honeydew: {
			main: '#f1f7ee', //50
			light: '#7bc258', //500
			dark: '#286729', //900
			contrastText: '#', //test
		},
		englishgreen: {
			main: '#19535f', //900
			light: '#42b7db', //400
			dark: '#2b89a4', //700
			contrastText: '#', //test
		},
		eggshell: {
			main: '#eaf0ce', //100
			light: '#f7f9eb', //50
			dark: '#cddd8a', //300
			contrastText: '#', //test
		},
		sheldonblue: {
			main: '#7d98a1', //400
			light: '#b4c3c8', //200
			dark: '#59767f', //600
			contrastText: '#', //test
		},

		darksmoke: {
			main: '#707070', //600
			light: '#b8b8b8', //400
			dark: '#3e3e3e', //800
			contrastText: '#', //test
		},
		redwine: {
			main: '#e92424', //600
			light: '#ea6b69', //300
			dark: '#bc0006', //900
			contrastText: '#', //test
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
export default theme;
