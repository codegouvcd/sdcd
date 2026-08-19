import React from 'react';
export const LANGUES=[{code:'FR',nom:'Français'},{code:'EN',nom:'English'},{code:'LN',nom:'Lingala'},{code:'SW',nom:'Kiswahili'},{code:'KG',nom:'Kikongo'},{code:'TS',nom:'Tshiluba'}];
export function LangMenu({value='FR', onChange, className='', style}) {
  const [open,setOpen]=React.useState(false);
  return React.createElement('div',{className:['sdcd-langmenu',className].filter(Boolean).join(' '),style},
    React.createElement('button',{type:'button',className:'sdcd-langmenu__declencheur',onClick:()=>setOpen(!open),'aria-expanded':open},
      React.createElement('i',{className:'sdcd-langmenu__globe ri-global-line','aria-hidden':'true'}),value,
      React.createElement('i',{className:'sdcd-langmenu__chevron '+(open?'ri-arrow-up-s-line':'ri-arrow-down-s-line'),'aria-hidden':'true'})),
    open&&React.createElement('div',{className:'sdcd-langmenu__liste'},
      LANGUES.map(l=>React.createElement('button',{key:l.code,type:'button',className:'sdcd-langmenu__option',
        'aria-current':l.code===value?'true':undefined,
        onClick:()=>{setOpen(false);onChange&&onChange(l.code);}},
        React.createElement('span',null,l.nom),
        React.createElement('span',{className:'sdcd-langmenu__code'},l.code)))));
}
