import React from 'react';
export function Tabs({onglets=[], actif, onChange, children, className='', style}) {
  const [i,setI]=React.useState(0);
  const cur=actif!==undefined?actif:i;
  const set=(n)=>{if(actif===undefined)setI(n);onChange&&onChange(n);};
  const panes=React.Children.toArray(children);
  return <div className={['sdcd-tabs',className].filter(Boolean).join(' ')} style={style}>
    <div role="tablist" className="sdcd-tabs__liste">
      {onglets.map((o,n)=><button key={n} type="button" role="tab" className="sdcd-tabs__onglet" aria-selected={cur===n} onClick={()=>set(n)}>{o}</button>)}
    </div>
    <div role="tabpanel" className="sdcd-tabs__panneau">{panes[cur]}</div>
  </div>;
}
