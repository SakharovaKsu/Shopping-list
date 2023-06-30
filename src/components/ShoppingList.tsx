import React, {ChangeEvent, ChangeEventHandler, FC, MouseEventHandler, useState} from 'react';
import {ProductType, ShoppingListType} from '../App';
import s from './ShoppingList.module.css'

type ShoppingListPropsType = {
    shopping: ShoppingListType[]
    value: string
    setValue: (text:string) => void
    addProduct: (product: ProductType) => void
}

export const ShoppingList:FC<ShoppingListPropsType> = (
    {
        shopping,
        value,
        setValue,
        addProduct
    }) => {

    const [product, setProduct] = useState<ProductType>('Product')

    const AddButtonHandler = () => {
        if(product !== 'Product') {
           if(value.trim() !== '') {
               addProduct(product)
               setValue('')
               setProduct('Product')
           }
        }

    }

    const RemoveButtonHandler = () => {

    }

    const onChangeProductHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setProduct(e.currentTarget.value as ProductType)
    }

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const list = shopping.map(l => {
        return (
            <li className={s.item} key={l.id}>
                <input type="checkbox" checked={l.checked}/>
                <span> {l.title} </span>
                <span> Product: {l.product}</span>
                <button onClick={RemoveButtonHandler}>X</button>
            </li>
        )
    })

    return (
        <div className={s.box}>
            <h2>Purchases for today</h2>
            <div>
                <input placeholder={'What to buy'}
                       value={value}
                       onChange={onChangeValueHandler}/>
                <select value={product} onChange={onChangeProductHandler}>
                    <option value={'Product'}>Product</option>
                    <option value={'Bakery'}>Bakery</option>
                    <option value={'Milk'}>Milk</option>
                    <option value={'Meat'}>Meat</option>
                    <option value={'Sweets'}>Sweets</option>
                </select>
                <button onClick={AddButtonHandler}>Add</button>
            </div>
            <div>
                <ul className={s.list}>
                    {list}
                </ul>
            </div>
            <div className={s.container}>
                <div>
                    <h3 className={s.subTitle}>Filter by active</h3>
                    <select>
                        <option value={'All'}>All</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Completed'}>Completed</option>
                    </select>
                </div>
                <div>
                    <h3 className={s.subTitle}>Filter by product</h3>
                    <select>
                        <option value={'Bakery'}>Bakery</option>
                        <option value={'Milk'}>Milk</option>
                        <option value={'Meat'}>Meat</option>
                        <option value={'sweets'}>Sweets</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
