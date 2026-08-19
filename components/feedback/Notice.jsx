import React from 'react';
export function Notice({children, onClose, className='', style}) {
  return React.createElement('div',{className:['sdcd-notice',className].filter(Boolean).join(' '),style},
    React.createElement('div',{className:'sdcd-notice__corps'},
      React.createElement('i',{className:'sdcd-notice__icone ri-information-line','aria-hidden':'true'}),
      React.createElement('div',{className:'sdcd-notice__texte'},children),
      onClose&&React.createElement('button',{type:'button',className:'sdcd-fermer',onClick:onClose,'aria-label':'Fermer'},
        React.createElement('i',{className:'ri-close-line','aria-hidden':'true'}))));
}
