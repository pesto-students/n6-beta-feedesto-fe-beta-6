import { DeepPartial, theme as chakraTheme } from '@chakra-ui/react'
// import '@fontsource/inter'

const theme: DeepPartial<typeof chakraTheme> = {
	...chakraTheme,
	//     components: {
	//         ...chakraTheme.components,
	//         Button: {
	//             ...chakraTheme.components.Button,
	//             baseStyle: {
	//                 ...chakraTheme.components.Button.baseStyle,
	//                 fontWeight: '400',
	//         }
	//     }
	//   },
	fonts: {
		...chakraTheme.fonts,
		body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
	},
	fontWeights: {
		light: 300,
		normal: 400,
		medium: 400,
		semibold: 600,
		bold: 800,
	},
}
export default theme
