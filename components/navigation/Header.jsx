import React from 'react';
import {LangMenu} from './LangMenu.jsx';
import {ConnectButton} from '../brand/ConnectButton.jsx';
export function Header({entite, sousTitre, nav=[], actif=0, onNav, connexion=true, assetsBase='', lang='FR', onLang, className='', style}) {
  const [ouvert,setOuvert]=React.useState(false);
  const h=React.createElement;
  const lienNav=(n,i)=>h('a',{key:i,className:'sdcd-header__lien',href:'#','aria-current':i===actif?'page':undefined,
    onClick:e=>{e.preventDefault();setOuvert(false);onNav&&onNav(i);}},n);
  return h('div',{className:['sdcd-header',className].filter(Boolean).join(' '),style},
    h('div',{className:'sdcd-filet-tricolore','aria-hidden':'true'},
      h('div',{className:'sdcd-filet-tricolore__bande--bleu'}),
      h('div',{className:'sdcd-filet-tricolore__bande--jaune'}),
      h('div',{className:'sdcd-filet-tricolore__bande--rouge'})),
    h('div',{className:'sdcd-header__bandeau'},
      h('div',{className:'sdcd-header__bandeau-corps'},
        h('i',{className:'sdcd-header__bandeau-icone ri-government-line','aria-hidden':'true'}),
        h('span',{className:'sdcd-header__bandeau-mention'},'Site officiel de la République Démocratique du Congo'),
        h('span',{className:'sdcd-header__bandeau-domaine sdcd-sm-hide'},'— vérifiez que l’adresse se termine par .gouv.cd'))),
    h('header',{className:'sdcd-header__principal'},
      h('div',{className:'sdcd-header__corps'},
        h('img',{className:'sdcd-header__armoiries',src:assetsBase+'assets/armoiries-rdc.png',alt:'Armoiries de la République Démocratique du Congo'}),
        h('div',null,
          h('div',{className:'sdcd-header__republique'},'République Démocratique',h('br'),'du Congo'),
          h('div',{className:'sdcd-header__devise'},'Justice · Paix · Travail')),
        entite&&h('div',{className:'sdcd-header__filet sdcd-sm-hide','aria-hidden':'true'}),
        entite&&h('div',{className:'sdcd-header__entite-bloc'},
          h('div',{className:'sdcd-header__entite'},entite),
          sousTitre&&h('div',{className:'sdcd-header__sous-titre'},sousTitre)),
        h('div',{className:'sdcd-header__actions'},
          h(LangMenu,{value:lang,onChange:onLang}),
          connexion&&h(ConnectButton,{compact:true,assetsBase}),
          nav.length>0&&h('button',{type:'button',className:'sdcd-header__menu sdcd-mobile-only','aria-expanded':ouvert,'aria-controls':'sdcd-nav-mobile',
            onClick:()=>setOuvert(!ouvert)},
            h('i',{className:ouvert?'ri-close-line':'ri-menu-line','aria-hidden':'true'}),
            ouvert?'Fermer':'Menu'))),
      nav.length>0&&h('nav',{className:'sdcd-header__nav sdcd-desktop-only','aria-label':'Menu principal'},nav.map(lienNav)),
      nav.length>0&&ouvert&&h('nav',{id:'sdcd-nav-mobile',className:'sdcd-header__nav sdcd-header__nav--mobile sdcd-mobile-only','aria-label':'Menu principal'},
        nav.map(lienNav))));
}
