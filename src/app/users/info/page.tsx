import React from 'react'
import { UserList } from "@/components"
import { fetchUsers } from '@/actions'
import { ASSETS_URL } from '@/assets/images'
import Image from 'next/image'

export default async function UserDetails() {
    const data = await fetchUsers()

    return (
        <main className='flex flex-col bg-backdrop'>
            <section className="bg-dark py-10 relative">
                <Image src={ASSETS_URL['man_and_woman_molding']} alt={"man_and_woman_molding"} className="object-cover object-top absolute top-0 left-0 w-full h-full bg-white opacity-40" fill />
                {/* <div className="absolute top-0 left-0 w-full h-full bg-dark opacity-60"></div> */}
                <div className="relative container mx-auto flex flex-col gap-10 px-4">
                    <div className="flex justify-between items-center gap-4 flex-wrap py-16">
                        <div data-aos-duration="1000" data-aos-delay="500" data-aos="fade-up">
                            <h2 className="font-bold max-w-lg text-white text-3xl md:text-4xl">Solution. Collaboration. Innovation.</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative bg-white py-10 lg:py-20 px-4">
                <div className="container mx-auto relative">
                    <UserList users={data?.users} />
                </div>
            </section>
        </main>
    )
}