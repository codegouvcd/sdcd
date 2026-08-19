import React from 'react';
export function DataTable({titre, colonnes=[], lignes=[], parPage=5, filtrable=true, exportable=true, editable=true,
  selectionnable=false, actionsGroupees, actionsLigne, onAction, chargement=false,
  videTitre='Aucun résultat', videTexte='Modifiez ou réinitialisez les filtres.', onReinit,
  ligneAlerte, densifiable=true, className='', style}) {
  const [rows,setRows]=React.useState(lignes.map(r=>({...r})));
  React.useEffect(()=>{setRows(lignes.map(r=>({...r})));setSel([]);setPage(1);},[lignes]);
  const [q,setQ]=React.useState('');
  const [tri,setTri]=React.useState({cle:null,dir:1});
  const [page,setPage]=React.useState(1);
  const [edit,setEdit]=React.useState(-1);
  const [draft,setDraft]=React.useState({});
  const [sel,setSel]=React.useState([]);
  const [dense,setDense]=React.useState(false);
  const [visibles,setVisibles]=React.useState(colonnes.map(c=>c.cle));
  const [colMenu,setColMenu]=React.useState(false);
  const [ligneMenu,setLigneMenu]=React.useState(-1);
  const cols=colonnes.filter(c=>visibles.includes(c.cle));
  const filtres=rows.filter(r=>!q||colonnes.some(c=>String(r[c.cle]).toLowerCase().includes(q.toLowerCase())));
  const triees=tri.cle?[...filtres].sort((a,b)=>{const x=a[tri.cle],y=b[tri.cle];
    return (typeof x==='number'?x-y:String(x).localeCompare(String(y),'fr'))*tri.dir;}):filtres;
  const nbPages=Math.max(1,Math.ceil(triees.length/parPage));
  const p=Math.min(page,nbPages);
  const vue=triees.slice((p-1)*parPage,p*parPage);
  const trier=(cle)=>setTri(tri.cle===cle?{cle,dir:-tri.dir}:{cle,dir:1});
  const exporter=()=>{const sep=';';
    const csv='﻿'+[colonnes.map(c=>c.label).join(sep),...triees.map(r=>colonnes.map(c=>String(r[c.cle]).replace(/;/g,',')).join(sep))].join('\n');
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    a.download=(titre||'export')+'.csv';a.click();URL.revokeObjectURL(a.href);};
  const idx=(r)=>rows.indexOf(r);
  const basculerSel=(r)=>{const i=idx(r);setSel(sel.includes(i)?sel.filter(x=>x!==i):[...sel,i]);};
  const toutPage=vue.length>0&&vue.every(r=>sel.includes(idx(r)));
  const basculerPage=()=>{const ids=vue.map(idx);setSel(toutPage?sel.filter(i=>!ids.includes(i)):[...new Set([...sel,...ids])]);};
  const commencer=(r)=>{setEdit(idx(r));setDraft({...r});setLigneMenu(-1);};
  const enregistrer=()=>{setRows(rows.map((r,i)=>i===edit?{...draft}:r));setEdit(-1);};
  const nbCols=cols.length+(selectionnable?1:0)+((editable||actionsLigne)?1:0);
  const clsNombre=(c)=>c.type==='nombre'?' sdcd-datatable__cellule--nombre':'';
  return <div className={['sdcd-datatable',dense&&'sdcd-datatable--dense',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-datatable__barre">
      <div className="sdcd-datatable__titre">{titre}</div>
      {filtrable&&<div className="sdcd-datatable__recherche">
        <i className="sdcd-datatable__loupe ri-search-line" aria-hidden="true"></i>
        <input className="sdcd-datatable__filtre" type="search" value={q} placeholder="Filtrer…"
          onChange={e=>{setQ(e.target.value);setPage(1);}} aria-label="Filtrer le tableau"/>
      </div>}
      <span className="sdcd-datatable__enveloppe-menu">
        <button type="button" className="sdcd-datatable__outil" onClick={()=>setColMenu(!colMenu)} aria-expanded={colMenu}>
          <i className="ri-layout-column-line" aria-hidden="true"></i>Colonnes</button>
        {colMenu&&<div className="sdcd-datatable__menu-colonnes">
          {colonnes.map(c=><label key={c.cle} className="sdcd-datatable__colonne-option">
            <input type="checkbox" checked={visibles.includes(c.cle)} disabled={visibles.length===1&&visibles.includes(c.cle)}
              onChange={()=>setVisibles(visibles.includes(c.cle)?visibles.filter(v=>v!==c.cle):[...visibles,c.cle])}/>{c.label}</label>)}
        </div>}
      </span>
      {densifiable&&<button type="button" className="sdcd-datatable__outil" onClick={()=>setDense(!dense)} aria-pressed={dense}
        title={dense?'Densité confortable':'Densité compacte'}>
        <i className={dense?'ri-expand-height-line':'ri-contract-up-down-line'} aria-hidden="true"></i>{dense?'Confortable':'Compacte'}</button>}
      {exportable&&<button type="button" className="sdcd-datatable__outil" onClick={exporter}>
        <i className="ri-download-line" aria-hidden="true"></i>Exporter CSV</button>}
    </div>
    {selectionnable&&sel.length>0&&<div role="region" aria-live="polite" className="sdcd-datatable__selection">
      <strong className="sdcd-datatable__compte-selection">{sel.length} sélectionné{sel.length>1?'s':''}</strong>
      {actionsGroupees&&actionsGroupees(sel.map(i=>rows[i]))}
      <button type="button" className="sdcd-datatable__deselectionner" onClick={()=>setSel([])}>Tout désélectionner</button>
    </div>}
    <div className="sdcd-scroll-x">
    <table className="sdcd-datatable__table" data-empilable="">
      <thead><tr>
        {selectionnable&&<th className="sdcd-datatable__entete--fixe sdcd-datatable__entete--case">
          <input className="sdcd-datatable__case" type="checkbox" aria-label="Sélectionner la page" checked={toutPage} onChange={basculerPage}/></th>}
        {cols.map(c=><th key={c.cle} scope="col" className={'sdcd-datatable__entete--triable'+clsNombre(c)}
          onClick={()=>trier(c.cle)} aria-sort={tri.cle===c.cle?(tri.dir>0?'ascending':'descending'):'none'}>
          {c.label} <i className={'sdcd-datatable__tri '+(tri.cle!==c.cle?'ri-expand-up-down-line':tri.dir>0?'ri-arrow-up-s-line':'ri-arrow-down-s-line')} aria-hidden="true"></i></th>)}
        {(editable||actionsLigne)&&<th className={'sdcd-datatable__entete--fixe sdcd-datatable__entete--actions'+(actionsLigne?' sdcd-datatable__entete--actions-menu':'')}>Actions</th>}
      </tr></thead>
      <tbody>
        {chargement&&Array.from({length:parPage},(_,i)=><tr key={'sq'+i}>
          <td colSpan={nbCols}><div className="sdcd-datatable__squelette" aria-hidden="true"
            style={{animationDelay:(i*0.12)+'s',width:(88-i*9)+'%'}}></div></td>
        </tr>)}
        {!chargement&&vue.map((r,vi)=>{const ri=idx(r);const enEdit=ri===edit;const alerte=ligneAlerte&&ligneAlerte(r);
          return <tr key={ri} className="sdcd-datatable__ligne" data-alerte={alerte?'true':undefined}
            data-edition={enEdit?'true':undefined} aria-selected={selectionnable?sel.includes(ri):undefined}>
            {selectionnable&&<td data-label="Sélection">
              <input className="sdcd-datatable__case" type="checkbox" aria-label={'Sélectionner la ligne '+(vi+1)}
                checked={sel.includes(ri)} onChange={()=>basculerSel(r)}/></td>}
            {cols.map(c=><td key={c.cle} data-label={c.label} className={clsNombre(c).trim()}>
              {enEdit&&c.editable!==false?
                <input className="sdcd-datatable__champ-edition" value={draft[c.cle]} aria-label={c.label}
                  onChange={e=>setDraft({...draft,[c.cle]:c.type==='nombre'?Number(e.target.value)||0:e.target.value})}/>
                :(c.rendu?c.rendu(r):String(r[c.cle]))}
            </td>)}
            {(editable||actionsLigne)&&<td data-label="Actions" className="sdcd-datatable__actions-cellule">
              {enEdit?<span className="sdcd-datatable__actions-groupe">
                <button type="button" className="sdcd-datatable__bouton sdcd-datatable__bouton--valider" aria-label="Enregistrer" title="Enregistrer" onClick={enregistrer}>
                  <i className="ri-check-line" aria-hidden="true"></i></button>
                <button type="button" className="sdcd-datatable__bouton sdcd-datatable__bouton--annuler" aria-label="Annuler" title="Annuler" onClick={()=>setEdit(-1)}>
                  <i className="ri-close-line" aria-hidden="true"></i></button>
              </span>
              :actionsLigne?<span>
                <button type="button" className="sdcd-datatable__bouton" aria-label="Actions de la ligne" aria-expanded={ligneMenu===ri}
                  onClick={()=>setLigneMenu(ligneMenu===ri?-1:ri)}><i className="ri-more-2-fill" aria-hidden="true"></i></button>
                {ligneMenu===ri&&<span role="menu" className="sdcd-datatable__menu-ligne">
                  {editable&&<button type="button" role="menuitem" className="sdcd-datatable__menu-item" onClick={()=>commencer(r)}>
                    <i className="ri-pencil-line" aria-hidden="true"></i>Modifier en ligne</button>}
                  {actionsLigne.map((ac,k)=><button key={k} type="button" role="menuitem"
                    className={'sdcd-datatable__menu-item'+(ac.danger?' sdcd-datatable__menu-item--danger':'')}
                    onClick={()=>{setLigneMenu(-1);onAction&&onAction(ac.libelle,r);}}>
                    {ac.icone&&<i className={ac.icone} aria-hidden="true"></i>}{ac.libelle}</button>)}
                </span>}
              </span>
              :<button type="button" className="sdcd-datatable__bouton" aria-label="Modifier la ligne" title="Modifier" onClick={()=>commencer(r)}>
                <i className="ri-pencil-line" aria-hidden="true"></i></button>}
            </td>}
          </tr>;})}
        {!chargement&&vue.length===0&&<tr><td colSpan={nbCols} className="sdcd-datatable__vide">
          <i className="sdcd-datatable__vide-icone ri-search-off-line" aria-hidden="true"></i>
          <div className="sdcd-datatable__vide-titre">{videTitre}</div>
          <div className="sdcd-datatable__vide-texte">{videTexte}</div>
          <button type="button" className="sdcd-datatable__outil" onClick={()=>{setQ('');setPage(1);onReinit&&onReinit();}}>Réinitialiser les filtres</button>
        </td></tr>}
      </tbody>
    </table>
    </div>
    <div className="sdcd-datatable__pied">
      <span className="sdcd-datatable__compte" aria-live="polite">{chargement?'Chargement…':triees.length+' résultat'+(triees.length>1?'s':'')}</span>
      <div className="sdcd-datatable__pagination">
        <button type="button" className="sdcd-datatable__bouton" aria-label="Page précédente" disabled={p<=1} onClick={()=>setPage(p-1)}>
          <i className="ri-arrow-left-s-line" aria-hidden="true"></i></button>
        <span className="sdcd-datatable__page">{p} / {nbPages}</span>
        <button type="button" className="sdcd-datatable__bouton" aria-label="Page suivante" disabled={p>=nbPages} onClick={()=>setPage(p+1)}>
          <i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>;
}
