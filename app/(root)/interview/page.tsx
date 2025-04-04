import React from 'react'
import Agent from '@/components/Agent'

const page = () => {
  return (
   <>
   <h3>
    interview generation
    <Agent userName = "You" userId = "user1" types = "generate" />
   </h3>
   </>
  )
}

export default page