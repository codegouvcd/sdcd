import React from 'react';
export function Summary({titre='Sommaire', items=[], className='', style}) {
  return <nav aria-label={titre} className={['sdcd-summary',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-eyebrow sdcd-summary__titre">{titre}</div>
    <ol className="sdcd-summary__liste">
      {items.map((it,i)=><li key={i}><a href={typeof it==='string'?'#':it.ancre||'#'}>{typeof it==='string'?it:it.libelle}</a></li>)}
    </ol>
  </nav>;
}
