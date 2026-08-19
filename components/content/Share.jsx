import React from 'react';
const RESEAUX=[['ri-mail-line','Partager par courriel'],['ri-facebook-fill','Partager sur Facebook'],['ri-twitter-x-line','Partager sur X'],['ri-linkedin-fill','Partager sur LinkedIn']];
export function Share({titre='Partager', className='', style}) {
  const [copie,setCopie]=React.useState(false);
  const copier=()=>{try{navigator.clipboard.writeText(window.location.href);}catch(e){}setCopie(true);setTimeout(()=>setCopie(false),2000);};
  return <div className={['sdcd-share',className].filter(Boolean).join(' ')} style={style}>
    <span className="sdcd-eyebrow">{titre}</span>
    <div className="sdcd-share__boutons">
      {RESEAUX.map((s,i)=><a key={i} className="sdcd-share__bouton" href="#" aria-label={s[1]} title={s[1]}>
        <i className={s[0]} aria-hidden="true"></i></a>)}
      <button type="button" className="sdcd-share__bouton" onClick={copier} aria-label="Copier le lien" title="Copier le lien">
        <i className={copie?'ri-check-line':'ri-links-line'} aria-hidden="true"></i></button>
    </div>
    {copie&&<span role="status" className="sdcd-share__confirmation">Lien copié</span>}
  </div>;
}
