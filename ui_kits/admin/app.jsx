(window.__sdcdReady||Promise.resolve()).then(()=>{
const NS = window[Object.keys(window).find(k=>/_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button)]||{};
const {SkipLink,BlocMarque,SearchBar,LangMenu,IconButton,Button,Badge,Alert,Breadcrumb,Sidemenu,Card,Tile,Table,DataTable,BarChart,DonutChart,Tracking,Dropdown,Tooltip,Loader,Tabs,Highlight,Modal,Lien,Input,Select,Radio,Checkbox,Toggle,Upload,Segmented,Password,ConnectButton,LineChart,Accordion,Tag,Range,Display} = NS;

// ——— Données de démonstration (fictives, plausibles) ———
const AGENT={nom:'Jean-Baptiste Ilunga Mwepu',initiales:'JI',role:'Agent instructeur',service:'Direction des services académiques (DSA)'};
const KPIS=[
  {libelle:'Dossiers en cours d’instruction',valeur:'2 847',tendance:'+ 6 % vs juillet',ton:'neutre',icone:'ri-folder-open-line'},
  {libelle:'Délai médian de traitement',valeur:'4,2 mois',tendance:'− 0,3 mois',ton:'progression',icone:'ri-time-line'},
  {libelle:'Dossiers en retard (> J+120)',valeur:'318',tendance:'+ 41 cette semaine',ton:'alerte',icone:'ri-alarm-warning-line'},
  {libelle:'Décisions rendues en août',valeur:'506',tendance:'objectif : 620',ton:'neutre',icone:'ri-checkbox-circle-line'}];
const MES_DOSSIERS=[
  {ref:'MINESURSI/DSA/1602/02/0847/2026',requerant:'Grâce Mwilambwe Kalenga',province:'Haut-Katanga',etat:'Vérification externe',anciennete:118,retard:false},
  {ref:'MINESURSI/DSA/1602/02/0912/2026',requerant:'Patient Nsimba Lutete',province:'Kongo-Central',etat:'À instruire',anciennete:64,retard:false},
  {ref:'MINESURSI/DSA/1602/02/0533/2026',requerant:'Divine Kahindo Masika',province:'Nord-Kivu',etat:'Pièces manquantes',anciennete:131,retard:true},
  {ref:'MINESURSI/DSA/1602/02/1004/2026',requerant:'Emmanuel Tshibangu Kazadi',province:'Kasaï',etat:'À instruire',anciennete:12,retard:false},
  {ref:'MINESURSI/DSA/1602/02/0765/2026',requerant:'Sarah Bahati Furaha',province:'Sud-Kivu',etat:'Avis de la commission',anciennete:97,retard:false}];
const DEPOTS_12M={categories:['Sept.','Oct.','Nov.','Déc.','Janv.','Févr.','Mars','Avr.','Mai','Juin','Juil.','Août'],
  series:[{nom:'Dossiers déposés',valeurs:[412,388,451,296,502,534,489,611,587,642,598,415]}]};
const REPARTITION=[{nom:'À instruire',valeur:1204},{nom:'Vérification externe',valeur:648},{nom:'Avis de la commission',valeur:512},{nom:'Pièces manquantes',valeur:318},{nom:'En signature',valeur:165}];
const EVENEMENTS=[
  {quand:'Aujourd’hui, 09 h 42',texte:'Grâce Mwilambwe Kalenga — réponse de l’Université de Lubumbashi reçue (vérification d’authenticité).'},
  {quand:'Aujourd’hui, 08 h 15',texte:'12 nouveaux dossiers affectés à la DSA par la répartition automatique.'},
  {quand:'Hier, 16 h 30',texte:'Le Secrétaire général a signé 34 arrêtés d’équivalence (lot n° 2026-118).'},
  {quand:'Hier, 11 h 05',texte:'Divine Kahindo Masika — relance automatique J+130 envoyée (pièces manquantes).'},
  {quand:'13 août, 15 h 22',texte:'Mise à jour du barème des frais : 85 USD / 238 000 CDF (arrêté ministériel).'},
  {quand:'12 août, 10 h 00',texte:'Commission d’équivalence : 48 dossiers examinés, 41 avis favorables.'}];
const MENU=[
  {titre:'Instruction',liens:['Tableau de bord','Demandes reçues (2 847)','Mes dossiers (23)','Pièces à vérifier (318)']},
  {titre:'Décision',liens:['File de signature (34)','Commission d’équivalence','Courriers et notifications']},
  {titre:'Pilotage',liens:['Statistiques','Journal d’audit','Référentiels','Agents et habilitations']},
  {titre:'Administration',liens:['Paiements et vérification','Traductions (6 langues)','Paramètres']},
  {titre:'Système',liens:['Galerie du SDCD','Pages système']}];
const LANGUES_NOTE='Français · Lingala · Kiswahili · Kikongo · Tshiluba';

// ——— Coquille (identique sur tous les écrans) ———
function Coquille({fil=[],titre,sousTitre,actions,actif='Tableau de bord',onNav,children}){
  const [menuOuvert,setMenuOuvert]=React.useState(()=>typeof window==='undefined'||window.innerWidth>900);
  const [compteOuvert,setCompteOuvert]=React.useState(false);
  const [notifOuvert,setNotifOuvert]=React.useState(false);
  const [nonLues,setNonLues]=React.useState(7);
  return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'var(--sdcd-fond-alt)',fontFamily:'var(--sdcd-font)'}}>
    <SkipLink cible="#contenu"/>
    <div style={{display:'flex',height:4}} aria-hidden="true"><div style={{flex:1,background:'var(--sdcd-bleu)'}}></div><div style={{flex:1,background:'var(--sdcd-jaune)'}}></div><div style={{flex:1,background:'var(--sdcd-rouge)'}}></div></div>
    <header style={{background:'var(--sdcd-fond)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-3) var(--sdcd-4)',padding:'var(--sdcd-3) var(--sdcd-gouttiere)',flexWrap:'wrap'}}>
        <IconButton icon={menuOuvert?'ri-menu-fold-line':'ri-menu-unfold-line'} label={menuOuvert?'Replier le menu':'Déplier le menu'} variant="tertiaire" onClick={()=>setMenuOuvert(!menuOuvert)}/>
        <BlocMarque entite="MINESURSI" sousTitre="Équivalences de diplômes — back-office" taille={44} assetsBase="../../"/>
        <div className="sdcd-sm-hide" style={{flex:1,minWidth:220,maxWidth:420}}><SearchBar placeholder="Recherche globale : référence, requérant…" buttonLabel="Rechercher"/></div>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'var(--sdcd-3)'}}>
          <LangMenu/>
          <span style={{position:'relative',display:'inline-flex'}}>
            <IconButton icon="ri-notification-3-line" label={'Notifications — '+nonLues+' non lues'} variant="tertiaire" onClick={()=>setNotifOuvert(!notifOuvert)}/>
            {nonLues>0&&<span aria-hidden="true" style={{position:'absolute',top:'-4px',right:'-4px'}}><Badge ton="erreur">{nonLues}</Badge></span>}
            {notifOuvert&&<div role="region" aria-label="Notifications" aria-live="polite" style={{position:'absolute',right:0,top:'calc(100% + 6px)',width:340,background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',boxShadow:'var(--sdcd-ombre)',zIndex:70}}>
              <div style={{display:'flex',alignItems:'center',padding:'var(--sdcd-3) var(--sdcd-4)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
                <strong style={{fontSize:'var(--sdcd-sm)',flex:1}}>Notifications</strong>
                <button onClick={()=>setNonLues(0)} style={{background:'none',border:'none',color:'var(--sdcd-action)',fontFamily:'inherit',fontSize:'var(--sdcd-xs)',fontWeight:600,cursor:'pointer',textDecoration:'underline'}}>Tout marquer lu</button>
              </div>
              {[['ri-alarm-warning-line','erreur','Le dossier …/0154/2026 atteint J+162','Il y a 20 min'],
                ['ri-mail-line','info','Réponse de Kampala Intl University reçue','09 h 42'],
                ['ri-folder-add-line','info','12 dossiers affectés à la DSA','08 h 15'],
                ['ri-quill-pen-line','succes','Lot 2026-118 signé (34 arrêtés)','Hier, 16 h 30']].map((n,i)=>
                <div key={i} style={{display:'flex',gap:'var(--sdcd-3)',padding:'var(--sdcd-3) var(--sdcd-4)',borderBottom:'1px solid var(--sdcd-ligne)',background:nonLues>0&&i<2?'var(--sdcd-bleu-pale)':'transparent'}}>
                  <i className={n[0]} aria-hidden="true" style={{fontSize:16,color:n[1]==='erreur'?'var(--sdcd-erreur)':n[1]==='succes'?'var(--sdcd-succes)':'var(--sdcd-action)',marginTop:2}}></i>
                  <div style={{fontSize:'var(--sdcd-xs)',lineHeight:1.5}}><div style={{fontWeight:600,color:'var(--sdcd-texte)'}}>{n[2]}</div><div style={{color:'var(--sdcd-inactif)'}}>{n[3]}</div></div>
                </div>)}
              <div style={{padding:'var(--sdcd-2) var(--sdcd-4)',textAlign:'center'}}><a href="#" style={{fontSize:'var(--sdcd-xs)',fontWeight:600}}>Toutes les notifications</a></div>
            </div>}
          </span>
          <span style={{position:'relative'}}>
            <button onClick={()=>setCompteOuvert(!compteOuvert)} aria-expanded={compteOuvert} aria-label="Menu du compte agent"
              style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)',background:'none',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-1) var(--sdcd-3) var(--sdcd-1) var(--sdcd-1)',cursor:'pointer',fontFamily:'inherit'}}>
              <span aria-hidden="true" style={{width:32,height:32,borderRadius:'var(--sdcd-rayon-pilule)',background:'var(--sdcd-bleu-pale)',color:'var(--sdcd-bleu-profond)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'var(--sdcd-xs)'}}>{AGENT.initiales}</span>
              <span style={{textAlign:'left'}}>
                <span style={{display:'block',fontSize:'var(--sdcd-xs)',fontWeight:700,color:'var(--sdcd-texte)'}}>{AGENT.nom}</span>
                <span style={{display:'block',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{AGENT.role} · DSA</span>
              </span>
              <i className={compteOuvert?'ri-arrow-up-s-line':'ri-arrow-down-s-line'} style={{color:'var(--sdcd-muet)'}}></i>
            </button>
            {compteOuvert&&<div role="menu" style={{position:'absolute',right:0,top:'calc(100% + 4px)',minWidth:260,background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',boxShadow:'var(--sdcd-ombre)',zIndex:60,padding:'var(--sdcd-3)'}}>
              <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',paddingBottom:'var(--sdcd-2)',borderBottom:'1px solid var(--sdcd-ligne)',marginBottom:'var(--sdcd-2)'}}>{AGENT.service}</div>
              {['Mon profil agent','Mes délégations','Se déconnecter'].map((l,i)=><a key={i} href="#" role="menuitem" onClick={e=>{e.preventDefault();if(!onNav)return;if(l==='Se déconnecter')onNav('Connexion');if(l==='Mon profil agent')onNav('Mon profil agent');}} style={{display:'block',padding:'var(--sdcd-2) var(--sdcd-1)',fontSize:'var(--sdcd-sm)'}}>{l}</a>)}
            </div>}
          </span>
        </div>
      </div>
    </header>
    <div style={{flex:1,display:'flex',alignItems:'stretch'}}>
      <button className="sdcd-voile" data-ouvert={menuOuvert?'true':'false'} aria-label="Fermer le menu" onClick={()=>setMenuOuvert(false)}></button>
      <div className="sdcd-aside" data-ouvert={menuOuvert?'true':'false'} style={{background:'var(--sdcd-fond)',borderRight:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',width:264,flexShrink:0,display:menuOuvert?'block':'none'}}>
        <Sidemenu titre="Domaines" sections={MENU} actif={actif} onSelect={x=>{if(window.innerWidth<=900)setMenuOuvert(false);onNav&&onNav(x);}} style={{border:'none',paddingRight:0,minWidth:0}}/>
      </div>
      <main id="contenu" style={{flex:1,minWidth:0,padding:'var(--sdcd-4) var(--sdcd-gouttiere)'}}>
        {fil.length>0&&<Breadcrumb items={fil} style={{marginBottom:'var(--sdcd-4)'}}/>}
        <div style={{display:'flex',alignItems:'flex-end',gap:'var(--sdcd-4)',flexWrap:'wrap',marginBottom:'var(--sdcd-5)'}}>
          <div style={{flex:1,minWidth:280}}>
            <h1 style={{fontSize:'var(--sdcd-h2)',margin:0}}>{titre}</h1>
            {sousTitre&&<p style={{margin:'var(--sdcd-1) 0 0',fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>{sousTitre}</p>}
          </div>
          {actions&&<div style={{display:'flex',gap:'var(--sdcd-3)',flexWrap:'wrap'}}>{actions}</div>}
        </div>
        {children}
      </main>
    </div>
    <footer style={{background:'var(--sdcd-fond)',borderTop:'1px solid var(--sdcd-ligne)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-4)',padding:'var(--sdcd-3) var(--sdcd-5)',flexWrap:'wrap',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>
        <span style={{fontWeight:600}}>MINESURSI — back-office des équivalences</span>
        <span>Usage réservé aux agents habilités</span>
        <a href="#">Guide de l’agent</a><a href="#">Support</a>
        <span style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'var(--sdcd-3)'}}>
          <span style={{fontFamily:'var(--sdcd-font-mono)'}}>v1.0 · SDCD</span>
          <span aria-hidden="true" style={{display:'flex',height:8,width:36,overflow:'hidden'}}><span style={{flex:1,background:'var(--sdcd-bleu)'}}></span><span style={{flex:1,background:'var(--sdcd-jaune)'}}></span><span style={{flex:1,background:'var(--sdcd-rouge)'}}></span></span>
        </span>
      </div>
    </footer>
  </div>;
}

// ——— Écran 1 : tableau de bord agent ———
function Ecran1({onNav}){
  const [alerte,setAlerte]=React.useState(true);
  return <Coquille actif="Tableau de bord" onNav={onNav}
    fil={['Accueil','Tableau de bord']}
    titre="Tableau de bord — Direction des services académiques"
    sousTitre="Situation au 16 août 2026, 08 h 00 · données de démonstration"
    actions={<React.Fragment>
      <Dropdown libelle="Exporter" items={[{libelle:'Rapport du jour (PDF)',icone:'ri-file-pdf-2-line'},{libelle:'Données brutes (CSV)',icone:'ri-file-excel-2-line'}]}/>
      <Button icon="ri-add-line" onClick={()=>onNav('Enregistrement')}>Enregistrer une demande</Button>
    </React.Fragment>}>
    {alerte&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-5)'}}>
      <Alert type="info" titre="Commission d’équivalence du 20 août" onClose={()=>setAlerte(false)}>L’ordre du jour est arrêté au 18 août à 12 h 00 : 52 dossiers inscrits, 9 places restantes.</Alert>
    </div>}
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(230px,1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-5)'}}>
      {KPIS.map((k,i)=><div key={i} style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',borderBottom:'3px solid '+(k.ton==='alerte'?'var(--sdcd-erreur)':k.ton==='progression'?'var(--sdcd-succes)':'var(--sdcd-action)'),padding:'var(--sdcd-4) var(--sdcd-5)'}}>
        <i className={k.icone} aria-hidden="true" style={{fontSize:'var(--sdcd-h3)',color:k.ton==='alerte'?'var(--sdcd-erreur)':'var(--sdcd-action)'}}></i>
        <div style={{fontSize:'var(--sdcd-h2)',fontWeight:700,letterSpacing:'var(--sdcd-tracking-titre)',fontFamily:'var(--sdcd-font-mono)',margin:'var(--sdcd-2) 0 var(--sdcd-1)'}}>{k.valeur}</div>
        <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{k.libelle}</div>
        <div style={{marginTop:'var(--sdcd-2)'}}><Badge ton={k.ton==='alerte'?'erreur':k.ton==='progression'?'succes':'neutre'}>{k.tendance}</Badge></div>
      </div>)}
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,480px),1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-5)'}}>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-3)',padding:'var(--sdcd-4) var(--sdcd-5)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:0,flex:1}}>Mes dossiers à traiter aujourd’hui</h2>
          <a href="#" onClick={e=>{e.preventDefault();onNav('Mes dossiers (23)');}} style={{fontSize:'var(--sdcd-xs)',fontWeight:600,whiteSpace:'nowrap'}}>Tout voir (23) <i className="ri-arrow-right-line" aria-hidden="true"></i></a>
        </div>
        <div style={{overflowX:'auto'}}>
        <Table colonnes={['Référence','Requérant','Province','État','Ancienneté']}
          lignes={MES_DOSSIERS.map(d=>[
            <span title={d.ref} style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)',whiteSpace:'nowrap'}}>…/{d.ref.split('/').slice(-2).join('/')}</span>,
            d.requerant,d.province,
            <Badge ton={d.etat==='Pièces manquantes'?'alerte':d.etat==='À instruire'?'info':'neutre'}>{d.etat}</Badge>,
            <span style={{fontFamily:'var(--sdcd-font-mono)',fontWeight:d.retard?700:500,color:d.retard?'var(--sdcd-erreur)':'var(--sdcd-encre-2)',whiteSpace:'nowrap'}}>J+{d.anciennete}{d.retard?' ⚠':''}</span>])}/>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-3)'}}>
            <i className="ri-quill-pen-line" aria-hidden="true" style={{fontSize:'var(--sdcd-h3)',color:'var(--sdcd-action)'}}></i>
            <h2 style={{fontSize:'var(--sdcd-h4)',margin:0,flex:1}}>File de signature</h2>
            <Badge ton="info">34 en attente</Badge>
          </div>
          <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'var(--sdcd-3) 0'}}>Arrêtés d’équivalence prêts pour le Secrétaire général. Le plus ancien attend depuis <strong style={{fontFamily:'var(--sdcd-font-mono)',color:'var(--sdcd-encre-2)'}}>J+9</strong>.</p>
          <Button variant="secondaire" size="sm" iconRight="ri-arrow-right-line" onClick={()=>onNav('File de signature (34)')}>Ouvrir le parapheur</Button>
        </div>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',flex:1}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Derniers événements du service</h2>
          <ol style={{listStyle:'none',margin:0,padding:0}} aria-label="Chronologie des événements">
            {EVENEMENTS.map((e,i)=><li key={i} style={{display:'flex',gap:'var(--sdcd-3)',position:'relative',paddingBottom:i<EVENEMENTS.length-1?'var(--sdcd-4)':0}}>
              {i<EVENEMENTS.length-1&&<span aria-hidden="true" style={{position:'absolute',left:5,top:14,bottom:0,width:2,background:'var(--sdcd-ligne)'}}></span>}
              <span aria-hidden="true" style={{width:12,height:12,borderRadius:'var(--sdcd-rayon-pilule)',border:'2px solid var(--sdcd-action)',background:'var(--sdcd-fond)',flexShrink:0,marginTop:2,position:'relative'}}></span>
              <span style={{fontSize:'var(--sdcd-xs)',lineHeight:1.55,color:'var(--sdcd-encre-2)'}}><strong style={{display:'block',color:'var(--sdcd-muet)',fontWeight:600}}>{e.quand}</strong>{e.texte}</span>
            </li>)}
          </ol>
        </div>
      </div>
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,420px),1fr))',gap:'var(--sdcd-4)'}}>
      <BarChart titre="Dossiers déposés — 12 derniers mois" unite="dossiers" source="Registre national des équivalences, 16 août 2026" categories={DEPOTS_12M.categories} series={DEPOTS_12M.series} hauteur={240}/>
      <DonutChart titre="Répartition des dossiers par état" unite="dossiers" source="Registre national des équivalences, 16 août 2026" donnees={REPARTITION}/>
    </div>
  </Coquille>;
}

const DEMANDES=[
  {ref:'MINESURSI/DSA/1602/02/0847/2026',requerant:'Grâce Mwilambwe Kalenga',province:'Haut-Katanga',etat:'Vérification externe',anciennete:118,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0533/2026',requerant:'Divine Kahindo Masika',province:'Nord-Kivu',etat:'Pièces manquantes',anciennete:131,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0912/2026',requerant:'Patient Nsimba Lutete',province:'Kongo-Central',etat:'À instruire',anciennete:64,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/1004/2026',requerant:'Emmanuel Tshibangu Kazadi',province:'Kasaï',etat:'À instruire',anciennete:12,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0765/2026',requerant:'Sarah Bahati Furaha',province:'Sud-Kivu',etat:'Avis de la commission',anciennete:97,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0688/2026',requerant:'Christian Mbuyi Tshimanga',province:'Kinshasa',etat:'En signature',anciennete:143,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0451/2026',requerant:'Esther Nzuzi Mavungu',province:'Kongo-Central',etat:'Vérification externe',anciennete:88,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0399/2026',requerant:'Josué Kambale Paluku',province:'Nord-Kivu',etat:'À instruire',anciennete:151,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0290/2026',requerant:'Rachel Ilunga Numbi',province:'Lualaba',etat:'Avis de la commission',anciennete:105,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0187/2026',requerant:'Trésor Bemba Lokonga',province:'Tshopo',etat:'En signature',anciennete:76,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0154/2026',requerant:'Naomi Mwange Kabedi',province:'Ituri',etat:'Pièces manquantes',anciennete:162,montant:'85 USD'},
  {ref:'MINESURSI/DSA/1602/02/0102/2026',requerant:'Gédéon Kasongo Nyembo',province:'Haut-Katanga',etat:'À instruire',anciennete:33,montant:'85 USD'}];
function Ecran2({onNav}){
  const {Select:Sel,Tag:Tg}=NS;
  const MES=['…/0847/2026','…/0912/2026','…/0533/2026','…/1004/2026','…/0765/2026'];
  const [q,setQ]=React.useState('');
  const [prov,setProv]=React.useState('Toutes les provinces');
  const [etat,setEtat]=React.useState('Tous les états');
  const [periode,setPeriode]=React.useState('Depuis janvier 2026');
  const [miens,setMiens]=React.useState(false);
  const [filtresOuverts,setFiltresOuverts]=React.useState(true);
  const [chargement,setChargement]=React.useState(false);
  const [note,setNote]=React.useState('');
  const simuler=()=>{setChargement(true);setTimeout(()=>setChargement(false),900);};
  const reinit=()=>{setProv('Toutes les provinces');setEtat('Tous les états');setPeriode('Depuis janvier 2026');setMiens(false);setQ('');};
  const donnees=DEMANDES
    .filter(d=>!miens||MES.includes('…/'+d.ref.split('/').slice(-2).join('/')))
    .filter(d=>prov==='Toutes les provinces'||d.province===prov)
    .filter(d=>etat==='Tous les états'||d.etat===etat)
    .filter(d=>!q||(d.requerant+' '+d.ref).toLowerCase().includes(q.toLowerCase()))
    .sort((x,y)=>y.anciennete-x.anciennete)
    .map(d=>({reference:'…/'+d.ref.split('/').slice(-2).join('/'),requerant:d.requerant,province:d.province,etat:d.etat,anciennete:d.anciennete,montant:d.montant,_retard:d.anciennete>120}));
  const actifs=[prov!=='Toutes les provinces'&&['province',prov,()=>setProv('Toutes les provinces')],
    etat!=='Tous les états'&&['etat',etat,()=>setEtat('Tous les états')],
    periode!=='Depuis janvier 2026'&&['periode',periode,()=>setPeriode('Depuis janvier 2026')],
    miens&&['miens','Uniquement mes dossiers',()=>setMiens(false)]].filter(Boolean);
  return <Coquille actif="Demandes reçues (2 847)" onNav={onNav}
    fil={['Accueil','Instruction','Demandes reçues']}
    titre="Demandes reçues" sousTitre="2 847 dossiers · tri par ancienneté décroissante (règle du service) · 318 en retard"
    actions={<Button icon="ri-add-line" onClick={()=>onNav('Enregistrement')}>Enregistrer une demande</Button>}>
    {note&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-4)'}}><Alert type="succes" titre={note} onClose={()=>setNote('')}>Action de démonstration — consignée au journal d’audit.</Alert></div>}
    <div style={{display:'flex',gap:'var(--sdcd-4)',alignItems:'flex-end',flexWrap:'wrap',marginBottom:'var(--sdcd-4)'}}>
      <div style={{flex:'1 1 300px',maxWidth:440}}>
        <label htmlFor="rech-demandes" style={{display:'block',fontSize:'var(--sdcd-sm)',fontWeight:500,marginBottom:'var(--sdcd-1)'}}>Rechercher un dossier</label>
        <input id="rech-demandes" type="search" list="suggestions-demandes" value={q} placeholder="Nom du requérant ou référence…"
          onChange={e=>setQ(e.target.value)}
          style={{width:'100%',boxSizing:'border-box',fontFamily:'inherit',fontSize:'var(--sdcd-sm)',padding:'9px 12px',border:'1px solid var(--sdcd-ligne-forte)',background:'var(--sdcd-fond)',color:'var(--sdcd-texte)'}}/>
        <datalist id="suggestions-demandes">
          {DEMANDES.map((d,i)=><option key={i} value={d.requerant}>{'…/'+d.ref.split('/').slice(-2).join('/')+' · '+d.etat}</option>)}
        </datalist>
      </div>
      <Toggle label="Uniquement mes dossiers" checked={miens} onChange={setMiens}/>
      <div style={{display:'flex',gap:'var(--sdcd-2)',marginLeft:'auto'}}>
        <Button variant="secondaire" size="sm" icon="ri-loop-right-line" onClick={simuler}>Actualiser</Button>
        <Tooltip texte="Force une recherche sans résultat pour la recette de l’état vide.">
          <Button variant="tertiaire" size="sm" onClick={()=>setQ('Mukendi 2019')}>Tester l’état vide</Button>
        </Tooltip>
      </div>
    </div>
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',marginBottom:'var(--sdcd-4)'}}>
      <button onClick={()=>setFiltresOuverts(!filtresOuverts)} aria-expanded={filtresOuverts}
        style={{display:'flex',width:'100%',alignItems:'center',gap:'var(--sdcd-2)',padding:'var(--sdcd-3) var(--sdcd-4)',background:'none',border:'none',fontFamily:'inherit',fontSize:'var(--sdcd-sm)',fontWeight:700,color:'var(--sdcd-texte)',cursor:'pointer'}}>
        <i className="ri-filter-3-line" style={{color:'var(--sdcd-action)'}}></i>Filtres{actifs.length>0?' ('+actifs.length+' actif'+(actifs.length>1?'s':'')+')':''}
        <i className={filtresOuverts?'ri-arrow-up-s-line':'ri-arrow-down-s-line'} style={{marginLeft:'auto',color:'var(--sdcd-muet)'}}></i>
      </button>
      {filtresOuverts&&<div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(210px,1fr))',gap:'var(--sdcd-4)',padding:'var(--sdcd-4)',borderTop:'1px solid var(--sdcd-ligne)'}}>
        <Sel label="Province" options={['Toutes les provinces','Kinshasa','Kongo-Central','Haut-Katanga','Nord-Kivu','Sud-Kivu','Tshopo','Lualaba','Kasaï','Ituri']} value={prov} onChange={e=>setProv(e.target.value)}/>
        <Sel label="État du dossier" options={['Tous les états','À instruire','Vérification externe','Avis de la commission','Pièces manquantes','En signature']} value={etat} onChange={e=>setEtat(e.target.value)}/>
        <Sel label="Période de dépôt" options={['Depuis janvier 2026','30 derniers jours','Trimestre en cours','Année 2025']} value={periode} onChange={e=>setPeriode(e.target.value)}/>
        <Sel label="Montant des frais" options={['Tous les montants','85 USD','238 000 CDF']}/>
      </div>}
    </div>
    {actifs.length>0&&<div style={{display:'flex',gap:'var(--sdcd-2)',alignItems:'center',flexWrap:'wrap',marginBottom:'var(--sdcd-4)'}}>
      <span style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontWeight:600}}>Filtres actifs :</span>
      {actifs.map(([k,v,fn])=><Tg key={k} supprimable onDelete={fn}>{v}</Tg>)}
      <Button variant="tertiaire" size="sm" onClick={reinit}>Tout réinitialiser</Button>
    </div>}
    <DataTable titre={chargement?'Chargement des dossiers…':donnees.length+' dossier'+(donnees.length>1?'s':'')+' — les plus anciens d’abord'} parPage={8}
      chargement={chargement}
      selectionnable
      actionsGroupees={(sel)=><React.Fragment>
        <Button size="sm" icon="ri-user-shared-line" onClick={()=>setNote(sel.length+' dossier(s) réaffecté(s)')}>Réaffecter</Button>
        <Button size="sm" variant="secondaire" icon="ri-mail-send-line" onClick={()=>setNote('Relance envoyée pour '+sel.length+' dossier(s)')}>Relancer</Button>
        <Button size="sm" variant="secondaire" icon="ri-printer-line" onClick={()=>setNote(sel.length+' bordereau(x) généré(s)')}>Bordereaux</Button>
      </React.Fragment>}
      actionsLigne={[{libelle:'Ouvrir le dossier',icone:'ri-folder-open-line'},{libelle:'Réaffecter',icone:'ri-user-shared-line'},{libelle:'Relancer le requérant',icone:'ri-mail-send-line'},{libelle:'Clore sans suite',icone:'ri-close-circle-line',danger:true}]}
      onAction={(lib,ligne)=>lib==='Ouvrir le dossier'?onNav('Pièces à vérifier (318)'):setNote(lib+' — '+ligne.requerant)}
      ligneAlerte={r=>r._retard}
      videTitre="Aucun dossier ne correspond" videTexte="Aucun résultat pour cette combinaison de recherche et de filtres." onReinit={reinit}
      colonnes={[{cle:'reference',label:'Référence',editable:false},{cle:'requerant',label:'Requérant'},{cle:'province',label:'Province'},
        {cle:'etat',label:'État',editable:false,rendu:r=><Badge ton={r.etat==='Pièces manquantes'?'alerte':r.etat==='À instruire'?'info':r.etat==='En signature'?'succes':'neutre'}>{r.etat}</Badge>},
        {cle:'anciennete',label:'Ancienneté',type:'nombre',editable:false,rendu:r=><span style={{fontFamily:'var(--sdcd-font-mono)',fontWeight:r._retard?700:500,color:r._retard?'var(--sdcd-erreur)':'var(--sdcd-encre-2)',whiteSpace:'nowrap'}}>J+{r.anciennete}</span>},
        {cle:'montant',label:'Frais',editable:false}]}
      lignes={donnees}/>
    <div style={{marginTop:'var(--sdcd-3)',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>Les lignes à liseré rouge dépassent J+120, la règle cardinale du service. Sélection multiple → barre d’actions groupées ; ⋯ → actions de ligne ; « Colonnes » et « Compacte » configurent l’affichage.</div>
  </Coquille>;
}
const CIRCUIT=['Dépôt','Recevabilité','Paiement','Instruction','Vérification externe','Avis de la commission','Signature','Notification'];
const DOSSIER={ref:'MINESURSI/DSA/1602/02/0533/2026',requerant:'Divine Kahindo Masika',naissance:'14 mars 1998, Butembo (Nord-Kivu)',diplome:'Licence en sciences infirmières — Université catholique du Graben',pays:'Ouganda — Kampala International University',depot:'7 avril 2026',etape:4,anciennete:131,frais:'85 USD / 238 000 CDF — acquittés le 9 avril 2026'};
const PIECES=[
  {nom:'Diplôme original légalisé',type:'PDF',poids:'2,4 Mo',conforme:true},
  {nom:'Relevés de notes (4 années)',type:'PDF',poids:'5,1 Mo',conforme:true},
  {nom:'Traduction assermentée du diplôme',type:'PDF',poids:'1,2 Mo',conforme:false,motif:'La traduction n’est pas revêtue du sceau du traducteur agréé (art. 12 de l’arrêté).'},
  {nom:'Acte de naissance',type:'PDF',poids:'640 Ko',conforme:true},
  {nom:'Preuve de paiement des frais',type:'JPG',poids:'380 Ko',conforme:true}];
const COMMENTAIRES=[
  {qui:'Jean-Baptiste Ilunga Mwepu',quand:'11 août 2026, 14 h 20',texte:'Relance envoyée à la requérante pour la traduction conforme. Copie au chef de service.'},
  {qui:'Chantal Mbombo Kanku (cheffe DSA)',quand:'30 juin 2026, 09 h 05',texte:'Vérification d’authenticité demandée à Kampala International University — accusé reçu.'}];
function Ecran3({onNav}){
  const [rejet,setRejet]=React.useState(false);
  const [motif,setMotif]=React.useState('');
  const [errMotif,setErrMotif]=React.useState('');
  const [rejete,setRejete]=React.useState(false);
  const confirmerRejet=()=>{if(motif.trim().length<20){setErrMotif('Le motif est obligatoire (20 caractères minimum) : il figure sur la notification adressée au requérant.');return;}setErrMotif('');setRejet(false);setRejete(true);};
  const dl={display:'grid','--sdcd-cols':'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:'var(--sdcd-2) var(--sdcd-5)',fontSize:'var(--sdcd-sm)'};
  const dt={color:'var(--sdcd-muet)'};
  return <Coquille actif="Pièces à vérifier (318)" onNav={onNav}
    fil={['Accueil','Instruction','Demandes reçues','…/0533/2026']}
    titre={DOSSIER.requerant}
    sousTitre={<span style={{fontFamily:'var(--sdcd-font-mono)'}}>{DOSSIER.ref}</span>}
    actions={<React.Fragment>
      <Button icon="ri-checkbox-circle-line">Transmettre à la commission</Button>
      <Button variant="secondaire" icon="ri-mail-send-line">Demander un complément</Button>
      <Button variant="secondaire" icon="ri-close-circle-line" style={{color:'var(--sdcd-erreur)',borderColor:'var(--sdcd-erreur)'}} onClick={()=>setRejet(true)}>Rejeter</Button>
    </React.Fragment>}>
    <div style={{display:'flex',gap:'var(--sdcd-2)',alignItems:'center',flexWrap:'wrap',marginBottom:'var(--sdcd-5)'}}>
      <Badge ton="alerte">Pièces manquantes</Badge>
      <Badge ton="erreur">J+{DOSSIER.anciennete} — en retard</Badge>
      {rejete&&<Badge ton="erreur">Rejeté (démonstration)</Badge>}
    </div>
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',marginBottom:'var(--sdcd-4)',overflowX:'auto'}}>
      <ol style={{listStyle:'none',margin:0,padding:0,display:'flex',minWidth:760}} aria-label="Circuit de traitement — 8 étapes">
        {CIRCUIT.map((e,i)=>{const fait=i<DOSSIER.etape,cur=i===DOSSIER.etape;
          return <li key={i} aria-current={cur?'step':undefined} style={{flex:1,position:'relative',paddingTop:'var(--sdcd-5)'}}>
            <span aria-hidden="true" style={{position:'absolute',top:9,left:0,right:0,height:3,background:fait||cur?'var(--sdcd-action)':'var(--sdcd-ligne)'}}></span>
            <span aria-hidden="true" style={{position:'absolute',top:0,left:0,width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',background:fait||cur?'var(--sdcd-action)':'var(--sdcd-fond)',border:'2px solid '+(fait||cur?'var(--sdcd-action)':'var(--sdcd-ligne-forte)'),color:'var(--sdcd-fond)',fontSize:'var(--sdcd-xs)',fontWeight:700}}>{fait?<i className="ri-check-line"></i>:i+1}</span>
            <span style={{fontSize:'var(--sdcd-xs)',fontWeight:cur?700:500,color:cur?'var(--sdcd-texte)':'var(--sdcd-muet)',paddingRight:'var(--sdcd-2)',display:'block'}}>{e}</span>
          </li>;})}
      </ol>
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,560px),1.6fr))',gap:'var(--sdcd-4)',alignItems:'start'}}>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
        <Tabs onglets={['Synthèse','Pièces','Vérifications','Chronologie','Correspondances','Journal']}>
          <div>
            <div style={dl}>
              <span style={dt}>Requérante</span><strong>{DOSSIER.requerant}</strong>
              <span style={dt}>Naissance</span><span>{DOSSIER.naissance}</span>
              <span style={dt}>Diplôme présenté</span><span>{DOSSIER.diplome}</span>
              <span style={dt}>Établissement d’origine</span><span>{DOSSIER.pays}</span>
              <span style={dt}>Date de dépôt</span><span>{DOSSIER.depot} — <span style={{fontFamily:'var(--sdcd-font-mono)',fontWeight:700,color:'var(--sdcd-erreur)'}}>J+{DOSSIER.anciennete}</span></span>
              <span style={dt}>Frais</span><span>{DOSSIER.frais}</span>
            </div>
            <div style={{marginTop:'var(--sdcd-5)'}}>
              <Highlight taille="sm">Règle de substitution documentaire : toute pièce non conforme peut être remplacée une seule fois sans nouveaux frais, dans un délai de 60 jours après notification.</Highlight>
            </div>
          </div>
          <div>
            {PIECES.map((p,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:'var(--sdcd-4)',padding:'var(--sdcd-3) 0',borderBottom:'1px solid var(--sdcd-ligne)',flexWrap:'wrap'}}>
              <i className="ri-file-3-line" aria-hidden="true" style={{fontSize:'var(--sdcd-h4)',color:'var(--sdcd-action)'}}></i>
              <div style={{flex:1,minWidth:220}}>
                <div style={{fontWeight:600,fontSize:'var(--sdcd-sm)'}}>{p.nom}</div>
                <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{p.type} · {p.poids}</div>
                {!p.conforme&&<div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-erreur)',marginTop:'var(--sdcd-1)'}}><i className="ri-error-warning-line" aria-hidden="true"></i> {p.motif}</div>}
              </div>
              <Badge ton={p.conforme?'succes':'erreur'}>{p.conforme?'Conforme':'Non conforme'}</Badge>
              <Lien telechargement detail={p.type+' – '+p.poids} taille="sm">Télécharger</Lien>
            </div>)}
          </div>
          <div>
            <Alert type="alerte" titre="Vérification externe en attente depuis 47 jours">Demande d’authentification adressée à Kampala International University le 30 juin 2026. Relance automatique prévue à J+60 ; relance manuelle possible dès maintenant.</Alert>
            <div style={{marginTop:'var(--sdcd-4)'}}><Button variant="secondaire" size="sm" icon="ri-mail-send-line">Relancer l’établissement</Button></div>
          </div>
          <div><Tracking dossier={DOSSIER.ref} demarche="Demande d’équivalence — Licence en sciences infirmières" etapes={[
            {titre:'Dossier déposé et jugé recevable',detail:'Guichet unique de Kinshasa',date:'7 avril 2026',statut:'fait'},
            {titre:'Frais acquittés',detail:'85 USD / 238 000 CDF',date:'9 avril 2026',statut:'fait'},
            {titre:'Instruction ouverte',detail:'Affecté à J.-B. Ilunga Mwepu (DSA)',date:'2 mai 2026',statut:'fait'},
            {titre:'Vérification externe en cours',detail:'Kampala International University — J+47',date:'Depuis le 30 juin 2026',statut:'encours'},
            {titre:'Avis de la commission',detail:'',date:'',statut:'avenir'},
            {titre:'Signature et notification',detail:'',date:'',statut:'avenir'}]}/></div>
          <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>2 courriers émis : accusé de réception (7 avril 2026), demande de pièce conforme (11 août 2026). Modèles gérés dans les référentiels.</div>
          <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>Journal technique complet consultable par les administrateurs (écran « Journal d’audit »).</div>
        </Tabs>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)',minWidth:280}}>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Acteurs et délais</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-3)',fontSize:'var(--sdcd-sm)'}}>
            {[['Instructeur','J.-B. Ilunga Mwepu — DSA'],['Cheffe de service','Chantal Mbombo Kanku'],['Délai réglementaire','6 mois (échéance : 7 octobre 2026)'],['Prochaine relance auto','J+60 de la vérification externe']].map((l,i)=>
              <div key={i}><span style={{color:'var(--sdcd-muet)',display:'block',fontSize:'var(--sdcd-xs)'}}>{l[0]}</span><strong>{l[1]}</strong></div>)}
          </div>
        </div>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Commentaires internes</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
            {COMMENTAIRES.map((c,i)=><div key={i} style={{borderLeft:'3px solid var(--sdcd-ligne)',paddingLeft:'var(--sdcd-3)'}}>
              <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}><strong style={{color:'var(--sdcd-encre-2)'}}>{c.qui}</strong> · {c.quand}</div>
              <div style={{fontSize:'var(--sdcd-sm)',marginTop:'var(--sdcd-1)',lineHeight:1.55}}>{c.texte}</div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
    <Modal ouvert={rejet} titre="Rejeter la demande …/0533/2026" onClose={()=>setRejet(false)}
      actions={<React.Fragment><Button variant="secondaire" onClick={()=>setRejet(false)}>Annuler</Button>
        <Button style={{background:'var(--sdcd-erreur)'}} icon="ri-close-circle-line" onClick={confirmerRejet}>Confirmer le rejet</Button></React.Fragment>}>
      <p style={{marginTop:0}}>Le rejet est <strong>définitif</strong> et notifié à la requérante avec le motif ci-dessous. Les frais ne sont pas remboursés (art. 21 de l’arrêté).</p>
      <label style={{display:'block',fontWeight:500,marginBottom:'var(--sdcd-1)',color:'var(--sdcd-texte)'}}>Motif du rejet *</label>
      <textarea rows={4} value={motif} onChange={e=>setMotif(e.target.value)}
        style={{width:'100%',boxSizing:'border-box',fontFamily:'var(--sdcd-font)',fontSize:'var(--sdcd-sm)',lineHeight:1.5,padding:'var(--sdcd-2) var(--sdcd-3)',color:'var(--sdcd-texte)',background:'var(--sdcd-fond)',border:'1px solid '+(errMotif?'var(--sdcd-erreur)':'var(--sdcd-ligne-forte)'),resize:'vertical'}}></textarea>
      {errMotif&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:'var(--sdcd-1)'}}><i className="ri-error-warning-line" aria-hidden="true"></i> {errMotif}</div>}
    </Modal>
  </Coquille>;
}

// ——— Écran 4 : enregistrement d’une demande ———
const ETAPES4=['Identité','Diplômes','Pièces','Paiement','Récapitulatif'];
function Ecran4({onNav}){
  const [et,setEt]=React.useState(0);
  const [d,setD]=React.useState({province:'— Sélectionner —',pays:'— Sélectionner —',niveau:0,sexe:'',mode:'',tiers:false,devise:'USD'});
  const [errs,setErrs]=React.useState({});
  const [fini,setFini]=React.useState(false);
  const maj=(k,v)=>setD({...d,[k]:v});
  const LIBS={nom:'Nom et prénom du requérant',naissance:'Date de naissance',province:'Province de résidence',sexe:'Sexe',intitule:'Intitulé exact du diplôme',etab:'Établissement d’origine',pays:'Pays d’obtention',annee:'Année d’obtention',mode:'Mode de paiement'};
  const valider=(n)=>{const e={};
    if(n===0){if(!(d.nom||'').trim())e.nom='Ce champ est requis.';
      if(!d.naissance)e.naissance='Ce champ est requis.';
      if(d.province==='— Sélectionner —')e.province='Choisissez une province.';
      if(!d.sexe)e.sexe='Choisissez une option.';}
    if(n===1){if(!(d.intitule||'').trim())e.intitule='Ce champ est requis.';
      if(!(d.etab||'').trim())e.etab='Ce champ est requis.';
      if(d.pays==='— Sélectionner —')e.pays='Choisissez un pays.';
      if(!/^(19|20)\d{2}$/.test(d.annee||''))e.annee='Saisissez une année à 4 chiffres.';}
    if(n===3){if(!d.mode)e.mode='Choisissez un mode de paiement.';}
    setErrs(e);return Object.keys(e).length===0;};
  const suivant=()=>{if(et<4&&!valider(et))return;setEt(et+1);};
  const cles=Object.keys(errs);
  const ResumeErreurs=cles.length>0&&<div role="alert" style={{marginBottom:'var(--sdcd-4)'}}>
    <Alert type="erreur" titre={cles.length+' erreur'+(cles.length>1?'s':'')+' à corriger avant de continuer'}>
      <ul style={{margin:'var(--sdcd-1) 0 0',paddingLeft:'var(--sdcd-4)'}}>
        {cles.map(k=><li key={k}><a href={'#champ-'+k} style={{color:'inherit'}}>{LIBS[k]||k} — {errs[k]}</a></li>)}
      </ul>
    </Alert>
  </div>;
  const bloc={background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'};
  const dl={display:'grid','--sdcd-cols':'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:'var(--sdcd-2) var(--sdcd-5)',fontSize:'var(--sdcd-sm)'};
  return <Coquille actif="Demandes reçues (2 847)" onNav={onNav}
    fil={['Accueil','Instruction','Enregistrement d’une demande']}
    titre="Enregistrer une demande d’équivalence"
    sousTitre="Dépôt au guichet pour le compte d’un requérant · les champs marqués * sont obligatoires">
    <div className="sdcd-grid" style={{'--sdcd-cols':'240px minmax(0,720px)','--sdcd-cols-md':'minmax(0,1fr)',gap:'var(--sdcd-6)',alignItems:'start'}}>
      <ol style={{listStyle:'none',margin:0,padding:0}} aria-label="Étapes de l’enregistrement">
        {ETAPES4.map((t,i)=>{const fait=i<et,cur=i===et;
          return <li key={i} aria-current={cur?'step':undefined} style={{display:'flex',gap:'var(--sdcd-3)',position:'relative',paddingBottom:i<4?'var(--sdcd-6)':0}}>
            {i<4&&<span aria-hidden="true" style={{position:'absolute',left:11,top:26,bottom:0,width:2,background:fait?'var(--sdcd-action)':'var(--sdcd-ligne)'}}></span>}
            <span aria-hidden="true" style={{width:24,height:24,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:fait||cur?'var(--sdcd-action)':'var(--sdcd-fond)',border:'2px solid '+(fait||cur?'var(--sdcd-action)':'var(--sdcd-ligne-forte)'),color:'var(--sdcd-fond)',fontSize:'var(--sdcd-xs)',fontWeight:700,position:'relative',zIndex:1}}>{fait?<i className="ri-check-line"></i>:i+1}</span>
            <span style={{fontSize:'var(--sdcd-sm)',fontWeight:cur?700:500,color:cur?'var(--sdcd-texte)':'var(--sdcd-muet)',paddingTop:2}}>{t}</span>
          </li>;})}
      </ol>
      <div>
        {fini?<div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <Alert type="succes" titre="Demande enregistrée">Accusé de réception n° <strong style={{fontFamily:'var(--sdcd-font-mono)'}}>MINESURSI/DSA/AR-2026-01931</strong> — remis au requérant et envoyé par courriel. Le dossier entre en file d’instruction (ancienneté J+0).</Alert>
          <div style={{display:'flex',gap:'var(--sdcd-3)'}}>
            <Button icon="ri-printer-line">Imprimer l’accusé</Button>
            <Button variant="tertiaire" onClick={()=>{setFini(false);setEt(0);setD({province:'— Sélectionner —',pays:'— Sélectionner —',niveau:0,sexe:'',mode:'',tiers:false,devise:'USD'});}}>Nouvel enregistrement</Button>
          </div>
        </div>
        :<div>
          {ResumeErreurs}
          {et===0&&<div style={bloc}>
            <Toggle label="Je dépose pour le compte d’un tiers (mandat requis)" checked={d.tiers} onChange={v=>maj('tiers',v)}/>
            <div id="champ-nom"><Input label="Nom et prénom du requérant *" value={d.nom||''} error={errs.nom} onChange={e=>maj('nom',e.target.value)}/></div>
            <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:'var(--sdcd-4)'}}>
              <div id="champ-naissance"><Input label="Date de naissance *" type="date" value={d.naissance||''} error={errs.naissance} onChange={e=>maj('naissance',e.target.value)}/></div>
              <div id="champ-province"><Select label="Province de résidence *" options={['— Sélectionner —','Kinshasa','Kongo-Central','Haut-Katanga','Nord-Kivu','Sud-Kivu','Tshopo','Lualaba','Kasaï','Ituri']} value={d.province} error={errs.province} onChange={e=>maj('province',e.target.value)}/></div>
            </div>
            <fieldset id="champ-sexe" style={{border:'none',margin:0,padding:0}}>
              <legend style={{fontWeight:500,marginBottom:'var(--sdcd-2)',padding:0}}>Sexe *</legend>
              <div style={{display:'flex',gap:'var(--sdcd-5)'}}>
                <Radio name="sexe" label="Féminin" checked={d.sexe==='F'} onChange={()=>maj('sexe','F')}/>
                <Radio name="sexe" label="Masculin" checked={d.sexe==='M'} onChange={()=>maj('sexe','M')}/>
              </div>
              {errs.sexe&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:'var(--sdcd-2)'}}><i className="ri-error-warning-line" aria-hidden="true"></i> {errs.sexe}</div>}
            </fieldset>
            <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:'var(--sdcd-4)'}}>
              <Input label="Téléphone" hint="Format : +243 8X XXX XX XX" value={d.tel||''} onChange={e=>maj('tel',e.target.value)}/>
              <Input label="Numéro de dossier" hint="Attribué automatiquement à l’enregistrement." disabled defaultValue="—"/>
            </div>
          </div>}
          {et===1&&<div style={bloc}>
            <div id="champ-intitule"><Input label="Intitulé exact du diplôme *" hint="Tel qu’il figure sur le document original." value={d.intitule||''} error={errs.intitule} onChange={e=>maj('intitule',e.target.value)}/></div>
            <div id="champ-etab"><Input label="Établissement d’origine *" value={d.etab||''} error={errs.etab} onChange={e=>maj('etab',e.target.value)}/></div>
            <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:'var(--sdcd-4)'}}>
              <div id="champ-pays"><Select label="Pays d’obtention *" hint="Liste des pays reconnus par la nomenclature." options={['— Sélectionner —','Afrique du Sud','Belgique','Chine','France','Inde','Kenya','Maroc','Ouganda','Rwanda','Sénégal']} value={d.pays} error={errs.pays} onChange={e=>maj('pays',e.target.value)}/></div>
              <div id="champ-annee"><Input label="Année d’obtention *" hint={/^(19|20)\d{2}$/.test(d.annee||'')?'✓ Année valide':'Ex. : 2023'} value={d.annee||''} error={errs.annee} onChange={e=>maj('annee',e.target.value)}/></div>
            </div>
            <Segmented label="Niveau du diplôme" options={['Graduat','Licence','Master','Doctorat']} valeur={d.niveau} onChange={i=>maj('niveau',i)}/>
          </div>}
          {et===2&&<div style={bloc}>
            <Upload label="Diplôme original légalisé *" hint="PDF uniquement, 10 Mo maximum."/>
            <Upload label="Relevés de notes (toutes les années) *"/>
            <Upload label="Traduction assermentée" hint="Requise si le diplôme n’est pas en français — sceau du traducteur agréé obligatoire."/>
            <Checkbox label="Je certifie que les copies déposées sont conformes aux originaux présentés au guichet." checked={!!d.conforme} onChange={e=>maj('conforme',e.target.checked)}/>
          </div>}
          {et===3&&<div style={bloc}>
            <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,2fr) minmax(0,1fr)',gap:'var(--sdcd-4)',alignItems:'end'}}>
              <Input label="Montant des frais" disabled defaultValue={d.devise==='USD'?'85,00':'238 000'}/>
              <Select label="Devise" options={['USD','CDF']} value={d.devise} onChange={e=>maj('devise',e.target.value)}/>
            </div>
            <fieldset id="champ-mode" style={{border:'none',margin:0,padding:0}}>
              <legend style={{fontWeight:500,marginBottom:'var(--sdcd-2)',padding:0}}>Mode de paiement *</legend>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-2)'}}>
                <Radio name="mode" label="Virement bancaire (référence à joindre)" checked={d.mode==='banque'} onChange={()=>maj('mode','banque')}/>
                <Radio name="mode" label="Mobile money (M-Pesa, Orange Money, Airtel Money)" checked={d.mode==='mobile'} onChange={()=>maj('mode','mobile')}/>
                <Radio name="mode" label="Espèces au guichet (reçu délivré immédiatement)" checked={d.mode==='especes'} onChange={()=>maj('mode','especes')}/>
              </div>
              {errs.mode&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:'var(--sdcd-2)'}}><i className="ri-error-warning-line" aria-hidden="true"></i> {errs.mode}</div>}
            </fieldset>
            <Highlight taille="sm">Le barème est fixé par arrêté interministériel : 85 USD ou 238 000 CDF, non remboursables (art. 21).</Highlight>
          </div>}
          {et===4&&<div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
            {[['Identité',0,[['Requérant',d.nom],['Naissance',d.naissance],['Province',d.province],['Sexe',d.sexe==='F'?'Féminin':d.sexe==='M'?'Masculin':'']]],
              ['Diplômes',1,[['Diplôme',d.intitule],['Établissement',d.etab],['Pays',d.pays],['Année',d.annee],['Niveau',['Graduat','Licence','Master','Doctorat'][d.niveau]]]],
              ['Paiement',3,[['Montant',(d.devise==='USD'?'85,00 USD':'238 000 CDF')],['Mode',{banque:'Virement bancaire',mobile:'Mobile money',especes:'Espèces au guichet'}[d.mode]||'']]]].map(([titre,cible,lignes])=>
              <div key={titre} style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
                <div style={{display:'flex',alignItems:'center',marginBottom:'var(--sdcd-3)'}}>
                  <h2 style={{fontSize:'var(--sdcd-h4)',margin:0,flex:1}}>{titre}</h2>
                  <Button variant="tertiaire" size="sm" icon="ri-pencil-line" onClick={()=>setEt(cible)}>Modifier</Button>
                </div>
                <div style={dl}>{lignes.map((l,i)=><React.Fragment key={i}><span style={{color:'var(--sdcd-muet)'}}>{l[0]}</span><strong>{l[1]||'—'}</strong></React.Fragment>)}</div>
              </div>)}
            <Checkbox label="Le requérant atteste sur l’honneur l’exactitude des informations déclarées." checked={!!d.honneur} onChange={e=>maj('honneur',e.target.checked)}/>
          </div>}
          <div style={{display:'flex',gap:'var(--sdcd-3)',marginTop:'var(--sdcd-4)'}}>
            {et>0&&<Button variant="secondaire" icon="ri-arrow-left-line" onClick={()=>{setErrs({});setEt(et-1);}}>Précédent</Button>}
            {et<4&&<Button iconRight="ri-arrow-right-line" onClick={suivant}>Continuer</Button>}
            {et===4&&<Button icon="ri-send-plane-line" disabled={!d.honneur} onClick={()=>setFini(true)}>Enregistrer la demande</Button>}
          </div>
        </div>}
      </div>
    </div>
  </Coquille>;
}
// ——— Écran 10 : connexion (coquille réduite) ———
function Ecran10({onNav}){
  const [id,setId]=React.useState('');
  const [echec,setEchec]=React.useState(false);
  return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'var(--sdcd-fond-alt)',fontFamily:'var(--sdcd-font)'}}>
    <SkipLink cible="#contenu"/>
    <div style={{display:'flex',height:4}} aria-hidden="true"><div style={{flex:1,background:'var(--sdcd-bleu)'}}></div><div style={{flex:1,background:'var(--sdcd-jaune)'}}></div><div style={{flex:1,background:'var(--sdcd-rouge)'}}></div></div>
    <header style={{background:'var(--sdcd-fond)',borderBottom:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-3) var(--sdcd-5)'}}>
      <BlocMarque entite="MINESURSI" sousTitre="Équivalences de diplômes — back-office" taille={44} assetsBase="../../"/>
    </header>
    <main id="contenu" style={{flex:1,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'var(--sdcd-8) var(--sdcd-5)'}}>
      <div style={{width:'min(440px,100%)'}}>
        <h1 style={{fontSize:'var(--sdcd-h2)',margin:'0 0 var(--sdcd-2)'}}>Connexion des agents</h1>
        <p style={{color:'var(--sdcd-muet)',fontSize:'var(--sdcd-sm)',margin:'0 0 var(--sdcd-5)'}}>Accès nominatif, tracé au journal d’audit.</p>
        {echec&&<div aria-live="assertive" style={{marginBottom:'var(--sdcd-4)'}}>
          <Alert type="erreur" titre="Échec de l’authentification" onClose={()=>setEchec(false)}>Identifiant ou mot de passe incorrect. Au 3ᵉ échec, le compte est suspendu 15 minutes.</Alert>
        </div>}
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-6)',display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <ConnectButton service="CongoConnect Agents" assetsBase="../../" onClick={()=>onNav('Tableau de bord')}/>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-3)'}} aria-hidden="true">
            <span style={{flex:1,height:1,background:'var(--sdcd-ligne)'}}></span>
            <span style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontWeight:600}}>ou</span>
            <span style={{flex:1,height:1,background:'var(--sdcd-ligne)'}}></span>
          </div>
          <Input label="Identifiant agent" hint="Ex. : ji.mwepu@minesursi.gouv.cd" value={id} onChange={e=>setId(e.target.value)}/>
          <Password/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Checkbox label="Poste de confiance"/>
            <a href="#" style={{fontSize:'var(--sdcd-xs)'}}>Mot de passe oublié ?</a>
          </div>
          <Button style={{justifyContent:'center'}} onClick={()=>{id.trim()?onNav('Tableau de bord'):setEchec(true);}}>Se connecter</Button>
        </div>
        <div style={{marginTop:'var(--sdcd-4)'}}>
          <Alert type="info" titre="Usage réservé">Cet outil est réservé aux agents habilités du MINESURSI. Toute connexion vaut acceptation de la charte d’usage du système d’information de l’État.</Alert>
        </div>
      </div>
    </main>
    <footer style={{background:'var(--sdcd-fond)',borderTop:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-3) var(--sdcd-5)',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>MINESURSI — back-office des équivalences · v1.0 · SDCD</footer>
  </div>;
}

// ——— Écran 5 : parapheur électronique (visionneuse + outils) ———
const PARAPHEUR=[
  {ref:'MINESURSI/DSA/1602/02/0688/2026',requerant:'Christian Mbuyi Tshimanga',diplome:'Master en gestion — University of Cape Town',type:'Arrêté d’équivalence',num:'2026/0812',priorite:'Haute',attente:9},
  {ref:'MINESURSI/DSA/1602/02/0187/2026',requerant:'Trésor Bemba Lokonga',diplome:'Licence en économie — Makerere University',type:'Arrêté d’équivalence',num:'2026/0813',priorite:'Normale',attente:6},
  {ref:'MINESURSI/DSA/1602/02/0290/2026',requerant:'Rachel Ilunga Numbi',diplome:'Bachelor informatique — University of Nairobi',type:'Rejet motivé',num:'2026/0814',priorite:'Normale',attente:4},
  {ref:'MINESURSI/DSA/1602/02/0102/2026',requerant:'Gédéon Kasongo Nyembo',diplome:'Licence génie civil — Makerere University',type:'Arrêté d’équivalence',num:'2026/0815',priorite:'Basse',attente:2}];
function Ecran5({onNav}){
  const [sel,setSel]=React.useState(0);
  const [zoom,setZoom]=React.useState(1);
  const [pageDoc,setPageDoc]=React.useState(1);
  const [modale,setModale]=React.useState(null); // 'signer' | 'renvoyer'
  const [lu,setLu]=React.useState(false);
  const [motifRenvoi,setMotifRenvoi]=React.useState('');
  const [errRenvoi,setErrRenvoi]=React.useState('');
  const [etats,setEtats]=React.useState({}); // i -> 'signé' | 'visé' | 'renvoyé'
  const [annotations,setAnnotations]=React.useState({0:[{qui:'Chantal Mbombo Kanku',quand:'Hier, 17 h 10',texte:'PV de commission joint en annexe 2 — conforme.'}]});
  const [texteAnnot,setTexteAnnot]=React.useState('');
  const doc=PARAPHEUR[sel];
  const etat=etats[sel];
  const annots=annotations[sel]||[];
  const poserEtat=(v)=>setEtats({...etats,[sel]:v});
  const signer=()=>{setModale(null);setLu(false);poserEtat('signé');};
  const renvoyer=()=>{if(motifRenvoi.trim().length<20){setErrRenvoi('Précisez le motif du renvoi (20 caractères minimum) — il est transmis à l’instructeur.');return;}
    setErrRenvoi('');setModale(null);setMotifRenvoi('');poserEtat('renvoyé');};
  const annoter=()=>{if(!texteAnnot.trim())return;
    setAnnotations({...annotations,[sel]:[...annots,{qui:AGENT.nom,quand:'À l’instant',texte:texteAnnot.trim()}]});setTexteAnnot('');};
  const nbSignes=Object.values(etats).filter(v=>v==='signé').length;
  const outil={display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,background:'none',border:'1px solid var(--sdcd-ligne)',color:'var(--sdcd-action)',fontFamily:'inherit',fontSize:'var(--sdcd-xs)',fontWeight:600,padding:'6px 10px',cursor:'pointer'};
  return <Coquille actif="File de signature (34)" onNav={onNav}
    fil={['Accueil','Décision','File de signature']}
    titre="Parapheur électronique" sousTitre="34 documents en attente · certificat SG-MINESURSI-2026, valide jusqu’au 12 janvier 2027">
    <div style={{marginBottom:'var(--sdcd-4)'}}>
      <Alert type="alerte" titre="Signature déléguée — en mission">Le Secrétaire général est en mission du 14 au 18 août ; délégation active au profit de la Directrice de cabinet (arrêté n° 2026/044). Les actes portent la mention « pour ordre ».</Alert>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:'var(--sdcd-4)',alignItems:'flex-start'}}>
      <div style={{flex:'1 1 280px',minWidth:0,background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)'}}>
        <div style={{display:'flex',alignItems:'center',padding:'var(--sdcd-3) var(--sdcd-4)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
          <h2 style={{fontSize:'var(--sdcd-sm)',margin:0,flex:1}}>File d’attente</h2>
          <Badge ton="info">{(34-nbSignes)+' restants'}</Badge>
        </div>
        <div style={{padding:'var(--sdcd-3) var(--sdcd-4)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginBottom:'var(--sdcd-1)'}}>
            <span>Lot du jour</span><span style={{fontFamily:'var(--sdcd-font-mono)'}}>{nbSignes} / 4</span>
          </div>
          <div style={{height:6,background:'var(--sdcd-ligne)'}}><div style={{width:(nbSignes/4*100)+'%',height:'100%',background:'var(--sdcd-succes)',transition:'width var(--sdcd-transition)'}}></div></div>
        </div>
        <ol style={{listStyle:'none',margin:0,padding:0}}>
          {PARAPHEUR.map((p,i)=><li key={i}>
            <button onClick={()=>{setSel(i);setPageDoc(1);}} aria-pressed={sel===i}
              style={{display:'flex',width:'100%',alignItems:'center',gap:'var(--sdcd-3)',padding:'var(--sdcd-3) var(--sdcd-4)',background:sel===i?'var(--sdcd-bleu-pale)':'none',border:'none',borderLeft:'3px solid '+(sel===i?'var(--sdcd-action)':'transparent'),borderBottom:'1px solid var(--sdcd-ligne)',fontFamily:'inherit',cursor:'pointer',textAlign:'left'}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-texte)'}}>{p.requerant}</div>
                <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{p.type} · J+{p.attente}</div>
              </div>
              {etats[i]==='signé'?<Badge ton="succes">Signé</Badge>:etats[i]==='renvoyé'?<Badge ton="erreur">Renvoyé</Badge>:etats[i]==='visé'?<Badge ton="info">Visé</Badge>:<Badge ton={p.priorite==='Haute'?'erreur':p.priorite==='Normale'?'info':'neutre'}>{p.priorite}</Badge>}
            </button>
          </li>)}
        </ol>
        <div style={{padding:'var(--sdcd-3) var(--sdcd-4)'}}>
          <div className="sdcd-eyebrow" style={{marginBottom:'var(--sdcd-2)'}}>Historique</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',lineHeight:1.8}}>
            Hier 16 h 30 — lot 2026-118 : 34 actes (SG)<br/>12 août 17 h 02 — lot 2026-117 : 28 actes (SG)<br/>11 août 16 h 45 — lot 2026-116 : 31 actes (p.o. Dir. cab.)
          </div>
        </div>
      </div>
      <div style={{flex:'999 1 420px',minWidth:0,background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)',padding:'var(--sdcd-2) var(--sdcd-4)',borderBottom:'1px solid var(--sdcd-ligne)',flexWrap:'wrap'}}>
          <span style={{fontSize:'var(--sdcd-xs)',fontWeight:700,flex:1,minWidth:160}}>{doc.type} n° {doc.num}</span>
          <button style={outil} aria-label="Réduire" onClick={()=>setZoom(Math.max(0.75,zoom-0.125))}><i className="ri-zoom-out-line"></i></button>
          <span style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)',color:'var(--sdcd-muet)',minWidth:44,textAlign:'center'}}>{Math.round(zoom*100)} %</span>
          <button style={outil} aria-label="Agrandir" onClick={()=>setZoom(Math.min(1.5,zoom+0.125))}><i className="ri-zoom-in-line"></i></button>
          <span style={{width:1,height:20,background:'var(--sdcd-ligne)'}} aria-hidden="true"></span>
          <button style={outil} aria-label="Page précédente" disabled={pageDoc<=1} onClick={()=>setPageDoc(1)}><i className="ri-arrow-left-s-line"></i></button>
          <span style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)',color:'var(--sdcd-muet)'}}>{pageDoc} / 2</span>
          <button style={outil} aria-label="Page suivante" disabled={pageDoc>=2} onClick={()=>setPageDoc(2)}><i className="ri-arrow-right-s-line"></i></button>
          <span style={{width:1,height:20,background:'var(--sdcd-ligne)'}} aria-hidden="true"></span>
          <button style={outil}><i className="ri-download-line"></i>PDF</button>
        </div>
        <div style={{background:'var(--sdcd-fond-alt)',padding:'var(--sdcd-5)',overflow:'auto',maxHeight:640}}>
          <div style={{width:'min(620px,100%)',margin:'0 auto',transform:'scale('+zoom+')',transformOrigin:'top center'}}>
            <div style={{background:'var(--sdcd-fond)',boxShadow:'var(--sdcd-ombre)',padding:'var(--sdcd-7) var(--sdcd-6)',fontSize:'var(--sdcd-sm)',lineHeight:1.75,color:'var(--sdcd-encre)'}}>
              {pageDoc===1?<div>
                <div style={{textAlign:'center'}}>
                  <div style={{textTransform:'uppercase',fontWeight:700,letterSpacing:'.06em',fontSize:'var(--sdcd-xs)'}}>République Démocratique du Congo</div>
                  <div style={{fontStyle:'italic',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>Justice · Paix · Travail</div>
                  <div style={{textTransform:'uppercase',fontWeight:600,fontSize:'var(--sdcd-xs)',marginTop:'var(--sdcd-2)'}}>Ministère de l’Enseignement Supérieur, Universitaire,<br/>Recherche Scientifique et Innovations</div>
                  <div aria-hidden="true" style={{display:'flex',height:3,width:120,margin:'var(--sdcd-3) auto'}}><span style={{flex:1,background:'var(--sdcd-bleu)'}}></span><span style={{flex:1,background:'var(--sdcd-jaune)'}}></span><span style={{flex:1,background:'var(--sdcd-rouge)'}}></span></div>
                  <div style={{fontWeight:700,margin:'var(--sdcd-4) 0'}}>{doc.type.toUpperCase()} N° {doc.num}<br/><span style={{fontWeight:400,fontSize:'var(--sdcd-xs)'}}>portant {doc.type==='Rejet motivé'?'rejet d’une demande':'reconnaissance'} d’équivalence de diplôme étranger</span></div>
                </div>
                <p style={{margin:'0 0 var(--sdcd-2)'}}><strong>Le Secrétaire général,</strong></p>
                <p style={{margin:'0 0 var(--sdcd-2)'}}>Vu la loi-cadre n° 14/004 du 11 février 2014 de l’enseignement national ;</p>
                <p style={{margin:'0 0 var(--sdcd-2)'}}>Vu l’arrêté ministériel fixant la procédure d’équivalence des diplômes étrangers ;</p>
                <p style={{margin:'0 0 var(--sdcd-2)'}}>Vu l’avis {doc.type==='Rejet motivé'?'défavorable':'favorable'} de la Commission d’équivalence du 12 août 2026 (PV n° 2026-119) ;</p>
                <p style={{margin:'0 0 var(--sdcd-4)'}}>Vu le dossier <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>{doc.ref}</span> ;</p>
                <p style={{margin:'0 0 var(--sdcd-2)',textAlign:'center',fontWeight:700}}>DÉCIDE :</p>
                <p style={{margin:'0 0 var(--sdcd-2)'}}><strong>Article 1er.</strong> Le diplôme de {doc.diplome}, présenté par {doc.requerant}, est {doc.type==='Rejet motivé'?'rejeté pour les motifs repris en annexe':'reconnu équivalent au grade correspondant de l’enseignement supérieur congolais'}.</p>
                <p style={{margin:0}}><strong>Article 2.</strong> La présente décision est notifiée au requérant et publiée au registre national des équivalences.</p>
              </div>
              :<div>
                <p style={{margin:'0 0 var(--sdcd-2)'}}><strong>Article 3.</strong> Le Directeur des services académiques est chargé de l’exécution de la présente décision, qui entre en vigueur à la date de sa signature.</p>
                <p style={{margin:'0 0 var(--sdcd-5)'}}>Fait à Kinshasa, le 16 août 2026.</p>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  {etat==='signé'?<div role="img" aria-label="Cachet de signature électronique" style={{border:'2px solid var(--sdcd-succes)',padding:'var(--sdcd-3) var(--sdcd-4)',maxWidth:300}}>
                    <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)',color:'var(--sdcd-succes)',fontWeight:700,fontSize:'var(--sdcd-xs)'}}><i className="ri-shield-check-line"></i>SIGNÉ ÉLECTRONIQUEMENT</div>
                    <div style={{fontSize:'var(--sdcd-xs)',marginTop:'var(--sdcd-1)',lineHeight:1.6}}>p.o. La Directrice de cabinet<br/>16 août 2026, 10 h 12 · certificat <span style={{fontFamily:'var(--sdcd-font-mono)'}}>SG-MINESURSI-2026</span><br/>Empreinte <span style={{fontFamily:'var(--sdcd-font-mono)'}}>SHA-256 b4e2…91af</span></div>
                  </div>
                  :<div style={{border:'2px dashed var(--sdcd-ligne-forte)',padding:'var(--sdcd-4) var(--sdcd-5)',color:'var(--sdcd-inactif)',fontSize:'var(--sdcd-xs)',textAlign:'center',maxWidth:300}}>
                    Zone de signature<br/>Le Secrétaire général<br/>(ou son délégataire)
                  </div>}
                </div>
                {etat==='renvoyé'&&<div style={{marginTop:'var(--sdcd-4)'}}><Alert type="erreur" titre="Renvoyé à l’instruction">Le document est retourné à la DSA avec le motif transmis ; il quitte la file de signature.</Alert></div>}
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div style={{flex:'1 1 300px',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-4)',display:'flex',flexDirection:'column',gap:'var(--sdcd-2)'}}>
          <h2 style={{fontSize:'var(--sdcd-sm)',margin:'0 0 var(--sdcd-1)'}}>Outils de signature</h2>
          <Button icon="ri-quill-pen-line" disabled={!!etat} onClick={()=>setModale('signer')} style={{justifyContent:'center'}}>{etat==='signé'?'Document signé':'Signer'}</Button>
          <Button variant="secondaire" icon="ri-edit-2-line" disabled={!!etat} onClick={()=>poserEtat('visé')} style={{justifyContent:'center'}}>Viser (paraphe JI)</Button>
          <Button variant="secondaire" icon="ri-arrow-go-back-line" disabled={etat==='signé'||etat==='renvoyé'} onClick={()=>setModale('renvoyer')} style={{justifyContent:'center',color:'var(--sdcd-erreur)',borderColor:'var(--sdcd-erreur)'}}>Renvoyer à l’instruction</Button>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:'var(--sdcd-1)'}}>Le visa appose vos initiales sans valeur décisoire ; la signature scelle l’acte définitivement.</div>
        </div>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-4)'}}>
          <h2 style={{fontSize:'var(--sdcd-sm)',margin:'0 0 var(--sdcd-3)'}}>Annotations ({annots.length})</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-3)',maxHeight:200,overflowY:'auto'}}>
            {annots.length===0&&<div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-inactif)'}}>Aucune annotation sur ce document.</div>}
            {annots.map((c,i)=><div key={i} style={{borderLeft:'3px solid var(--sdcd-bleu-teinte)',paddingLeft:'var(--sdcd-3)'}}>
              <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}><strong style={{color:'var(--sdcd-encre-2)'}}>{c.qui}</strong> · {c.quand}</div>
              <div style={{fontSize:'var(--sdcd-xs)',lineHeight:1.55,marginTop:2}}>{c.texte}</div>
            </div>)}
          </div>
          <div style={{marginTop:'var(--sdcd-3)'}}>
            <label htmlFor="annot" style={{fontSize:'var(--sdcd-xs)',fontWeight:600,display:'block',marginBottom:'var(--sdcd-1)'}}>Ajouter une annotation interne</label>
            <textarea id="annot" rows={2} value={texteAnnot} onChange={e=>setTexteAnnot(e.target.value)}
              style={{width:'100%',boxSizing:'border-box',fontFamily:'inherit',fontSize:'var(--sdcd-xs)',lineHeight:1.5,padding:'var(--sdcd-2)',color:'var(--sdcd-texte)',background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne-forte)',resize:'vertical'}}></textarea>
            <Button size="sm" variant="secondaire" icon="ri-chat-new-line" onClick={annoter} style={{marginTop:'var(--sdcd-2)'}}>Annoter</Button>
          </div>
        </div>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-4)',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',lineHeight:1.7}}>
          <div className="sdcd-eyebrow" style={{marginBottom:'var(--sdcd-2)'}}>Certificat</div>
          <span style={{fontFamily:'var(--sdcd-font-mono)'}}>SG-MINESURSI-2026</span> · émis par l’Infrastructure nationale de confiance · expire le 12 janvier 2027.
        </div>
      </div>
    </div>
    <Modal ouvert={modale==='signer'} titre={'Signer — '+doc.type+' n° '+doc.num} onClose={()=>{setModale(null);setLu(false);}}
      actions={<React.Fragment><Button variant="secondaire" onClick={()=>{setModale(null);setLu(false);}}>Annuler</Button><Button icon="ri-quill-pen-line" disabled={!lu} onClick={signer}>Signer et sceller définitivement</Button></React.Fragment>}>
      <p style={{marginTop:0}}>La signature électronique est <strong>définitive</strong> : l’acte est scellé, horodaté, notifié à {doc.requerant} et publié au registre.</p>
      <Checkbox label="J’ai lu l’intégralité du document et j’en approuve les termes." checked={lu} onChange={e=>setLu(e.target.checked)}/>
    </Modal>
    <Modal ouvert={modale==='renvoyer'} titre={'Renvoyer à l’instruction — '+doc.requerant} onClose={()=>setModale(null)}
      actions={<React.Fragment><Button variant="secondaire" onClick={()=>setModale(null)}>Annuler</Button><Button style={{background:'var(--sdcd-erreur)'}} icon="ri-arrow-go-back-line" onClick={renvoyer}>Renvoyer le document</Button></React.Fragment>}>
      <p style={{marginTop:0}}>Le document quitte la file de signature et retourne à la DSA. Le motif ci-dessous est transmis à l’instructeur et consigné au journal d’audit.</p>
      <label htmlFor="motif-renvoi" style={{display:'block',fontWeight:500,marginBottom:'var(--sdcd-1)'}}>Motif du renvoi *</label>
      <textarea id="motif-renvoi" rows={4} value={motifRenvoi} onChange={e=>setMotifRenvoi(e.target.value)}
        style={{width:'100%',boxSizing:'border-box',fontFamily:'var(--sdcd-font)',fontSize:'var(--sdcd-sm)',lineHeight:1.5,padding:'var(--sdcd-2) var(--sdcd-3)',color:'var(--sdcd-texte)',background:'var(--sdcd-fond)',border:'1px solid '+(errRenvoi?'var(--sdcd-erreur)':'var(--sdcd-ligne-forte)'),resize:'vertical'}}></textarea>
      {errRenvoi&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:'var(--sdcd-1)'}}><i className="ri-error-warning-line" aria-hidden="true"></i> {errRenvoi}</div>}
    </Modal>
  </Coquille>;
}
// ——— Écran 8 : statistiques et pilotage ———
function Ecran8({onNav}){
  const [periode,setPeriode]=React.useState(1);
  const KPI8=[['Dossiers déposés','415','− 31 % vs juillet','alerte'],['Décisions rendues','506','+ 12 %','succes'],['Délai médian','4,2 mois','− 0,3 mois','succes'],['Taux d’avis favorables','86 %','stable','neutre'],['Dossiers en retard','318','+ 15 %','alerte'],['Recettes du mois','35 275 USD','+ 9 %','succes']];
  return <Coquille actif="Statistiques" onNav={onNav}
    fil={['Accueil','Pilotage','Statistiques']}
    titre="Statistiques et pilotage" sousTitre="Données arrêtées au 15 août 2026 à 06 h 00 · comparaison avec la période précédente"
    actions={<Dropdown libelle="Exporter le rapport" items={[{libelle:'Rapport complet (PDF)',icone:'ri-file-pdf-2-line'},{libelle:'Données (CSV)',icone:'ri-file-excel-2-line'}]}/>}>
    <div style={{marginBottom:'var(--sdcd-5)'}}>
      <Segmented label="Période" options={['7 derniers jours','30 derniers jours','Trimestre','Année 2026']} valeur={periode} onChange={setPeriode}/>
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(190px,1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-5)'}}>
      {KPI8.map((k,i)=><div key={i} style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-4)'}}>
        <div style={{fontSize:'var(--sdcd-h3)',fontWeight:700,fontFamily:'var(--sdcd-font-mono)',letterSpacing:'var(--sdcd-tracking-titre)'}}>{k[1]}</div>
        <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',margin:'var(--sdcd-1) 0 var(--sdcd-2)'}}>{k[0]}</div>
        <Badge ton={k[3]}>{k[2]}</Badge>
      </div>)}
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,440px),1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-4)'}}>
      <LineChart titre="Délai moyen par étape (jours)" unite="jours" hauteur={230} source="Registre national des équivalences, 15 août 2026"
        categories={['Recevabilité','Paiement','Instruction','Vérif. externe','Commission','Signature']}
        series={[{nom:'Août 2026',valeurs:[3,2,38,47,21,9]},{nom:'Juillet 2026',valeurs:[4,2,41,52,24,12]}]}/>
      <BarChart titre="Dossiers déposés par province (top 8)" unite="dossiers" hauteur={230} source="Registre national des équivalences, 15 août 2026"
        categories={['Kinshasa','Ht-Katanga','Nord-Kivu','Kongo-Ctl','Sud-Kivu','Tshopo','Lualaba','Ituri']}
        series={[{nom:'Depuis janvier',valeurs:[1184,412,367,298,236,158,131,94]}]}/>
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,440px),1fr))',gap:'var(--sdcd-4)'}}>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-1)'}}>Entonnoir des dossiers par état</h2>
        <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginBottom:'var(--sdcd-4)'}}>Cohorte des 3 202 dossiers déposés depuis janvier 2026</div>
        {[['Déposés',3202],['Recevables',3040],['Payés',2986],['Instruits',2214],['Passés en commission',1648],['Décidés',1519]].map((e,i)=>
          <div key={i} style={{marginBottom:'var(--sdcd-3)'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'var(--sdcd-xs)',marginBottom:'var(--sdcd-1)'}}>
              <span style={{fontWeight:600}}>{e[0]}</span>
              <span style={{fontFamily:'var(--sdcd-font-mono)',color:'var(--sdcd-muet)'}}>{String(e[1]).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202F')} · {Math.round(e[1]/3202*100)} %</span>
            </div>
            <div style={{height:14,background:'var(--sdcd-fond-alt)'}}><div style={{width:(e[1]/3202*100)+'%',height:'100%',background:i<2?'var(--sdcd-bleu-teinte)':i<4?'var(--sdcd-bleu)':'var(--sdcd-bleu-profond)'}}></div></div>
          </div>)}
      </div>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Performance par service (micro-barres)</h2>
        <Table colonnes={['Service','Décisions','Délai médian','Charge']}
          lignes={[['DSA — Kinshasa','312','3,9 mois',<div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)'}}><div style={{width:90,height:8,background:'var(--sdcd-fond-alt)'}}><div style={{width:'82%',height:'100%',background:'var(--sdcd-erreur)'}}></div></div><span style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)'}}>82 %</span></div>],
            ['Antenne de Lubumbashi','98','4,4 mois',<div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)'}}><div style={{width:90,height:8,background:'var(--sdcd-fond-alt)'}}><div style={{width:'61%',height:'100%',background:'var(--sdcd-alerte)'}}></div></div><span style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)'}}>61 %</span></div>],
            ['Antenne de Goma','64','5,1 mois',<div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)'}}><div style={{width:90,height:8,background:'var(--sdcd-fond-alt)'}}><div style={{width:'44%',height:'100%',background:'var(--sdcd-succes)'}}></div></div><span style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)'}}>44 %</span></div>],
            ['Antenne de Matadi','32','4,0 mois',<div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-2)'}}><div style={{width:90,height:8,background:'var(--sdcd-fond-alt)'}}><div style={{width:'37%',height:'100%',background:'var(--sdcd-succes)'}}></div></div><span style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)'}}>37 %</span></div>]]}/>
      </div>
    </div>
  </Coquille>;
}

// ——— Écran 6 : référentiels et configuration ———
function Ecran6({onNav}){
  const [avert,setAvert]=React.useState(false);
  const [regles,setRegles]=React.useState([
    {nom:'Diplôme original légalisé',oblig:true,actif:true},
    {nom:'Relevés de notes (toutes années)',oblig:true,actif:true},
    {nom:'Traduction assermentée',oblig:false,actif:true},
    {nom:'Attestation de service (VAE)',oblig:false,actif:false}]);
  const basculer=(i,k)=>{setAvert(true);setRegles(regles.map((r,n)=>n===i?{...r,[k]:!r[k]}:r));};
  return <Coquille actif="Référentiels" onNav={onNav}
    fil={['Accueil','Pilotage','Référentiels']}
    titre="Référentiels et configuration du circuit" sousTitre="Modifications tracées et applicables aux nouveaux dossiers uniquement"
    actions={<Button icon="ri-add-line">Ajouter une règle</Button>}>
    {avert&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-4)'}}>
      <Alert type="alerte" titre="Règle de production modifiée" onClose={()=>setAvert(false)}>La modification prend effet pour les dossiers déposés à partir de demain 00 h 00 ; elle est consignée au journal d’audit avec votre identité.</Alert>
    </div>}
    <div className="sdcd-grid" style={{'--sdcd-cols':'240px minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:'var(--sdcd-5)',alignItems:'start'}}>
      <Sidemenu titre="Référentiels" sections={[{liens:['Pièces exigées','États et transitions','Frais','Modèles de courrier','Établissements']}]} actif="Pièces exigées"/>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)'}}>
          <div style={{padding:'var(--sdcd-4) var(--sdcd-5)',borderBottom:'1px solid var(--sdcd-ligne)'}}><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Pièces exigées — équivalence de diplôme étranger</h2></div>
          {regles.map((r,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:'var(--sdcd-4)',padding:'var(--sdcd-3) var(--sdcd-5)',borderBottom:'1px solid var(--sdcd-ligne)',flexWrap:'wrap'}}>
            <i className="ri-draggable" aria-hidden="true" style={{color:'var(--sdcd-inactif)'}}></i>
            <span style={{flex:1,minWidth:200,fontWeight:600,fontSize:'var(--sdcd-sm)',color:r.actif?'var(--sdcd-texte)':'var(--sdcd-inactif)'}}>{r.nom}</span>
            <Checkbox label="Obligatoire" checked={r.oblig} onChange={()=>basculer(i,'oblig')}/>
            <Toggle label={r.actif?'Active':'Inactive'} checked={r.actif} onChange={()=>basculer(i,'actif')}/>
          </div>)}
        </div>
        <Accordion items={[
          {titre:'Transition : Instruction → Vérification externe',contenu:'Garde : toutes les pièces conformes. Effets : notification à l’établissement d’origine, gel du délai réglementaire, relance automatique à J+60.'},
          {titre:'Transition : Vérification externe → Avis de la commission',contenu:'Garde : réponse d’authenticité reçue OU J+90 atteint avec avis motivé de l’instructeur. Effets : inscription au prochain ordre du jour.'},
          {titre:'Transition : Avis favorable → Signature',contenu:'Garde : procès-verbal de la commission signé. Effets : génération de l’arrêté, entrée en file de signature.'}]}/>
      </div>
    </div>
  </Coquille>;
}
// ——— Écran 7 : agents et habilitations ———
function Ecran7({onNav}){
  const [inviter,setInviter]=React.useState(false);
  const [invite,setInvite]=React.useState(false);
  const DROITS=[['Consulter les dossiers',[1,1,1,1]],['Instruire et commenter',[1,1,0,0]],['Transmettre à la commission',[0,1,0,0]],['Signer les arrêtés',[0,0,1,0]],['Modifier les référentiels',[0,0,0,1]],['Gérer les habilitations',[0,0,0,1]]];
  const ROLES=['Instructeur','Chef de service','Signataire','Administrateur'];
  return <Coquille actif="Agents et habilitations" onNav={onNav}
    fil={['Accueil','Pilotage','Agents et habilitations']}
    titre="Agents et habilitations" sousTitre="14 agents actifs · dernière revue des droits : 1er juillet 2026"
    actions={<Button icon="ri-user-add-line" onClick={()=>setInviter(true)}>Inviter un agent</Button>}>
    {invite&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-4)'}}><Alert type="succes" titre="Invitation envoyée" onClose={()=>setInvite(false)}>L’agent recevra un lien d’activation valable 72 h ; le compte reste « en attente » jusqu’à sa première connexion.</Alert></div>}
    <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
      <DataTable titre="Annuaire des agents" parPage={5} exportable={false} editable={false}
        colonnes={[{cle:'agent',label:'Agent'},{cle:'service',label:'Service'},{cle:'role',label:'Rôle'},{cle:'connexion',label:'Dernière connexion'},{cle:'statut',label:'Statut'}]}
        lignes={[
          {agent:'Jean-Baptiste Ilunga Mwepu',service:'DSA — Kinshasa',role:'Instructeur',connexion:'Aujourd’hui, 08 h 02',statut:'Actif'},
          {agent:'Chantal Mbombo Kanku',service:'DSA — Kinshasa',role:'Chef de service',connexion:'Aujourd’hui, 07 h 45',statut:'Actif'},
          {agent:'Papy Mokonzi Bolia',service:'Antenne de Lubumbashi',role:'Instructeur',connexion:'Hier, 16 h 20',statut:'Actif'},
          {agent:'Henriette Safi Ngalula',service:'Antenne de Goma',role:'Instructeur',connexion:'13 août, 11 h 08',statut:'Actif'},
          {agent:'Blaise Kalombo Mutombo',service:'Secrétariat général',role:'Signataire',connexion:'Hier, 16 h 30',statut:'Actif'},
          {agent:'Nadine Bokele Wembo',service:'DSA — Kinshasa',role:'Administrateur',connexion:'12 août, 09 h 12',statut:'Actif'},
          {agent:'Alphonse Ngoyi Kasanji',service:'Antenne de Matadi',role:'Instructeur',connexion:'28 juillet, 10 h 40',statut:'Suspendu'}]}/>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',overflowX:'auto'}}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-1)'}}>Matrice des droits par rôle</h2>
        <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginBottom:'var(--sdcd-3)'}}>Les rôles sont attribués par l’administrateur ; un agent ne cumule qu’un rôle à la fois.</div>
        <Table colonnes={['Action',...ROLES]}
          lignes={DROITS.map(d=>[d[0],...d[1].map((v,i)=><i key={i} className={v?'ri-checkbox-circle-fill':'ri-close-circle-line'} aria-label={v?'Autorisé':'Refusé'} style={{fontSize:'var(--sdcd-h4)',color:v?'var(--sdcd-succes)':'var(--sdcd-inactif)'}}></i>)])}/>
        <div style={{display:'flex',gap:'var(--sdcd-2)',marginTop:'var(--sdcd-3)',flexWrap:'wrap'}}>
          {ROLES.map(r=><Tag key={r}>{r}</Tag>)}
        </div>
      </div>
    </div>
    <Modal ouvert={inviter} titre="Inviter un agent" onClose={()=>setInviter(false)}
      actions={<React.Fragment><Button variant="secondaire" onClick={()=>setInviter(false)}>Annuler</Button><Button icon="ri-mail-send-line" onClick={()=>{setInviter(false);setInvite(true);}}>Envoyer l’invitation</Button></React.Fragment>}>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <Input label="Adresse électronique professionnelle *" hint="De préférence en @minesursi.gouv.cd"/>
        <Select label="Service d’affectation *" options={['DSA — Kinshasa','Antenne de Lubumbashi','Antenne de Goma','Antenne de Matadi','Secrétariat général']}/>
        <Select label="Rôle *" options={['Instructeur','Chef de service','Signataire','Administrateur']}/>
      </div>
    </Modal>
  </Coquille>;
}
// ——— Écran 9 : journal d’audit ———
function Ecran9({onNav}){
  const [charge,setCharge]=React.useState(false);
  const JOURS=[
    ['Aujourd’hui — 16 août 2026',[
      ['09 h 42 min 18 s','Chantal Mbombo Kanku','Réception vérification externe','…/0847/2026','IP 41.243.12.88 · empreinte a3f1…9c2e'],
      ['08 h 15 min 03 s','Système (répartition)','Affectation de 12 dossiers à la DSA','lot 2026-0816','IP interne · règle R-07'],
      ['08 h 02 min 51 s','Jean-Baptiste Ilunga Mwepu','Connexion réussie','session','IP 41.243.12.71 · CongoConnect Agents']]],
    ['Hier — 15 août 2026',[
      ['16 h 30 min 44 s','Blaise Kalombo Mutombo','Signature du lot 2026-118 (34 arrêtés)','parapheur','IP 41.243.12.90 · certificat SG-MINESURSI-2026'],
      ['11 h 05 min 12 s','Système (relances)','Relance J+130 envoyée','…/0533/2026','IP interne · modèle C-04'],
      ['09 h 17 min 36 s','Nadine Bokele Wembo','Modification du barème des frais','référentiel Frais','IP 41.243.12.66 · empreinte 77b0…e41a']]]];
  return <Coquille actif="Journal d’audit" onNav={onNav}
    fil={['Accueil','Pilotage','Journal d’audit']}
    titre="Journal d’audit" sousTitre="Registre inviolable : chaque action est horodatée à la seconde, avec adresse IP et empreinte"
    actions={<Button variant="secondaire" icon="ri-lock-line">Export scellé (horodaté)</Button>}>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(200px,1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-5)',maxWidth:760}}>
      <Select label="Acteur" options={['Tous les acteurs','J.-B. Ilunga Mwepu','C. Mbombo Kanku','B. Kalombo Mutombo','N. Bokele Wembo','Système']}/>
      <Select label="Type d’action" options={['Toutes les actions','Connexion','Instruction','Signature','Modification de référentiel','Relance']}/>
      <Input label="Objet" placeholder="Référence, lot, session…"/>
    </div>
    {JOURS.map((j,ji)=><div key={ji} style={{marginBottom:'var(--sdcd-5)'}}>
      <div className="sdcd-eyebrow" style={{marginBottom:'var(--sdcd-3)'}}>{j[0]}</div>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)'}}>
        {j[1].map((e,i)=><div key={i} className="sdcd-grid" style={{'--sdcd-cols':'130px 190px minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:'var(--sdcd-4)',padding:'var(--sdcd-3) var(--sdcd-5)',borderBottom:i<j[1].length-1?'1px solid var(--sdcd-ligne)':'none',fontSize:'var(--sdcd-sm)',alignItems:'baseline'}}>
          <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{e[0]}</span>
          <strong>{e[1]}</strong>
          <span>{e[2]} — <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>{e[3]}</span><span style={{display:'block',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-inactif)'}}>{e[4]}</span></span>
        </div>)}
      </div>
    </div>)}
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',marginBottom:'var(--sdcd-4)'}}>
      <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Différentiel — modification du barème (15 août, 09 h 17)</h2>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,280px),1fr))',gap:'var(--sdcd-4)',fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>
        <div style={{background:'var(--sdcd-erreur-pale)',border:'1px solid var(--sdcd-erreur)',padding:'var(--sdcd-3)'}}>− frais_usd: 80 · frais_cdf: 224 000</div>
        <div style={{background:'var(--sdcd-succes-pale)',border:'1px solid var(--sdcd-succes)',padding:'var(--sdcd-3)'}}>+ frais_usd: 85 · frais_cdf: 238 000</div>
      </div>
    </div>
    <div style={{display:'flex',justifyContent:'center'}}>
      {charge?<Loader label="Chargement des entrées antérieures…"/>:<Button variant="secondaire" onClick={()=>setCharge(true)}>Charger les jours précédents</Button>}
    </div>
  </Coquille>;
}

// ——— Écran 11 : pages système ———
function Ecran11({onNav}){
  const bloc={background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',display:'flex',flexDirection:'column',gap:'var(--sdcd-3)',alignItems:'flex-start'}
  const code={fontSize:'var(--sdcd-display)',fontWeight:700,fontFamily:'var(--sdcd-font-mono)',letterSpacing:'var(--sdcd-tracking-titre)',color:'var(--sdcd-bleu-teinte)',lineHeight:1};
  return <Coquille actif="Pages système" onNav={onNav}
    fil={['Accueil','Système','Pages système']}
    titre="Pages système" sousTitre="Gabarits d’erreur et d’états — présentés côte à côte pour recette">
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,330px),1fr))',gap:'var(--sdcd-4)'}}>
      <div style={bloc}><span style={code}>404</span><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Page introuvable</h2>
        <p style={{margin:0,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>L’adresse est erronée ou la page a été déplacée. Vérifiez l’URL ou repartez du tableau de bord.</p>
        <Button size="sm" variant="secondaire" icon="ri-home-4-line" onClick={()=>onNav('Tableau de bord')}>Retour au tableau de bord</Button></div>
      <div style={bloc}><span style={code}>403</span><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Accès refusé</h2>
        <p style={{margin:0,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>Votre rôle « Instructeur » ne permet pas cette action. Marche à suivre :</p>
        <ol style={{margin:0,paddingLeft:'var(--sdcd-4)',fontSize:'var(--sdcd-sm)',color:'var(--sdcd-encre-2)'}}><li>Vérifiez le rôle requis dans la matrice des droits.</li><li>Demandez l’habilitation à votre administrateur.</li></ol>
        <Button size="sm" variant="secondaire" onClick={()=>onNav('Agents et habilitations')}>Voir la matrice des droits</Button></div>
      <div style={bloc}><span style={code}>500</span><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Erreur du serveur</h2>
        <p style={{margin:0,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>L’incident est consigné (réf. <span style={{fontFamily:'var(--sdcd-font-mono)'}}>INC-2026-0405</span>). Vos données saisies sont conservées.</p>
        <Button size="sm" variant="secondaire" icon="ri-refresh-line">Réessayer</Button></div>
      <div style={bloc}><i className="ri-tools-line" aria-hidden="true" style={{fontSize:'var(--sdcd-display)',color:'var(--sdcd-bleu-teinte)'}}></i><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Maintenance planifiée</h2>
        <p style={{margin:0,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>Le back-office sera indisponible le <strong>dimanche 17 août de 02 h 00 à 04 h 00</strong> (mise à jour du registre).</p>
        <Badge ton="alerte">Créneau confirmé</Badge></div>
      <div style={bloc}><i className="ri-timer-line" aria-hidden="true" style={{fontSize:'var(--sdcd-display)',color:'var(--sdcd-bleu-teinte)'}}></i><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Session expirée</h2>
        <p style={{margin:0,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>Par sécurité, la session est close après 30 minutes d’inactivité. Aucune donnée n’a été perdue.</p>
        <Button size="sm" onClick={()=>onNav('Connexion')}>Se reconnecter</Button></div>
      <div style={bloc}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Recherche globale — « Kalenga »</h2>
        <div className="sdcd-eyebrow">Dossiers (2)</div>
        <div style={{fontSize:'var(--sdcd-sm)'}}><a href="#">Grâce Mwilambwe Kalenga — …/0847/2026</a><span style={{color:'var(--sdcd-muet)'}}> · Vérification externe · J+118</span></div>
        <div style={{fontSize:'var(--sdcd-sm)'}}><a href="#">Dieudonné Kalenga Ilunga — …/0122/2026</a><span style={{color:'var(--sdcd-muet)'}}> · Notifié · clos</span></div>
        <div className="sdcd-eyebrow" style={{marginTop:'var(--sdcd-2)'}}>Agents (0) · Courriers (1)</div>
        <div style={{borderTop:'1px solid var(--sdcd-ligne)',paddingTop:'var(--sdcd-3)',width:'100%'}}>
          <div style={{fontSize:'var(--sdcd-sm)',fontWeight:600}}>État vide — « Mukendi 2019 »</div>
          <p style={{margin:'var(--sdcd-1) 0 0',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>Aucun résultat. Vérifiez l’orthographe ou cherchez par référence complète (MINESURSI/DSA/…).</p>
        </div>
      </div>
    </div>
  </Coquille>;
}
// ——— Écran 12 : galerie du système ———
function Ecran12({onNav}){
  const SECTIONS=['Fondations','Actions','Saisie','Données','Retour d’information'];
  const [anc,setAnc]=React.useState(0);
  const regle=(t)=><div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:'var(--sdcd-2)'}}>{t}</div>;
  const carte={background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'};
  const nomC={fontSize:'var(--sdcd-sm)',fontWeight:700,marginBottom:'var(--sdcd-3)',fontFamily:'var(--sdcd-font-mono)'};
  return <Coquille actif="Galerie du SDCD" onNav={onNav}
    fil={['Accueil','Système','Galerie du SDCD']}
    titre="Galerie du SDCD" sousTitre="Documentation vivante : chaque composant, son nom exact et sa règle d’usage — restitués depuis les jetons, jamais redéclarés">
    <div className="sdcd-grid" style={{'--sdcd-cols':'200px minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:'var(--sdcd-6)',alignItems:'start'}}>
      <nav aria-label="Sommaire de la galerie" style={{position:'sticky',top:'var(--sdcd-5)'}}>
        <div className="sdcd-eyebrow" style={{marginBottom:'var(--sdcd-3)'}}>Sommaire</div>
        {SECTIONS.map((s,i)=><a key={i} href="#" aria-current={anc===i?'true':undefined} onClick={e=>{e.preventDefault();setAnc(i);}}
          style={{display:'block',padding:'var(--sdcd-2) var(--sdcd-3)',fontSize:'var(--sdcd-sm)',textDecoration:'none',fontWeight:anc===i?700:400,color:anc===i?'var(--sdcd-action)':'var(--sdcd-encre-2)',borderLeft:'2px solid '+(anc===i?'var(--sdcd-action)':'var(--sdcd-ligne)')}}>{s}</a>)}
      </nav>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        {anc===0&&<React.Fragment>
          <div style={carte}><div style={nomC}>Jetons de couleur</div>
            <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(110px,1fr))',gap:'var(--sdcd-3)'}}>
              {[['--sdcd-bleu','var(--sdcd-bleu)'],['--sdcd-jaune','var(--sdcd-jaune)'],['--sdcd-rouge','var(--sdcd-rouge)'],['--sdcd-encre','var(--sdcd-encre)'],['--sdcd-succes','var(--sdcd-succes)'],['--sdcd-alerte','var(--sdcd-alerte)']].map(c=>
                <div key={c[0]}><div style={{height:44,background:c[1],border:'1px solid var(--sdcd-ligne)'}}></div><div style={{fontSize:'var(--sdcd-xs)',fontFamily:'var(--sdcd-font-mono)',color:'var(--sdcd-muet)',marginTop:'var(--sdcd-1)'}}>{c[0]}</div></div>)}
            </div>{regle('Le bleu porte l’interaction ; jaune et rouge sont réservés au filet, aux alertes et aux erreurs.')}</div>
          <div style={carte}><div style={nomC}>Typographie & focus</div>
            <div style={{fontSize:'var(--sdcd-h2)',fontWeight:700,letterSpacing:'var(--sdcd-tracking-titre)'}}>Schibsted Grotesk</div>
            <div style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-sm)',margin:'var(--sdcd-2) 0'}}>Spline Sans Mono — MINESURSI/DSA/1602/02/0847/2026</div>
            <Button size="sm" variant="secondaire">Tabulez jusqu’ici pour voir le focus</Button>
            {regle('Titres denses (interlignage 1,12) ; focus visible à double anneau sur tout élément interactif.')}</div>
        </React.Fragment>}
        {anc===1&&<div style={carte}><div style={nomC}>Button · IconButton · Dropdown · Lien</div>
          <div style={{display:'flex',gap:'var(--sdcd-3)',flexWrap:'wrap',alignItems:'center'}}>
            <Button>Primaire</Button><Button variant="secondaire">Secondaire</Button><Button variant="tertiaire">Tertiaire</Button>
            <Button style={{background:'var(--sdcd-erreur)'}}>Destructif</Button><Button disabled>Désactivé</Button>
            <Button size="sm" icon="ri-download-line">Petit + icône</Button>
            <IconButton icon="ri-printer-line" label="Imprimer"/>
            <Dropdown libelle="Groupe d’actions" items={['Exporter','Imprimer']}/>
            <Lien externe>Lien externe</Lien><Lien telechargement detail="PDF – 1,2 Mo">Téléchargement</Lien>
          </div>{regle('Une seule action primaire par vue ; le destructif exige une modale de confirmation.')}</div>}
        {anc===2&&<div style={carte}><div style={nomC}>Input · Select · Radio · Checkbox · Toggle · Segmented · Password · Upload</div>
          <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(240px,1fr))',gap:'var(--sdcd-4)'}}>
            <Input label="Défaut" hint="Message d’aide."/>
            <Input label="Erreur" error="Ce champ est requis."/>
            <Input label="Succès" hint="✓ Référence valide" defaultValue="…/0847/2026"/>
            <Input label="Désactivé" disabled defaultValue="Lecture seule"/>
            <Select label="Liste déroulante" options={['Kinshasa','Haut-Katanga']}/>
            <Password creation/>
          </div>
          <div style={{display:'flex',gap:'var(--sdcd-5)',flexWrap:'wrap',alignItems:'center',marginTop:'var(--sdcd-4)'}}>
            <Radio name="g12" label="Radio" defaultChecked/><Checkbox label="Case" defaultChecked/><Toggle label="Interrupteur" defaultChecked/>
            <Segmented options={['Liste','Carte']}/>
          </div>
          <div style={{marginTop:'var(--sdcd-4)',maxWidth:420}}><Upload label="Dépôt de fichier"/></div>
          {regle('Libellé toujours visible ; l’erreur est annoncée par un résumé ancré en tête d’étape.')}</div>}
        {anc===3&&<React.Fragment>
          <div style={carte}><div style={nomC}>Badge · Tag · Tuile d’indicateur</div>
            <div style={{display:'flex',gap:'var(--sdcd-2)',flexWrap:'wrap'}}><Badge>Neutre</Badge><Badge ton="info">Info</Badge><Badge ton="succes">Favorable</Badge><Badge ton="alerte">J+118</Badge><Badge ton="erreur">En retard</Badge><Tag actif>Filtre actif</Tag><Tag supprimable onDelete={()=>{}}>Supprimable</Tag></div>
            {regle('Badge = statut informatif ; Tag = filtre interactif ; l’ancienneté J+n est portée par un badge sur chaque objet suivi.')}</div>
          <div style={carte}><div style={nomC}>Table · DataTable · Pagination · Accordion</div>
            <Table colonnes={['Référence','État','J+']} lignes={[['…/0847/2026',<Badge ton="info">Vérification</Badge>,'118'],['…/0533/2026',<Badge ton="alerte">Pièces</Badge>,'131']]}/>
            {regle('Le tableau avancé ajoute tri, filtre, export CSV scellable et édition en ligne — voir « Demandes reçues ».')}</div>
          <div style={carte}><div style={nomC}>BarChart · LineChart · DonutChart</div>
            <DonutChart titre="Avis rendus — commission du 12 août" unite="dossiers" donnees={[{nom:'Favorables',valeur:41},{nom:'Défavorables',valeur:5},{nom:'Ajournés',valeur:2}]} source="PV de commission, 12 août 2026"/>
            {regle('Source obligatoire ; les données restent consultables en tableau (bascule accessible).')}</div>
        </React.Fragment>}
        {anc===4&&<div style={carte}><div style={nomC}>Alert · Highlight · Modal · Tooltip · Loader · État vide</div>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-3)'}}>
            <Alert type="info" titre="Information">Compacte et contextuelle.</Alert>
            <Alert type="erreur" titre="Erreur" onClose={()=>{}}>Fermable ; le résumé d’erreurs de formulaire est ancré.</Alert>
            <Highlight taille="sm">Mise en exergue : la règle métier essentielle, sans fond.</Highlight>
            <div style={{display:'flex',gap:'var(--sdcd-4)',alignItems:'center',flexWrap:'wrap'}}>
              <Tooltip texte="Infobulle au survol et au focus."><Button size="sm" variant="secondaire">Survolez-moi</Button></Tooltip>
              <Loader size={40} label="Chargement…"/>
            </div>
            <div style={{border:'1px dashed var(--sdcd-ligne-forte)',padding:'var(--sdcd-5)',textAlign:'center',color:'var(--sdcd-muet)',fontSize:'var(--sdcd-sm)'}}>
              <i className="ri-search-off-line" aria-hidden="true" style={{fontSize:'var(--sdcd-h2)'}}></i>
              <div style={{fontWeight:600,marginTop:'var(--sdcd-2)',color:'var(--sdcd-texte)'}}>Aucun résultat</div>
              État vide : cause + action de sortie (« Réinitialiser les filtres »).
            </div>
          </div>
          <div style={{marginTop:'var(--sdcd-4)',paddingTop:'var(--sdcd-3)',borderTop:'1px solid var(--sdcd-ligne)',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>
            Couverture d’accessibilité : navigation clavier complète, focus visible, aria-live sur les notifications, aria-current sur la navigation, modales fermables par Échap, contrastes AA, cibles ≥ 44 px.
          </div>
        </div>}
      </div>
    </div>
  </Coquille>;
}

// ——— Écran : commission d’équivalence (validation) ———
const ORDRE_DU_JOUR=[
  {ref:'…/0847/2026',requerant:'Grâce Mwilambwe Kalenga',diplome:'Licence sciences infirmières — Kampala Intl University',avisInstr:'Favorable',anciennete:118},
  {ref:'…/0765/2026',requerant:'Sarah Bahati Furaha',diplome:'Master droit des affaires — Université du Rwanda',avisInstr:'Favorable',anciennete:97},
  {ref:'…/0290/2026',requerant:'Rachel Ilunga Numbi',diplome:'Bachelor informatique — University of Nairobi',avisInstr:'Réserves (programme incomplet)',anciennete:105},
  {ref:'…/0399/2026',requerant:'Josué Kambale Paluku',diplome:'Licence génie civil — Makerere University',avisInstr:'Favorable',anciennete:151}];
function EcranValidation({onNav}){
  const [votes,setVotes]=React.useState({});
  const [cloture,setCloture]=React.useState(false);
  const voter=(i,v)=>setVotes({...votes,[i]:v});
  const n=Object.keys(votes).length;
  const compte=(v)=>Object.values(votes).filter(x=>x===v).length;
  return <Coquille actif="Commission d’équivalence" onNav={onNav}
    fil={['Accueil','Décision','Commission d’équivalence']}
    titre="Commission d’équivalence — séance du 20 août 2026"
    sousTitre="52 dossiers inscrits · quorum atteint (7 membres sur 9) · démonstration sur 4 dossiers"
    actions={<Button icon="ri-file-check-line" disabled={n<ORDRE_DU_JOUR.length||cloture} onClick={()=>setCloture(true)}>Clôturer et générer le PV</Button>}>
    {cloture&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-4)'}}>
      <Alert type="succes" titre="Procès-verbal généré">PV n° 2026-119 : {compte('favorable')} favorable(s), {compte('defavorable')} défavorable(s), {compte('ajourne')} ajourné(s). Les arrêtés partent en file de signature.</Alert>
    </div>}
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,520px),1fr))',gap:'var(--sdcd-4)',alignItems:'start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        {ORDRE_DU_JOUR.map((d,i)=><div key={i} style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:'var(--sdcd-3)',flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:240}}>
              <div style={{fontWeight:700}}>{d.requerant} <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontWeight:400}}>{d.ref}</span></div>
              <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',marginTop:'var(--sdcd-1)'}}>{d.diplome}</div>
              <div style={{display:'flex',gap:'var(--sdcd-2)',marginTop:'var(--sdcd-2)',flexWrap:'wrap'}}>
                <Badge ton={d.avisInstr==='Favorable'?'succes':'alerte'}>{'Avis instructeur : '+d.avisInstr}</Badge>
                <Badge ton={d.anciennete>120?'erreur':'neutre'}>{'J+'+d.anciennete}</Badge>
              </div>
            </div>
            <div role="radiogroup" aria-label={'Décision — '+d.requerant} style={{display:'flex',gap:'var(--sdcd-2)',flexWrap:'wrap'}}>
              {[['favorable','Favorable','succes'],['defavorable','Défavorable','erreur'],['ajourne','Ajourner','alerte']].map(([v,lab])=>
                <button key={v} role="radio" aria-checked={votes[i]===v} disabled={cloture} onClick={()=>voter(i,v)}
                  style={{padding:'var(--sdcd-2) var(--sdcd-3)',fontFamily:'inherit',fontSize:'var(--sdcd-xs)',fontWeight:votes[i]===v?700:500,cursor:'pointer',
                  background:votes[i]===v?(v==='favorable'?'var(--sdcd-succes-pale)':v==='defavorable'?'var(--sdcd-erreur-pale)':'var(--sdcd-alerte-pale)'):'var(--sdcd-fond)',
                  color:votes[i]===v?(v==='favorable'?'var(--sdcd-succes)':v==='defavorable'?'var(--sdcd-erreur)':'var(--sdcd-alerte)'):'var(--sdcd-encre-2)',
                  border:'1px solid '+(votes[i]===v?'currentColor':'var(--sdcd-ligne-forte)')}}>{votes[i]===v?'✓ ':''}{lab}</button>)}
            </div>
          </div>
        </div>)}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Avancement de la séance</h2>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginBottom:'var(--sdcd-1)'}}>
            <span>Dossiers examinés</span><span style={{fontFamily:'var(--sdcd-font-mono)'}}>{n} / {ORDRE_DU_JOUR.length}</span>
          </div>
          <div style={{height:8,background:'var(--sdcd-ligne)'}}><div style={{width:(n/ORDRE_DU_JOUR.length*100)+'%',height:'100%',background:'var(--sdcd-action)',transition:'width var(--sdcd-transition)'}}></div></div>
          <div style={{display:'flex',gap:'var(--sdcd-2)',marginTop:'var(--sdcd-3)',flexWrap:'wrap'}}>
            <Badge ton="succes">{compte('favorable')+' favorables'}</Badge>
            <Badge ton="erreur">{compte('defavorable')+' défavorables'}</Badge>
            <Badge ton="alerte">{compte('ajourne')+' ajournés'}</Badge>
          </div>
        </div>
        <Highlight taille="sm">Tout avis défavorable ou ajournement est motivé au procès-verbal et notifié au requérant avec voie de recours (art. 24).</Highlight>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',fontSize:'var(--sdcd-sm)'}}>
          <div className="sdcd-eyebrow" style={{marginBottom:'var(--sdcd-3)'}}>Membres présents (7/9)</div>
          <div style={{lineHeight:1.9,color:'var(--sdcd-encre-2)'}}>Prof. Odette Kanyinda Mbuyi (présidente) · Prof. Léon Botolo Magoza · C. Mbombo Kanku · et 4 autres membres.</div>
        </div>
      </div>
    </div>
  </Coquille>;
}
// ——— Écran : paiements et vérification ———
function EcranPaiements({onNav}){
  const [verif,setVerif]=React.useState(null);
  const [verifies,setVerifies]=React.useState([]);
  const PAIEMENTS=[
    {reference:'PAY-2026-08417',dossier:'…/1004/2026',payeur:'Emmanuel Tshibangu Kazadi',mode:'Mobile money (M-Pesa)',montant:'85 USD',recu:'14 août 2026',statut:'À vérifier'},
    {reference:'PAY-2026-08402',dossier:'…/0912/2026',payeur:'Patient Nsimba Lutete',mode:'Virement bancaire',montant:'238 000 CDF',recu:'13 août 2026',statut:'À vérifier'},
    {reference:'PAY-2026-08391',dossier:'…/0847/2026',payeur:'Grâce Mwilambwe Kalenga',mode:'Espèces au guichet',montant:'85 USD',recu:'9 avril 2026',statut:'Vérifié'},
    {reference:'PAY-2026-08375',dossier:'…/0533/2026',payeur:'Divine Kahindo Masika',mode:'Mobile money (Orange Money)',montant:'238 000 CDF',recu:'8 avril 2026',statut:'Vérifié'},
    {reference:'PAY-2026-08360',dossier:'…/0102/2026',payeur:'Gédéon Kasongo Nyembo',mode:'Virement bancaire',montant:'85 USD',recu:'2 août 2026',statut:'Rejeté (référence introuvable)'}];
  return <Coquille actif="Paiements et vérification" onNav={onNav}
    fil={['Accueil','Administration','Paiements et vérification']}
    titre="Paiements et vérification" sousTitre="Rapprochement quotidien avec la banque et les agrégateurs mobile money · recettes reversées au Trésor public"
    actions={<Dropdown libelle="Exporter" items={[{libelle:'Journal des recettes (CSV)',icone:'ri-file-excel-2-line'},{libelle:'État de rapprochement (PDF)',icone:'ri-file-pdf-2-line'}]}/>}>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(200px,1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-5)'}}>
      {[['Recettes d’août','35 275 USD','ri-cash-line','neutre'],['Équivalent CDF','98 770 000 CDF','ri-exchange-line','neutre'],['Paiements à vérifier','2','ri-search-eye-line','alerte'],['Écart de rapprochement','0,00','ri-scales-line','succes']].map((k,i)=>
        <div key={i} style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',borderBottom:'3px solid '+(k[3]==='alerte'?'var(--sdcd-alerte)':k[3]==='succes'?'var(--sdcd-succes)':'var(--sdcd-action)'),padding:'var(--sdcd-4)'}}>
          <i className={k[2]} aria-hidden="true" style={{fontSize:'var(--sdcd-h4)',color:'var(--sdcd-action)'}}></i>
          <div style={{fontSize:'var(--sdcd-h3)',fontWeight:700,fontFamily:'var(--sdcd-font-mono)',margin:'var(--sdcd-2) 0 var(--sdcd-1)'}}>{k[1]}</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{k[0]}</div>
        </div>)}
    </div>
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)'}}>
      <div style={{padding:'var(--sdcd-4) var(--sdcd-5)',borderBottom:'1px solid var(--sdcd-ligne)'}}><h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Derniers paiements</h2></div>
      <div style={{overflowX:'auto'}}>
      <Table colonnes={['Référence','Dossier','Payeur','Mode','Montant','Reçu le','Statut','']}
        lignes={PAIEMENTS.map((p,i)=>[
          <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>{p.reference}</span>,
          <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>{p.dossier}</span>,
          p.payeur,p.mode,
          <span style={{fontFamily:'var(--sdcd-font-mono)',whiteSpace:'nowrap'}}>{p.montant}</span>,p.recu,
          verifies.includes(i)?<Badge ton="succes">Vérifié</Badge>:<Badge ton={p.statut==='Vérifié'?'succes':p.statut.indexOf('Rejeté')===0?'erreur':'alerte'}>{p.statut.indexOf('Rejeté')===0?'Rejeté':p.statut}</Badge>,
          p.statut==='À vérifier'&&!verifies.includes(i)?<Button size="sm" variant="secondaire" onClick={()=>setVerif(i)}>Vérifier</Button>:null])}/>
      </div>
    </div>
    <Modal ouvert={verif!==null} titre={verif!==null?'Vérifier le paiement '+PAIEMENTS[verif].reference:''} onClose={()=>setVerif(null)}
      actions={<React.Fragment><Button variant="secondaire" onClick={()=>setVerif(null)}>Annuler</Button><Button icon="ri-checkbox-circle-line" onClick={()=>{setVerifies([...verifies,verif]);setVerif(null);}}>Confirmer la vérification</Button></React.Fragment>}>
      {verif!==null&&<div style={{fontSize:'var(--sdcd-sm)',lineHeight:1.8}}>
        <p style={{marginTop:0}}>Rapprochez la référence avec le relevé de l’agrégateur :</p>
        <div className="sdcd-grid" style={{'--sdcd-cols':'160px minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:'var(--sdcd-1) var(--sdcd-4)'}}>
          <span style={{color:'var(--sdcd-muet)'}}>Payeur</span><strong>{PAIEMENTS[verif].payeur}</strong>
          <span style={{color:'var(--sdcd-muet)'}}>Mode</span><span>{PAIEMENTS[verif].mode}</span>
          <span style={{color:'var(--sdcd-muet)'}}>Montant attendu</span><span style={{fontFamily:'var(--sdcd-font-mono)'}}>{PAIEMENTS[verif].montant}</span>
        </div>
        <p style={{marginBottom:0}}>La vérification débloque l’instruction du dossier et est consignée au journal d’audit.</p>
      </div>}
    </Modal>
  </Coquille>;
}

// ——— Écran : traductions (6 langues) ———
const CLES_TRAD=[
  {cle:'action.suivre',fr:'Suivre mon dossier',ln:'Kolanda dossier na ngai',sw:'Fuatilia jalada langu',etat:'Complet'},
  {cle:'action.deposer',fr:'Déposer une demande',ln:'Kotinda bosenga',sw:'Wasilisha ombi',etat:'Complet'},
  {cle:'statut.retard',fr:'Dossier en retard',ln:'Dossier ekomi na retard',sw:'—',etat:'À traduire (SW)'},
  {cle:'aide.pieces',fr:'Pièces à fournir',ln:'—',sw:'Nyaraka zinazohitajika',etat:'À traduire (LN)'},
  {cle:'confirm.envoi',fr:'Votre demande a été transmise',ln:'Bosenga na yo etindami',sw:'Ombi lako limewasilishwa',etat:'À relire'}];
function EcranTraductions({onNav}){
  const AV=[['Français',100],['English',94],['Lingala',71],['Kiswahili',68],['Kikongo',42],['Tshiluba',37]];
  return <Coquille actif="Traductions (6 langues)" onNav={onNav}
    fil={['Accueil','Administration','Traductions']}
    titre="Traductions de l’interface" sousTitre="612 clés · le français est la langue de référence ; les traductions sont relues par l’Institut des langues"
    actions={<React.Fragment>
      <Button variant="secondaire" icon="ri-upload-2-line">Importer (CSV)</Button>
      <Button icon="ri-add-line">Ajouter une clé</Button>
    </React.Fragment>}>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(170px,1fr))',gap:'var(--sdcd-4)',marginBottom:'var(--sdcd-5)'}}>
      {AV.map((l,i)=><div key={i} style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-4)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'var(--sdcd-2)'}}>
          <span style={{fontWeight:700,fontSize:'var(--sdcd-sm)'}}>{l[0]}</span>
          <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)',color:l[1]<60?'var(--sdcd-erreur)':l[1]<90?'var(--sdcd-alerte)':'var(--sdcd-succes)'}}>{l[1]} %</span>
        </div>
        <div style={{height:6,background:'var(--sdcd-ligne)'}}><div style={{width:l[1]+'%',height:'100%',background:l[1]<60?'var(--sdcd-erreur)':l[1]<90?'var(--sdcd-alerte)':'var(--sdcd-succes)'}}></div></div>
      </div>)}
    </div>
    <DataTable titre="Clés de traduction — FR · LN · SW (colonnes configurables)" parPage={5}
      colonnes={[{cle:'cle',label:'Clé',editable:false},{cle:'fr',label:'Français (référence)',editable:false},{cle:'ln',label:'Lingala'},{cle:'sw',label:'Kiswahili'},{cle:'etat',label:'État',editable:false}]}
      lignes={CLES_TRAD}/>
    <div style={{marginTop:'var(--sdcd-4)'}}>
      <Highlight taille="sm">Le crayon ouvre l’édition en ligne ; toute modification passe à l’état « À relire » et n’est publiée qu’après validation de l’Institut des langues.</Highlight>
    </div>
  </Coquille>;
}
// ——— Écran : paramètres ———
function EcranParametres({onNav}){
  const [enr,setEnr]=React.useState(false);
  return <Coquille actif="Paramètres" onNav={onNav}
    fil={['Accueil','Administration','Paramètres']}
    titre="Paramètres" sousTitre="Réglages du service — les modifications sont consignées au journal d’audit"
    actions={<Button icon="ri-save-line" onClick={()=>setEnr(true)}>Enregistrer</Button>}>
    {enr&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-4)'}}><Alert type="succes" titre="Paramètres enregistrés" onClose={()=>setEnr(false)}>Application immédiate ; entrée consignée au journal d’audit.</Alert></div>}
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,400px),1fr))',gap:'var(--sdcd-4)',alignItems:'start'}}>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Notifications du service</h2>
        <Toggle label="Notifier le requérant à chaque changement d’état (SMS + courriel)" defaultChecked/>
        <Toggle label="Alerter le chef de service quand un dossier dépasse J+120" defaultChecked/>
        <Toggle label="Rapport quotidien par courriel à 07 h 00" />
        <Range label="Relance automatique des vérifications externes" min={30} max={90} step={5} valeur={60} unite="jours" hint="Délai avant relance de l’établissement d’origine."/>
      </div>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Sécurité</h2>
        <Toggle label="Double authentification obligatoire (code SMS)" defaultChecked/>
        <Toggle label="Restreindre l’accès aux adresses IP du réseau de l’État" defaultChecked/>
        <Range label="Expiration de session après inactivité" min={10} max={60} step={5} valeur={30} unite="min"/>
        <Segmented label="Langue par défaut de l’interface" options={['FR','LN','SW']}/>
      </div>
      <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Affichage</h2>
        <Display/>
        <Segmented label="Densité des tableaux" options={['Confortable','Compacte']}/>
      </div>
    </div>
  </Coquille>;
}
// ——— Écran : mon profil agent (complet) ———
function EcranProfilAgent({onNav}){
  const [note,setNote]=React.useState('');
  const [demande,setDemande]=React.useState(false);
  const [absent,setAbsent]=React.useState(false);
  const [delegations,setDelegations]=React.useState([
    {sens:'Reçue',qui:'Papy Mokonzi Bolia (Lubumbashi)',portee:'Instruction de 8 dossiers',periode:'4 – 22 août 2026',statut:'Active'},
    {sens:'Donnée',qui:'Henriette Safi Ngalula (Goma)',portee:'Instruction complète du portefeuille',periode:'2 – 15 juin 2026',statut:'Expirée'}]);
  const [dPortee,setDPortee]=React.useState({instruction:true,commentaires:false,transmission:false});
  const [dQui,setDQui]=React.useState('— Sélectionner —');
  const [dMotif,setDMotif]=React.useState('');
  const [dErr,setDErr]=React.useState({});
  const envoyerDemande=()=>{const e={};
    if(dQui==='— Sélectionner —')e.qui='Choisissez un délégataire.';
    if(!Object.values(dPortee).some(Boolean))e.portee='Choisissez au moins une portée.';
    if(dMotif.trim().length<15)e.motif='Motivez la demande (15 caractères minimum).';
    setDErr(e);if(Object.keys(e).length)return;
    setDelegations([{sens:'Donnée',qui:dQui,portee:Object.entries({instruction:'Instruction',commentaires:'Commentaires',transmission:'Transmission à la commission'}).filter(([k])=>dPortee[k]).map(([,v])=>v).join(' + '),periode:'En attente d’approbation',statut:'En attente'},...delegations]);
    setDemande(false);setNote('Demande de délégation transmise à la cheffe de service pour approbation');setDQui('— Sélectionner —');setDMotif('');};
  const carte={background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)'};
  return <Coquille actif="Tableau de bord" onNav={onNav}
    fil={['Accueil','Mon compte','Mon profil agent']}
    titre="Mon profil agent" sousTitre="Compte nominatif AG-2019-00427 — chaque modification est consignée au journal d’audit"
    actions={<Button icon="ri-save-line" onClick={()=>setNote('Profil enregistré')}>Enregistrer les modifications</Button>}>
    {note&&<div aria-live="polite" style={{marginBottom:'var(--sdcd-4)'}}><Alert type="succes" titre={note} onClose={()=>setNote('')}>Horodaté et consigné au journal d’audit.</Alert></div>}
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-5)',marginBottom:'var(--sdcd-4)',display:'flex',alignItems:'center',gap:'var(--sdcd-5)',flexWrap:'wrap'}}>
      <span aria-hidden="true" style={{width:64,height:64,borderRadius:'var(--sdcd-rayon-pilule)',background:'var(--sdcd-bleu-pale)',color:'var(--sdcd-bleu-profond)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'var(--sdcd-h3)'}}>{AGENT.initiales}</span>
      <div style={{flex:1,minWidth:240}}>
        <div style={{fontWeight:700,fontSize:'var(--sdcd-h3)',letterSpacing:'var(--sdcd-tracking-titre)'}}>{AGENT.nom}</div>
        <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>{AGENT.role} · {AGENT.service} · habilité depuis le 3 février 2024</div>
        <div style={{display:'flex',gap:'var(--sdcd-2)',marginTop:'var(--sdcd-2)',flexWrap:'wrap'}}><Tag>Instructeur</Tag><Badge ton="succes">Compte actif</Badge>{absent&&<Badge ton="alerte">Absent — réaffectation active</Badge>}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-2)',alignItems:'flex-end'}}>
        <Toggle label="Signaler une absence" checked={absent} onChange={setAbsent}/>
        {absent&&<div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>Vos 23 dossiers seront réaffectés par la cheffe de service.</div>}
      </div>
    </div>
    <Tabs onglets={['Identité et coordonnées','Mes délégations','Notifications','Sécurité et sessions']}>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,380px),1fr))',gap:'var(--sdcd-4)',alignItems:'start'}}>
        <div style={{...carte,display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Coordonnées professionnelles</h2>
          <Input label="Identifiant (non modifiable)" disabled defaultValue="ji.mwepu@minesursi.gouv.cd"/>
          <Input label="Téléphone professionnel" defaultValue="+243 81 555 02 47" hint="Utilisé pour la double authentification."/>
          <Input label="Courriel de secours" defaultValue="jb.ilunga@exemple.cd" hint="Réception des liens de récupération uniquement."/>
          <Input label="Bureau" defaultValue="Bâtiment A — porte 214, Kinshasa-Gombe"/>
        </div>
        <div style={{...carte,display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Préférences d’interface</h2>
          <Segmented label="Langue de l’interface" options={['FR','LN','SW']}/>
          <Display/>
          <Segmented label="Densité des tableaux" options={['Confortable','Compacte']}/>
          <Range label="Dossiers par page" min={5} max={50} step={5} valeur={8}/>
        </div>
      </div>
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'var(--sdcd-3)',marginBottom:'var(--sdcd-4)',flexWrap:'wrap'}}>
          <p style={{margin:0,flex:1,minWidth:280,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)'}}>La délégation transfère temporairement tout ou partie de vos droits à un agent de même rôle. Elle est approuvée par la cheffe de service et tracée au journal d’audit.</p>
          <Button icon="ri-user-shared-line" onClick={()=>setDemande(true)}>Demander une délégation</Button>
        </div>
        <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',overflowX:'auto'}}>
          <Table colonnes={['Sens','Agent','Portée','Période','Statut','']}
            lignes={delegations.map((d,i)=>[
              d.sens,d.qui,d.portee,d.periode,
              <Badge ton={d.statut==='Active'?'succes':d.statut==='En attente'?'alerte':'neutre'}>{d.statut}</Badge>,
              d.statut!=='Expirée'?<Button size="sm" variant="tertiaire" onClick={()=>{setDelegations(delegations.map((x,n)=>n===i?{...x,statut:'Expirée',periode:x.periode+' (révoquée)'}:x));setNote('Délégation révoquée');}}>Révoquer</Button>:null])}/>
        </div>
        <div style={{marginTop:'var(--sdcd-4)'}}>
          <Highlight taille="sm">Pendant une délégation reçue, vos décisions sont signées « pour ordre » : l’acte mentionne le délégant et la référence de l’acte de délégation.</Highlight>
        </div>
      </div>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,380px),1fr))',gap:'var(--sdcd-4)',alignItems:'start'}}>
        <div style={{...carte,display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Ce qui me concerne</h2>
          <Toggle label="Nouveau dossier affecté" defaultChecked/>
          <Toggle label="Réponse d’une vérification externe" defaultChecked/>
          <Toggle label="Dossier de mon portefeuille dépassant J+120" defaultChecked/>
          <Toggle label="Commentaire ajouté sur l’un de mes dossiers"/>
        </div>
        <div style={{...carte,display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Canaux</h2>
          <Toggle label="Dans l’application (bandeau et compteur)" defaultChecked/>
          <Toggle label="Courriel professionnel" defaultChecked/>
          <Toggle label="SMS (urgences uniquement)"/>
          <Segmented label="Fréquence des courriels" options={['Immédiat','Digest 12 h','Digest 24 h']} valeur={1}/>
        </div>
      </div>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(auto-fit,minmax(min(100%,380px),1fr))',gap:'var(--sdcd-4)',alignItems:'start'}}>
        <div style={{...carte,display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:0}}>Mot de passe et double authentification</h2>
          <Password label="Nouveau mot de passe" creation/>
          <Toggle label="Double authentification par SMS" defaultChecked/>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>Dernier changement : 12 juin 2026 · expiration réglementaire : 90 jours.</div>
        </div>
        <div style={{...carte}}>
          <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 var(--sdcd-3)'}}>Sessions actives</h2>
          <Table colonnes={['Appareil','Adresse IP','Depuis','']}
            lignes={[
              ['Poste DSA-12 (ce poste)',<span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>41.243.12.71</span>,'Aujourd’hui, 08 h 02',<Badge ton="succes">Active</Badge>],
              ['Portable de service',<span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-xs)'}}>41.243.9.14</span>,'Hier, 18 h 40',<Button size="sm" variant="tertiaire" onClick={()=>setNote('Session du portable révoquée')}>Révoquer</Button>]]}/>
          <div style={{marginTop:'var(--sdcd-3)'}}><Button size="sm" variant="secondaire" icon="ri-logout-circle-line" onClick={()=>setNote('Toutes les autres sessions ont été fermées')}>Fermer toutes les autres sessions</Button></div>
        </div>
      </div>
    </Tabs>
    <Modal ouvert={demande} titre="Demander une délégation" onClose={()=>setDemande(false)}
      actions={<React.Fragment><Button variant="secondaire" onClick={()=>setDemande(false)}>Annuler</Button><Button icon="ri-send-plane-line" onClick={envoyerDemande}>Transmettre pour approbation</Button></React.Fragment>}>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-4)'}}>
        <Select label="Délégataire *" hint="Agents de même rôle uniquement." options={['— Sélectionner —','Papy Mokonzi Bolia (Lubumbashi)','Henriette Safi Ngalula (Goma)','Alphonse Ngoyi Kasanji (Matadi)']} value={dQui} error={dErr.qui} onChange={e=>setDQui(e.target.value)}/>
        <fieldset style={{border:'none',margin:0,padding:0}}>
          <legend style={{fontWeight:500,marginBottom:'var(--sdcd-2)',padding:0}}>Portée de la délégation *</legend>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--sdcd-2)'}}>
            <Checkbox label="Instruction des dossiers" checked={dPortee.instruction} onChange={e=>setDPortee({...dPortee,instruction:e.target.checked})}/>
            <Checkbox label="Commentaires internes" checked={dPortee.commentaires} onChange={e=>setDPortee({...dPortee,commentaires:e.target.checked})}/>
            <Checkbox label="Transmission à la commission" checked={dPortee.transmission} onChange={e=>setDPortee({...dPortee,transmission:e.target.checked})}/>
          </div>
          {dErr.portee&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:'var(--sdcd-2)'}}><i className="ri-error-warning-line" aria-hidden="true"></i> {dErr.portee}</div>}
        </fieldset>
        <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:'var(--sdcd-4)'}}>
          <Input label="Du" type="date" defaultValue="2026-08-18"/>
          <Input label="Au" type="date" defaultValue="2026-08-29"/>
        </div>
        <Input label="Motif *" hint="Figure sur l’acte de délégation." value={dMotif} error={dErr.motif} onChange={e=>setDMotif(e.target.value)}/>
      </div>
    </Modal>
  </Coquille>;
}
function EcranAVenir({nom,onNav}){
  return <Coquille actif={nom} onNav={onNav} fil={['Accueil',nom]} titre={nom} sousTitre="Écran du POC à produire — demandez-le pour qu’il soit composé sur la coquille à l’identique.">
    <div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'var(--sdcd-8)',display:'flex',justifyContent:'center'}}>
      <Loader label={'« '+nom+' » — en attente de production'}/>
    </div>
  </Coquille>;
}

function App(){
  const [ecran,setEcran]=React.useState('Tableau de bord');
  if(ecran==='Tableau de bord')return <Ecran1 onNav={setEcran}/>;
  if(ecran==='Demandes reçues (2 847)'||ecran==='Mes dossiers (23)')return <Ecran2 onNav={setEcran}/>;
  if(ecran==='Pièces à vérifier (318)')return <Ecran3 onNav={setEcran}/>;
  if(ecran==='Enregistrement')return <Ecran4 onNav={setEcran}/>;
  if(ecran==='File de signature (34)')return <Ecran5 onNav={setEcran}/>;
  if(ecran==='Statistiques')return <Ecran8 onNav={setEcran}/>;
  if(ecran==='Référentiels')return <Ecran6 onNav={setEcran}/>;
  if(ecran==='Agents et habilitations')return <Ecran7 onNav={setEcran}/>;
  if(ecran==='Journal d’audit')return <Ecran9 onNav={setEcran}/>;
  if(ecran==='Galerie du SDCD')return <Ecran12 onNav={setEcran}/>;
  if(ecran==='Pages système')return <Ecran11 onNav={setEcran}/>;
  if(ecran==='Commission d’équivalence')return <EcranValidation onNav={setEcran}/>;
  if(ecran==='Paiements et vérification')return <EcranPaiements onNav={setEcran}/>;
  if(ecran==='Traductions (6 langues)')return <EcranTraductions onNav={setEcran}/>;
  if(ecran==='Paramètres')return <EcranParametres onNav={setEcran}/>;
  if(ecran==='Mon profil agent')return <EcranProfilAgent onNav={setEcran}/>;
  if(ecran==='Connexion')return <Ecran10 onNav={setEcran}/>;
  return <EcranAVenir nom={ecran} onNav={setEcran}/>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
}).catch(function(e){document.getElementById('root').innerHTML='<pre style="padding:20px;color:#DB3832">'+((e&&e.stack)||e)+'</pre>';});