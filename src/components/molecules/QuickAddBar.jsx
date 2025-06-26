import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import PrioritySelector from "./PrioritySelector";
import { parseTaskInput } from "../../utils/taskParser";

const QuickAddBar = ({ onAddTask, defaultProject = null }) => {
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState(4)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
        setIsExpanded(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const parsedTask = parseTaskInput(input)
    
    onAddTask({
      ...parsedTask,
      priority,
      projectId: defaultProject
    })

    setInput('')
    setPriority(4)
    setIsExpanded(false)
    inputRef.current?.blur()
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!input.trim()) {
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4"
      initial={false}
      animate={{ 
        boxShadow: isExpanded 
          ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : '0 1px 3px rgba(0, 0, 0, 0.05)' 
      }}
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Add a task... (try 'Call John tomorrow' or 'Review report today')"
              icon="Plus"
              className="border-0 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 text-base"
            />
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <PrioritySelector
                  priority={priority}
                  onChange={setPriority}
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!input.trim()}
                >
                  Add task
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 text-xs text-gray-500 flex items-center gap-4"
            >
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">⌘N</kbd>
                Quick add
              </span>
              <span>Try: "Call John tomorrow", "Review report today p1"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

export default QuickAddBar