import React from 'react';
export function Gallery({items=[], colonnes=3, className='', style}) {
  const [zoom,setZoom]=React.useState(-1);
  return <div className={['sdcd-gallery',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-gallery__grille sdcd-grid" style={{'--sdcd-cols':'repeat('+colonnes+',1fr)','--sdcd-gap':'var(--sdcd-3)'}}>
      {items.map((it,i)=><figure key={i} className="sdcd-gallery__figure">
        <button type="button" className="sdcd-gallery__vignette" aria-label={'Agrandir : '+(it.legende||'image '+(i+1))} onClick={()=>setZoom(i)}>
          {it.contenu}
        </button>
        {it.legende&&<figcaption className="sdcd-gallery__legende">{it.legende}</figcaption>}
      </figure>)}
    </div>
    {zoom>-1&&<div role="dialog" aria-label="Visionneuse" className="sdcd-gallery__visionneuse" onClick={()=>setZoom(-1)}>
      <div className="sdcd-gallery__scene" onClick={e=>e.stopPropagation()}>{items[zoom]&&items[zoom].contenu}</div>
      <div className="sdcd-gallery__commandes">
        <button type="button" className="sdcd-gallery__commande" aria-label="Précédente"
          onClick={e=>{e.stopPropagation();setZoom((zoom-1+items.length)%items.length);}}>
          <i className="ri-arrow-left-s-line" aria-hidden="true"></i></button>
        <span className="sdcd-gallery__position">{(items[zoom]&&items[zoom].legende)||''} — {zoom+1}/{items.length}</span>
        <button type="button" className="sdcd-gallery__commande" aria-label="Suivante"
          onClick={e=>{e.stopPropagation();setZoom((zoom+1)%items.length);}}>
          <i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
        <button type="button" className="sdcd-gallery__commande sdcd-gallery__commande--fermer" aria-label="Fermer" onClick={()=>setZoom(-1)}>
          <i className="ri-close-line" aria-hidden="true"></i></button>
      </div>
    </div>}
  </div>;
}
