import React from 'react';
import {Button} from '../buttons/Button.jsx';
const RESEAUX=[['ri-facebook-fill','Facebook'],['ri-twitter-x-line','X'],['ri-linkedin-fill','LinkedIn'],['ri-youtube-line','YouTube'],['ri-instagram-line','Instagram']];
export function Follow({onSubscribe, className='', style}) {
  const [em,setEm]=React.useState(''),[ok,setOk]=React.useState(false),[err,setErr]=React.useState('');
  const go=()=>{if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){setErr('Saisissez une adresse électronique valide.');return;}setErr('');setOk(true);onSubscribe&&onSubscribe(em);};
  return <div className={['sdcd-follow',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-follow__corps">
      <div>
        <div className="sdcd-follow__titre">Recevez la lettre d’information officielle</div>
        <div className="sdcd-follow__accroche">Chaque semaine, l’essentiel de l’action publique. Désabonnement en un clic.</div>
        {ok?<div role="status" className="sdcd-follow__confirmation">
          <i className="ri-checkbox-circle-line" aria-hidden="true"></i> Inscription confirmée : {em}</div>
        :<div className="sdcd-follow__formulaire">
          <div className="sdcd-follow__champ-bloc">
            <input className="sdcd-follow__champ" type="email" value={em} placeholder="votre.adresse@exemple.cd"
              onChange={e=>setEm(e.target.value)} aria-label="Adresse électronique" aria-invalid={err?true:undefined}/>
            {err&&<div className="sdcd-follow__erreur">{err}</div>}
          </div>
          <Button size="sm" onClick={go}>S’abonner</Button>
        </div>}
      </div>
      <div>
        <div className="sdcd-eyebrow sdcd-follow__reseaux-titre">Suivez-nous</div>
        <div className="sdcd-follow__reseaux">
          {RESEAUX.map((s,i)=><a key={i} className="sdcd-follow__reseau" href="#" aria-label={s[1]} title={s[1]}>
            <i className={s[0]} aria-hidden="true"></i></a>)}
        </div>
      </div>
    </div>
  </div>;
}
