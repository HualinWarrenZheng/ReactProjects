//imports
import { useQuery } from "react-query";
import { useState } from "react";

//components
import Cart from "./Cart/Cart";
import Item from './Item/Item';

import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

//styles
import { Wrapper, StyledButton } from "./App.style";

//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'Products',
    getProducts
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      //1. it is in the cart
      if (isItemInCart) {
        return prev.map(item => 
          (item.id === clickedItem.id) 
          ? {...item, amount: item.amount + 1}
          : item);
      }
      //2. it is not in the cart
      return [...prev, {...clickedItem, amount: 1}];
    })
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount -1 }]
        }else{
          return [...ack, item];
        }

      }, [] as CartItemType[])
    ))
  };
  
  if (isLoading) {
    return <LinearProgress />
  }

  if (error) {
    return <div>Something went wrong!</div>
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={cartItems.length} color='error'>
          <AddShoppingCart fontSize='large' color='primary' />
        </Badge>
      </StyledButton>
      <Grid container spacing={4}>
        {data?.map(item => (
          <Grid item key={item.id} xs={8} sm={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}


export default App;
