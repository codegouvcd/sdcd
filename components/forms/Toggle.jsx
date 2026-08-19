import React from 'react';
export function Toggle({label, checked, defaultChecked=false, onChange, disabled=false, className='', style}) {
  const [on,setOn]=React.useState(defaultChecked);
  const val=checked!==undefined?checked:on;
  const flip=()=>{if(disabled)return;const n=!val;if(checked===undefined)setOn(n);onChange&&onChange(n);};
  return React.createElement('label',{className:['sdcd-toggle',className].filter(Boolean).join(' '),style},
    React.createElement('button',{type:'button',className:'sdcd-toggle__piste',role:'switch','aria-checked':val,onClick:flip,disabled},
      React.createElement('span',{className:'sdcd-toggle__pastille'})),
    label&&React.createElement('span',null,label));
}
