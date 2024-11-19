import React from 'react'

const LayoutApp: React.FC<{children : React.ReactNode}> = ({children}) => {
  return (
    <div className="max-h-[600px] overflow-y-auto  mt-[70px]">
      {children}
    </div>
  )
}

export default LayoutApp;