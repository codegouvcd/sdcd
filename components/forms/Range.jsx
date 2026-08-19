import React from 'react';
export function Range({label, min=0, max=100, step=1, valeur, onChange, unite='', hint, className='', style}) {
  const [v,setV]=React.useState(valeur!==undefined?valeur:min);
  const cur=valeur!==undefined?valeur:v;
  const suffixe=unite?' '+unite:'';
  return <div className={['sdcd-range',className].filter(Boolean).join(' ')} style={style}>
    {label&&<div className="sdcd-range__entete">
      <span className="sdcd-range__label">{label}</span>
      <span className="sdcd-range__valeur">{cur}{suffixe}</span>
    </div>}
    {hint&&<div className="sdcd-range__aide">{hint}</div>}
    <input className="sdcd-range__curseur" type="range" min={min} max={max} step={step} value={cur} aria-label={label}
      onChange={e=>{const n=Number(e.target.value);if(valeur===undefined)setV(n);onChange&&onChange(n);}}/>
    <div className="sdcd-range__bornes">
      <span>{min}{suffixe}</span><span>{max}{suffixe}</span>
    </div>
  </div>;
}
