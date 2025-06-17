import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
// Adjust the import according to the actual export in AppContext
import { AppContextProvider  } from '@/context/AppContext'; // or wherever it's located

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
