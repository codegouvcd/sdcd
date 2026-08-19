import React from 'react';
export function Accordion({items=[], className='', style}) {
  const [open,setOpen]=React.useState(0);
  return <div className={['sdcd-accordion',className].filter(Boolean).join(' ')} style={style}>
    {items.map((it,i)=><div key={i} className="sdcd-accordion__item">
      <button type="button" className="sdcd-accordion__entete" aria-expanded={open===i} onClick={()=>setOpen(open===i?-1:i)}>
        {it.titre}<i className={open===i?'ri-subtract-line':'ri-add-line'} aria-hidden="true"></i></button>
      {open===i&&<div className="sdcd-accordion__contenu">{it.contenu}</div>}
    </div>)}
  </div>;
}
