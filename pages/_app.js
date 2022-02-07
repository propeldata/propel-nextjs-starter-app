import DateDayjsAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
	return (
		<LocalizationProvider dateAdapter={DateDayjsAdapter}>
			<Component {...pageProps} />
		</LocalizationProvider>
	)
}
