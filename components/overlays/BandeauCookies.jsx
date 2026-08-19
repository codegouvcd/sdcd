import React from 'react';
import {Button} from '../buttons/Button.jsx';
export function CookieConsent({visible=true, onChoice, fixe=true, className='', style}) {
  const [vu,setVu]=React.useState(!visible);
  if(vu)return null;
  const pick=(c)=>{setVu(true);onChoice&&onChoice(c);};
  const cls=['sdcd-bandeaucookies',fixe&&'sdcd-bandeaucookies--fixe',className].filter(Boolean).join(' ');
  return <div role="region" aria-label="Gestion des cookies" className={cls} style={style}>
    <div className="sdcd-bandeaucookies__corps">
      <div className="sdcd-bandeaucookies__texte">
        <div className="sdcd-bandeaucookies__titre">À propos des cookies sur ce site</div>
        <div className="sdcd-bandeaucookies__detail">Ce site utilise des traceurs de mesure d’audience exemptés de consentement. D’autres services (vidéos, cartes) déposent des cookies uniquement si vous les acceptez. <a href="#">En savoir plus</a></div>
      </div>
      <div className="sdcd-bandeaucookies__actions sdcd-stack-sm">
        <Button size="sm" onClick={()=>pick('accepte')}>Tout accepter</Button>
        <Button size="sm" variant="secondaire" onClick={()=>pick('refuse')}>Tout refuser</Button>
        <Button size="sm" variant="tertiaire" onClick={()=>pick('personnalise')}>Personnaliser</Button>
      </div>
    </div>
  </div>;
}
