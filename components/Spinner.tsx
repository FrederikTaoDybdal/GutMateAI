import { HTMLAttributes } from 'react'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

const Spinner = ({ className = "", ...props }: SpinnerProps) => {
  return (
    <div 
      className={`w-4 h-4 rounded-full animate-spin border-2 border-solid border-brand-primary border-t-transparent ${className}`}
      {...props}
    />
  )
}

export default Spinner
