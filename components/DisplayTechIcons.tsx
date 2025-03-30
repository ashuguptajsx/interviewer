import React from 'react'

const DisplayTechIcons = async({techStack}:TechIconProps) => {
    const techIcons = await getTechLogos(techStack);
  return (
    <div className='flex flex-row'>{techStack}</div>
  )
}

export default DisplayTechIcons