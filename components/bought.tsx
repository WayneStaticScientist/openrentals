import { CatalogueHold } from '@/connections/interfaces'
import React from 'react'

export default function BoughtComponent({ state }: { state: CatalogueHold }) {
    switch (state.status) {
        case 0:
            return <div className='p-3 notification warning'>
                The item ? You have sent for payment request and the owner will confirm back to allow you to continue with payments
            </div>
        case 1:
            <div className='p-3 notification success'>
                You have been granted access to continue to pay the item
            </div>
    }
    <div className='p-3 notification error'>
        There was rejection from the onwer
    </div>
}
