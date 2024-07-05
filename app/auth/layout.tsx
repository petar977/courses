import React from 'react'

export default function AuthLayout({ children }: {children:React.
    ReactNode}) {
  return (
    <div className="h-full flex items-center justify-center mx-5">
        { children }
    </div>
  )
}
