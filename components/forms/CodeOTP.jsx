import React from 'react';
export function CodeOTP({longueur=6, label='Code de vérification', hint, error, valeur, onChange, onComplet, autoFocus=true, className='', style}) {
  const [cases,setCases]=React.useState(Array.from({length:longueur},(_,i)=>(valeur||'')[i]||''));
  const refs=React.useRef([]);
  const id='otp-'+React.useId().replace(/[:]/g,'');
  React.useEffect(()=>{if(autoFocus&&refs.current[0])refs.current[0].focus();},[autoFocus]);
  const pousser=(t)=>{setCases(t);const s=t.join('');onChange&&onChange(s);if(s.length===longueur&&t.every(c=>c))onComplet&&onComplet(s);};
  const saisir=(i,val)=>{
    const chiffres=val.replace(/\D/g,'');
    if(!chiffres){const t=[...cases];t[i]='';pousser(t);return;}
    const t=[...cases];
    chiffres.split('').forEach((c,k)=>{if(i+k<longueur)t[i+k]=c;});
    pousser(t);
    const suivant=Math.min(i+chiffres.length,longueur-1);
    refs.current[suivant]&&refs.current[suivant].focus();
  };
  const touche=(i,e)=>{
    if(e.key==='Backspace'&&!cases[i]&&i>0){refs.current[i-1].focus();const t=[...cases];t[i-1]='';pousser(t);}
    if(e.key==='ArrowLeft'&&i>0)refs.current[i-1].focus();
    if(e.key==='ArrowRight'&&i<longueur-1)refs.current[i+1].focus();
  };
  return <div className={['sdcd-codeotp',className].filter(Boolean).join(' ')} style={style}>
    {label&&<label htmlFor={id+'-0'} className="sdcd-champ__label">{label}</label>}
    {hint&&<p className="sdcd-champ__aide">{hint}</p>}
    <div className="sdcd-codeotp__cases" role="group" aria-label={label}>
      {cases.map((c,i)=><input key={i} id={id+'-'+i} ref={el=>refs.current[i]=el}
        className={'sdcd-codeotp__case'+(c?' sdcd-codeotp__case--rempli':'')}
        type="text" inputMode="numeric" autoComplete={i===0?'one-time-code':'off'} maxLength={longueur}
        aria-label={'Chiffre '+(i+1)+' sur '+longueur} aria-invalid={error?true:undefined}
        value={c} onChange={e=>saisir(i,e.target.value)} onKeyDown={e=>touche(i,e)}
        onFocus={e=>e.target.select()}/>)}
    </div>
    {error&&<p role="alert" className="sdcd-champ__erreur">
      <i className="ri-error-warning-line" aria-hidden="true"></i>{error}</p>}
  </div>;
}
