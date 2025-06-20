import React, { useState } from 'react'
import ItemContextMenu from '../order-components/ItemContextMenu'
import ItemCardList from '../order-components/ItemCardList'

const ItemCard = ({ item, addItemToReceipt }) => {
  return <ItemCardList item={item} addItemToReceipt={addItemToReceipt} />
}

export default ItemCard
