import React from 'react';
export function Checkbox({label, checked, defaultChecked, onChange, disabled=false, className='', style}) {
  return React.createElement('label',{className:['sdcd-checkbox',className].filter(Boolean).join(' '),style},
    React.createElement('input',{className:'sdcd-checkbox__case',type:'checkbox',checked,defaultChecked,onChange,disabled}),
    React.createElement('span',null,label));
}
