import { AddPayment } from '@/connections/get-property'
import { PaymentHold, PropertyPackage } from '@/connections/interfaces'
import { UserRegistration, useUserState } from '@/connections/user'
import { showError, showSuccess } from '@/functions/toast'
import Image from 'next/image'
import Router from 'next/router'
import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { IoCloseSharp } from 'react-icons/io5'
import { MdNearbyError } from 'react-icons/md'

export function EcocashPaymentForm({ product, pay, loading }: { product: PropertyPackage, pay: (lit: PaymentHold) => void, loading: boolean }) {
    const { firstName, lastName, email, profile } = useUserState()
    if (!product.property.owner.ecocashPayment || !product.property.owner.ecocashPayment!.active)
        return <div className='notification error p-3 flex gap-x-3 items-center m-3'>
            <MdNearbyError /> Ecocash Has not been set to support this Product
        </div>
    return (
        <div className='flex flex-col items-center gap-y-6'>
            <Image
                src={'/images/logos/ecocash.jpg'}
                className='w-32 '
                width={556} height={212} alt='ecocash' />
            <div className='w-full flex flex-col'>
                <div>
                    <div>Payment Options</div>
                    <div>
                        {product.property.owner.ecocashPayment.type === 'client' &&
                            <span>
                                Dial<span className='text-primaryColor cursor-pointer' onClick={() => {
                                    Router.push(`tel:*151*1*1*${product.property.owner.ecocashPayment!.phone}*${product.property.price}#}`)
                                }}>
                                    *151*1*1*{product.property.owner.ecocashPayment.phone}*{product.property.price}#</span>
                                <span className='flex'>Displayed Name : {product.property.owner.ecocashPayment.fullName}</span>
                            </span>
                        }
                    </div>
                </div>
            </div>
            <div className=' border-l-2 border-green-400 p-3 m-3'>{product.property.owner.ecocashPayment.description}</div>
            <button className='button' onClick={() => !loading && pay({
                id: product.property._id,
                type: 'ecocash',
                status: 0,
                email: email,
                profile: profile,
                fullName: firstName + ' ' + lastName
            })}>
                {loading ? <CgSpinner className='w-full text-center animate-spin' /> : <>continue to pay</>}
            </button>
        </div>
    )
}
export function CashPaymentForm({ product, pay, loading }: { product: PropertyPackage, pay: (lit: PaymentHold) => void, loading: boolean }) {
    const { firstName, lastName, email, profile } = useUserState()
    if (!product.property.owner.cashPayment || !product.property.owner.cashPayment!.active)
        return <div className='notification error p-3 flex gap-x-3 items-center m-3'>
            <MdNearbyError /> CashPayment Has not been set to support this Product
        </div>
    return (
        <div className='flex flex-col items-center gap-y-6'>
            <Image
                src={'/images/logos/cash.jpg'}
                className='w-32'
                width={556} height={212} alt='cash' />
            <div className='w-full flex flex-col'>

            </div>
            <div className=' border-l-2 border-green-400 p-3 m-3'>{product.property.owner.cashPayment.description}</div>
            <button className='button' onClick={() => !loading && pay({
                id: product.property._id,
                type: 'ecocash',
                status: 0,
                email: email,
                profile: profile,
                fullName: firstName + ' ' + lastName
            })}>
                {loading ? <CgSpinner className='w-full text-center animate-spin' /> : <>continue to pay</>}
            </button>
        </div >
    )
}
export function MukuruPaymentForm({ product, pay, loading }: { product: PropertyPackage, pay: (lit: PaymentHold) => void, loading: boolean }) {
    const { firstName, lastName, email, profile } = useUserState()
    if (!product.property.owner.mukuruPayment || !product.property.owner.mukuruPayment!.active)
        return <div className='notification error p-3 flex gap-x-3 items-center m-3'>
            <MdNearbyError /> Mukuru Has not been set to support this Product
        </div>
    return (
        <div className='flex flex-col items-center gap-y-6'>
            <Image
                src={'/images/logos/mukuru.jpg'}
                className='w-32'
                width={556} height={212} alt='cash' />
            <div className='w-full flex flex-col'>
                <span> Use this details to transfer to
                    <span className='text-primaryColor inline'> {product.property.owner.firstName}  {product.property.owner.lastName}
                    </span>
                </span>

                <div className='p-3 shadow-md flex flex-col gap-y-6'>
                    <span className='flex w-full justify-between gap-x-6'>
                        <span className='font-extrabold'>Full Name</span> <span className='text-primary '>{product.property.owner.mukuruPayment.fullName}</span>
                    </span>
                    <span className='flex w-full justify-between gap-x-6'>
                        <span className='font-extrabold'>Phone Number</span> <span className='text-primary '>{product.property.owner.mukuruPayment.phone}</span>
                    </span>
                    <span className='flex w-full justify-between gap-x-6'>
                        <span className='font-extrabold'>ID Number</span> <span className='text-primary '>{product.property.owner.mukuruPayment.idNumber}</span>
                    </span>
                    <span className='flex w-full justify-between gap-x-6'>
                        <span className='font-extrabold'>Address</span> <span className='text-primary '>{product.property.owner.mukuruPayment.address}</span>
                    </span>
                </div>
            </div>
            <div className=' border-l-2 border-green-400 p-3 m-3'>{product.property.owner.mukuruPayment.description}</div>
            <button className='button' onClick={() => !loading && pay({
                id: product.property._id,
                type: 'mukuru',
                status: 0,
                email: email,
                profile: profile,
                fullName: firstName + ' ' + lastName
            })}>
                {loading ? <CgSpinner className='w-full text-center animate-spin' /> : <>continue to pay</>}
            </button>
        </div >
    )
}
export function RouteToPaymentGateway({ id, onClose, product }: { id: string, onClose: () => void, product: PropertyPackage }) {
    const [loading, setLoading] = useState(false)
    const pay = async (object: object) => {
        setLoading(true)
        const payment = await AddPayment(object)
        setLoading(false)
        if (typeof payment === 'string') return showError(payment)
        const user = new UserRegistration()
        const resp = await user.fetchUser({ retry: true })
        if (typeof resp !== 'string') {
            useUserState.setState(resp)
        }
        showSuccess("Request to payment has been sent")
        onClose()
    }
    return <div className=' fixed flex w-screen h-screen items-center justify-center bg-[#000000aa]' style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    }}>
        <div className='w-full bg-white p-6 rounded-lg' style={{
            maxWidth: 650
        }}>
            <div className='flex justify-end'>
                <button className='p-3 bg-primaryColor text-white rounded-full'
                    onClick={onClose}>
                    <IoCloseSharp />
                </button>
            </div>
            {id === 'cash' && <CashPaymentForm product={product} pay={pay} loading={loading} />}
            {id === 'ecocash' && <EcocashPaymentForm product={product} pay={pay} loading={loading} />}
            {id === 'mukuru' && <MukuruPaymentForm product={product} pay={pay} loading={loading} />}
        </div>
    </div>
}