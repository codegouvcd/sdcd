import React from 'react';
export function TagCloud({tags=[], onSelect, className='', style}) {
  const max=Math.max(...tags.map(t=>t.poids||1),1);
  return <div className={['sdcd-tagcloud',className].filter(Boolean).join(' ')} style={style}>
    {tags.map((t,i)=>{
      const r=(t.poids||1)/max;
      const palier=r>0.66?' sdcd-tagcloud__lien--fort':r>0.33?' sdcd-tagcloud__lien--moyen':'';
      return <a key={i} href="#" className={'sdcd-tagcloud__lien'+palier}
        style={{'--sdcd-tagcloud-taille':(0.8125+r*0.625).toFixed(3)+'rem'}}
        onClick={e=>{e.preventDefault();onSelect&&onSelect(t.label);}}>
        {t.label}
        {t.poids!==undefined&&<span className="sdcd-tagcloud__poids" aria-label={t.poids+' contenus'}>{t.poids}</span>}
      </a>;})}
  </div>;
}
