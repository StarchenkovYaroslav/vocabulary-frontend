import React, { FC } from 'react'
import { ISplittedText } from '../../models'
import './SplittedText.css'

interface Props {
  text: ISplittedText,
}

const SplittedText: FC<Props> = ({ text }) => {
  const { formerPlainText, underlinedText, latterPlainText } = text

  return (
    <>
      {formerPlainText}
      <span className="underlined">{underlinedText}</span>
      {latterPlainText}
    </>
  )
}

export default SplittedText
