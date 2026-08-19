(window.__sdcdReady||Promise.resolve()).then(()=>{
const NS = window[Object.keys(window).find(k=>/_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button)]||{};
const {Button,IconButton,SearchBar,Badge,Alert,Loader,Breadcrumb,Table,LangMenu,Footer,Input,Card,Tile,Tag,Upload,Callout,Sidemenu,Stepper,Modal,Tooltip,CookieConsent,Follow,Rdv,Tracking,BarChart,Wizard,DataTable} = NS;
const MENU=[
  ["Fondamentaux",["Couleurs","Typographie","Espacement","Grille et mise en page","Iconographie"]],
  ["Composants",["Bouton","Champ de saisie","Barre de recherche","Téléversement","Alerte","Badge","Tag","Carte","Tuile","Tableau","Graphiques","Modale","Infobulle","Mise en avant","Menu latéral","Indicateur d’étapes","Consentement cookies","Lettre d’information","Prise de rendez-vous","Suivi de dossier","Assistant (wizard)","Tableau avancé","En-tête","Pied de page","Chargement"]],
  ["Modèles",["Portail national","Site de ministère","Modèles de pages (18 démos)","Courriels officiels (3 modèles)"]],
  ["Principes",["Accessibilité","Mobile et responsive","Multilinguisme","Écriture et ton","Mode sombre"]],
  ["Marque d’État",["Bloc-marque","Armoiries","Filet tricolore","Déclinaison par entité","Usages interdits"]]];
function MegaMenu({onGo}){
  const [open,setOpen]=React.useState(-1);
  return <nav onMouseLeave={()=>setOpen(-1)} style={{position:'relative',borderBottom:'1px solid var(--sdcd-ligne)',background:'var(--sdcd-fond)'}}>
    <div className="sdcd-scroll-x" data-discret style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'0 var(--sdcd-gouttiere)',display:'flex',gap:8}}>
      {MENU.map((m,i)=><button key={i} onMouseEnter={()=>setOpen(i)} onClick={()=>setOpen(open===i?-1:i)}
        style={{background:open===i?'var(--sdcd-bleu-pale)':'none',border:'none',borderBottom:'2px solid '+(open===i?'var(--sdcd-action)':'transparent'),padding:'12px 14px',fontFamily:'inherit',fontSize:'var(--sdcd-sm)',fontWeight:600,color:open===i?'var(--sdcd-action)':'var(--sdcd-encre-2)',cursor:'pointer'}}>
        {m[0]} <i className="ri-arrow-down-s-line" style={{fontSize:13,verticalAlign:'-1px'}}></i></button>)}
    </div>
    {open>-1&&<div style={{position:'absolute',left:0,right:0,top:'100%',background:'var(--sdcd-fond)',borderBottom:'1px solid var(--sdcd-ligne)',boxShadow:'var(--sdcd-ombre)',zIndex:40}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(20px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:'8px 24px'}}>
        {MENU[open][1].map((s,j)=><a key={j} href="#" onClick={e=>{e.preventDefault();setOpen(-1);onGo(MENU[open][0],s);}}
          style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-encre-2)',textDecoration:'none',padding:'6px 0'}}>{s}</a>)}
      </div></div>}
  </nav>;
}
function DocHeader({dark,setDark,onHome}){
  return <div>
    <div style={{display:'flex',height:4}}><div style={{flex:1,background:'#0095C9'}}></div><div style={{flex:1,background:'#FFF24B'}}></div><div style={{flex:1,background:'#DB3832'}}></div></div>
    <header style={{background:'var(--sdcd-fond)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(12px,7vw) var(--sdcd-gouttiere)',display:'flex',alignItems:'center',gap:'12px 16px',flexWrap:'wrap'}}>
        <a href="#" onClick={e=>{e.preventDefault();onHome();}} style={{display:'flex',alignItems:'center',gap:14,textDecoration:'none'}}>
          <img src="../../assets/armoiries-rdc.png" alt="Armoiries de la RDC" style={{height:44}}/>
          <div>
            <div style={{fontWeight:700,fontSize:15,color:'var(--sdcd-texte)'}}>SDCD</div>
            <div style={{fontSize:11,color:'var(--sdcd-muet)'}}>Système de design RDC</div>
          </div>
        </a>
        <Badge ton="info" style={{marginLeft:4}}>v1.0</Badge>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          <LangMenu/>
          <IconButton icon={dark?'ri-sun-line':'ri-moon-line'} label="Basculer le thème" variant="tertiaire" onClick={()=>setDark(!dark)}/>
          <Button size="sm" variant="secondaire" icon="ri-github-line">Code source</Button>
        </div>
      </div>
    </header>
  </div>;
}
function Home({onGo}){
  return <div>
    <div style={{background:'var(--sdcd-bleu-pale)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(56px,7vw) var(--sdcd-gouttiere)'}}>
        <div className="sdcd-eyebrow" style={{marginBottom:10}}>République Démocratique du Congo</div>
        <h1 style={{fontSize:'var(--sdcd-display)',lineHeight:1.15,margin:'0 0 14px',maxWidth:760}}>Un système de design pour tous les sites officiels de l’État</h1>
        <p style={{fontSize:'1.0625rem',color:'var(--sdcd-muet)',maxWidth:640,margin:'0 0 24px'}}>Le SDCD garantit aux usagers une identité numérique universelle, officielle et juridique : mêmes couleurs, même marque d’État, mêmes composants — de gouv.cd au site de votre commune.</p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <Button iconRight="ri-arrow-right-line" onClick={()=>onGo('Fondamentaux','Couleurs')}>Commencer</Button>
          <Button variant="secondaire" onClick={()=>onGo('Composants','Bouton')}>Voir les composants</Button>
        </div>
      </div>
    </div>
    <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16}}>
      {[['ri-palette-line','Fondamentaux','Couleurs du drapeau, typographie, espacement : les décisions déjà prises pour vous.'],
        ['ri-layout-grid-line','Composants','Des briques accessibles et testées, du bouton à l’en-tête officiel.'],
        ['ri-government-line','Marque d’État','Armoiries, devise et filet tricolore : la garantie d’un site authentique.']].map((c,i)=>
        <a key={i} href="#" onClick={e=>{e.preventDefault();onGo(c[1]==='Marque d’État'?'Marque d’État':c[1],c[1]==='Composants'?'Bouton':c[1]==='Fondamentaux'?'Couleurs':'Bloc-marque');}}
          style={{border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',padding:24,textDecoration:'none',background:'var(--sdcd-fond)'}}>
          <i className={c[0]} style={{fontSize:28,color:'var(--sdcd-action)'}}></i>
          <div style={{fontWeight:700,fontSize:'var(--sdcd-h4)',color:'var(--sdcd-texte)',margin:'12px 0 6px'}}>{c[1]}</div>
          <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',lineHeight:1.55}}>{c[2]}</div>
        </a>)}
    </div>
    <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'0 24px 48px'}}>
      <Alert type="info" titre="Le SDCD est obligatoire pour les sites en .gouv.cd">Les entités publiques déclinent la marque d’État sans la modifier. Toute question : sdcd@numerique.gouv.cd</Alert>
    </div>
  </div>;
}

function Swatch({c,n,v}){return <div><div style={{height:64,background:c,border:'1px solid var(--sdcd-ligne)'}}></div>
  <div style={{fontSize:12,fontWeight:600,marginTop:6}}>{n}</div>
  <div style={{fontSize:11,color:'var(--sdcd-muet)',fontFamily:'var(--sdcd-font-mono)'}}>{v}</div></div>;}
function PageFondamentaux({sujet}){
  let corps=null;
  if(sujet==='Couleurs')corps=<div style={{display:'flex',flexDirection:'column',gap:'clamp(15px,3.5vw,28px)'}}>
    <div><div className="sdcd-eyebrow" style={{marginBottom:12}}>Drapeau — palette officielle</div>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:14}}><Swatch c="#0095C9" n="Bleu d’État" v="--sdcd-bleu"/><Swatch c="#FFF24B" n="Jaune" v="--sdcd-jaune"/><Swatch c="#DB3832" n="Rouge" v="--sdcd-rouge"/></div></div>
    <div><div className="sdcd-eyebrow" style={{marginBottom:12}}>Échelle d’interaction</div>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(5,minmax(0,1fr))','--sdcd-cols-lg':'repeat(3,minmax(0,1fr))','--sdcd-cols-md':'repeat(3,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:14}}><Swatch c="var(--sdcd-bleu-pale)" n="Pâle" v="--sdcd-bleu-pale"/><Swatch c="var(--sdcd-bleu-teinte)" n="Teinte" v="--sdcd-bleu-teinte"/><Swatch c="#0095C9" n="Action" v="--sdcd-action"/><Swatch c="#00789F" n="Survol" v="--sdcd-action-survol"/><Swatch c="#005D7C" n="Appui" v="--sdcd-action-appui"/></div></div>
    <div><div className="sdcd-eyebrow" style={{marginBottom:12}}>Sémantique</div>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:14}}><Swatch c="var(--sdcd-succes)" n="Succès" v="--sdcd-succes"/><Swatch c="var(--sdcd-info)" n="Info" v="--sdcd-info"/><Swatch c="var(--sdcd-alerte)" n="Alerte" v="--sdcd-alerte"/><Swatch c="var(--sdcd-erreur)" n="Erreur" v="--sdcd-erreur"/></div></div>
    <Alert type="info" titre="Règle d’usage">Le bleu porte toutes les interactions. Le jaune et le rouge sont réservés au filet tricolore, aux états d’alerte et d’erreur — jamais décoratifs.</Alert>
  </div>;
  else if(sujet==='Typographie')corps=<div style={{display:'flex',flexDirection:'column',gap:18}}>
    <div style={{fontSize:'var(--sdcd-display)',fontWeight:700,letterSpacing:'var(--sdcd-tracking-titre)',lineHeight:1.1}}>Schibsted Grotesk</div>
    <p style={{color:'var(--sdcd-muet)',maxWidth:560,margin:0}}>Grotesque contemporaine à fort caractère, libre de droits — en attendant la commande d’une fonte d’État exclusive. Une seule variable à changer : <code>--sdcd-font</code>.</p>
    <div style={{borderTop:'1px solid var(--sdcd-ligne)'}}>
      {[["Display","3rem / 700 / −0,022 em"],["Titre 1","2.25rem / 700"],["Titre 2","1.75rem / 700"],["Titre 3","1.375rem / 700"],["Corps","1rem / 400 / interlignage 1,5"],["Secondaire",".875rem"],["Mention",".75rem"]].map((t,i)=>
        <div key={i} className="sdcd-grid" style={{'--sdcd-cols':'200px minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:24,alignItems:'baseline',padding:'12px 0',borderBottom:'1px solid var(--sdcd-ligne)'}}>
          <span style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontFamily:'var(--sdcd-font-mono)'}}>{t[1]}</span>
          <span style={{fontSize:['3rem','2.25rem','1.75rem','1.375rem','1rem','.875rem','.75rem'][i],fontWeight:i<4?700:400,letterSpacing:i<4?'-0.022em':'0',lineHeight:1.2}}>{t[0]} — Justice · Paix · Travail</span>
        </div>)}
    </div>
    <div style={{fontFamily:'var(--sdcd-font-mono)',fontSize:15}}>Spline Sans Mono — références légales, numéros de dossier : <strong>CD-2026-084517</strong></div>
  </div>;
  else if(sujet==='Espacement')corps=<div style={{display:'flex',flexDirection:'column',gap:24}}>
    <div style={{display:'flex',alignItems:'flex-end',gap:18}}>
      {[4,8,12,16,24,32,40,64].map((v,i)=><div key={v} style={{textAlign:'center'}}>
        <div style={{width:v,height:v,background:'var(--sdcd-bleu-teinte)',border:'1px solid var(--sdcd-bleu)'}}></div>
        <div style={{fontSize:11,color:'var(--sdcd-muet)',marginTop:6,fontFamily:'var(--sdcd-font-mono)'}}>--sdcd-{i+1}<br/>{v}px</div></div>)}
    </div>
    <Alert type="info" titre="Angles droits">Rayon 0 sur contrôles et cartes — la signature géométrique du système. Seuls les badges et tags sont en pilule.</Alert>
  </div>;
  else if(sujet==='Iconographie')corps=<div>
    <p style={{color:'var(--sdcd-muet)',maxWidth:560}}>Remix Icon, trait fin (« -line ») par défaut, version pleine réservée à l’état actif. Jamais d’emoji ni de SVG dessiné à la main.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(8,minmax(0,1fr))','--sdcd-cols-lg':'repeat(3,minmax(0,1fr))','--sdcd-cols-md':'repeat(4,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:10,maxWidth:720,marginTop:18}}>
      {['ri-government-line','ri-file-text-line','ri-search-line','ri-user-line','ri-global-line','ri-building-line','ri-scales-3-line','ri-newspaper-line','ri-passport-line','ri-fingerprint-line','ri-calendar-line','ri-bank-card-line','ri-arrow-right-line','ri-external-link-line','ri-download-line','ri-printer-line','ri-checkbox-circle-line','ri-error-warning-line','ri-information-line','ri-alert-line','ri-menu-line','ri-close-line','ri-moon-line','ri-phone-line'].map(ic=>
        <div key={ic} style={{border:'1px solid var(--sdcd-ligne)',padding:'14px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
          <i className={ic} style={{fontSize:21,color:'var(--sdcd-encre-2)'}}></i>
          <span style={{fontSize:9,color:'var(--sdcd-inactif)',fontFamily:'var(--sdcd-font-mono)'}}>{ic.replace('ri-','').replace('-line','')}</span>
        </div>)}
    </div>
  </div>;
  else corps=<div style={{maxWidth:640}}>
    <p style={{lineHeight:1.7,color:'var(--sdcd-encre-2)'}}>Conteneur centré de 1200 px maximum, gouttières de 24 px, grille de 12 colonnes, espacement en multiples de 4 px. Sous 992 px la navigation se replie ; sous 768 px les contenus passent en une colonne.</p>
    <div style={{border:'1px dashed var(--sdcd-ligne-forte)',padding:16,display:'grid','--sdcd-cols':'repeat(12,minmax(0,1fr))','--sdcd-cols-lg':'repeat(3,minmax(0,1fr))','--sdcd-cols-md':'repeat(4,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:8}}>
      {Array.from({length:12},(_,i)=><div key={i} style={{height:56,background:'var(--sdcd-bleu-pale)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'var(--sdcd-muet)',fontFamily:'var(--sdcd-font-mono)'}}>{i+1}</div>)}
    </div>
  </div>;
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil","Fondamentaux",sujet]} style={{marginBottom:18}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>{sujet}</h1>
    {corps}
  </div>;
}
function PageModeles({sujet}){
  const M={"Portail national":["../portail/index.html","L’accueil gouv.cd complet : héro, recherche, démarches, actualités, annuaire, espace citoyen."],
    "Site de ministère":["../ministere/index.html","La déclinaison de la marque d’État par une entité : Ministère du Numérique."],
    "Modèles de pages (18 démos)":["../modeles/index.html","Fiche démarche, réclamation, demande de service, tutoriel, article, suivi, rendez-vous, médiathèque, données."],
    "Courriels officiels (3 modèles)":["../email/courriel-officiel.html","Notification de suivi, convocation à un rendez-vous, lettre d’information — tables + mode sombre + pied RGPD."]};
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil","Modèles",sujet]} style={{marginBottom:18}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Modèles</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Des pages complètes et fonctionnelles, prêtes à copier. Le modèle demandé s’ouvre dans la même fenêtre.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(2,minmax(0,1fr))',gap:16,marginTop:20,maxWidth:900}}>
      {Object.entries(M).map(([nom,[href,desc]])=>
        <a key={nom} href={href} style={{border:'1px solid '+(nom===sujet?'var(--sdcd-action)':'var(--sdcd-ligne)'),padding:22,textDecoration:'none',background:'var(--sdcd-fond)'}}>
          <div style={{fontWeight:700,fontSize:'var(--sdcd-h4)',color:'var(--sdcd-texte)',marginBottom:6}}>{nom} <i className="ri-arrow-right-line" style={{color:'var(--sdcd-action)',verticalAlign:'-2px'}}></i></div>
          <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',lineHeight:1.55}}>{desc}</div>
        </a>)}
    </div>
  </div>;
}
const DOCS={
'Assistant (wizard)':{d:'Démarche multi-étapes déclarative : champs typés, validation (requis, courriel, nombre), récapitulatif automatique avant envoi.',
 c:'<Wizard etapes={[{titre:"Identité",champs:[{cle:"nom",label:"Nom",requis:true}]}]} onFinish={d=>…} />',
 D:()=><Wizard titre="Demande d’acte de naissance" etapes={[
   {titre:"Votre identité",champs:[{cle:"nom",label:"Nom et prénom",requis:true},{cle:"province",label:"Province de naissance",type:"choix",options:["Kinshasa","Haut-Katanga","Nord-Kivu"],requis:true}]},
   {titre:"Contact",champs:[{cle:"email",label:"Adresse électronique",type:"email",requis:true}]}]}/>,
 r:[['Validation','À chaque étape, jamais seulement à la fin.'],['Récapitulatif','Toujours présenter les données saisies avant envoi.']]},
'Tableau avancé':{d:'Filtre plein-texte, tri par colonne, pagination, export CSV (ouvrable dans Excel) et modification en ligne.',
 c:'<DataTable titre="Textes publiés" colonnes={[…]} lignes={[…]} />',
 D:()=><DataTable titre="Textes publiés au Journal officiel" parPage={4}
   colonnes={[{cle:"ref",label:"Référence"},{cle:"nature",label:"Nature"},{cle:"articles",label:"Articles",type:"nombre"}]}
   lignes={[{ref:"JO n° 17",nature:"Loi",articles:84},{ref:"JO n° 16",nature:"Ordonnance",articles:31},{ref:"JO n° 15",nature:"Décret",articles:22},{ref:"JO n° 14",nature:"Arrêté",articles:12},{ref:"JO n° 13",nature:"Loi",articles:145}]}/>,
 r:[['Export','CSV séparé par ; avec BOM, compatible Excel français.'],['Édition','Enregistrer et annuler toujours visibles pendant la modification.']]},
'Bouton':{d:'Le bouton déclenche une action. Trois variantes hiérarchisées, casse de phrase, angles droits.',
 c:'<Button icon="ri-user-line">Se connecter</Button>\n<Button variant="secondaire">Annuler</Button>',
 D:()=><div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}><Button icon="ri-user-line">Se connecter</Button><Button variant="secondaire">Annuler</Button><Button variant="tertiaire" iconRight="ri-arrow-right-line">En savoir plus</Button><Button disabled>Indisponible</Button></div>,
 r:[['Hiérarchie','Une seule action primaire par vue ; le reste en secondaire ou tertiaire.'],['Libellé','Verbe à l’infinitif, casse de phrase, jamais de majuscules.'],['Accessibilité','Contraste AA, focus visible, cible ≥ 44 px sur mobile.']]},
'Champ de saisie':{d:'Libellé au-dessus, aide en dessous, erreur explicite avec icône.',
 c:'<Input label="Numéro national" hint="Format : 12 chiffres" />',
 D:()=><div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:20,maxWidth:640}}><Input label="Numéro national" hint="Format : 12 chiffres" placeholder="000 000 000 000"/><Input label="Adresse électronique" error="Ce champ est requis."/></div>,
 r:[['Libellé','Toujours visible, jamais remplacé par le placeholder.'],['Erreur','Message précis sous le champ, bordure rouge, icône.']]},
'Barre de recherche':{d:'Champ + bouton bleu accolé — signature du système. Version héro en 52 px.',
 c:'<SearchBar large onSearch={q=>…} />',
 D:()=><SearchBar large/>,
 r:[['Placement','En-tête ou héro du portail ; une seule par vue.']]},
'Téléversement':{d:'Dépôt de justificatifs : formats et poids annoncés, liste des fichiers avec retrait.',
 c:'<Upload label="Justificatifs de résidence" />',
 D:()=><Upload label="Justificatifs de résidence"/>,
 r:[['Formats','Toujours annoncer formats acceptés et poids maximal.'],['Retrait','Chaque fichier ajouté doit pouvoir être retiré.']]},
'Alerte':{d:'Quatre états sémantiques : info, succès, alerte, erreur. Fond pâle, contour, icône.',
 c:'<Alert type="succes" titre="Demande transmise">…</Alert>',
 D:()=><div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:12}}><Alert type="info" titre="Information">Délai moyen : 5 jours ouvrés.</Alert><Alert type="succes" titre="Demande transmise">Accusé sous 48 h.</Alert><Alert type="alerte" titre="Pièce manquante">Ajoutez votre acte de naissance.</Alert><Alert type="erreur" titre="Échec de l’envoi">Vérifiez votre connexion.</Alert></div>,
 r:[['Usage','Contextuelle à la page ; pour un message global, utiliser Notice.']]},
'Badge':{d:'Statut non cliquable, en pilule. Pour un filtre cliquable, utiliser Tag.',
 c:'<Badge ton="succes">Publié</Badge>',
 D:()=><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><Badge>Neutre</Badge><Badge ton="info">Info</Badge><Badge ton="succes">Publié</Badge><Badge ton="alerte">En révision</Badge><Badge ton="erreur">Abrogé</Badge><Badge ton="nouveau">Nouveau</Badge></div>,
 r:[['Ton','Un seul mot ou deux ; jamais de phrase.']]},
'Tag':{d:'Filtre cliquable : état actif avec coche, variante supprimable.',
 c:'<Tag actif onClick={…}>Kinshasa</Tag>',
 D:()=>{const [on,setOn]=React.useState(['Kinshasa']);const flip=t=>setOn(on.includes(t)?on.filter(x=>x!==t):[...on,t]);
  return <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{['Kinshasa','Lubumbashi','Goma'].map(t=><Tag key={t} actif={on.includes(t)} onClick={()=>flip(t)}>{t}</Tag>)}<Tag supprimable onDelete={()=>{}}>PDF uniquement</Tag></div>;},
 r:[['Distinction','Tag = filtre interactif ; Badge = statut informatif.']]},
'Carte':{d:'Bloc de contenu entièrement cliquable : sur-titre, titre, méta, flèche.',
 c:'<Card surTitre="Actualité" titre="…" meta="12 août 2026" />',
 D:()=><div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:16,maxWidth:640}}><Card surTitre="Actualité" titre="Lancement du portail gouv.cd" description="Le point d’entrée unique des services publics." meta="12 août 2026"/><Card surTitre="Journal officiel" titre="Décret sur l’identité numérique" meta="10 juillet 2026"/></div>,
 r:[['Lien','Tout le bloc est le lien ; jamais de bouton dans une carte.']]},
'Tuile':{d:'Accès à un service : icône, intitulé, filet inférieur qui passe au bleu au survol.',
 c:'<Tile icon="ri-passport-line" titre="Demander un passeport" />',
 D:()=><div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:14,maxWidth:640}}><Tile icon="ri-passport-line" titre="Demander un passeport" description="En ligne"/><Tile icon="ri-scales-3-line" titre="Journal officiel" description="Textes consolidés"/><Tile icon="ri-phone-line" titre="Le 148" description="Numéro unique"/></div>,
 r:[['Grille','3 ou 4 colonnes ; icône Remix en trait fin.']]},
'Tableau':{d:'En-tête souligné d’un filet fort, zébrage discret, nombres en mono alignés à droite.',
 c:'<Table colonnes={[…]} lignes={[…]} />',
 D:()=><Table colonnes={["Texte","Nature","Date"]} lignes={[["Ordonnance n° 23/006","Ordonnance","13/01/2023"],["Loi n° 22/003","Loi","24/03/2022"]]}/>,
 r:[['Nombres','Format français, police mono, alignés à droite.']]},
'Graphiques':{d:'Barres, courbes, anneau — légende, source obligatoire, bascule accessible graphique ⇄ tableau (inspiré de dsfr-chart).',
 c:'<BarChart titre="…" categories={[…]} series={[…]} source="DGM, 2026" />',
 D:()=><div style={{maxWidth:640}}><BarChart titre="Dossiers traités par trimestre" unite="dossiers" source="Direction générale de migration, 2026" categories={["T1","T2","T3","T4"]} series={[{nom:"2025",valeurs:[8200,9100,8800,10400]},{nom:"2026",valeurs:[11200,13400,15100,16800]}]}/></div>,
 r:[['Source','Toujours citée sous le graphique.'],['Accessibilité','Les données restent consultables en tableau.']]},
'Modale':{d:'Confirmation ou saisie courte. Fermeture par Échap, le fond ou le bouton.',
 c:'<Modal ouvert titre="Confirmer l’envoi" onClose={…} actions={…}>…</Modal>',
 D:()=>{const [o,setO]=React.useState(false);
  return <div><Button variant="secondaire" icon="ri-window-line" onClick={()=>setO(true)}>Ouvrir la modale</Button>
  <Modal ouvert={o} titre="Confirmer l’envoi du dossier" onClose={()=>setO(false)} actions={<React.Fragment><Button variant="secondaire" onClick={()=>setO(false)}>Annuler</Button><Button onClick={()=>setO(false)}>Confirmer</Button></React.Fragment>}>Une fois transmis, le dossier ne peut plus être modifié.</Modal></div>;},
 r:[['Usage','Réservée aux confirmations ; jamais pour du contenu long.']]},
'Infobulle':{d:'Complément d’information au survol et au focus clavier.',
 c:'<Tooltip texte="…"><i className="ri-question-line"/></Tooltip>',
 D:()=><div style={{padding:'40px 0 8px'}}>Numéro de dossier <Tooltip texte="Le numéro figure sur votre récépissé de dépôt."><i className="ri-question-line" tabIndex="0" style={{color:'var(--sdcd-muet)',fontSize:17}}></i></Tooltip></div>,
 r:[['Contenu','Une phrase au plus ; jamais d’information indispensable.']]},
'Mise en avant':{d:'Bloc pâle à liseré bleu pour attirer l’attention sur un contenu important.',
 c:'<Callout titre="Nouveau service" action="Découvrir">…</Callout>',
 D:()=><Callout titre="Nouveau service" action="Découvrir">Le suivi de dossier en temps réel est disponible dans l’espace citoyen.</Callout>,
 r:[['Fréquence','Une par page au maximum.']]},
'Menu latéral':{d:'Navigation de rubrique : sections repliables, item actif à liseré bleu.',
 c:'<Sidemenu sections={[…]} actif="Passeport" />',
 D:()=><Sidemenu sections={[{titre:"Démarches",liens:["Passeport","Carte d’identité","Visa"]},{titre:"Le service",liens:["Horaires","Contact"]}]} actif="Passeport"/>,
 r:[['Profondeur','Deux niveaux au maximum.']]},
'Indicateur d’étapes':{d:'Situe l’usager dans une démarche : « Étape N sur T », segments, étape suivante annoncée.',
 c:'<Stepper etape={2} total={4} titre="Pièces justificatives" suivant="Paiement" />',
 D:()=><Stepper etape={2} total={4} titre="Pièces justificatives" suivant="Paiement des frais"/>,
 r:[['Annonce','Toujours indiquer l’étape suivante, sauf à la dernière.']]},
'Consentement cookies':{d:'Bandeau RGPD : accepter, refuser et personnaliser à parité visuelle.',
 c:'<CookieConsent onChoice={c=>…} />',
 D:()=><CookieConsent fixe={false}/>,
 r:[['Parité','Refuser est aussi accessible qu’accepter.']]},
'Lettre d’information':{d:'Bloc pré-pied de page : abonnement avec validation, réseaux sociaux officiels.',
 c:'<Follow onSubscribe={em=>…} />',
 D:()=><Follow/>,
 r:[['Placement','Immédiatement au-dessus du pied de page.']]},
'Prise de rendez-vous':{d:'Sélection en deux temps (jour puis horaire) avec confirmation explicite.',
 c:'<Rdv lieu="Bureau des passeports — Gombe" onConfirm={…} />',
 D:()=><Rdv/>,
 r:[['Confirmation','Récapituler jour et heure dans le bouton avant validation.']]},
'Suivi de dossier':{d:'Chronologie verticale des étapes : fait, en cours, à venir ; actions associées.',
 c:'<Tracking dossier="CD-2026-084517" />',
 D:()=><div style={{maxWidth:640}}><Tracking/></div>,
 r:[['Statuts','Trois états seulement : fait, en cours, à venir.']]},
'Chargement':{d:'Anneau tricolore 3D — le seul mouvement continu autorisé du système. Fourni par le commanditaire.',
 c:'<Loader label="Chargement…" />',
 D:()=><Loader/>,
 r:[['Réduction de mouvement','Désactivé par prefers-reduced-motion.']]}
};
function PageComposant({nom}){
  const doc=DOCS[nom];
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil","Composants",nom]} style={{marginBottom:18}}/>
    <div style={{display:'flex',alignItems:'center',gap:12}}><h1 style={{fontSize:'var(--sdcd-h1)',margin:0}}>{nom}</h1><Badge ton={doc?'succes':'nouveau'}>{doc?'Stable':'En rédaction'}</Badge></div>
    {doc?<div>
      <p style={{color:'var(--sdcd-muet)',maxWidth:640,marginTop:10}}>{doc.d}</p>
      <h2 style={{fontSize:'var(--sdcd-h3)',marginTop:32}}>Aperçu</h2>
      <div style={{border:'1px solid var(--sdcd-ligne)',padding:28,background:'var(--sdcd-fond)'}}>{doc.D()}</div>
      <pre style={{background:'var(--sdcd-fond-alt)',border:'1px solid var(--sdcd-ligne)',padding:20,fontSize:13,overflowX:'auto',marginTop:12}}>{doc.c}</pre>
      <h2 style={{fontSize:'var(--sdcd-h3)',marginTop:24}}>Règles d’usage</h2>
      <Table colonnes={["Règle","Détail"]} lignes={doc.r}/>
    </div>
    :<div style={{marginTop:24}}>{Loader&&<Loader label="Documentation en cours de rédaction…"/>}</div>}
  </div>;
}
function PagePrincipe({sujet}){
  const contenus={
    "Accessibilité":["Le SDCD vise la conformité au référentiel congolais d’accessibilité (équivalent RGAA) : contrastes AA, focus visible, navigation clavier complète, alternatives textuelles et formulaires étiquetés.","Chaque site officiel publie sa déclaration d’accessibilité dans le pied de page."],
    "Mobile et responsive":["Tous les composants et tous les modèles du SDCD sont conçus pour le téléphone d’abord : aucune page ne déborde horizontalement, aucun texte ne descend sous 16 px, aucune cible tactile sous 44 px.","Cinq points de rupture sont déclarés en jetons (--sdcd-bp-xs à --sdcd-bp-xl). Les grilles se déclarent en variables : --sdcd-cols pour le bureau, --sdcd-cols-md pour la tablette (≤ 900 px), --sdcd-cols-lg pour la tablette (≤ 1024 px : trois colonnes ou plus repassent à deux), --sdcd-cols-md (≤ 900 px) et --sdcd-cols-sm pour le mobile (≤ 640 px, une colonne par défaut).","Les tableaux se transforment en cartes empilées sous 640 px : chaque ligne devient un bloc étiqueté (données en regard de leur intitulé de colonne), sans défilement horizontal. Sur tablette et au-delà, le tableau reste un tableau, dans un conteneur .sdcd-scroll-x plutôt que comprimé. Les menus latéraux deviennent des tiroirs (.sdcd-aside) ouverts par un bouton et refermés au choix d’une rubrique.","La typographie est fluide : les titres sont interpolés en clamp() entre la borne mobile et la borne bureau, et la gouttière passe de 24 px à 16 px sur petit écran."],
    "Multilinguisme":["Le français est la langue de référence. Le sélecteur d’en-tête propose l’anglais et quatre langues nationales : lingala, kiswahili, kikongo, tshiluba.","Les gabarits réservent l’espace nécessaire aux variations de longueur entre langues."],
    "Écriture et ton":["Registre institutionnel, calme et factuel : vouvoiement, impératif de service, aucune exclamation, aucun emoji.","Typographie française : espace fine avant : ; ! ?, guillemets « », apostrophe courbe."],
    "Mode sombre":["Le thème sombre s’active par l’attribut data-theme=\"dark\" et ne modifie aucun composant : seuls les jetons de couleur changent.","Le choix de l’usager est mémorisé et respecté (prefers-color-scheme)."]};
  const c=contenus[sujet]||["Contenu en cours de rédaction.",""];
  return <div style={{maxWidth:800,margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil","Principes",sujet]} style={{marginBottom:18}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>{sujet}</h1>
    {c.map((p,i)=>p&&<p key={i} style={{lineHeight:1.7,color:'var(--sdcd-encre-2)'}}>{p}</p>)}
    {sujet==='Mode sombre'&&<Alert type="info" titre="Essayez">Utilisez l’icône lune/soleil de l’en-tête de ce site.</Alert>}
    {sujet==='Mobile et responsive'&&<div style={{marginTop:20}}>
      <h2 style={{fontSize:'var(--sdcd-h3)'}}>Points de rupture</h2>
      <Table colonnes={["Jeton","Largeur","Bascule"]} lignes={[
        ["--sdcd-bp-xs","480 px","Grilles à une colonne, actions pleine largeur"],
        ["--sdcd-bp-sm","640 px","Grilles à une colonne, rangées flex qui passent à la ligne"],
        ["--sdcd-bp-md","900 px","Menu latéral en tiroir, navigation d’en-tête en bouton Menu"],
        ["--sdcd-bp-lg","1024 px","Grilles de 3 colonnes et plus repassées à deux"],
        ["--sdcd-bp-xl","1280 px","Largeur maximale de contenu atteinte"]]}/>
      <h2 style={{fontSize:'var(--sdcd-h3)',marginTop:28}}>Utilitaires</h2>
      <Table colonnes={["Classe","Rôle"]} lignes={[
        [".sdcd-grid","Grille pilotée par --sdcd-cols / -md / -sm"],
        [".sdcd-scroll-x","Défilement horizontal maîtrisé (frises, onglets, tableaux larges)"],
        ["table[data-empilable]","Tableau en cartes empilées sous 640 px (Table et DataTable par défaut)"],
        [".sdcd-aside + .sdcd-voile","Panneau latéral transformé en tiroir sous 900 px"],
        [".sdcd-desktop-only / .sdcd-mobile-only","Affichage conditionnel à 900 px"],
        [".sdcd-sm-hide / .sdcd-sm-only","Affichage conditionnel à 640 px"],
        [".sdcd-stack-md / .sdcd-stack-sm","Empilement d’une rangée flex"],
        [".sdcd-actions-collantes","Barre d’actions collante en bas d’écran sur mobile"]]}/>
    </div>}
  </div>;
}
function PageMarque({sujet}){
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil","Marque d’État",sujet]} style={{marginBottom:18}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>{sujet}</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:640}}>La marque d’État est l’élément juridique commun à tous les sites officiels : armoiries, intitulé en capitales et devise « Justice · Paix · Travail ».</p>
    <div style={{display:'flex',gap:24,flexWrap:'wrap',marginTop:20}}>
      <div style={{border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',padding:28,display:'flex',alignItems:'center',gap:16,background:'#fff'}}>
        <img src="../../assets/armoiries-rdc.png" alt="Armoiries" style={{height:64}}/>
        <div><div style={{fontWeight:700,fontSize:14,letterSpacing:'.04em',textTransform:'uppercase',lineHeight:1.3,color:'#161A1D'}}>République Démocratique<br/>du Congo</div>
        <div style={{fontSize:11.5,fontStyle:'italic',color:'#56616B',marginTop:2}}>Justice · Paix · Travail</div></div>
      </div>
      <div style={{border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',padding:28,display:'flex',alignItems:'center',background:'#005D7C'}}>
        <img src="../../assets/logo-blanc-tricolore.png" alt="Marque sur fond sombre" style={{height:56}}/>
      </div>
    </div>
    <h2 style={{fontSize:'var(--sdcd-h3)',marginTop:32}}>Usages interdits</h2>
    <ul style={{lineHeight:1.9,color:'var(--sdcd-encre-2)',paddingLeft:20}}>
      <li>Redessiner, recolorer ou déformer les armoiries.</li>
      <li>Supprimer la devise ou le filet tricolore.</li>
      <li>Utiliser la marque d’État sur un site hors .gouv.cd sans habilitation.</li>
    </ul>
  </div>;
}
function PageGenerique({section,sujet}){
  return <div style={{maxWidth:800,margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil",section,sujet]} style={{marginBottom:18}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>{sujet}</h1>
    <p style={{color:'var(--sdcd-muet)'}}>Page de documentation type — structure, exemples et règles d’usage sont rédigés sur ce gabarit.</p>
    <div style={{marginTop:24}}>{Loader&&<Loader label="Contenu en cours de rédaction…"/>}</div>
  </div>;
}
function App(){
  const [dark,setDark]=React.useState(false);
  const [route,setRoute]=React.useState(null);
  React.useEffect(()=>{document.documentElement.setAttribute('data-theme',dark?'dark':'light');document.body.style.background=dark?'#131619':'#fff';},[dark]);
  const go=(section,sujet)=>setRoute({section,sujet});
  let page;
  if(!route) page=<Home onGo={go}/>;
  else if(route.section==='Composants') page=<PageComposant nom={route.sujet}/>;
  else if(route.section==='Principes') page=<PagePrincipe sujet={route.sujet}/>;
  else if(route.section==='Fondamentaux') page=<PageFondamentaux sujet={route.sujet}/>;
  else if(route.section==='Modèles') page=<PageModeles sujet={route.sujet}/>;
  else if(route.section==='Marque d’État') page=<PageMarque sujet={route.sujet}/>;
  else page=<PageGenerique section={route.section} sujet={route.sujet}/>;
  return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'var(--sdcd-fond)',color:'var(--sdcd-texte)',fontFamily:'var(--sdcd-font)'}}>
    <DocHeader dark={dark} setDark={setDark} onHome={()=>setRoute(null)}/>
    <MegaMenu onGo={go}/>
    <main style={{flex:1}} data-screen-label={route?route.sujet:'Accueil doc'}>{page}</main>
    <div style={{marginTop:48}}>
      <Footer entite="SDCD v1.0 — Ministère du Numérique" description="Le système de design de l’État congolais : fondations, composants et modèles pour tous les sites officiels en .gouv.cd."
        colonnes={[{titre:"Le système",liens:["Fondamentaux","Composants","Modèles","Notes de version"]},
                   {titre:"Contribuer",liens:["Code source","Signaler un problème","Proposer un composant"]},
                   {titre:"Aide",liens:["Prise en main","Foire aux questions","Nous contacter"]}]}
        assetsBase="../../"/>
    </div>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
});