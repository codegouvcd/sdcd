import React from 'react';
export function Select({label, hint, error, options=[], value, onChange, disabled=false, className='', style}) {
  return React.createElement('div',{className:['sdcd-champ','sdcd-select',className].filter(Boolean).join(' '),style},
    label&&React.createElement('label',{className:'sdcd-champ__label'},label),
    hint&&React.createElement('div',{className:'sdcd-champ__aide'},hint),
    React.createElement('select',{className:'sdcd-select__champ',value,onChange,disabled,'aria-invalid':error?true:undefined},
      options.map((o,i)=>React.createElement('option',{key:i,value:typeof o==='string'?o:o.value},typeof o==='string'?o:o.label))),
    error&&React.createElement('div',{className:'sdcd-champ__erreur'},
      React.createElement('i',{className:'ri-error-warning-line','aria-hidden':'true'}),error));
}
