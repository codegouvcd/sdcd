import React from 'react';
export const CH_COULEURS=['var(--sdcd-chart-1)','var(--sdcd-chart-2)','var(--sdcd-chart-3)','var(--sdcd-chart-4)','var(--sdcd-chart-5)','var(--sdcd-chart-6)'];
export function fmtFR(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
export function ChartShell({titre,source,children,tableau,className='',style}){
  const [tbl,setTbl]=React.useState(false);
  return React.createElement('figure',{className:['sdcd-chart',className].filter(Boolean).join(' '),style},
    React.createElement('div',{className:'sdcd-chart__entete'},
      React.createElement('figcaption',{className:'sdcd-chart__titre'},titre),
      React.createElement('button',{type:'button',className:'sdcd-chart__bascule',onClick:()=>setTbl(!tbl),'aria-pressed':tbl},
        React.createElement('i',{className:tbl?'ri-bar-chart-2-line':'ri-table-line','aria-hidden':'true'}),tbl?'Graphique':'Tableau')),
    React.createElement('div',{className:'sdcd-chart__corps'},tbl?tableau:children),
    source&&React.createElement('div',{className:'sdcd-chart__source'},'Source : ',source));
}
export function ChartLegend({series}){
  return React.createElement('div',{className:'sdcd-chart__legende'},
    series.map((s,i)=>React.createElement('span',{key:i,className:'sdcd-chart__legende-item'},
      React.createElement('span',{className:'sdcd-chart__pastille','aria-hidden':'true',
        style:{background:s.couleur||CH_COULEURS[i%6]}}),s.nom)));
}
export function ChartTable({categories,series,unite}){
  return React.createElement('table',{className:'sdcd-chart__tableau'},
    React.createElement('thead',null,React.createElement('tr',null,
      React.createElement('th',{scope:'col'},''),
      series.map((s,i)=>React.createElement('th',{key:i,scope:'col',className:'sdcd-chart__cellule--nombre'},s.nom+(unite?' ('+unite+')':''))))),
    React.createElement('tbody',null,categories.map((c,r)=>React.createElement('tr',{key:r},
      React.createElement('th',{scope:'row'},c),
      series.map((s,i)=>React.createElement('td',{key:i,className:'sdcd-chart__cellule--nombre'},fmtFR(s.valeurs[r])))))));
}
export function BarChart({titre, source, categories=[], series=[], unite, hauteur=260, className='', style}) {
  const max=Math.max(...series.flatMap(s=>s.valeurs),1);
  const W=640,H=hauteur,PL=52,PB=26,PT=8;
  const iw=W-PL-10,ih=H-PB-PT;
  const gw=iw/categories.length;
  const bw=Math.min(34,(gw*0.66)/series.length);
  const ticks=[0,.25,.5,.75,1].map(t=>Math.round(max*t));
  return React.createElement(ChartShell,{titre,source,className,style,tableau:React.createElement(ChartTable,{categories,series,unite})},
    React.createElement(ChartLegend,{series}),
    React.createElement('svg',{className:'sdcd-chart__svg',viewBox:'0 0 '+W+' '+H,role:'img','aria-label':titre},
      ticks.map((t,i)=>{const y=PT+ih-(t/max)*ih;
        return React.createElement('g',{key:i},
          React.createElement('line',{className:'sdcd-chart__grille',x1:PL,x2:W-10,y1:y,y2:y,strokeWidth:1,strokeDasharray:i===0?'none':'3 4'}),
          React.createElement('text',{className:'sdcd-chart__graduation',x:PL-8,y:y+4,textAnchor:'end'},fmtFR(t)));}),
      categories.map((c,ci)=>{
        const x0=PL+ci*gw+(gw-bw*series.length)/2;
        return React.createElement('g',{key:ci},
          series.map((s,si)=>{const h=(s.valeurs[ci]/max)*ih;
            return React.createElement('rect',{key:si,x:x0+si*bw,y:PT+ih-h,width:bw-3,height:h,fill:s.couleur||CH_COULEURS[si%6]});}),
          React.createElement('text',{className:'sdcd-chart__categorie',x:PL+ci*gw+gw/2,y:H-8,textAnchor:'middle'},c));})));
}
