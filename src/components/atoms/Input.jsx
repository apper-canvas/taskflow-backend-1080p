import { forwardRef } from 'react'
import ApperIcon from './ApperIcon'

const Input = forwardRef(({ 
  type = 'text',
  label,
  error,
  icon,
  iconPosition = 'left',
  placeholder,
  className = '',
  containerClassName = '',
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = `
    w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200
    placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  `
  
  const stateClasses = error 
    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
    : 'border-gray-200 bg-white hover:border-gray-300 focus:bg-white'

  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : ''

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${baseClasses} ${stateClasses} ${iconClasses} ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} size={18} />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input