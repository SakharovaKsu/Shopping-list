import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {ShoppingList} from './components/ShoppingList';


export type ProductType = 'Product' | 'Bakery' | 'Milk' | 'Meat' | 'Sweets'
export type СheckedType = 'All' | 'Active' | 'Completed'

export type FilterProduct = ProductType | СheckedType

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
  {id: v1(), title: 'Candy', product: 'Sweets', checked: false}
]

export default function App() {

  const [shopping, setShopping] = useState<ShoppingListType[]>(ShoppingListData)
  const [value, setValue] = useState<string>('')
  const [filterProduct, setFilterProduct] = useState<ProductType>('Product')
  const [filterStatus, setFilterStatus] = useState<СheckedType>('All')

  // Добавление продукта
  const addProduct = (product: ProductType) => {
    const newProduct = {id: v1(), title: value, product: product, checked: true}
    setShopping([newProduct, ...shopping])
  }

  // Удаление продукта
  const removeProduct = (id: string) => {
    setShopping(shopping.filter(s => s.id !== id))
  }

  const getFilterProductStatus = (product: ShoppingListType[], filter: СheckedType) => {
    switch (filter) {
      case 'Active':
        return shopping.filter(s => !s.checked)
      case 'Completed':
        return shopping.filter(s => s.checked)
      default:
        return shopping
    }
  }

  const getFilterProduct = (product: ShoppingListType[], filter: ProductType) => {
    switch (filter) {
      case 'Bakery':
        return shopping.filter(s => s.product === 'Bakery')
      case 'Milk':
        return shopping.filter(s => s.product === 'Milk')
      case 'Meat':
        return shopping.filter(s => s.product === 'Meat')
      case 'Sweets':
        return shopping.filter(s => s.product === 'Sweets')
      default:
        return shopping
    }
  }

  const filteredStatusProduct = getFilterProductStatus(shopping, filterStatus)
  const filteredProduct = getFilterProduct(shopping, filterProduct)

  const changeFilterStatus = (filterStatus:СheckedType) => {
    setFilterStatus(filterStatus)
  }

  const changeFilterProduct= (filterProduct:ProductType) => {
    setFilterProduct(filterProduct)
  }

  return (
    <div className="App">
      <h1>Sopping list</h1>
      <ShoppingList shopping={filteredProduct}
                    value={value}
                    setValue={setValue}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    changeFilterStatus={changeFilterStatus}
                    changeFilterProduct={changeFilterProduct}
      />
    </div>
  );
}