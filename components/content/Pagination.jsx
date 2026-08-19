import React from 'react';
export function Pagination({pages=5, actif=1, onChange, className='', style}) {
  const go=(n)=>onChange&&onChange(Math.min(Math.max(1,n),pages));
  return <nav aria-label="Pagination" className={['sdcd-pagination',className].filter(Boolean).join(' ')} style={style}>
    <button type="button" className="sdcd-pagination__lien" aria-label="Page précédente" onClick={()=>go(actif-1)}>
      <i className="ri-arrow-left-s-line" aria-hidden="true"></i></button>
    {Array.from({length:pages},(_,k)=>k+1).map(n=>
      <button key={n} type="button" className="sdcd-pagination__lien" aria-current={n===actif?'page':undefined} onClick={()=>go(n)}>{n}</button>)}
    <button type="button" className="sdcd-pagination__lien" aria-label="Page suivante" onClick={()=>go(actif+1)}>
      <i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
  </nav>;
}
