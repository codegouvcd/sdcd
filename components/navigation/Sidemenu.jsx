import React from 'react';
export function Sidemenu({titre='Dans cette rubrique', sections=[], actif='', onSelect, className='', style}) {
  const [open,setOpen]=React.useState(sections.map(()=>true));
  return <nav aria-label={titre} className={['sdcd-sidemenu',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-eyebrow sdcd-sidemenu__titre">{titre}</div>
    {sections.map((s,i)=><div key={i} className="sdcd-sidemenu__section">
      {s.titre&&<button type="button" className="sdcd-sidemenu__entete" onClick={()=>setOpen(open.map((o,n)=>n===i?!o:o))} aria-expanded={open[i]}>
        {s.titre}<i className={open[i]?'ri-arrow-up-s-line':'ri-arrow-down-s-line'} aria-hidden="true"></i></button>}
      {(!s.titre||open[i])&&<div className="sdcd-sidemenu__liens">
        {s.liens.map((l,j)=><a key={j} className="sdcd-sidemenu__lien" href="#" aria-current={l===actif?'page':undefined}
          onClick={e=>{e.preventDefault();onSelect&&onSelect(l);}}>{l}</a>)}
      </div>}
    </div>)}
  </nav>;
}
