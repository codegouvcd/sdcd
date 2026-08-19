import React from 'react';
export function Tooltip({texte, children, className='', style}) {
  return <span className={['sdcd-tooltip',className].filter(Boolean).join(' ')} style={style} tabIndex={0}>
    {children}
    <span role="tooltip" className="sdcd-tooltip__bulle">{texte}</span>
  </span>;
}
