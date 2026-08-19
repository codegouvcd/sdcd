import React from 'react';
export function Carousel({children, legende=[], className='', style}) {
  const slides=React.Children.toArray(children);
  const [i,setI]=React.useState(0);
  const go=(n)=>setI((n+slides.length)%slides.length);
  return <div className={['sdcd-carousel',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-carousel__cadre">
      <div className="sdcd-carousel__piste" style={{'--sdcd-carousel-index':i}}>
        {slides.map((s,n)=><div key={n} className="sdcd-carousel__diapo">{s}</div>)}
      </div>
      <button type="button" className="sdcd-carousel__fleche sdcd-carousel__fleche--precedent" aria-label="Précédent" onClick={()=>go(i-1)}>
        <i className="ri-arrow-left-s-line" aria-hidden="true"></i></button>
      <button type="button" className="sdcd-carousel__fleche sdcd-carousel__fleche--suivant" aria-label="Suivant" onClick={()=>go(i+1)}>
        <i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
    </div>
    <div className="sdcd-carousel__pied">
      <span className="sdcd-carousel__compteur">{i+1} / {slides.length}</span>
      {legende[i]&&<span className="sdcd-carousel__legende">{legende[i]}</span>}
      <div className="sdcd-carousel__puces">
        {slides.map((_,n)=><button key={n} type="button" className="sdcd-carousel__puce" aria-current={n===i?'true':undefined}
          aria-label={'Aller à la diapositive '+(n+1)} onClick={()=>setI(n)}></button>)}
      </div>
    </div>
  </div>;
}
