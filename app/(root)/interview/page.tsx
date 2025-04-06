import React from 'react'
import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.actions'



const page = async() => {

  const user = await getCurrentUser();

  return (
   <>
   <h3>
    interview generation
    <Agent userName ={user?.name!} userId = {user?.id} type = "generate" />
   </h3>
   </>
  )
} 

export default page
