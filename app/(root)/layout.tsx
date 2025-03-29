import React from 'react'
import { ReactNode } from 'react'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <div>{children}</div> 
  )
}

export default Rootlayout