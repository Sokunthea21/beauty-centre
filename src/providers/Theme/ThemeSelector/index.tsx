'use client'

import { Moon, Sun } from 'lucide-react'
import React, { JSX, useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<Theme | 'auto'>('auto')

  const getNextTheme = (currentTheme: Theme | 'auto'): Theme | 'auto' => {
    if (currentTheme === 'auto') return 'light'
    if (currentTheme === 'light') return 'dark'
    return 'light' // dark -> light
  }

  const getThemeIcon = (theme: Theme | 'auto'): JSX.Element => {
    switch (theme) {
      case 'auto':
        // Check system preference for auto theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? <Moon size={16} /> : <Sun size={16} />
      case 'light':
        return <Sun size={16} />
      case 'dark':
        return <Moon size={16} />
    }
  }

  const onThemeToggle = () => {
    const nextTheme = getNextTheme(value)

    if (nextTheme === 'auto') {
      setTheme(null)
      window.localStorage.removeItem(themeLocalStorageKey)
    } else {
      setTheme(nextTheme)
      window.localStorage.setItem(themeLocalStorageKey, nextTheme)
    }

    setValue(nextTheme)
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    if (preference && (preference === 'light' || preference === 'dark')) {
      setValue(preference as Theme)
      setTheme(preference as Theme)
    } else {
      setValue('auto')
      setTheme(null)
    }
  }, [setTheme])

  return (
    <button
      onClick={onThemeToggle}
      aria-label="Toggle theme"
      className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center p-2"
    >
      {getThemeIcon(value)}
    </button>
  )
}
