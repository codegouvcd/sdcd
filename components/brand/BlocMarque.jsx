import React from 'react';
export function BlocMarque({entite, sousTitre, devise=true, fondSombre=false, taille=56, assetsBase='', className='', style}) {
  const cls=['sdcd-blocmarque',fondSombre&&'sdcd-blocmarque--fond-sombre',className].filter(Boolean).join(' ');
  return React.createElement('div',{className:cls,style:{'--sdcd-marque-taille':taille+'px',...style}},
    React.createElement('img',{className:'sdcd-blocmarque__armoiries',src:assetsBase+(fondSombre?'assets/logo-blanc-tricolore.png':'assets/armoiries-rdc.png'),alt:'Armoiries de la République Démocratique du Congo'}),
    React.createElement('div',null,
      React.createElement('div',{className:'sdcd-blocmarque__republique'},'République Démocratique',React.createElement('br'),'du Congo'),
      devise&&React.createElement('div',{className:'sdcd-blocmarque__devise'},'Justice · Paix · Travail')),
    entite&&React.createElement('div',{className:'sdcd-blocmarque__filet','aria-hidden':'true'}),
    entite&&React.createElement('div',null,
      React.createElement('div',{className:'sdcd-blocmarque__entite'},entite),
      sousTitre&&React.createElement('div',{className:'sdcd-blocmarque__sous-titre'},sousTitre)));
}
