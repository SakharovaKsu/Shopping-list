import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {ShoppingList} from './ShoppingList';

export type ProductType = 'All' | 'Bakery' | 'Milk' | 'Meat'
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

  return (
    <div className="App">
      <ShoppingList shopping={shopping}/>
    </div>
  );
}