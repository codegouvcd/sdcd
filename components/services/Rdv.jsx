import React from 'react';
import {Button} from '../buttons/Button.jsx';
export function Rdv({lieu='Bureau d’état civil — Kinshasa-Gombe', dates, creneaux, onConfirm, className='', style}) {
  const DATES=dates||['lun. 24 août','mar. 25 août','mer. 26 août','jeu. 27 août'];
  const SLOTS=creneaux||['08:30','09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00'];
  const [d,setD]=React.useState(-1),[h,setH]=React.useState(-1),[ok,setOk]=React.useState(false);
  return <div className={['sdcd-rdv',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-rdv__lieu">
      <i className="ri-map-pin-line" aria-hidden="true"></i>
      <div>
        <div className="sdcd-rdv__lieu-nom">{lieu}</div>
        <div className="sdcd-rdv__lieu-detail">Durée du rendez-vous : 20 minutes · pièce d’identité requise</div>
      </div>
    </div>
    <div className="sdcd-eyebrow sdcd-rdv__etape">1. Choisissez un jour</div>
    <div className="sdcd-rdv__jours sdcd-grid" style={{'--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))','--sdcd-gap':'var(--sdcd-2)'}}>
      {DATES.map((x,i)=><button key={i} type="button" className="sdcd-creneau" aria-pressed={d===i}
        onClick={()=>{setD(i);setH(-1);setOk(false);}}>{x}</button>)}
    </div>
    <div className={'sdcd-eyebrow sdcd-rdv__etape'+(d<0?' sdcd-rdv__etape--inactive':'')}>2. Choisissez un horaire</div>
    <div className={'sdcd-rdv__horaires sdcd-grid'+(d<0?' sdcd-rdv__horaires--verrouilles':'')}
      style={{'--sdcd-cols':'repeat(5,minmax(0,1fr))','--sdcd-cols-lg':'repeat(3,minmax(0,1fr))','--sdcd-cols-md':'repeat(3,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))','--sdcd-gap':'var(--sdcd-2)'}}>
      {SLOTS.map((x,i)=><button key={i} type="button" className="sdcd-creneau" aria-pressed={h===i}
        onClick={()=>{setH(i);setOk(false);}}>{x}</button>)}
    </div>
    {ok?<div role="status" className="sdcd-rdv__confirmation">
      <i className="ri-checkbox-circle-line" aria-hidden="true"></i>
      <div className="sdcd-rdv__confirmation-texte"><strong>Rendez-vous confirmé</strong> — {DATES[d]} à {SLOTS[h]}. Une convocation vous est envoyée par courriel.</div>
    </div>
    :<Button disabled={d<0||h<0} onClick={()=>{setOk(true);onConfirm&&onConfirm(DATES[d],SLOTS[h]);}} icon="ri-calendar-check-line">
      {d>-1&&h>-1?'Confirmer — '+DATES[d]+' à '+SLOTS[h]:'Confirmer le rendez-vous'}</Button>}
  </div>;
}
