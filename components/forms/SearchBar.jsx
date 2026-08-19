import React from 'react';
export function SearchBar({placeholder='Rechercher une démarche, un service…', buttonLabel='Rechercher', large=false, onSearch, className='', style}) {
  const [q,setQ]=React.useState('');
  const cls=['sdcd-searchbar',large&&'sdcd-searchbar--large',className].filter(Boolean).join(' ');
  return React.createElement('form',{className:cls,role:'search',onSubmit:e=>{e.preventDefault();onSearch&&onSearch(q);},style},
    React.createElement('input',{className:'sdcd-searchbar__champ',type:'search',value:q,placeholder,onChange:e=>setQ(e.target.value)}),
    React.createElement('button',{type:'submit',className:'sdcd-searchbar__bouton','aria-label':buttonLabel},
      React.createElement('i',{className:'ri-search-line','aria-hidden':'true'}),
      large?React.createElement('span',{className:'sdcd-searchbar__libelle'},buttonLabel):null));
}
