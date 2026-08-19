import React from 'react';
const OPTS=[['clair','ri-sun-line','Thème clair'],['sombre','ri-moon-line','Thème sombre'],['systeme','ri-computer-line','Système']];
export function Display({valeur, onChange, className='', style}) {
  const [v,setV]=React.useState(valeur||'systeme');
  const cur=valeur!==undefined?valeur:v;
  const appliquer=(m)=>{
    if(valeur===undefined)setV(m);
    const sombre=m==='sombre'||(m==='systeme'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);
    const racine=document.documentElement;
    racine.classList.add('sdcd-sans-transition');
    racine.setAttribute('data-theme',sombre?'dark':'light');
    // Double rAF pour laisser le style se recalculer ; repli en setTimeout car
    // requestAnimationFrame ne se déclenche pas dans un onglet en arrière-plan,
    // ce qui laisserait les transitions désactivées indéfiniment.
    let rendu=false;
    const rendre=()=>{if(rendu)return;rendu=true;racine.classList.remove('sdcd-sans-transition');};
    requestAnimationFrame(()=>requestAnimationFrame(rendre));
    setTimeout(rendre,120);
    onChange&&onChange(m);};
  return <fieldset className={['sdcd-display',className].filter(Boolean).join(' ')} style={style}>
    <legend className="sdcd-display__legende">Paramètres d’affichage</legend>
    <div className="sdcd-display__options" role="radiogroup" aria-label="Paramètres d’affichage">
      {OPTS.map(([m,ic,lab])=><button key={m} type="button" className="sdcd-display__option" role="radio" aria-checked={cur===m} onClick={()=>appliquer(m)}>
        <i className={ic} aria-hidden="true"></i>{lab}{cur===m&&<i className="ri-check-line" aria-hidden="true"></i>}</button>)}
    </div>
  </fieldset>;
}
