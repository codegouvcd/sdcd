import React from 'react';
export function Modal({ouvert=false, titre, children, actions, onClose, largeur=560, className='', style}) {
  React.useEffect(()=>{
    if(!ouvert)return;
    const esc=(e)=>{if(e.key==='Escape')onClose&&onClose();};
    document.addEventListener('keydown',esc);
    return ()=>document.removeEventListener('keydown',esc);
  },[ouvert,onClose]);
  if(!ouvert)return null;
  return <div role="dialog" aria-modal="true" aria-label={titre} className="sdcd-modal__voile" onClick={onClose}>
    <div className={['sdcd-modal',className].filter(Boolean).join(' ')}
      style={{'--sdcd-modal-largeur':largeur+'px',...style}} onClick={e=>e.stopPropagation()}>
      <div className="sdcd-modal__entete">
        <h2 className="sdcd-modal__titre">{titre}</h2>
        <button type="button" className="sdcd-modal__fermer" onClick={onClose} aria-label="Fermer">
          Fermer <i className="ri-close-line" aria-hidden="true"></i></button>
      </div>
      <div className="sdcd-modal__corps">{children}</div>
      {actions&&<div className="sdcd-modal__actions">{actions}</div>}
    </div>
  </div>;
}
