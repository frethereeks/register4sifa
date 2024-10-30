import React from 'react'

export default function Footer() {
  return (
      <footer className='bg-primary py-5 px-4'>
          <div className="container mx-auto text-center text-white">
            Copyright © {new Date().getFullYear()}. All rights reserved. C-STEMP Skills Training & Empowerment Partnership LTD/GTE
          </div>
    </footer>
  )
}
