"use client"
import { handleRegisterUser } from '@/actions'
import React, { FormEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const allStates = ["Abuja-FCT", "Plateau", "Nasarawa", "Others"]

export default function RegisterForm() {
    const [pending, setPending] = useState(false)
    const [state, setState] = useState<string>()
    const [otherStates, setOtherStates] = useState("")
    const formRef = useRef<HTMLFormElement | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setPending(true)
        // if (state === "Others" && otherStates !== "") {
        //     setState(otherStates)
        // }
        const formData = new FormData(formRef.current!)
        const res = await handleRegisterUser(formData)
        try {
            if (res?.error) {
                toast.error(res?.message || "Something went wrong, please, try again", { id: "123", duration: 5000 })
            }
            else {
                toast.success(res?.message || "Something went wrong, please, try again", { id: "123", duration: 5000 })
                formRef.current?.reset()
            }
        } catch (error) {
            console.log("error", error)
            toast.error("Something went wrong, please, try again", { id: "123", duration: 5000 })
        }
        finally {
            setPending(false)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-2 w-full max-w-lg py-4'>
            <div className="flex flex-col gap-1">
                <label htmlFor="firstname" className="text-xs lg:text-sm text-sitetext">First Name<span className="text-danger">*</span></label>
                <input type="text" required name="firstname" id="firstname" placeholder='Miriam' className="outline-none border border-sitetext/70 hover:border-sitetext/50 bg-transparent py-1 px-2 placeholder:opacity-60 placeholder:text-sm text-sm lg:text-base text-sitetext capitalize rounded-sm" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="lastname" className="text-xs lg:text-sm text-sitetext">Last Name<span className="text-danger">*</span></label>
                <input type="text" required name="lastname" id="lastname" placeholder='Oluwaseun' className="outline-none border border-sitetext/70 hover:border-sitetext/50 bg-transparent py-1 px-2 placeholder:opacity-60 placeholder:text-sm text-sm lg:text-base text-sitetext capitalize rounded-sm" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-xs lg:text-sm text-sitetext">Phone Number<span className="text-danger">*</span></label>
                <div className="flex border border-sitetext/70 hover:border-sitetext/50 rounded-sm overflow-hidden">
                    <div className="py-1 pl-2 pr-3 border-r border-sitetext bg-dark text-white text-sm lg:text-base flex-shrink-0">+234</div>
                    <input type="text" required name="phone" id="phone" placeholder='70681052815' className="flex-1 outline-none bg-transparent py-1 px-2 placeholder:opacity-60 placeholder:text-sm text-sm lg:text-base text-sitetext capitalize" maxLength={10} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs lg:text-sm text-sitetext">Email <span className="text-danger">(optional)</span></label>
                <input type="email" name="email" id="email" placeholder='miriamoluwaseun@gmail.com' className="outline-none border border-sitetext/70 hover:border-sitetext/50 bg-transparent py-1 px-2 placeholder:opacity-60 placeholder:text-sm text-sm lg:text-base text-sitetext capitalize rounded-sm" />
            </div>
            <div className={`flex flex-col gap-1 ${state === "Others" ? 'select-none group' : ''}`}>
                <label htmlFor="state" className="text-xs lg:text-sm text-sitetext">State <span className="text-danger">*</span></label>
                <div className={`relative w-full ${state === "Others" ? 'after:absolute after:bg-slate-300/70 after:top-0 after:left-0 after:w-full after:h-full disabled:cursor-not-allowed after:z-10 after:select-none' : ''}`}>
                    <select onChange={e => setState(e.target.value)} value={state} name="state" id="state" className={`outline-none border border-sitetext/70 hover:border-sitetext/50 bg-transparent py-2 px-2 placeholder:opacity-60 placeholder:text-sm text-sm lg:text-base text-sitetext capitalize rounded-sm w-full`}>
                        {
                            allStates.map(el => (
                                <>
                                    <option key={el} value={el} className="bg-transparent py-2 px-2 text-sitetext">{el}</option>
                                </>
                            ))
                        }
                    </select>
                </div>
            </div>
            {
                state === "Others" &&
                <div className="relative pt-2">
                    <button type='button' onClick={() => setState("Abuja-FCT")} className="absolute right-0 top-2 text-xs lg:text-sm text-danger">Cancel</button>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="otherStates" className="text-xs lg:text-sm text-sitetext">Enter your State <span className="text-danger">*</span></label>
                        <input type="text" required value={otherStates} onChange={e => setOtherStates(e.target.value)} name="otherStates" id="otherStates" placeholder='Other States e.g. Kaduna' className="outline-none border border-sitetext/70 hover:border-sitetext/50 bg-transparent py-1 px-2 placeholder:opacity-60 placeholder:text-sm text-sm lg:text-base text-sitetext capitalize rounded-sm" />
                    </div>
                </div>
            }

            <button disabled={pending} className={`text-white text-base bg-dark w-max py-1.5 px-6 lg:px-8 rounded-sm cursor-pointer mt-3 ${pending ? 'opacity-40' : 'opacity-100'}`}>Register</button>
        </form>
    )
}
