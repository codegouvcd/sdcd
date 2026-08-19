import React from 'react';
import {Button} from '../buttons/Button.jsx';
import {Input} from '../forms/Input.jsx';
import {Select} from '../forms/Select.jsx';
import {Alert} from '../feedback/Alert.jsx';
export function Wizard({titre='Votre démarche', etapes=[], onFinish, className='', style}) {
  const total=etapes.length+1;
  const [et,setEt]=React.useState(0);
  const [data,setData]=React.useState({});
  const [errs,setErrs]=React.useState({});
  const [fini,setFini]=React.useState(false);
  const maj=(cle,v)=>setData({...data,[cle]:v});
  const valider=()=>{const e={};
    (etapes[et].champs||[]).forEach(ch=>{
      const v=(data[ch.cle]||'').toString().trim();
      if(ch.requis&&!v)e[ch.cle]='Ce champ est requis.';
      else if(ch.type==='email'&&v&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))e[ch.cle]='Adresse électronique invalide.';
      else if(ch.type==='nombre'&&v&&isNaN(Number(v)))e[ch.cle]='Saisissez un nombre.';});
    setErrs(e);return Object.keys(e).length===0;};
  const suivant=()=>{if(et<etapes.length){if(!valider())return;}setEt(et+1);};
  const envoyer=()=>{setFini(true);onFinish&&onFinish(data);};
  const courante=et<etapes.length?etapes[et]:null;
  return <div className={['sdcd-wizard',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-wizard__compte">{titre} — étape {Math.min(et+1,total)} sur {total}</div>
    <div className="sdcd-wizard__titre">{courante?courante.titre:'Vérifiez vos informations'}</div>
    <div className="sdcd-wizard__jauge" aria-hidden="true">
      {Array.from({length:total},(_,i)=><div key={i} className={'sdcd-wizard__segment'+(i<=et?' sdcd-wizard__segment--fait':'')}></div>)}
    </div>
    {fini?<Alert type="succes" titre="Demande transmise">Votre dossier a bien été envoyé. Un récépissé avec votre numéro de suivi vous est adressé par courriel.</Alert>
    :courante?<div className="sdcd-wizard__panneau">
      {courante.description&&<p className="sdcd-wizard__description">{courante.description}</p>}
      {(courante.champs||[]).map(ch=>ch.type==='choix'
        ?<Select key={ch.cle} label={ch.label+(ch.requis?' *':'')} hint={ch.hint} options={['— Sélectionner —',...(ch.options||[])]} value={data[ch.cle]||'— Sélectionner —'} error={errs[ch.cle]} onChange={e=>maj(ch.cle,e.target.value==='— Sélectionner —'?'':e.target.value)}/>
        :<Input key={ch.cle} label={ch.label+(ch.requis?' *':'')} hint={ch.hint} type={ch.type==='nombre'?'text':ch.type==='date'?'date':ch.type||'text'} value={data[ch.cle]||''} error={errs[ch.cle]} onChange={e=>maj(ch.cle,e.target.value)}/>)}
      <div className="sdcd-wizard__actions">
        {et>0&&<Button variant="secondaire" icon="ri-arrow-left-line" onClick={()=>{setErrs({});setEt(et-1);}}>Précédent</Button>}
        <Button iconRight="ri-arrow-right-line" onClick={suivant}>Continuer</Button>
      </div>
    </div>
    :<div className="sdcd-wizard__recapitulatif">
      <div className="sdcd-wizard__tableau">
        {etapes.flatMap(e=>e.champs||[]).map(ch=><div key={ch.cle} className="sdcd-wizard__ligne sdcd-grid">
          <span className="sdcd-wizard__cle">{ch.label}</span>
          <span className="sdcd-wizard__valeur">{data[ch.cle]||'—'}</span>
        </div>)}
      </div>
      <div className="sdcd-wizard__actions">
        <Button variant="secondaire" icon="ri-arrow-left-line" onClick={()=>setEt(et-1)}>Corriger</Button>
        <Button icon="ri-send-plane-line" onClick={envoyer}>Envoyer la demande</Button>
      </div>
    </div>}
  </div>;
}
