import React from 'react';
export function Lien({href='#', children, externe=false, telechargement=false, detail, icone, taille='md', onClick, className='', style}) {
  const ic=telechargement?'ri-download-line':externe?'ri-external-link-line':icone;
  const cls=['sdcd-lien',taille!=='md'&&'sdcd-lien--'+taille,className].filter(Boolean).join(' ');
  return <a href={href} className={cls} style={style} onClick={onClick}
    target={externe?'_blank':undefined} rel={externe?'noopener noreferrer':undefined}>
    <span>{children}{detail&&<span className="sdcd-lien__detail">{detail}</span>}</span>
    {ic&&<i className={'sdcd-lien__icone '+ic} aria-hidden="true"></i>}
  </a>;
}
