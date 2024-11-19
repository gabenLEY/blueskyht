import React from 'react'

const DisplayLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
       <div className="max-h-[600px] overflow-y-auto">
         {children}
       </div>
  )
}

export default DisplayLayout