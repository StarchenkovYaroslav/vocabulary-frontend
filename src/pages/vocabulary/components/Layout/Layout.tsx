import React, { FC, PropsWithChildren } from 'react'
import './Layout.css'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      {children}
    </div>
  )
}

export default Layout
