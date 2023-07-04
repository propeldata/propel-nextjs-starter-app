import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Inter } from 'next/font/google'
import '../styles/global.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#53389E'
    }
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(',')
  }
})

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
