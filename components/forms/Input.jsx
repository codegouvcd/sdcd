import React from 'react';
export function Input({label, hint, error, type='text', value, defaultValue, onChange, placeholder, disabled=false, className='', style}) {
  return React.createElement('div',{className:['sdcd-champ','sdcd-input',className].filter(Boolean).join(' '),style},
    label&&React.createElement('label',{className:'sdcd-champ__label'},label),
    hint&&React.createElement('div',{className:'sdcd-champ__aide'},hint),
    React.createElement('input',{className:'sdcd-input__champ',type,value,defaultValue,placeholder,disabled,onChange,'aria-invalid':error?true:undefined}),
    error&&React.createElement('div',{className:'sdcd-champ__erreur'},
      React.createElement('i',{className:'ri-error-warning-line','aria-hidden':'true'}),error));
}
