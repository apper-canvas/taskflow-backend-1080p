import { useEffect } from 'react'

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      for (const shortcut of shortcuts) {
        const { key, ctrlKey = false, metaKey = false, shiftKey = false, altKey = false, callback } = shortcut

        const isModifierMatch = 
          event.ctrlKey === ctrlKey &&
          event.metaKey === metaKey &&
          event.shiftKey === shiftKey &&
          event.altKey === altKey

        if (event.key.toLowerCase() === key.toLowerCase() && isModifierMatch) {
          event.preventDefault()
          callback(event)
          break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}