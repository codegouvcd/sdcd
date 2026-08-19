(window.__sdcdReady||Promise.resolve()).then(()=>{
const NS = window[Object.keys(window).find(k=>/_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button)]||{};
const {Header,Footer,Breadcrumb,SearchBar,Button,Input,Checkbox,Card,Tile,Badge,Table,Alert,Notice,Loader,Follow,CookieConsent,ConnectButton,Password,Pagination,Sidemenu,Lien,Display,Toggle,Tracking} = NS;
const NAV=["Accueil","Démarches et services","Actualités","Institutions","Journal officiel"];
const H2={fontSize:'var(--sdcd-h2)',fontWeight:700,margin:'0 0 6px'};
const Sect=({eyebrow,titre,action,children})=>(
  <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)'}}>
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16,marginBottom:20}}>
      <div>{eyebrow&&<div className="sdcd-eyebrow" style={{marginBottom:6}}>{eyebrow}</div>}<h2 style={H2}>{titre}</h2></div>
      {action&&<a href="#" style={{fontSize:'var(--sdcd-sm)',fontWeight:600,whiteSpace:'nowrap'}}>{action} <i className="ri-arrow-right-line" style={{verticalAlign:'-2px'}}></i></a>}
    </div>{children}</section>);

function Accueil({go}){
  return <div>
    <div style={{background:'var(--sdcd-bleu-pale)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(48px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'minmax(0,1.2fr) minmax(0,1fr)',gap:'clamp(26px,3.5vw,48px)',alignItems:'center'}}>
        <div>
          <h1 style={{fontSize:'var(--sdcd-display)',fontWeight:700,lineHeight:1.15,margin:'0 0 12px'}}>L’information et les services publics de la République</h1>
          <p style={{fontSize:'1.0625rem',color:'var(--sdcd-muet)',margin:'0 0 24px',maxWidth:520}}>gouv.cd est le point d’entrée unique des démarches administratives, des textes officiels et de l’annuaire des institutions de la République Démocratique du Congo.</p>
          <SearchBar large placeholder="Rechercher une démarche, un service, un texte…"/>
          <div style={{display:'flex',gap:16,marginTop:14,fontSize:'var(--sdcd-sm)'}}>
            <span style={{color:'var(--sdcd-muet)'}}>Fréquent :</span>
            <a href="#">Passeport</a><a href="#">Acte de naissance</a><a href="#">Permis de conduire</a><a href="#">Impôts</a>
          </div>
        </div>
        <div style={{height:280}}><image-slot id="hero-portail" shape="rounded" radius="4" placeholder="Image officielle — déposez une photo"></image-slot></div>
      </div>
    </div>
    <Sect titre="Démarches les plus demandées" action="Toutes les démarches">
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:16}}>
        <Tile icon="ri-passport-line" titre="Demander un passeport" description="Ministère de l’Intérieur"/>
        <Tile icon="ri-file-user-line" titre="Acte de naissance" description="État civil"/>
        <Tile icon="ri-car-line" titre="Permis de conduire" description="Transports"/>
        <Tile icon="ri-briefcase-line" titre="Créer une entreprise" description="Guichet unique"/>
        <Tile icon="ri-hand-coin-line" titre="Payer ses impôts" description="DGI"/>
        <Tile icon="ri-graduation-cap-line" titre="Équivalence de diplôme" description="ESU"/>
        <Tile icon="ri-heart-pulse-line" titre="Couverture santé" description="CNSS"/>
        <Tile icon="ri-plane-line" titre="Visa et séjour" description="DGM"/>
      </div>
    </Sect>
    <div style={{background:'var(--sdcd-fond-alt)'}}>
      <Sect titre="Actualités du gouvernement" action="Toutes les actualités">
        <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16}}>
          <Card surTitre="Conseil des ministres" titre="Compte rendu de la réunion du 14 août 2026" description="Les décisions adoptées et les projets de textes examinés." meta="14 août 2026" image={<div style={{width:'100%',height:'100%'}}><image-slot id="actu-1" shape="rect" placeholder="Photo"></image-slot></div>}/>
          <Card surTitre="Numérique" titre="Ouverture du portail unique des démarches" description="Les services publics en ligne accessibles depuis gouv.cd." meta="12 août 2026" image={<div style={{width:'100%',height:'100%'}}><image-slot id="actu-2" shape="rect" placeholder="Photo"></image-slot></div>}/>
          <Card surTitre="Journal officiel" titre="Publication de la loi de finances rectificative" description="Le texte consolidé est disponible en libre accès." meta="8 août 2026" image={<div style={{width:'100%',height:'100%'}}><image-slot id="actu-3" shape="rect" placeholder="Photo"></image-slot></div>}/>
        </div>
      </Sect>
    </div>
    <Sect titre="Les institutions de la République" action="Annuaire complet">
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16}}>
        <Tile icon="ri-government-line" titre="Présidence de la République" description="presidence.gouv.cd"/>
        <Tile icon="ri-building-line" titre="Primature" description="primature.gouv.cd"/>
        <Tile icon="ri-team-line" titre="Assemblée nationale" description="assemblee-nationale.cd"/>
        <Tile icon="ri-scales-3-line" titre="Cour constitutionnelle" description="cour-constitutionnelle.cd"/>
        <Tile icon="ri-map-2-line" titre="Les 26 provinces" description="Portails provinciaux"/>
        <Tile icon="ri-community-line" titre="Villes et communes" description="Services de proximité"/>
      </div>
    </Sect>
    <div style={{background:'var(--sdcd-bleu-aplat)'}} data-theme="dark">
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)',display:'flex',alignItems:'center',gap:'clamp(18px,3.5vw,32px)',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:280}}>
          <h2 style={{color:'#fff',fontSize:'var(--sdcd-h2)',margin:'0 0 6px'}}>Espace citoyen</h2>
          <p style={{color:'rgba(255,255,255,.85)',margin:0,fontSize:'var(--sdcd-sm)',maxWidth:520}}>Suivez vos démarches, conservez vos documents et recevez les notifications officielles avec un compte unique, valable sur tous les sites en .gouv.cd.</p>
        </div>
        <button onClick={()=>go(5)} style={{background:'#fff',color:'var(--sdcd-bleu-aplat)',border:'none',borderRadius:'var(--sdcd-rayon)',padding:'11px 22px',fontFamily:'inherit',fontWeight:600,fontSize:'1rem',cursor:'pointer'}}>Se connecter <i className="ri-arrow-right-line" style={{verticalAlign:'-2px'}}></i></button>
      </div>
    </div>
  </div>;
}
function Demarches(){
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'24px'}}>
    <Breadcrumb items={["Accueil","Démarches et services"]} style={{marginBottom:20}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Démarches et services en ligne</h1>
    <SearchBar placeholder="Rechercher une démarche…" style={{margin:'8px 0 32px'}}/>
    <div className="sdcd-grid" style={{'--sdcd-cols':'260px minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(22px,3.5vw,40px)'}}>
      <Sidemenu titre="Thématiques" actif="Papiers et citoyenneté"
        sections={[{liens:["Papiers et citoyenneté","Famille et état civil","Travail et entreprise","Impôts et taxes","Transports","Santé et social","Étranger et voyage"]},
                   {titre:"Par profil",liens:["Particulier","Entreprise","Agent public"]}]}/>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {[["Demander un passeport biométrique","Ministère de l’Intérieur — délai moyen : 15 jours",["En ligne","succes"]],
          ["Carte d’identité nationale","ONIP — enrôlement en centre agréé",["Sur place","neutre"]],
          ["Copie intégrale d’acte de naissance","État civil de la commune de résidence",["En ligne","succes"]],
          ["Certificat de nationalité","Ministère de la Justice",["Bientôt","nouveau"]]].map((d,i)=>
          <a key={i} href="#" style={{display:'flex',alignItems:'center',gap:16,padding:'16px 20px',background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',textDecoration:'none'}}>
            <i className="ri-file-text-line" style={{fontSize:22,color:'var(--sdcd-action)'}}></i>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,color:'var(--sdcd-texte)'}}>{d[0]}</div>
              <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:2}}>{d[1]}</div>
            </div>
            <Badge ton={d[2][1]}>{d[2][0]}</Badge>
            <i className="ri-arrow-right-line" style={{color:'var(--sdcd-action)'}}></i>
          </a>)}
        <Alert type="info" titre="Un doute sur une démarche ?" style={{marginTop:8}}>Appelez le 148, numéro unique de l’administration, du lundi au vendredi de 8 h à 16 h.</Alert>
      </div>
    </div>
  </div>;
}
function Actualites(){
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'24px'}}>
    <Breadcrumb items={["Accueil","Actualités"]} style={{marginBottom:20}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Actualités du gouvernement</h1>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16,marginTop:16}}>
      {[["Conseil des ministres","Compte rendu de la réunion du 14 août 2026","14 août 2026","p1"],
        ["Numérique","Ouverture du portail unique des démarches","12 août 2026","p2"],
        ["Journal officiel","Loi de finances rectificative publiée","8 août 2026","p3"],
        ["Infrastructures","Corridor Kinshasa–Matadi : point d’étape","5 août 2026","p4"],
        ["Santé publique","Campagne nationale de vaccination","2 août 2026","p5"],
        ["Éducation","Calendrier scolaire 2026-2027","28 juillet 2026","p6"]].map((a,i)=>
        <Card key={i} surTitre={a[0]} titre={a[1]} meta={a[2]} image={<div style={{width:'100%',height:'100%'}}><image-slot id={'actu-page-'+a[3]} shape="rect" placeholder="Photo"></image-slot></div>}/>)}
    </div>
    <div style={{display:'flex',justifyContent:'center',marginTop:32}}><Pagination pages={8} actif={1}/></div>
  </div>;
}
function Institutions(){
  const G=[["Exécutif",[["Présidence de la République","presidence.gouv.cd"],["Primature","primature.gouv.cd"],["Ministère des Finances","finances.gouv.cd"],["Ministère du Numérique","numerique.gouv.cd"],["Ministère de la Santé Publique","sante.gouv.cd"]]],
    ["Législatif",[["Assemblée nationale","assemblee-nationale.cd"],["Sénat","senat.cd"]]],
    ["Judiciaire",[["Cour constitutionnelle","cour-constitutionnelle.cd"],["Cour de cassation","justice.gouv.cd"]]],
    ["Provinces",[["Ville de Kinshasa","kinshasa.gouv.cd"],["Province du Haut-Katanga","haut-katanga.gouv.cd"],["Province du Nord-Kivu","nord-kivu.gouv.cd"]]]];
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'24px'}}>
    <Breadcrumb items={["Accueil","Institutions"]} style={{marginBottom:20}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Annuaire des institutions</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:640}}>Tous les sites officiels de la République utilisent la marque d’État et le domaine .gouv.cd. Méfiez-vous des imitations.</p>
    {G.map((g,i)=><div key={i} style={{marginTop:28}}>
      <div className="sdcd-eyebrow" style={{marginBottom:12}}>{g[0]}</div>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:12}}>
        {g[1].map((e,j)=><a key={j} href="#" style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',textDecoration:'none',background:'var(--sdcd-fond)'}}>
          <i className="ri-government-line" style={{fontSize:20,color:'var(--sdcd-action)'}}></i>
          <div><div style={{fontWeight:600,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-texte)'}}>{e[0]}</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontFamily:'var(--sdcd-font-mono)'}}>{e[1]}</div></div>
        </a>)}
      </div></div>)}
  </div>;
}
function Journal(){
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'24px'}}>
    <Breadcrumb items={["Accueil","Journal officiel"]} style={{marginBottom:20}}/>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Journal officiel de la République</h1>
    <SearchBar placeholder="Rechercher un texte, un numéro…" style={{margin:'8px 0 28px'}}/>
    <Table caption="Dernières publications" colonnes={["Référence","Intitulé","Nature","Publication",""]}
      lignes={[
        ["JO n° 17","Loi de finances rectificative pour l’exercice 2026","Loi","8 août 2026",<a href="#">PDF <i className="ri-download-line" style={{verticalAlign:'-2px'}}></i></a>],
        ["JO n° 16","Ordonnance portant organisation des services du numérique","Ordonnance","24 juillet 2026",<a href="#">PDF <i className="ri-download-line" style={{verticalAlign:'-2px'}}></i></a>],
        ["JO n° 15","Décret fixant les modalités de l’identité numérique","Décret","10 juillet 2026",<a href="#">PDF <i className="ri-download-line" style={{verticalAlign:'-2px'}}></i></a>],
        ["JO n° 14","Arrêté interministériel — état civil dématérialisé","Arrêté","28 juin 2026",<a href="#">PDF <i className="ri-download-line" style={{verticalAlign:'-2px'}}></i></a>]]}/>
  </div>;
}
function Connexion({back,login}){
  return <div style={{maxWidth:480,margin:'0 auto',padding:'min(48px,7vw) var(--sdcd-gouttiere)'}}>
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Espace citoyen</h1>
    <p style={{color:'var(--sdcd-muet)'}}>Un compte unique pour tous les sites officiels en .gouv.cd.</p>
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:28,display:'flex',flexDirection:'column',gap:18}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'6px 0 2px'}}>
        <ConnectButton assetsBase="../../" onClick={login}/>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:14}} aria-hidden="true">
        <span style={{flex:1,height:1,background:'var(--sdcd-ligne)'}}></span>
        <span style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontWeight:600}}>ou avec vos identifiants</span>
        <span style={{flex:1,height:1,background:'var(--sdcd-ligne)'}}></span>
      </div>
      <Input label="Adresse électronique ou n° national" placeholder="prenom.nom@exemple.cd"/>
      <Password/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Checkbox label="Rester connecté"/>
        <a href="#" style={{fontSize:'var(--sdcd-xs)'}}>Mot de passe oublié ?</a>
      </div>
      <Button onClick={login} style={{justifyContent:'center'}}>Se connecter</Button>
      <a href="#" onClick={e=>{e.preventDefault();back();}} style={{fontSize:'var(--sdcd-sm)',textAlign:'center'}}>Retour à l’accueil</a>
    </div>
  </div>;
}
function Profil({logout}){
  const [notif,setNotif]=React.useState(true);
  return <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(28px,7vw) var(--sdcd-gouttiere)'}}>
    <Breadcrumb items={["Accueil","Espace citoyen","Mon profil"]} style={{marginBottom:20}}/>
    <div style={{display:'flex',alignItems:'center',gap:20,flexWrap:'wrap'}}>
      <span style={{width:64,height:64,borderRadius:999,background:'var(--sdcd-bleu-pale)',color:'var(--sdcd-bleu-profond)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700}}>MK</span>
      <div style={{flex:1,minWidth:220}}>
        <h1 style={{fontSize:'var(--sdcd-h2)',margin:0}}>Marie Kabila-Ngoy</h1>
        <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',marginTop:2}}>Identité vérifiée par CongoConnect · n° national <span style={{fontFamily:'var(--sdcd-font-mono)'}}>0042 8817 6623</span> <Badge ton="succes" style={{marginLeft:8,verticalAlign:'2px'}}>Vérifié</Badge></div>
      </div>
      <Button variant="secondaire" icon="ri-logout-box-r-line" onClick={logout}>Se déconnecter</Button>
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) 360px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(26px,3.5vw,48px)',alignItems:'start',marginTop:32}}>
      <div style={{display:'flex',flexDirection:'column',gap:'clamp(15px,3.5vw,28px)'}}>
        <div>
          <h2 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 14px'}}>Mes démarches en cours</h2>
          <Tracking/>
        </div>
        <div>
          <h2 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 14px'}}>Mes documents</h2>
          <div style={{border:'1px solid var(--sdcd-ligne)',background:'var(--sdcd-fond)'}}>
            {[["Récépissé de dépôt — passeport","PDF – 240 Ko"],["Attestation de compte citoyen","PDF – 180 Ko"],["Copie d’acte de naissance certifiée","PDF – 1,1 Mo"]].map((doc,i)=>
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 18px',borderTop:i?'1px solid var(--sdcd-ligne)':'none'}}>
                <i className="ri-file-shield-2-line" style={{fontSize:20,color:'var(--sdcd-action)'}}></i>
                <span style={{flex:1,fontSize:'var(--sdcd-sm)',fontWeight:600}}>{doc[0]}</span>
                <Lien telechargement detail={doc[1]} taille="sm">Télécharger</Lien>
              </div>)}
          </div>
        </div>
      </div>
      <aside style={{display:'flex',flexDirection:'column',gap:20}}>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20,background:'var(--sdcd-fond)'}}>
          <div className="sdcd-eyebrow" style={{marginBottom:14}}>Coordonnées</div>
          <div style={{display:'flex',flexDirection:'column',gap:10,fontSize:'var(--sdcd-sm)'}}>
            <span><i className="ri-mail-line" style={{color:'var(--sdcd-action)',marginRight:8}}></i>marie.kabila@exemple.cd</span>
            <span><i className="ri-phone-line" style={{color:'var(--sdcd-action)',marginRight:8}}></i>+243 81 000 00 00</span>
            <span><i className="ri-map-pin-line" style={{color:'var(--sdcd-action)',marginRight:8}}></i>Commune de la Gombe, Kinshasa</span>
          </div>
          <a href="#" style={{display:'inline-block',fontSize:'var(--sdcd-xs)',fontWeight:600,marginTop:12}}>Modifier mes coordonnées</a>
        </div>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20,background:'var(--sdcd-fond)',display:'flex',flexDirection:'column',gap:14}}>
          <div className="sdcd-eyebrow">Préférences</div>
          <Toggle label="Notifications par SMS et courriel" checked={notif} onChange={setNotif}/>
          <Display/>
        </div>
      </aside>
    </div>
  </div>;
}
function App(){
  const [page,setPage]=React.useState(0);
  const [notice,setNotice]=React.useState(true);
  const PAGES=[<Accueil go={setPage}/>,<Demarches/>,<Actualites/>,<Institutions/>,<Journal/>,<Connexion back={()=>setPage(0)} login={()=>setPage(6)}/>,<Profil logout={()=>setPage(0)}/>];
  return <div style={{background:'var(--sdcd-fond)',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <Header nav={NAV} actif={page<5?page:-1} onNav={setPage} sousTitre="Portail officiel de la République" entite="gouv.cd" assetsBase="../../"/>
    {notice&&page===0&&<Notice onClose={()=>setNotice(false)}>Nouveau : suivez l’avancement de vos démarches depuis l’espace citoyen.</Notice>}
    <main style={{flex:1}} data-screen-label={NAV[page]||'Connexion'}>{PAGES[page]}</main>
    <Follow/>
    <CookieConsent/>
    <Footer entite="gouv.cd — Portail officiel" assetsBase="../../"
      colonnes={[{titre:"Services",liens:["Démarches","Annuaire","Journal officiel","Données ouvertes"]},
                 {titre:"La République",liens:["Présidence","Primature","Assemblée nationale","Provinces"]},
                 {titre:"Le portail",liens:["À propos","Plan du site","Nous contacter","English"]}]}/>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
}).catch(function(e){window.__errs=(window.__errs||[]).concat(['THEN: '+(e&&e.stack||e)]);});