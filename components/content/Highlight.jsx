import React from 'react';
export function Highlight({children, taille='md', className='', style}) {
  const cls=['sdcd-highlight',taille!=='md'&&'sdcd-highlight--'+taille,className].filter(Boolean).join(' ');
  return <div className={cls} style={style}>{children}</div>;
}
