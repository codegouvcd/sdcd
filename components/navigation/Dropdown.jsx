import React from 'react';
export function Dropdown({libelle='Actions', items=[], onSelect, variant='secondaire', className='', style}) {
  const [open,setOpen]=React.useState(false);
  const cls=['sdcd-dropdown',variant==='primaire'&&'sdcd-dropdown--primaire',className].filter(Boolean).join(' ');
  return <div className={cls} style={style}>
    <button type="button" className="sdcd-dropdown__declencheur" onClick={()=>setOpen(!open)} aria-expanded={open} aria-haspopup="menu">
      {libelle}<i className={open?'ri-arrow-up-s-line':'ri-arrow-down-s-line'} aria-hidden="true"></i></button>
    {open&&<div role="menu" className="sdcd-dropdown__menu">
      {items.map((it,i)=>{const o=typeof it==='string'?{libelle:it}:it;
        return <button key={i} type="button" role="menuitem" className={'sdcd-dropdown__item'+(o.danger?' sdcd-dropdown__item--danger':'')}
          onClick={()=>{setOpen(false);onSelect&&onSelect(o.libelle,i);}}>
          {o.icone&&<i className={o.icone} aria-hidden="true"></i>}{o.libelle}</button>;})}
    </div>}
  </div>;
}
