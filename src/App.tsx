import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {ShoppingList} from './components/ShoppingList';


export type ProductType = 'Product' | 'Bakery' | 'Milk' | 'Meat'
export type СheckedType = 'All' | 'Active' | 'Completed'

export type ShoppingListType = {
  id: string
  title: string
  product: string
  checked: boolean
}

const ShoppingListData: ShoppingListType[] = [
  {id: v1(), title: 'Bread', product: 'Bakery', checked: true},
  {id: v1(), title: 'Milk', product: 'Milk', checked: true},
  {id: v1(), title: 'Chicken', product: 'Meat', checked: true},
  {id: v1(), title: 'Svineniya', product: 'Meat', checked: false},
  {id: v1(), title: 'Buns', product: 'Bakery', checked: false},
]

export default function App() {

  const [shopping, setShopping] = useState<ShoppingListType[]>(ShoppingListData)
  const [value, setValue] = useState<string>('')

  const addProduct = (product: ProductType) => {
    const newProduct = {id: v1(), title: value, product: product, checked: true}
    setShopping([newProduct, ...shopping])
  }

  const removeProduct = (id: string) => {
    setShopping(shopping.filter(s => s.id !== id))
  }
  return (
    <div className="App">
      <h1>Sopping list</h1>
      <ShoppingList shopping={shopping}
                    value={value}
                    setValue={setValue}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
      />
    </div>
  );
}