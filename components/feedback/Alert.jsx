import React from 'react';
const ICONES={info:'ri-information-line',succes:'ri-checkbox-circle-line',alerte:'ri-alert-line',erreur:'ri-error-warning-line'};
export function Alert({type='info', titre, children, onClose, className='', style}) {
  const cls=['sdcd-alert','sdcd-alert--'+(ICONES[type]?type:'info'),className].filter(Boolean).join(' ');
  return React.createElement('div',{role:'alert',className:cls,style},
    React.createElement('i',{className:'sdcd-alert__icone '+(ICONES[type]||ICONES.info),'aria-hidden':'true'}),
    React.createElement('div',{className:'sdcd-alert__corps'},
      titre&&React.createElement('div',{className:'sdcd-alert__titre'},titre),
      children&&React.createElement('div',{className:'sdcd-alert__texte'},children)),
    onClose&&React.createElement('button',{type:'button',className:'sdcd-fermer',onClick:onClose,'aria-label':'Fermer'},
      React.createElement('i',{className:'ri-close-line','aria-hidden':'true'})));
}
