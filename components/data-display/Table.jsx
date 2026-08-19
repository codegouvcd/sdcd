import React from 'react';
export function Table({caption, colonnes=[], lignes=[], empilable=true, className='', style}) {
  const minTable=Math.max(480,colonnes.length*130);
  return React.createElement('div',{className:'sdcd-scroll-x',style:{'--sdcd-table-min':minTable+'px'}},
    React.createElement('table',{className:['sdcd-table',className].filter(Boolean).join(' '),
      'data-empilable':empilable?'':undefined,style},
      caption&&React.createElement('caption',null,caption),
      React.createElement('thead',null,React.createElement('tr',null,
        colonnes.map((c,i)=>React.createElement('th',{key:i,scope:'col'},c)))),
      React.createElement('tbody',null,lignes.map((l,i)=>React.createElement('tr',{key:i},
        l.map((v,j)=>React.createElement('td',{key:j,'data-label':typeof colonnes[j]==='string'?colonnes[j]:''},v)))))));
}
