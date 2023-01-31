import React from 'react'
import { Wrapper } from './CartItem.style'

import { CartItemType } from '../App'
import { Button } from '@material-ui/core';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => {
    return(
        <Wrapper>
        <div>   
            <h3>{item.title}</h3>
            <div className='information'>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='buttons'>
                <Button variant='contained' onClick={() => removeFromCart(item.id)}>
                    -
                </Button>
                <p>{item.amount}</p>
                <Button variant='contained' onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
        </Wrapper>
    )
}

export default CartItem