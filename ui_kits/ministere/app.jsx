(window.__sdcdReady||Promise.resolve()).then(()=>{
const NS = window[Object.keys(window).find(k=>/_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button)]||{};
const {Header,Footer,Breadcrumb,SearchBar,Button,Card,Tile,Badge,Alert,Follow,Input,Select,Upload,Checkbox,DataTable,Lien,Accordion,Quote,Carousel,Gallery} = NS;
const NAV=["Accueil","Le ministère","Démarches","Actualités","Publications","Contact"];
function Accueil(){
  return <div>
    <div style={{background:'var(--sdcd-bleu-pale)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(44px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'minmax(0,1.2fr) minmax(0,1fr)',gap:'clamp(26px,3.5vw,48px)',alignItems:'center'}}>
        <div>
          <div className="sdcd-eyebrow" style={{marginBottom:8}}>Ministère du Numérique</div>
          <h1 style={{fontSize:'var(--sdcd-h1)',lineHeight:1.2,margin:'0 0 12px'}}>Construire l’État numérique, au service de chaque citoyen</h1>
          <p style={{color:'var(--sdcd-muet)',margin:'0 0 20px',maxWidth:520}}>Le ministère conduit la transformation numérique de l’administration : identité numérique, dématérialisation des démarches et connectivité du territoire.</p>
          <div style={{display:'flex',gap:12}}>
            <Button iconRight="ri-arrow-right-line">Nos démarches en ligne</Button>
            <Button variant="secondaire">Le plan Congo Numérique</Button>
          </div>
        </div>
        <div style={{height:260}}><image-slot id="hero-ministere" shape="rounded" radius="4" placeholder="Photo du ministère — déposez une image"></image-slot></div>
      </div>
    </div>
    <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)'}}>
      <h2 style={{fontSize:'var(--sdcd-h2)',margin:'0 0 20px'}}>Missions</h2>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16}}>
        <Tile icon="ri-fingerprint-line" titre="Identité numérique" description="Un compte citoyen unique, officiel et juridique, pour tous les sites en .gouv.cd."/>
        <Tile icon="ri-file-cloud-line" titre="Dématérialisation" description="Les démarches administratives accessibles en ligne, de bout en bout."/>
        <Tile icon="ri-signal-tower-line" titre="Connectivité" description="La couverture du territoire et l’accès de tous aux réseaux."/>
      </div>
    </section>
    <div style={{background:'var(--sdcd-fond-alt)'}}>
      <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:20}}>
          <h2 style={{fontSize:'var(--sdcd-h2)',margin:0}}>Actualités</h2>
          <a href="#" style={{fontSize:'var(--sdcd-sm)',fontWeight:600}}>Toutes les actualités <i className="ri-arrow-right-line" style={{verticalAlign:'-2px'}}></i></a>
        </div>
        <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16}}>
          <Card surTitre="Communiqué" titre="Le SDCD, système de design de l’État, est publié" description="Une identité numérique commune à tous les sites officiels." meta="15 août 2026" image={<div style={{width:'100%',height:'100%'}}><image-slot id="min-actu-1" shape="rect" placeholder="Photo"></image-slot></div>}/>
          <Card surTitre="Partenariat" titre="Accord de connectivité des zones rurales" description="Signature avec les opérateurs pour 2 000 localités." meta="9 août 2026" image={<div style={{width:'100%',height:'100%'}}><image-slot id="min-actu-2" shape="rect" placeholder="Photo"></image-slot></div>}/>
          <Card surTitre="Appel à projets" titre="Startups congolaises du service public" description="Dépôt des candidatures jusqu’au 30 septembre." meta="1 août 2026" image={<div style={{width:'100%',height:'100%'}}><image-slot id="min-actu-3" shape="rect" placeholder="Photo"></image-slot></div>}/>
        </div>
      </section>
    </div>
    <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:'clamp(18px,3.5vw,32px)'}}>
      <div>
        <h2 style={{fontSize:'var(--sdcd-h2)'}}>Démarches du ministère</h2>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[["Homologation d’un équipement radioélectrique","ARPTC"],["Licence d’opérateur de services numériques","Direction des services numériques"],["Déclaration d’un traitement de données","Autorité de protection des données"]].map((d,i)=>
            <a key={i} href="#" style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',textDecoration:'none',background:'var(--sdcd-fond)'}}>
              <i className="ri-file-text-line" style={{fontSize:20,color:'var(--sdcd-action)'}}></i>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-texte)'}}>{d[0]}</div>
              <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{d[1]}</div></div>
              <i className="ri-arrow-right-line" style={{color:'var(--sdcd-action)'}}></i></a>)}
        </div>
      </div>
      <div>
        <h2 style={{fontSize:'var(--sdcd-h2)'}}>Le ministre</h2>
        <div style={{display:'flex',gap:20,border:'1px solid var(--sdcd-ligne)',borderRadius:'var(--sdcd-rayon-carte)',padding:20,alignItems:'center'}}>
          <div style={{width:96,height:96,flexShrink:0}}><image-slot id="portrait-ministre" shape="circle" placeholder="Portrait"></image-slot></div>
          <div>
            <div style={{fontWeight:700}}>Portrait officiel du ministre</div>
            <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',marginTop:4}}>Biographie, cabinet et agenda officiel du ministre du Numérique.</div>
            <a href="#" style={{fontSize:'var(--sdcd-sm)',fontWeight:600,display:'inline-block',marginTop:8}}>Lire la biographie <i className="ri-arrow-right-line" style={{verticalAlign:'-2px'}}></i></a>
          </div>
        </div>
        <Alert type="info" titre="Presse" style={{marginTop:16}}>Accréditations et demandes d’interview : presse@numerique.gouv.cd</Alert>
      </div>
    </section>
    <div style={{background:'var(--sdcd-fond-alt)'}}>
      <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)'}}>
        <h2 style={{fontSize:'var(--sdcd-h2)',margin:'0 0 20px'}}>Le ministère en images</h2>
        <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1.3fr) minmax(0,1fr)',gap:'clamp(15px,3.5vw,28px)',alignItems:'start'}}>
          <Carousel legende={["Inauguration du Datacenter national","Formation des agents publics","Signature de l’accord de connectivité"]}>
            <div style={{height:300}}><image-slot id="min-car-1" shape="rect" placeholder="Diapositive 1 — déposez une photo"></image-slot></div>
            <div style={{height:300}}><image-slot id="min-car-2" shape="rect" placeholder="Diapositive 2"></image-slot></div>
            <div style={{height:300}}><image-slot id="min-car-3" shape="rect" placeholder="Diapositive 3"></image-slot></div>
          </Carousel>
          <Gallery colonnes={2} items={[1,2,3,4].map(n=>({contenu:<image-slot id={'min-gal-'+n} shape="rect" placeholder={'Photo '+n}></image-slot>,legende:['Datacenter national','Guichet numérique','Atelier de formation','Visite officielle'][n-1]}))}/>
        </div>
      </section>
    </div>
  </div>;
}

const WrapM=({fil,children})=><div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(24px,7vw) var(--sdcd-gouttiere) min(56px,6vw)'}}>
  <Breadcrumb items={["Accueil",fil]} style={{marginBottom:20}}/>{children}</div>;
function LeMinistere(){
  return <WrapM fil="Le ministère">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Le ministère</h1>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,760px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start'}}>
      <div>
        <p style={{fontSize:'1.0625rem',lineHeight:1.7}}>Le Ministère du Numérique conduit la politique de l’État en matière de transformation numérique : identité numérique des citoyens, dématérialisation des démarches, connectivité du territoire et souveraineté des données.</p>
        <Quote auteur="Plan Congo Numérique" source="horizon 2030">Faire du numérique un levier d’intégration nationale, de bonne gouvernance et de croissance.</Quote>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Organisation</h2>
        <Accordion items={[
          {titre:"Cabinet du ministre",contenu:"Direction politique, conseil et coordination interministérielle."},
          {titre:"Secrétariat général au Numérique",contenu:"Administration centrale : directions des services numériques, des infrastructures et de la donnée."},
          {titre:"Établissements sous tutelle",contenu:"ARPTC (régulation), Agence de développement du numérique, Datacenter national."}]}/>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Textes fondateurs</h2>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <Lien telechargement detail="PDF – 840 Ko">Ordonnance portant organisation du ministère</Lien>
          <Lien telechargement detail="PDF – 2,1 Mo">Plan Congo Numérique — horizon 2030</Lien>
        </div>
      </div>
      <aside style={{display:'flex',flexDirection:'column',gap:16}}>
        <Tile icon="ri-map-pin-line" titre="Siège" description="Boulevard du 30-Juin, Kinshasa-Gombe"/>
        <Tile icon="ri-time-line" titre="Horaires" description="Lun.–ven., 8 h – 16 h"/>
        <Tile icon="ri-mail-line" titre="Écrire au ministère" description="Formulaire de contact"/>
      </aside>
    </div>
  </WrapM>;
}
function DemarchesM(){
  return <WrapM fil="Démarches">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Démarches du ministère</h1>
    <SearchBar placeholder="Rechercher une démarche du ministère…" style={{margin:'8px 0 28px'}}/>
    <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:800}}>
      {[["Homologation d’un équipement radioélectrique","ARPTC — délai moyen : 10 jours",["En ligne","succes"],"ri-router-line"],
        ["Licence d’opérateur de services numériques","Direction des services numériques",["En ligne","succes"],"ri-global-line"],
        ["Déclaration d’un traitement de données personnelles","Autorité de protection des données",["En ligne","succes"],"ri-shield-user-line"],
        ["Hébergement d’un site en .gouv.cd","Réservé aux entités publiques",["Sur demande","neutre"],"ri-server-line"],
        ["Certificat électronique d’agent public","Infrastructure nationale de confiance",["Bientôt","nouveau"],"ri-key-2-line"]].map((d,i)=>
        <a key={i} href="#" style={{display:'flex',alignItems:'center',gap:16,padding:'16px 20px',background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',textDecoration:'none'}}>
          <i className={d[3]} style={{fontSize:22,color:'var(--sdcd-action)'}}></i>
          <div style={{flex:1}}><div style={{fontWeight:600,color:'var(--sdcd-texte)'}}>{d[0]}</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:2}}>{d[1]}</div></div>
          <Badge ton={d[2][1]}>{d[2][0]}</Badge>
          <i className="ri-arrow-right-line" style={{color:'var(--sdcd-action)'}}></i>
        </a>)}
    </div>
  </WrapM>;
}
function ActualitesM(){
  return <WrapM fil="Actualités">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Actualités du ministère</h1>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(3,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))',gap:16,marginTop:16}}>
      {[["Communiqué","Le SDCD, système de design de l’État, est publié","15 août 2026","ma1"],
        ["Partenariat","Accord de connectivité des zones rurales","9 août 2026","ma2"],
        ["Appel à projets","Startups congolaises du service public","1 août 2026","ma3"],
        ["Infrastructure","Mise en service du Datacenter national","22 juillet 2026","ma4"],
        ["Formation","10 000 agents formés aux outils numériques","15 juillet 2026","ma5"],
        ["International","La RDC au Sommet africain du numérique","2 juillet 2026","ma6"]].map((a,i)=>
        <Card key={i} surTitre={a[0]} titre={a[1]} meta={a[2]} image={<div style={{width:'100%',height:'100%'}}><image-slot id={'min-page-'+a[3]} shape="rect" placeholder="Photo"></image-slot></div>}/>)}
    </div>
  </WrapM>;
}
function PublicationsM(){
  return <WrapM fil="Publications">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Publications et données</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Rapports, référentiels et jeux de données du ministère, sous licence ouverte.</p>
    <DataTable titre="Documents publiés" parPage={5} editable={false}
      colonnes={[{cle:"titre",label:"Document"},{cle:"type",label:"Type"},{cle:"date",label:"Publication"},{cle:"pages",label:"Pages",type:"nombre"}]}
      lignes={[
        {titre:"Rapport annuel du numérique 2025",type:"Rapport",date:"2026-03-12",pages:148},
        {titre:"Référentiel congolais d’accessibilité (RCA) v1",type:"Référentiel",date:"2026-06-02",pages:96},
        {titre:"Baromètre de la connectivité — T2 2026",type:"Données",date:"2026-07-15",pages:24},
        {titre:"Guide de la marque d’État en ligne",type:"Guide",date:"2026-08-01",pages:52},
        {titre:"Schéma directeur du Datacenter national",type:"Schéma",date:"2025-11-20",pages:210},
        {titre:"Étude d’impact de l’identité numérique",type:"Étude",date:"2025-09-08",pages:132}]}/>
  </WrapM>;
}
function ContactM(){
  const [d,setD]=React.useState({sujet:'— Sélectionner —'});
  const [errs,setErrs]=React.useState({});
  const [ok,setOk]=React.useState(false);
  const maj=(k,v)=>setD({...d,[k]:v});
  const envoyer=()=>{const e={};
    if(!d.sujet||d.sujet==='— Sélectionner —')e.sujet='Choisissez un sujet.';
    if(!(d.nom||'').trim())e.nom='Ce champ est requis.';
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email||''))e.email='Adresse électronique invalide.';
    if(((d.message||'').trim()).length<20)e.message='Décrivez votre demande (20 caractères minimum).';
    setErrs(e);if(Object.keys(e).length===0)setOk(true);};
  return <WrapM fil="Contact">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Écrire au ministère</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Réponse sous 5 jours ouvrés. Pour une démarche en cours, indiquez votre numéro de dossier.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,640px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start',marginTop:20}}>
      {ok?<div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Alert type="succes" titre="Message envoyé">Votre demande est enregistrée sous la référence <strong style={{fontFamily:'var(--sdcd-font-mono)'}}>CT-2026-01842</strong>. Un accusé de réception vient de vous être adressé.</Alert>
        <Button variant="tertiaire" onClick={()=>{setOk(false);setD({sujet:'— Sélectionner —'});}}>Envoyer un autre message</Button>
      </div>
      :<div style={{border:'1px solid var(--sdcd-ligne)',padding:28,display:'flex',flexDirection:'column',gap:18,background:'var(--sdcd-fond)'}}>
        <Select label="Sujet *" options={["— Sélectionner —","Question sur une démarche","Demande d’information","Presse et médias","Signalement technique","Autre"]} value={d.sujet} error={errs.sujet} onChange={e=>maj('sujet',e.target.value)}/>
        <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:18}}>
          <Input label="Nom et prénom *" value={d.nom||''} error={errs.nom} onChange={e=>maj('nom',e.target.value)}/>
          <Input label="Adresse électronique *" value={d.email||''} error={errs.email} onChange={e=>maj('email',e.target.value)}/>
        </div>
        <Input label="Numéro de dossier (facultatif)" hint="Format : CD-AAAA-NNNNNN" value={d.dossier||''} onChange={e=>maj('dossier',e.target.value)}/>
        <div>
          <div style={{fontWeight:500,marginBottom:6}}>Votre message *</div>
          <textarea rows={5} value={d.message||''} onChange={e=>maj('message',e.target.value)} aria-label="Votre message"
            style={{width:'100%',boxSizing:'border-box',fontFamily:'inherit',fontSize:'var(--sdcd-corps)',lineHeight:1.5,padding:'10px 12px',color:'var(--sdcd-texte)',background:'var(--sdcd-fond)',border:'1px solid '+(errs.message?'var(--sdcd-erreur)':'var(--sdcd-ligne-forte)'),resize:'vertical'}}></textarea>
          {errs.message&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:6}}><i className="ri-error-warning-line" style={{verticalAlign:'-2px',marginRight:5}}></i>{errs.message}</div>}
        </div>
        <Upload label="Pièces jointes (facultatif)"/>
        <Checkbox label="J’accepte que mes données soient traitées pour répondre à ma demande (RGPD)." checked={!!d.rgpd} onChange={e=>maj('rgpd',e.target.checked)}/>
        <Button icon="ri-send-plane-line" onClick={envoyer} style={{alignSelf:'flex-start'}}>Envoyer le message</Button>
      </div>}
      <aside style={{display:'flex',flexDirection:'column',gap:16}}>
        <Tile icon="ri-phone-line" titre="148 — numéro unique" description="Lun.–ven., 8 h – 16 h"/>
        <Tile icon="ri-map-pin-line" titre="Accueil du public" description="Boulevard du 30-Juin, Gombe — sur rendez-vous"/>
        <Alert type="info" titre="Presse">Accréditations : presse@numerique.gouv.cd</Alert>
      </aside>
    </div>
  </WrapM>;
}
function App(){
  const [page,setPage]=React.useState(0);
  return <div style={{background:'var(--sdcd-fond)',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <Header entite="Ministère du Numérique" sousTitre="numerique.gouv.cd" nav={NAV} actif={page} onNav={setPage} assetsBase="../../"/>
    <main style={{flex:1}} data-screen-label={NAV[page]}>
      {[<Accueil/>,<LeMinistere/>,<DemarchesM/>,<ActualitesM/>,<PublicationsM/>,<ContactM/>][page]}
    </main>
    <Follow/>
    <Footer entite="Ministère du Numérique — numerique.gouv.cd" assetsBase="../../"
      colonnes={[{titre:"Le ministère",liens:["Missions","Organisation","Le ministre"]},
                 {titre:"Ressources",liens:["Publications","Données ouvertes","Marchés publics"]},
                 {titre:"La République",liens:["gouv.cd","Présidence","Journal officiel"]}]}/>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
});