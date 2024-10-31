"use client"

import React, { useRef, useState } from 'react'
import moment from 'moment';
import toast from 'react-hot-toast';
import type { User } from '@prisma/client'
import { FaClock } from "react-icons/fa"

import { handleExport } from '@/lib/handleExport';
import TableSearch from './TableSearch';

export default function UserList({ users }: { users: User[] | undefined }) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [allTableData, setAllTableData] =  useState<User[] | []>(users!)
    const [tableData, setTableData] = useState<User[] | []>(users!)

    const handleDownload = async () => {
        try {
            const heading = [`S/N`, `User Details`, `Phone`, `Email`, `State`, `Date-Registered`];
            const fileName = `Register4SIFA-${moment(new Date()).format("DD-MM-YYYY")}`
            const data = tableData?.map((user, i) => ([`${i + 1}`, `${user?.firstname} ${user?.lastname}`, user?.phone, user?.email, user?.state, moment(user?.createdAt).format("MM-DD-YYYY")]))
            await handleExport(heading, data, fileName)
        } catch (error) {
            console.log('error', error)
            toast.error(`Unable to export selected record. Please, try again`, { id: "8290", duration: 6000 })
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const keyword = inputRef.current?.value.toLowerCase() || ''
        if (!keyword || keyword === '') {
            setTableData(allTableData)
        }
        else {
            const result = tableData.filter(el => el.firstname.toString().toLowerCase().includes(keyword) || el.lastname?.toString().toLowerCase().includes(keyword) || el.email?.toLowerCase().includes(keyword) || el.phone?.toString().toLowerCase().includes(keyword) || el.state.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword))
            setTableData(() => [...result])
        }
        setAllTableData(allTableData)
    }

    return (
        <section className='py-10 px-4'>
            <>
                <section className="relative w-full flex flex-col gap-2 p-4 bg-white shadow-slate-200 shadow-md rounded-lg">
                    <div className="w-full overflow-x-scroll lg:overflow-x-hidden pb-6 x-scrollbar">
                        <table className="w-full text-slate-500 text-xs sm:text-sm min-w-[20rem] divide-y divide-slate-300">
                            <thead>
                                <tr>
                                    <th colSpan={6}>
                                        <TableSearch title='USER RECORD' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                            <div className="md:ml-[5rem] flex gap-2 mr-4">
                                                <button onClick={handleDownload} className="bg-secondary hover:bg-secondary/90 text-white text-xs font-light rounded-sm py-2 px-4 cursor-pointer hover:shadow-default whitespace-nowrap capitalize">Download Record</button>
                                            </div>
                                        </TableSearch>
                                    </th>
                                </tr>
                                <tr className='text-slate-600 text-xs text-center'>
                                    <th className='font-light text-left py-2'>S/N</th>
                                    <th className='font-light text-left'>User Details</th>
                                    <th className='font-light'>Phone</th>
                                    <th className='font-light'>Email</th>
                                    <th className='font-light'>State</th>
                                    <th className='font-light'>Date Registered</th>
                                </tr>
                            </thead>
                            <tbody className='w-full divide-y divide-slate-200'>
                                {
                                    tableData.length ?
                                        tableData.map((user, i) => (
                                            <tr key={user.id} className='even:bg-slate-50/50'>
                                                <td className='px-2 align-middle'>
                                                    <div className="flex justify-center">
                                                        <div className='flex flex-col'>
                                                            <h5 className="text-sm font-medium leading-tight whitespace-nowrap capitalize">{i + 1}</h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-2'>
                                                    <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer pr-2">
                                                        <div className='flex flex-col'>
                                                            <h5 className="text-sm py-4 font-medium leading-[1px] whitespace-nowrap capitalize">{user.firstname} {user.lastname}</h5>
                                                            {/* <h4 className="text-slate-400 text-xs pb-[.1rem]">{user.state}</h4> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-2 align-middle'>
                                                    <div className="flex justify-center">
                                                        <div className='flex flex-col'>
                                                            <h5 className="text-sm font-medium leading-tight whitespace-nowrap capitalize">{user.phone}</h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle px-2">
                                                    <div className="flex justify-center">
                                                        <h5 className="text-sm font-medium leading-tight whitespace-nowrap lowercase">{user?.email}</h5>
                                                    </div>
                                                </td>
                                                <td className="align-middle px-2">
                                                        {/* <p className={`${user.state === "Abuja-FCT" || user.state === "Nasarawa" || user.state === "Plateau" ? 'bg-slate-50 text-dark/80' : 'bg-white text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium whitespace-nowrap capitalize`}>{user.state}</p> */}
                                                        <p className={`text-center text-dark/80 text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium whitespace-nowrap capitalize`}>{user.state}</p>
                                                    <div className="flex justify-center gap-2">
                                                    </div>
                                                </td>
                                                <td className="align-middle px-2">
                                                    <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                        <FaClock className="text-inherit mt-[.1rem]" /> <p className="whitespace-nowrap capitalize">{moment(user.createdAt).format("DD-MM-YYYY")}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={6}>
                                                <h4 className="text-slate-500 text-center">No Record(s) Found</h4>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </>
        </section>
    )
}
