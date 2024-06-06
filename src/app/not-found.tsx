import React from 'react'
import "./[locale]/globals.css"
const NotFound = () => {
  return (
    <html>
      <body className='w-[100%] min-h-[100vh] bg-zinc-900 flex justify-center items-center flex-col text-white'>
        <h1 className='text-[60px] font-[700]'>404</h1>
        <h1 className='text-[30px] font-[600]'>Not Found</h1>
      </body>
    </html>
  )
}

export default NotFound
