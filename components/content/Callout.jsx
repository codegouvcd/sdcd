import React from 'react';
import {Button} from '../buttons/Button.jsx';
export function Callout({titre, children, icone='ri-information-line', action, onAction, className='', style}) {
  return <div className={['sdcd-callout',className].filter(Boolean).join(' ')} style={style}>
    {titre&&<div className="sdcd-callout__titre"><i className={icone} aria-hidden="true"></i>{titre}</div>}
    <div className="sdcd-callout__texte">{children}</div>
    {action&&<div className="sdcd-callout__action"><Button size="sm" onClick={onAction}>{action}</Button></div>}
  </div>;
}
