import React from 'react';
export function Button({variant='primaire', size='md', icon, iconRight, disabled=false, children, onClick, className='', style}) {
  const cls=['sdcd-button','sdcd-button--'+variant,size==='sm'&&'sdcd-button--sm',className].filter(Boolean).join(' ');
  return React.createElement('button',{type:'button',className:cls,disabled,onClick,style},
    icon&&React.createElement('i',{className:'sdcd-button__icone '+icon,'aria-hidden':'true'}),children,
    iconRight&&React.createElement('i',{className:'sdcd-button__icone '+iconRight,'aria-hidden':'true'}));
}
