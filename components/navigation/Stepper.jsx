import React from 'react';
export function Stepper({etape=1, total=4, titre, suivant, className='', style}) {
  return <div className={['sdcd-stepper',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-stepper__compte">Étape {etape} sur {total}</div>
    <div className="sdcd-stepper__titre">{titre}</div>
    <div className="sdcd-stepper__jauge" aria-hidden="true">
      {Array.from({length:total},(_,i)=><div key={i} className={'sdcd-stepper__segment'+(i<etape?' sdcd-stepper__segment--fait':'')}></div>)}
    </div>
    {suivant&&etape<total&&<div className="sdcd-stepper__suivant"><strong>Étape suivante :</strong> {suivant}</div>}
  </div>;
}
