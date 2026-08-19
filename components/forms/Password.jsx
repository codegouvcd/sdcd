import React from 'react';
export function Password({label='Mot de passe', creation=false, valeur, onChange, className='', style}) {
  const [v,setV]=React.useState(valeur||'');
  const [vis,setVis]=React.useState(false);
  const cur=valeur!==undefined?valeur:v;
  const regles=[['12 caractères minimum',cur.length>=12],['1 chiffre',/\d/.test(cur)],['1 majuscule',/[A-Z]/.test(cur)],['1 caractère spécial',/[^A-Za-z0-9]/.test(cur)]];
  return <div className={['sdcd-password',className].filter(Boolean).join(' ')} style={style}>
    <label className="sdcd-champ__label">{label}</label>
    <div className="sdcd-password__rangee">
      <input className="sdcd-password__champ" type={vis?'text':'password'} value={cur} autoComplete={creation?'new-password':'current-password'}
        onChange={e=>{if(valeur===undefined)setV(e.target.value);onChange&&onChange(e.target.value);}}/>
      <button type="button" className="sdcd-password__bascule" onClick={()=>setVis(!vis)}
        aria-label={vis?'Masquer le mot de passe':'Afficher le mot de passe'} aria-pressed={vis}>
        <i className={vis?'ri-eye-off-line':'ri-eye-line'} aria-hidden="true"></i></button>
    </div>
    {creation&&<ul className="sdcd-password__regles">
      {regles.map((r,i)=><li key={i} className={'sdcd-password__regle'+(r[1]?' sdcd-password__regle--satisfaite':'')}>
        <i className={r[1]?'ri-checkbox-circle-fill':'ri-checkbox-blank-circle-line'} aria-hidden="true"></i>{r[0]}</li>)}
    </ul>}
  </div>;
}
