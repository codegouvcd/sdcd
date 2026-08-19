import React from 'react';
export function Card({surTitre, titre, description, meta, href='#', image, className='', style}) {
  return React.createElement('a',{href,className:['sdcd-card',className].filter(Boolean).join(' '),style},
    image&&React.createElement('div',{className:'sdcd-card__media'},
      typeof image==='string'?React.createElement('img',{src:image,alt:''}):image),
    React.createElement('div',{className:'sdcd-card__corps'},
      surTitre&&React.createElement('div',{className:'sdcd-eyebrow sdcd-card__sur-titre'},surTitre),
      React.createElement('div',{className:'sdcd-card__titre'},titre),
      description&&React.createElement('p',{className:'sdcd-card__description'},description),
      React.createElement('div',{className:'sdcd-card__pied'},
        React.createElement('span',{className:'sdcd-card__meta'},meta||''),
        React.createElement('i',{className:'sdcd-card__fleche ri-arrow-right-line','aria-hidden':'true'}))));
}
