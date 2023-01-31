import { Button } from '@material-ui/core';
import React from 'react'

//type
import { CartItemType } from '../App'

//styles
import { Wrapper } from './Item.style'

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => {
  return (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
        <h3>${item.price.toFixed(2)}</h3>
        <Button onClick={() => handleAddToCart(item)}>ADD TO CART</Button>
    </Wrapper>
  )
}

export default Item