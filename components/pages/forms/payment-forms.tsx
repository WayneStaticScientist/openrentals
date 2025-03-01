import { PropertyPackage } from '@/connections/interfaces'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { MdNearbyError } from 'react-icons/md'

export function EcocashPaymentForm({ product }: { product: PropertyPackage }) {

    if (!product.property.owner.ecocashPayment || !product.property.owner.ecocashPayment!.active)
        return <div className='notification error p-3 flex gap-x-3 items-center m-3'>
            <MdNearbyError /> Ecocash Has not been set to support this Product
        </div>
    return (
        <div>{product.property.owner.ecocashPayment.description}</div>
    )
}
export function CashPaymentForm({ product }: { product: PropertyPackage }) {
    if (!product.property.owner.cashPayment || !product.property.owner.cashPayment!.active)
        return <div className='notification error p-3 flex gap-x-3 items-center m-3'>
            <MdNearbyError /> CashPayment Has not been set to support this Product
        </div>
    return (
        <div>EcocashPaymentForm</div>
    )
}
export function MukuruPaymentForm({ product }: { product: PropertyPackage }) {
    if (!product.property.owner.mukuruPayment || !product.property.owner.mukuruPayment!.active)
        return <div className='notification error p-3 flex gap-x-3 items-center m-3'>
            <MdNearbyError /> Mukuru Has not been set to support this Product
        </div>
    return (
        <div>EcocashPaymentForm</div>
    )
}
export function RouteToPaymentGateway({ id, onClose, product }: { id: string, onClose: () => void, product: PropertyPackage }) {
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
            {id === 'cash' && <CashPaymentForm product={product} />}
            {id === 'ecocash' && <EcocashPaymentForm product={product} />}
            {id === 'mukuru' && <MukuruPaymentForm product={product} />}
        </div>
    </div>
}