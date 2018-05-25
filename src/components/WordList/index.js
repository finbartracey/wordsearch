import React from 'react';
import { Tag } from 'antd';
const WordList = (props) =>
  <div>
    {props.words.map((word,i) =>(
        <Tag key={i} color={word.active?'red':'green'}>{word.name}</Tag>
        // <span className={word.active?'stroke':null}>{word.name}</span>
    ))}
    
  </div>

export default WordList;