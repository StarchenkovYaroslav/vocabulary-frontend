import React from 'react'
import './List.css'

interface Props<Item> {
  data: Item[]
  getItemKey: (item: Item) => string
  renderItem: (item: Item) => JSX.Element
  onScroll?: React.UIEventHandler
  listClassName?: string
  itemClassName?: string
}

function List<Item>({
  data,
  getItemKey,
  renderItem,
  onScroll,
  listClassName,
  itemClassName,
}: Props<Item>) {
  let finalListClassName = 'list'
  if (listClassName) finalListClassName += ` ${listClassName}`

  let finalItemClassName = 'list__item'
  if (itemClassName) finalItemClassName += ` ${itemClassName}`

  return (
    <ul onScroll={onScroll} className={finalListClassName}>
      {data.map(item => (
        <li key={getItemKey(item)} className={finalItemClassName}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

export default List
