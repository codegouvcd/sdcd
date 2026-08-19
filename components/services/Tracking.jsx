import React from 'react';
const ICO={fait:'ri-checkbox-circle-fill',encours:'ri-loader-4-line',avenir:'ri-checkbox-blank-circle-line'};
const LIENS=[['ri-notification-3-line','Recevoir les notifications'],['ri-download-line','Récépissé de dépôt'],['ri-question-line','Contacter le service']];
export function Tracking({dossier='CD-2026-084517', demarche='Demande de passeport biométrique', etapes, className='', style}) {
  const ETAPES=etapes||[
    {titre:'Demande déposée',detail:'Dossier reçu en ligne',date:'2 août 2026',statut:'fait'},
    {titre:'Pièces vérifiées',detail:'Dossier complet',date:'5 août 2026',statut:'fait'},
    {titre:'Instruction en cours',detail:'Service : Direction générale de migration',date:'En cours depuis le 6 août',statut:'encours'},
    {titre:'Production du document',detail:'',date:'',statut:'avenir'},
    {titre:'Disponible au retrait',detail:'Vous serez notifié par SMS et courriel',date:'',statut:'avenir'}];
  return <div className={['sdcd-tracking',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-tracking__entete">
      <div className="sdcd-tracking__identite">
        <div className="sdcd-tracking__demarche">{demarche}</div>
        <div className="sdcd-tracking__dossier">Dossier n° <span className="sdcd-tracking__numero">{dossier}</span></div>
      </div>
      <span className="sdcd-tracking__etat">En instruction</span>
    </div>
    <ol className="sdcd-tracking__etapes">
      {ETAPES.map((e,i)=>{const statut=ICO[e.statut]?e.statut:'avenir';
        return <li key={i} className={'sdcd-tracking__etape sdcd-tracking__etape--'+statut}>
          {i<ETAPES.length-1&&<span className="sdcd-tracking__lien-vertical" aria-hidden="true"></span>}
          <i className={'sdcd-tracking__puce '+ICO[statut]} aria-hidden="true"></i>
          <div>
            <div className="sdcd-tracking__titre">{e.titre}</div>
            {e.detail&&<div className="sdcd-tracking__detail">{e.detail}</div>}
            {e.date&&<div className="sdcd-tracking__date">{e.date}</div>}
          </div>
        </li>;})}
    </ol>
    <div className="sdcd-tracking__pied">
      {LIENS.map((l,i)=><a key={i} href="#"><i className={l[0]} aria-hidden="true"></i>{l[1]}</a>)}
    </div>
  </div>;
}
