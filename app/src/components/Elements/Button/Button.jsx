import clsx from 'clsx'
import * as React from 'react'

import { Spinner } from '@/components/Elements/Spinner'

const variants = {
  primary: 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-gray-100',
  inverse: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
}

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
}

export const Button = React.forwardRef((
  {
    type = 'button',
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    startIcon,
    endIcon,
    ...props
  },
  ref
) => {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'flex justify-center items-center border border-gray-400 duration-100 ease-linear disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow-sm font-normal focus:outline-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {!isLoading && startIcon}
      <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
    </button>
  )
})

Button.displayName = "Button"