import React from 'react';
import {ChartShell,ChartLegend,ChartTable,CH_COULEURS,fmtFR} from './BarChart.jsx';
export function LineChart({titre, source, categories=[], series=[], unite, hauteur=260, className='', style}) {
  const max=Math.max(...series.flatMap(s=>s.valeurs),1);
  const W=640,H=hauteur,PL=52,PB=26,PT=8;
  const iw=W-PL-14,ih=H-PB-PT;
  const px=(i)=>PL+(categories.length<2?iw/2:i*(iw/(categories.length-1)));
  const py=(v)=>PT+ih-(v/max)*ih;
  const ticks=[0,.25,.5,.75,1].map(t=>Math.round(max*t));
  return React.createElement(ChartShell,{titre,source,className,style,tableau:React.createElement(ChartTable,{categories,series,unite})},
    React.createElement(ChartLegend,{series}),
    React.createElement('svg',{className:'sdcd-chart__svg',viewBox:'0 0 '+W+' '+H,role:'img','aria-label':titre},
      ticks.map((t,i)=>{const y=py(t);
        return React.createElement('g',{key:i},
          React.createElement('line',{className:'sdcd-chart__grille',x1:PL,x2:W-14,y1:y,y2:y,strokeWidth:1,strokeDasharray:i===0?'none':'3 4'}),
          React.createElement('text',{className:'sdcd-chart__graduation',x:PL-8,y:y+4,textAnchor:'end'},fmtFR(t)));}),
      series.map((s,si)=>{const col=s.couleur||CH_COULEURS[si%6];
        return React.createElement('g',{key:si},
          React.createElement('polyline',{points:s.valeurs.map((v,i)=>px(i)+','+py(v)).join(' '),fill:'none',stroke:col,strokeWidth:2.5,strokeLinejoin:'round'}),
          s.valeurs.map((v,i)=>React.createElement('circle',{key:i,cx:px(i),cy:py(v),r:3.5,fill:'var(--sdcd-fond)',stroke:col,strokeWidth:2})));}),
      categories.map((c,i)=>React.createElement('text',{className:'sdcd-chart__categorie',key:i,x:px(i),y:H-8,textAnchor:'middle'},c))));
}
