import React from 'react';
export function Segmented({label, options=[], valeur, onChange, className='', style}) {
  const [v,setV]=React.useState(valeur!==undefined?valeur:0);
  const cur=valeur!==undefined?valeur:v;
  return <div className={['sdcd-segmented',className].filter(Boolean).join(' ')} style={style}>
    {label&&<div className="sdcd-segmented__label">{label}</div>}
    <div className="sdcd-segmented__groupe" role="radiogroup" aria-label={label}>
      {options.map((o,i)=><button key={i} type="button" className="sdcd-segmented__option" role="radio" aria-checked={cur===i}
        onClick={()=>{if(valeur===undefined)setV(i);onChange&&onChange(i);}}>
        {cur===i&&<i className="ri-check-line" aria-hidden="true"></i>}{typeof o==='string'?o:o.label}</button>)}
    </div>
  </div>;
}
