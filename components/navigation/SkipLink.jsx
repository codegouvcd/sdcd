import React from 'react';
export function SkipLink({cible='#contenu', libelle='Aller au contenu', className='', style}) {
  return React.createElement('a',{href:cible,className:['sdcd-skiplink',className].filter(Boolean).join(' '),style},libelle);
}
