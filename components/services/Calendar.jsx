import React from 'react';
const MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const JOURS=['lu','ma','me','je','ve','sa','di'];
export function Calendar({annee=2026, mois=7, selection, evenements=[], onSelect, className='', style}) {
  const [m,setM]=React.useState(mois),[a,setA]=React.useState(annee),[sel,setSel]=React.useState(selection||null);
  const nav=(d)=>{let nm=m+d,na=a;if(nm<0){nm=11;na--;}if(nm>11){nm=0;na++;}setM(nm);setA(na);};
  const first=(new Date(a,m,1).getDay()+6)%7;
  const nb=new Date(a,m+1,0).getDate();
  const cells=[...Array(first).fill(null),...Array.from({length:nb},(_,i)=>i+1)];
  return <div className={['sdcd-calendar',className].filter(Boolean).join(' ')} style={style}>
    <div className="sdcd-calendar__entete">
      <button type="button" className="sdcd-calendar__nav" aria-label="Mois précédent" onClick={()=>nav(-1)}>
        <i className="ri-arrow-left-s-line" aria-hidden="true"></i></button>
      <span className="sdcd-calendar__mois">{MOIS[m]} {a}</span>
      <button type="button" className="sdcd-calendar__nav" aria-label="Mois suivant" onClick={()=>nav(1)}>
        <i className="ri-arrow-right-s-line" aria-hidden="true"></i></button>
    </div>
    <div className="sdcd-calendar__grille sdcd-grid" style={{'--sdcd-cols':'repeat(7,minmax(0,1fr))','--sdcd-cols-sm':'repeat(7,minmax(0,1fr))','--sdcd-gap':'2px'}}>
      {JOURS.map(j=><div key={j} className="sdcd-calendar__jour-nom">{j}</div>)}
      {cells.map((d,i)=>{
        if(d===null)return <div key={'v'+i}></div>;
        return <button key={i} type="button" className="sdcd-calendar__jour" aria-pressed={sel===d}
          onClick={()=>{setSel(d);onSelect&&onSelect(new Date(a,m,d));}}>
          {d}{evenements.includes(d)&&<span className="sdcd-calendar__evenement" aria-label="événement"></span>}
        </button>;})}
    </div>
  </div>;
}
