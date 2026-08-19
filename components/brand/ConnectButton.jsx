import React from 'react';
export function ConnectButton({service='CongoConnect', hint=true, compact=false, onClick, assetsBase='', className='', style}) {
  const cls=['sdcd-connectbutton',compact&&'sdcd-connectbutton--compact',className].filter(Boolean).join(' ');
  return React.createElement('div',{className:cls,style},
    React.createElement('button',{type:'button',className:'sdcd-connectbutton__bouton',onClick},
      React.createElement('img',{className:'sdcd-connectbutton__logo',src:assetsBase+'assets/logo-blanc-tricolore.png',alt:''}),
      React.createElement('span',{className:'sdcd-connectbutton__textes'},
        React.createElement('span',{className:'sdcd-connectbutton__amorce'},'S’identifier avec'),
        React.createElement('span',{className:'sdcd-connectbutton__service'},service))),
    hint&&!compact&&React.createElement('a',{className:'sdcd-connectbutton__aide',href:'#'},'Qu’est-ce que '+service+' ?'));
}
