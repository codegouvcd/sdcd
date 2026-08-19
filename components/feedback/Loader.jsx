import React from 'react';
export function Loader({size=70, label='Chargement…', className='', style}) {
  return React.createElement('div',{role:'status','aria-label':label,className:['sdcd-loader',className].filter(Boolean).join(' '),
    style:{'--sdcd-loader-taille':size+'px',...style}},
    React.createElement('div',{className:'sdcd-loader__anneaux','aria-hidden':'true'},
      React.createElement('div',{className:'sdcd-loader__anneau sdcd-loader__anneau--bleu'}),
      React.createElement('div',{className:'sdcd-loader__anneau sdcd-loader__anneau--jaune'}),
      React.createElement('div',{className:'sdcd-loader__anneau sdcd-loader__anneau--rouge'})),
    label&&React.createElement('span',{className:'sdcd-loader__label'},label));
}
