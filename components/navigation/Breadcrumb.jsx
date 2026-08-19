import React from 'react';
export function Breadcrumb({items=[], className='', style}) {
  return React.createElement('nav',{'aria-label':'Fil d’Ariane',className:['sdcd-breadcrumb',className].filter(Boolean).join(' '),style},
    items.map((it,i)=>React.createElement(React.Fragment,{key:i},
      i>0&&React.createElement('i',{className:'sdcd-breadcrumb__separateur ri-arrow-right-s-line','aria-hidden':'true'}),
      i<items.length-1?React.createElement('a',{className:'sdcd-breadcrumb__lien',href:'#'},it)
        :React.createElement('span',{className:'sdcd-breadcrumb__courant','aria-current':'page'},it))));
}
