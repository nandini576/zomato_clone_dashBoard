import React from 'react'

const SideBar = ({showAddFirmHandler,showAddProductsHandler}) => {
  return (
      <div className='sideBarSection'>
        <ul>
            <li onClick={showAddFirmHandler}>Add Firm</li>
            <li onClick={showAddProductsHandler}>Add Product</li>
            <li>All products</li>
            <li>User Details</li>
        </ul>
      </div>
  )
}

export default SideBar
