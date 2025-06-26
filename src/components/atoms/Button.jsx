import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed
  `
  
  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-red-600 text-white shadow-lg
      hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
    `,
    secondary: `
      bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200
      hover:from-gray-100 hover:to-gray-200 hover:shadow-md hover:scale-[1.02] 
      active:scale-[0.98]
    `,
    ghost: `
      text-gray-600 hover:bg-gray-50 hover:text-gray-900
      hover:scale-[1.02] active:scale-[0.98]
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg
      hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
    `,
    success: `
      bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg
      hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
    `
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3'
  }

  const handleClick = (e) => {
    if (disabled || loading) return
    onClick?.(e)
  }

  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="animate-spin" 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16} 
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon 
          name={icon} 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16} 
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon 
          name={icon} 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16} 
        />
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button