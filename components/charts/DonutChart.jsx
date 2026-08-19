import React from 'react';
import {ChartShell,CH_COULEURS,fmtFR} from './BarChart.jsx';
export function DonutChart({titre, source, donnees=[], unite, centre, className='', style}) {
  const total=donnees.reduce((a,d)=>a+d.valeur,0)||1;
  const R=80,C=2*Math.PI*R;
  let acc=0;
  const tableau=React.createElement('table',{className:'sdcd-chart__tableau'},
    React.createElement('thead',null,React.createElement('tr',null,
      React.createElement('th',{scope:'col'},'Catégorie'),
      React.createElement('th',{scope:'col',className:'sdcd-chart__cellule--nombre'},'Valeur'+(unite?' ('+unite+')':'')),
      React.createElement('th',{scope:'col',className:'sdcd-chart__cellule--nombre'},'Part'))),
    React.createElement('tbody',null,donnees.map((d,i)=>React.createElement('tr',{key:i},
      React.createElement('th',{scope:'row'},d.nom),
      React.createElement('td',{className:'sdcd-chart__cellule--nombre'},fmtFR(d.valeur)),
      React.createElement('td',{className:'sdcd-chart__cellule--nombre'},Math.round(d.valeur/total*100)+' %')))));
  return React.createElement(ChartShell,{titre,source,tableau,className,style},
    React.createElement('div',{className:'sdcd-donutchart'},
      React.createElement('svg',{className:'sdcd-donutchart__anneau',viewBox:'0 0 200 200',role:'img','aria-label':titre},
        donnees.map((d,i)=>{const frac=d.valeur/total;const dash=frac*C;const off=-acc*C;acc+=frac;
          return React.createElement('circle',{key:i,cx:100,cy:100,r:R,fill:'none',stroke:d.couleur||CH_COULEURS[i%6],strokeWidth:30,
            strokeDasharray:dash+' '+(C-dash),strokeDashoffset:off,transform:'rotate(-90 100 100)'});}),
        React.createElement('text',{className:'sdcd-donutchart__total',x:100,y:96,textAnchor:'middle'},centre||fmtFR(total)),
        React.createElement('text',{className:'sdcd-donutchart__unite',x:100,y:116,textAnchor:'middle'},unite||'total')),
      React.createElement('div',{className:'sdcd-donutchart__legende'},
        donnees.map((d,i)=>React.createElement('div',{key:i,className:'sdcd-donutchart__item'},
          React.createElement('span',{className:'sdcd-chart__pastille','aria-hidden':'true',style:{background:d.couleur||CH_COULEURS[i%6]}}),
          React.createElement('span',{className:'sdcd-donutchart__nom'},d.nom),
          React.createElement('span',{className:'sdcd-donutchart__part'},Math.round(d.valeur/total*100)+' %'))))));
}
