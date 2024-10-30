import { ASSETS_URL } from '@/assets/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
      <header className='relative p-4'>
          <div className="container mx-auto flex justify-between items-center gap-2">
              <Link href={`/`} className="relative h-10 w-28">
                  <Image src={ASSETS_URL["ileap_logo"]} alt='ileap_logo' fill/>
              </Link>
              <Link href={`https://cstemp.org`} target="_blank" rel="noopener noreferrer" className="relative h-10 w-24">
                  <Image src={ASSETS_URL["cstemp_logo"]} alt='cstemp_logo' fill/>
              </Link>
          </div>
    </header>
  )
}
