import React, { FC, useState } from 'react'
import './ScrollableWithHeader.css'

interface Props {
  headerElement: JSX.Element
  contentElement: JSX.Element
  headerClassName?: string
  contentClassName?: string
}

const ScrollableWithHeader: FC<Props> = ({
  headerElement,
  contentElement,
  headerClassName,
  contentClassName,
}) => {
  // TODO: bound initial state to content position
  const [scrolled, setScrolled] = useState<boolean>(false)

  const handleScroll = (evt: React.UIEvent<HTMLDivElement>) => {
    if (evt.currentTarget.scrollTop > 0) setScrolled(true)
    else setScrolled(false)
  }

  let finalHeaderClassName = 'scrollable__header'
  if (scrolled) finalHeaderClassName += ' scrollable__header_bordered'
  if (headerClassName) finalHeaderClassName += ` ${headerClassName}`

  let finalContentClassName = 'scrollable__content'
  if (contentClassName) finalContentClassName += ` ${contentClassName}`

  return (
    <div className="scrollable">
      <div className={finalHeaderClassName}>
        {headerElement}
      </div>
      <div className={finalContentClassName} onScroll={handleScroll}>
        {contentElement}
      </div>
    </div>
  )
}

export default ScrollableWithHeader
