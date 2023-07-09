import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {CheckedType, ProductType, ShoppingListType} from '../App';
import s from './ShoppingList.module.css'

type ShoppingListPropsType = {
    shopping: ShoppingListType[]
    value: string
    setValue: (text:string) => void
    addProduct: (product: ProductType) => void
    removeProduct: (id: string) => void
    changeFilterStatus: (filter: CheckedType) => void
    changeFilterProduct: (filter: ProductType) => void
    changeStatusProduct: (id: string, checkedValue: boolean) => void
}

export const ShoppingList:FC<ShoppingListPropsType> = (
    {
        shopping,
        value,
        setValue,
        addProduct,
        removeProduct,
        changeFilterStatus,
        changeFilterProduct,
        changeStatusProduct
    }) => {

    const [product, setProduct] = useState<ProductType>('Product')

    // Добавление продукта
    const AddButtonHandler = () => {
        if(product !== 'Product') {
           if(value.trim() !== '') {
               addProduct(product)
               setValue('')
               setProduct('Product')
           }
        }

    }

    // добавление по Enter
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            AddButtonHandler()
        }
    }

    // удаление продукта
    const RemoveButtonHandler = (id: string) => {
        removeProduct(id)
    }

    // Выбираем то, что есть в select при добавлении продукта
    const onChangeProductHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setProduct(e.currentTarget.value as ProductType)
    }

    // Получаем из инпута value
    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    // Узнаем значение статуса у select
    const onChangeStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const filter = e.currentTarget.value as CheckedType
        changeFilterStatus(filter)
    }

    // Узнаем какой тип продукта в select
    const onChangeFilterProduct = (e: ChangeEvent<HTMLSelectElement>) => {
        const filter = e.currentTarget.value as ProductType
        changeFilterProduct(filter)
    }

    const list = shopping.map(l => {
        // Меняем статус у продукта
        const changeStatusProductHandler = (e:ChangeEvent<HTMLInputElement>) => {
            const checkedValue = e.currentTarget.checked
            changeStatusProduct(l.id, checkedValue)
        }

        return (
            <li className={s.item} key={l.id}>
                <label className={s.label}>
                    <input className={s.checkbox} type="checkbox" checked={l.checked} onChange={changeStatusProductHandler}/>
                    <span className={s.checkboxSpan}></span>
                </label>
                <span> {l.title} </span>
                <span className={s.productSubTitle}>{l.product}</span>
                <button className={s.button+ ' ' + s.buttonSmall} onClick={() => RemoveButtonHandler(l.id)}>—</button>
            </li>
        )
    })

    return (
        <div className={s.box}>
            <h2 className={s.title}>Purchases for today</h2>
            <div className={s.container}>
                <div className={s.addProduct}>
                    <input className={s.inputTitle}
                           placeholder={'What to buy'}
                           value={value}
                           onChange={onChangeValueHandler}
                           onKeyDown={onKeyDownHandler}/>
                    <select className={s.selectProduct} value={product} onChange={onChangeProductHandler}>
                        <option value={'Product'}>Product</option>
                        <option value={'Bakery'}>Bakery</option>
                        <option value={'Milk'}>Milk</option>
                        <option value={'Meat'}>Meat</option>
                        <option value={'Sweets'}>Sweets</option>
                    </select>
                    <button className={s.button + ' ' + s.buttonBig} onClick={AddButtonHandler}>Add</button>
                </div>
            </div>

            <div>
                <ul className={s.list}>
                    {list}
                </ul>
            </div>

            <div className={s.selectContainer}>
                <select className={s.selectProduct} onChange={onChangeStatusHandler}>
                    <option value={'All'}>All</option>
                    <option value={'Active'}>Active</option>
                    <option value={'Completed'}>Completed</option>
                </select>
                <select className={s.selectProduct} onChange={onChangeFilterProduct}>
                    <option value={'Product'}>Product</option>
                    <option value={'Bakery'}>Bakery</option>
                    <option value={'Milk'}>Milk</option>
                    <option value={'Meat'}>Meat</option>
                    <option value={'sweets'}>Sweets</option>
                </select>
            </div>
        </div>
    );
};
