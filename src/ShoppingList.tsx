import React, {FC} from 'react';
import {ShoppingListType} from './App';

type ShoppingListPropsType = {
    shopping: ShoppingListType[]
}

export const ShoppingList:FC<ShoppingListPropsType> = ({shopping}) => {
    const list = shopping.map(s => {
        return (
            <li key={s.id}>
                <input type="checkbox" checked={s.checked}/>
                <span> {s.title} </span>
                <span> Product: {s.product}</span>
                <button>X</button>
            </li>
        )
    })

    return (
        <div>
            <h1>Sopping list</h1>
            <div>
                <input placeholder={'What to buy'} />
                <select>
                    <option value={'Bakery'}>Bakery</option>
                    <option value={'Milk'}>Milk</option>
                    <option value={'Meat'}>Meat</option>
                    <option value={'sweets'}>Sweets</option>
                </select>
                <button>Add</button>
            </div>
            <div>
                <ul>
                    {list}
                </ul>
            </div>
            <div>
                <div>
                    <h3>Filter by active</h3>
                    <select>
                        <option value={'All'}>All</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Completed'}>Completed</option>
                    </select>
                </div>
                <div>
                    <h3>Filter by product</h3>
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
