import React from 'react';
export function IconButton({icon, label, variant='secondaire', size='md', disabled=false, onClick, className='', style}) {
  const cls=['sdcd-iconbutton','sdcd-iconbutton--'+variant,size==='sm'&&'sdcd-iconbutton--sm',className].filter(Boolean).join(' ');
  return React.createElement('button',{type:'button',className:cls,'aria-label':label,title:label,disabled,onClick,style},
    React.createElement('i',{className:icon,'aria-hidden':'true'}));
}
