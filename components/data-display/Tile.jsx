import React from 'react';
export function Tile({icon='ri-file-text-line', titre, description, href='#', className='', style}) {
  return React.createElement('a',{href,className:['sdcd-tile',className].filter(Boolean).join(' '),style},
    React.createElement('i',{className:'sdcd-tile__icone '+icon,'aria-hidden':'true'}),
    React.createElement('div',null,
      React.createElement('div',{className:'sdcd-tile__titre'},titre),
      description&&React.createElement('div',{className:'sdcd-tile__description'},description)));
}
