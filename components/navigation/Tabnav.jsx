import React from 'react';
export function Tabnav({onglets=[], actif=0, onChange, className='', style}) {
  const piste=React.useRef(null);
  const [pos,setPos]=React.useState({debut:true,fin:true});
  const mesurer=()=>{const el=piste.current;if(!el)return;
    const marge=2,depasse=el.scrollWidth>el.clientWidth+marge;
    setPos({debut:!depasse||el.scrollLeft<=marge,fin:!depasse||el.scrollLeft+el.clientWidth>=el.scrollWidth-marge});};
  React.useEffect(()=>{mesurer();
    const el=piste.current;if(!el)return;
    el.addEventListener('scroll',mesurer,{passive:true});
    window.addEventListener('resize',mesurer);
    return ()=>{el.removeEventListener('scroll',mesurer);window.removeEventListener('resize',mesurer);};},[onglets.length]);
  const glisser=(sens)=>{const el=piste.current;if(!el)return;el.scrollBy({left:sens*Math.round(el.clientWidth*0.7),behavior:'smooth'});};
  return <div className={['sdcd-tabnav',className].filter(Boolean).join(' ')} style={style}>
    <div ref={piste} className="sdcd-scroll-x" data-discret data-debut={pos.debut?'true':'false'} data-fin={pos.fin?'true':'false'}>
      <nav aria-label="Navigation tertiaire" className="sdcd-tabnav__piste"
        style={{paddingLeft:pos.debut?0:28,paddingRight:pos.fin?0:28}}>
        {onglets.map((o,i)=><a key={i} className="sdcd-tabnav__lien" href="#" aria-current={i===actif?'page':undefined}
          onClick={e=>{e.preventDefault();onChange&&onChange(i);}}>{o}</a>)}
      </nav>
    </div>
    {!pos.debut&&<button type="button" className="sdcd-tabnav__fleche sdcd-tabnav__fleche--gauche" aria-label="Faire défiler vers la gauche" onClick={()=>glisser(-1)}>
      <i className="ri-arrow-left-s-line" aria-hidden="true"></i></button>}
    {!pos.fin&&<button type="button" className="sdcd-tabnav__fleche sdcd-tabnav__fleche--droite" aria-label="Faire défiler vers la droite" onClick={()=>glisser(1)}>
      <i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>}
  </div>;
}
