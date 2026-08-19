import React from 'react';
export function Tag({children, actif=false, supprimable=false, onClick, onDelete, className='', style}) {
  const cls=['sdcd-tag',(onClick||supprimable)&&'sdcd-tag--cliquable',className].filter(Boolean).join(' ');
  return <button type="button" className={cls} style={style} onClick={onClick} aria-pressed={onClick?actif:undefined}>
    {actif&&<i className="sdcd-tag__coche ri-check-line" aria-hidden="true"></i>}
    {children}
    {supprimable&&<i className="sdcd-tag__retirer ri-close-line" role="button" aria-label="Retirer"
      onClick={e=>{e.stopPropagation();onDelete&&onDelete();}}></i>}
  </button>;
}
