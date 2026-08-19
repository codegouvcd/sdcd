import React from 'react';
export function Radio({label, name, value, checked, defaultChecked, onChange, disabled=false, className='', style}) {
  return React.createElement('label',{className:['sdcd-radio',className].filter(Boolean).join(' '),style},
    React.createElement('input',{className:'sdcd-radio__case',type:'radio',name,value,checked,defaultChecked,onChange,disabled}),
    React.createElement('span',null,label));
}
