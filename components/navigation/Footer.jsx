import React from 'react';
const LANGUES_PIED=[['Français','fr'],['English','en'],['Lingala','ln'],['Kiswahili','sw'],['Kikongo','kg'],['Tshiluba','lua']];
export function Footer({entite, description, colonnes=[], liensInstitutionnels, legal, assetsBase='', className='', style}) {
  const h=React.createElement;
  // Les colonnes de liens représentent la moitié de la hauteur du pied de page sur
  // mobile. On les replie sous 640 px. Le rendu par défaut est « déplié » : sans
  // JavaScript, le pied de page reste complet et indexable.
  const [compact,setCompact]=React.useState(false);
  React.useEffect(()=>{
    if(!window.matchMedia)return;
    const mq=window.matchMedia('(max-width: 640px)');
    const maj=()=>setCompact(mq.matches);
    maj();
    mq.addEventListener('change',maj);
    return ()=>mq.removeEventListener('change',maj);
  },[]);
  const inst = liensInstitutionnels || [['gouv.cd','https://gouv.cd'],['presidence.gouv.cd','#'],['primature.gouv.cd','#'],['journal-officiel.gouv.cd','#'],['donnees.gouv.cd','#']];
  const leg = legal || ['Plan du site','Accessibilité : partiellement conforme','Mentions légales','Données personnelles','Gestion des cookies'];
  const tricolore=(cls)=>h('div',{className:cls,'aria-hidden':'true'},
    h('div',{className:'sdcd-filet-tricolore__bande--bleu'}),
    h('div',{className:'sdcd-filet-tricolore__bande--jaune'}),
    h('div',{className:'sdcd-filet-tricolore__bande--rouge'}));
  return h('footer',{role:'contentinfo',className:['sdcd-footer',className].filter(Boolean).join(' '),style},
    tricolore('sdcd-filet-tricolore'),
    h('div',{className:'sdcd-footer__haut'},
      h('div',null,
        h('div',{className:'sdcd-footer__marque'},
          h('img',{className:'sdcd-footer__armoiries',src:assetsBase+'assets/armoiries-rdc.png',alt:'Armoiries de la République Démocratique du Congo'}),
          h('div',null,
            h('div',{className:'sdcd-footer__republique'},'République Démocratique',h('br'),'du Congo'),
            h('div',{className:'sdcd-footer__devise'},'Justice · Paix · Travail'))),
        entite&&h('div',{className:'sdcd-footer__entite'},entite),
        h('p',{className:'sdcd-footer__description'},
          description||'Le site officiel d’information et de services de l’administration congolaise. Tous les sites de l’État portent la marque d’État et le domaine .gouv.cd.'),
        h('div',{className:'sdcd-footer__institutions'},
          inst.map((l,i)=>h('a',{key:i,className:'sdcd-footer__institution',href:l[1]},
            l[0],h('i',{className:'ri-external-link-line','aria-hidden':'true'}))))),
      h('div',{className:'sdcd-footer__colonnes sdcd-grid'},
        colonnes.map((c,i)=>h('details',{key:i+'-'+(compact?'c':'d'),className:'sdcd-footer__groupe',open:!compact},
          h('summary',{className:'sdcd-eyebrow sdcd-footer__colonne-titre'},c.titre),
          h('ul',{className:'sdcd-footer__liste'},
            c.liens.map((l,j)=>h('li',{key:j},h('a',{className:'sdcd-footer__lien',href:'#'},l)))))))),
    h('div',{className:'sdcd-footer__bande'},
      h('div',{className:'sdcd-footer__bande-corps'},
        h('span',{className:'sdcd-footer__langues-label'},'Langues :'),
        LANGUES_PIED.map((l,i)=>h('a',{key:i,href:'#',lang:l[1],
          className:'sdcd-footer__langue'+(i===0?' sdcd-footer__langue--active':'')},l[0])))),
    h('div',{className:'sdcd-footer__bande'},
      h('div',{className:'sdcd-footer__bande-corps'},
        leg.map((l,i)=>h('a',{key:i,className:'sdcd-footer__legal',href:'#'},l)),
        tricolore('sdcd-footer__drapeau'))),
    h('div',{className:'sdcd-footer__licence'},
      h('div',{className:'sdcd-footer__licence-corps'},
        'Sauf mention contraire, tous les contenus de ce site sont sous ',
        h('a',{href:'#'},'licence ouverte de l’État congolais'),'.')));
}
