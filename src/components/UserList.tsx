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
    const [tableData, setTableData] = useState(users || [])

    const handleDownload = async () => {
        try {
            const heading = [`S/N`, `User Details`, `Phone`, `Email`, `State`, `Date-Registered`];
            const fileName = `Deposit Record - ${moment(new Date()).format("DD-MM-YYYY")}`
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
            setTableData(users || [])
        }
        else {
            const result = tableData.filter(el => el.firstname.toString().toLowerCase().includes(keyword) || el.lastname?.toString().toLowerCase().includes(keyword) || el.email?.toLowerCase().includes(keyword) || el.phone?.toString().toLowerCase().includes(keyword) || el.state.toString().toLowerCase().includes(keyword) || el.createdAt.toString().toLowerCase().includes(keyword))
            setTableData(() => [...result])
        }
    }

    return (
        <section className='py-10 px-4'>
            <>
                <section className="relative flex flex-col gap-2 p-4 bg-white dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
                    <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                        <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
                            <thead>
                                <tr>
                                    <th colSpan={5}>
                                        <TableSearch title='DEPOSIT' key={'72088234'} handleSearch={handleSearch} inputRef={inputRef}>
                                            <div className="md:ml-[5rem] flex gap-2 mr-4">
                                                {/* <button onClick={() => modalRef.current?.showModal()} className="text-white bg-sky-500 px-4 py-2 rounded-md cursor-pointer text-xs font-light whitespace-nowrap">Make Deposit</button> */}
                                                <button onClick={handleDownload} className="bg-default hover:bg-default/90 text-white text-xs font-light rounded-md py-2 px-4 cursor-pointer hover:shadow-default whitespace-nowrap">Download Record</button>
                                            </div>
                                        </TableSearch>
                                    </th>
                                </tr>
                                <tr className='text-slate-600 dark:text-slate-50 text-xs text-center'>
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
                                        tableData.map(user => (
                                            <tr key={user.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                                <td className='px-2'>
                                                    <div className="max-w-sm w-max flex items-center gap-2 cursor-pointer">
                                                        <div className='flex flex-col'>
                                                            <h5 className="text-sm lg:text-base font-medium leading-tight whitespace-nowrap">{user.firstname} {user.lastname}</h5>
                                                            <h4 className="text-slate-400 text-xs py-[.1rem] sm:py-1">{user.state}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-2 align-middle'>
                                                    <div className="flex justify-center">
                                                        <div className='flex flex-col'>
                                                            <h5 className="text-sm lg:text-base font-medium leading-tight whitespace-nowrap">{user.phone}</h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="align-middle px-4">
                                                        <div className='flex flex-col'>
                                                            <h5 className="text-sm lg:text-base font-medium leading-tight whitespace-nowrap">{user?.email}</h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="flex justify-center gap-2">
                                                        <div className={`${user.state === "Abuja-FCT" ? 'bg-green-100 text-green-500' : user.state === "Nasarawa" ? 'bg-sky-100 text-sky-500' : user.state === "Plateau" ? 'bg-indigo-100 text-indigo-500' : user.state === "Enugu" ? 'bg-blue-100 text-blue-500' : 'bg-slate-100 text-slate-500'} text-xs py-[.1rem] sm:py-1 px-3 rounded-sm font-medium`}>{user.state}</div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-xs py-[.1rem] sm:py-1">
                                                        <FaClock className="text-inherit mt-[.1rem]" /> <p className="">{moment(user.createdAt).format("DD-MM-YYYY")}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={5}>
                                                <h4 className="text-slate-500 text-center dark:text-slate-300">No Record(s) Found</h4>
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
