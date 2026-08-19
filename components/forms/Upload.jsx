import React from 'react';
export function Upload({label='Ajouter des fichiers', hint='Formats acceptés : PDF, JPG, PNG. Poids maximal : 5 Mo par fichier.', multiple=true, onChange, className='', style}) {
  const [files,setFiles]=React.useState([]);
  const ref=React.useRef(null);
  const add=(e)=>{const list=[...files,...Array.from(e.target.files||[]).map(f=>({nom:f.name,taille:f.size}))];setFiles(list);onChange&&onChange(list);};
  const rm=(i)=>{const list=files.filter((_,n)=>n!==i);setFiles(list);onChange&&onChange(list);};
  const fmt=(o)=>o>1048576?(o/1048576).toFixed(1).replace('.',',')+' Mo':Math.max(1,Math.round(o/1024))+' Ko';
  return <div className={['sdcd-upload',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-upload__label">{label}</div>
    <div className="sdcd-upload__aide">{hint}</div>
    <input ref={ref} className="sdcd-upload__entree" type="file" multiple={multiple} onChange={add} aria-hidden="true" tabIndex={-1}/>
    <button type="button" className="sdcd-button sdcd-button--secondaire sdcd-button--sm" onClick={()=>ref.current&&ref.current.click()}>
      <i className="sdcd-button__icone ri-upload-2-line" aria-hidden="true"></i>Parcourir…</button>
    {files.length>0&&<ul className="sdcd-upload__liste">
      {files.map((f,i)=><li key={i} className="sdcd-upload__fichier">
        <i className="sdcd-upload__icone ri-file-line" aria-hidden="true"></i>
        <span className="sdcd-upload__nom">{f.nom}</span>
        <span className="sdcd-upload__poids">{fmt(f.taille)}</span>
        <button type="button" className="sdcd-upload__retirer" aria-label={'Retirer '+f.nom} onClick={()=>rm(i)}>
          <i className="ri-delete-bin-line" aria-hidden="true"></i></button>
      </li>)}
    </ul>}
  </div>;
}
