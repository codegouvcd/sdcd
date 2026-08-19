(window.__sdcdReady||Promise.resolve()).then(()=>{
const NS = window[Object.keys(window).find(k=>/_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button)]||{};
const {Header,Footer,Breadcrumb,Button,IconButton,Input,Select,Checkbox,Radio,Upload,Wizard,Lien,Alert,Badge,Card,Tile,Tabnav,Password,CodeOTP,Segmented,ConnectButton,Notice,Stepper,
 Article,Tabs,Accordion,Quote,Pagination,Carousel,Gallery,MediaPlayer,TagCloud,Calendar,Rdv,Tracking,
 BarChart,LineChart,DonutChart} = NS;
const FAMILLES=[
  {nom:"Parcours usager",gabarits:["Fiche démarche","Réclamation","Demande de service","Tutoriel de connexion","Article d’actualité","Suivi de dossier","Prendre rendez-vous","Médiathèque","Données"]},
  {nom:"Comptes et accès",gabarits:["Connexion usager","Connexion agent","Créer un compte","Vérification du code","Double authentification","Mot de passe oublié","Nouveau mot de passe","Déconnexion","Compte bloqué"]}];
const Wrap=({fil,children})=><div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(24px,7vw) var(--sdcd-gouttiere) min(56px,6vw)'}}>
  <Breadcrumb items={["Accueil","Modèles",fil]} style={{marginBottom:22}}/>{children}</div>;

function PageArticle(){
  return <Wrap fil="Article d’actualité">
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,760px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start'}}>
      <Article surTitre="Communiqué — Ministère du Numérique" titre="Le portail unique des démarches administratives est ouvert"
        chapo="Depuis le 12 août 2026, gouv.cd rassemble en un point d’entrée unique les démarches, les textes officiels et l’annuaire des institutions de la République."
        date="15 août 2026" tempsLecture="4 min"
        hero={<image-slot id="mod-art-hero" shape="rect" placeholder="Image à la une — déposez une photo"></image-slot>}
        sommaire={["Ce qui change pour les usagers","Un compte citoyen unique","Le calendrier de déploiement"]}
        tags={["Numérique","Démarches","Identité numérique","Service public"]}>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 12px'}}>Ce qui change pour les usagers</h2>
        <p>Chaque démarche présente désormais ses conditions, la liste des pièces, les délais constatés et le coût fixé par arrêté. Le dépôt se fait en ligne de bout en bout ; un récépissé est délivré immédiatement.</p>
        <Quote auteur="Ministère du Numérique" source="communiqué du 12 août 2026">Un seul point d’entrée, la même exigence de service partout — de Kinshasa à la plus petite commune.</Quote>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Un compte citoyen unique</h2>
        <p>L’espace citoyen, valable sur tous les sites en .gouv.cd, permet de suivre ses dossiers, de conserver ses documents et de recevoir les notifications officielles par SMS et courriel.</p>
        <Gallery colonnes={3} items={[
          {contenu:<image-slot id="mod-art-g1" shape="rect" placeholder="Photo 1"></image-slot>,legende:"Lancement au Palais du Peuple"},
          {contenu:<image-slot id="mod-art-g2" shape="rect" placeholder="Photo 2"></image-slot>,legende:"Guichet numérique de Gombe"},
          {contenu:<image-slot id="mod-art-g3" shape="rect" placeholder="Photo 3"></image-slot>,legende:"Formation des agents"}]}/>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Le calendrier de déploiement</h2>
        <p>Les 26 provinces seront raccordées d’ici décembre 2026 ; les communes suivront au premier semestre 2027.</p>
      </Article>
      <aside style={{display:'flex',flexDirection:'column',gap:'clamp(15px,3.5vw,28px)',position:'sticky',top:24}}>
        <div>
          <div className="sdcd-eyebrow" style={{marginBottom:14}}>À lire aussi</div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <Card surTitre="Journal officiel" titre="Décret sur l’identité numérique" meta="10 juillet 2026"/>
            <Card surTitre="Infrastructures" titre="2 000 localités connectées" meta="9 août 2026"/>
          </div>
        </div>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20}}>
          <div className="sdcd-eyebrow" style={{marginBottom:14}}>Mots-clés les plus consultés</div>
          <TagCloud tags={[{label:"Passeport",poids:124},{label:"Impôts",poids:87},{label:"État civil",poids:64},{label:"Permis",poids:41},{label:"Entreprise",poids:38},{label:"Visa",poids:17}]}/>
        </div>
      </aside>
    </div>
  </Wrap>;
}

function PageSuivi(){
  const [num,setNum]=React.useState('CD-2026-084517');
  const [shown,setShown]=React.useState(null);
  const [err,setErr]=React.useState('');
  const chercher=()=>{const v=num.trim().toUpperCase();
    if(!/^CD-\d{4}-\d{6}$/.test(v)){setErr('Format attendu : CD-AAAA-NNNNNN (ex. CD-2026-084517).');setShown(null);return;}
    setErr('');setShown(v);};
  return <Wrap fil="Suivi de dossier">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Suivre mon dossier</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Saisissez le numéro figurant sur votre récépissé de dépôt. Les informations sont mises à jour à chaque étape de l’instruction.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) 360px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(31px,3.5vw,56px)',alignItems:'start',marginTop:24}}>
      <div>
        <div style={{display:'flex',gap:12,alignItems:'flex-end',maxWidth:520}}>
          <div style={{flex:1}}><Input label="Numéro de dossier" hint="Format : CD-AAAA-NNNNNN" value={num} error={err} onChange={e=>setNum(e.target.value)}/></div>
          <div style={{paddingBottom:err?34:0}}><Button icon="ri-search-line" onClick={chercher}>Suivre</Button></div>
        </div>
        {shown&&<div style={{marginTop:28,display:'flex',flexDirection:'column',gap:20}}>
          <Alert type="succes" titre={'Dossier '+shown+' trouvé'}>Dernière mise à jour : 6 août 2026 à 14 h 12.</Alert>
          <Tracking dossier={shown}/>
        </div>}
        {!shown&&!err&&<Alert type="info" titre="Exemple" style={{marginTop:28,maxWidth:520}}>Le numéro pré-rempli est un dossier de démonstration : cliquez sur « Suivre ».</Alert>}
      </div>
      <aside style={{display:'flex',flexDirection:'column',gap:24}}>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20}}>
          <div className="sdcd-eyebrow" style={{marginBottom:12}}>Questions fréquentes</div>
          <Accordion items={[
            {titre:"J’ai perdu mon numéro de dossier",contenu:"Retrouvez-le dans le courriel de confirmation ou dans l’espace citoyen, rubrique « Mes démarches »."},
            {titre:"Les délais sont dépassés",contenu:"Contactez le service instructeur via le lien « Contacter le service » du suivi, ou appelez le 148."},
            {titre:"Puis-je modifier mon dossier ?",contenu:"Tant que l’instruction n’a pas commencé, oui, depuis l’espace citoyen."}]}/>
        </div>
        <Tile icon="ri-phone-line" titre="148 — numéro unique de l’administration" description="Du lundi au vendredi, 8 h – 16 h"/>
      </aside>
    </div>
  </Wrap>;
}

function PageRdv(){
  const [demarche,setDemarche]=React.useState('Dépôt de demande de passeport');
  const [lieu,setLieu]=React.useState('Bureau des passeports — Kinshasa-Gombe');
  return <Wrap fil="Prendre rendez-vous">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Prendre rendez-vous</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Choisissez la démarche, le lieu, puis un créneau. La convocation est envoyée par courriel et par SMS.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) 380px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(31px,3.5vw,56px)',alignItems:'start',marginTop:24}}>
      <div style={{display:'flex',flexDirection:'column',gap:20,maxWidth:560}}>
        <Select label="Démarche" options={["Dépôt de demande de passeport","Retrait de passeport","Enrôlement carte d’identité","Légalisation de documents"]} value={demarche} onChange={e=>setDemarche(e.target.value)}/>
        <Select label="Lieu d’accueil" options={["Bureau des passeports — Kinshasa-Gombe","Bureau des passeports — Lubumbashi","Antenne de Goma","Antenne de Matadi"]} value={lieu} onChange={e=>setLieu(e.target.value)}/>
        <Rdv lieu={lieu}/>
      </div>
      <aside style={{display:'flex',flexDirection:'column',gap:24}}>
        <div>
          <div className="sdcd-eyebrow" style={{marginBottom:12}}>Jours d’ouverture — août 2026</div>
          <Calendar annee={2026} mois={7} selection={24} evenements={[15,30]}/>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:8}}><span style={{display:'inline-block',width:6,height:6,borderRadius:99,background:'var(--sdcd-rouge)',marginRight:6,verticalAlign:'middle'}}></span>Jour férié — guichets fermés</div>
        </div>
        <Alert type="alerte" titre="Pièces à apporter">Récépissé de pré-demande, acte de naissance et photo d’identité récente. Sans dossier complet, le rendez-vous est reporté.</Alert>
      </aside>
    </div>
  </Wrap>;
}

function PageMedia(){
  const [tab,setTab]=React.useState(0);
  return <Wrap fil="Médiathèque">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Médiathèque officielle</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Photographies, vidéos et allocutions officielles, sous licence ouverte de l’État congolais.</p>
    <Carousel legende={["Palais de la Nation, Kinshasa","Fleuve Congo à Kisangani","Session à l’Assemblée nationale"]} style={{marginTop:24}}>
      <div style={{height:380}}><image-slot id="mod-med-c1" shape="rect" placeholder="Diapositive 1 — déposez une photo"></image-slot></div>
      <div style={{height:380}}><image-slot id="mod-med-c2" shape="rect" placeholder="Diapositive 2"></image-slot></div>
      <div style={{height:380}}><image-slot id="mod-med-c3" shape="rect" placeholder="Diapositive 3"></image-slot></div>
    </Carousel>
    <div style={{marginTop:32}}>
      <Tabs onglets={["Photographies","Vidéos","Audio"]} actif={tab} onChange={setTab}>
        <div>
          <Gallery colonnes={4} items={[1,2,3,4,5,6,7,8].map(n=>({contenu:<image-slot id={'mod-med-g'+n} shape="rect" placeholder={'Photo '+n}></image-slot>,legende:['Palais de la Nation','Port de Matadi','Marché central','Barrage d’Inga','Parc des Virunga','Université de Kinshasa','Gare centrale','Stade des Martyrs'][n-1]}))}/>
          <div style={{display:'flex',justifyContent:'center',marginTop:24}}><Pagination pages={12} actif={1}/></div>
        </div>
        <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:20}}>
          <MediaPlayer titre="Adresse à la Nation — fête de l’indépendance" duree="12:36" poster={<image-slot id="mod-med-v1" shape="rect" placeholder="Vignette"></image-slot>}/>
          <MediaPlayer titre="Conférence de presse — Conseil des ministres" duree="34:08" poster={<image-slot id="mod-med-v2" shape="rect" placeholder="Vignette"></image-slot>}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14,maxWidth:640}}>
          <MediaPlayer type="audio" titre="Bulletin officiel d’information — 15 août 2026" duree="08:12"/>
          <MediaPlayer type="audio" titre="Allocution radiodiffusée — santé publique" duree="05:47"/>
        </div>
      </Tabs>
    </div>
  </Wrap>;
}


function PageFiche(){
  const [rappel,setRappel]=React.useState(false);
  return <Wrap fil="Demander un passeport biométrique">
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,760px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start'}}>
      <div>
        <div className="sdcd-eyebrow" style={{marginBottom:10}}>Papiers et citoyenneté</div>
        <h1 style={{fontSize:'var(--sdcd-h1)',margin:'0 0 12px'}}>Demander un passeport biométrique</h1>
        <div style={{display:'flex',gap:8,marginBottom:20}}><Badge ton="succes">Démarche en ligne</Badge><Badge>Mise à jour : 1er août 2026</Badge></div>
        <Alert type="info" titre="En bref">La demande se fait en ligne, le dépôt des empreintes sur rendez-vous, et le retrait au lieu choisi. Délai moyen constaté : <strong>15 jours ouvrés</strong>.</Alert>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Qui est concerné ?</h2>
        <p>Tout citoyen congolais. Pour un mineur, la demande est faite par le représentant légal, la présence de l’enfant est requise au dépôt des empreintes.</p>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Comment faire la démarche ?</h2>
        <ol style={{listStyle:'none',margin:'0 0 8px',padding:0,display:'flex',flexDirection:'column',gap:0}}>
          {[["Remplir la pré-demande en ligne","Depuis votre espace citoyen, environ 15 minutes.","ri-edit-box-line"],
            ["Payer les frais","Paiement en ligne sécurisé ; le reçu est joint automatiquement au dossier.","ri-bank-card-line"],
            ["Déposer les empreintes","Sur rendez-vous, dans le bureau des passeports de votre choix.","ri-fingerprint-line"],
            ["Retirer le passeport","Vous êtes notifié par SMS et courriel dès qu’il est disponible.","ri-passport-line"]].map((e,i)=>
            <li key={i} style={{display:'flex',gap:16,padding:'16px 0',borderBottom:'1px solid var(--sdcd-ligne)'}}>
              <span aria-hidden="true" style={{width:34,height:34,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--sdcd-bleu-pale)',color:'var(--sdcd-bleu-profond)',fontWeight:700}}>{i+1}</span>
              <div><div style={{fontWeight:700,fontSize:'var(--sdcd-corps)'}}><i className={e[2]} style={{color:'var(--sdcd-action)',marginRight:8,verticalAlign:'-2px'}}></i>{e[0]}</div>
              <div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',marginTop:3}}>{e[1]}</div></div>
            </li>)}
        </ol>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Pièces à fournir</h2>
        <Accordion items={[
          {titre:"Première demande",contenu:"Acte de naissance, attestation de nationalité, photo d’identité aux normes, preuve de résidence de moins de 3 mois."},
          {titre:"Renouvellement",contenu:"Ancien passeport, photo d’identité récente. En cas de changement d’état civil, l’acte correspondant."},
          {titre:"Perte ou vol",contenu:"Déclaration de perte ou de vol établie par la police, plus les pièces de la première demande."}]}/>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Coût et délais</h2>
        <div style={{border:'1px solid var(--sdcd-ligne)'}}>
          {[["Procédure ordinaire","15 jours ouvrés","185 000 FC"],["Procédure d’urgence","5 jours ouvrés","320 000 FC"]].map((r,i)=>
            <div key={i} className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) auto auto',gap:24,padding:'13px 18px',borderTop:i?'1px solid var(--sdcd-ligne)':'none',fontSize:'var(--sdcd-sm)'}}>
              <span style={{fontWeight:600}}>{r[0]}</span><span style={{color:'var(--sdcd-muet)'}}>{r[1]}</span>
              <span style={{fontFamily:'var(--sdcd-font-mono)',fontWeight:500}}>{r[2]}</span>
            </div>)}
        </div>
        <div style={{display:'flex',gap:12,marginTop:32,flexWrap:'wrap'}}>
          <Button icon="ri-arrow-right-line">Commencer la démarche</Button>
          <Button variant="secondaire" icon="ri-calendar-line">Prendre rendez-vous</Button>
          <Button variant="tertiaire" icon="ri-printer-line">Imprimer la fiche</Button>
        </div>
        <h2 style={{fontSize:'var(--sdcd-h3)',margin:'40px 0 12px'}}>Textes de référence</h2>
        <ul style={{margin:0,paddingLeft:18,display:'flex',flexDirection:'column',gap:8,fontSize:'var(--sdcd-sm)'}}>
          <li><a href="#">Décret n° 26/014 fixant les modalités de délivrance des passeports</a></li>
          <li><a href="#">Arrêté interministériel relatif aux frais de chancellerie</a></li>
        </ul>
      </div>
      <aside style={{display:'flex',flexDirection:'column',gap:20,position:'sticky',top:24}}>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20}}>
          <div className="sdcd-eyebrow" style={{marginBottom:12}}>Où s’adresser ?</div>
          <div style={{fontSize:'var(--sdcd-sm)',lineHeight:1.6}}>
            <strong>Direction générale de migration</strong><br/>Bureaux des passeports — 12 villes<br/>
            <a href="#" style={{display:'inline-block',marginTop:8}}>Trouver le bureau le plus proche</a>
          </div>
        </div>
        <Tile icon="ri-search-line" titre="Suivre un dossier en cours" description="Avec votre n° CD-AAAA-NNNNNN"/>
        <Tile icon="ri-phone-line" titre="148 — numéro unique" description="Lun.–ven., 8 h – 16 h"/>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20}}>
          <div className="sdcd-eyebrow" style={{marginBottom:12}}>Documents à télécharger</div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <Lien telechargement detail="PDF – 320 Ko" taille="sm">Formulaire de pré-demande</Lien>
            <Lien telechargement detail="PDF – 180 Ko" taille="sm">Liste des pièces par situation</Lien>
            <Lien telechargement detail="PDF – 95 Ko" taille="sm">Normes de la photo d’identité</Lien>
          </div>
        </div>
        <div style={{border:'1px solid var(--sdcd-ligne)',padding:20}}>
          <div className="sdcd-eyebrow" style={{marginBottom:10}}>Rappel avant expiration</div>
          <p style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',margin:'0 0 10px'}}>Recevez un rappel 6 mois avant l’expiration de votre passeport.</p>
          <Checkbox label="Activer le rappel par SMS" checked={rappel} onChange={e=>setRappel(e.target.checked)}/>
          {rappel&&<div role="status" style={{marginTop:10,fontSize:'var(--sdcd-xs)',color:'var(--sdcd-succes)',fontWeight:600}}><i className="ri-checkbox-circle-line" style={{verticalAlign:'-2px',marginRight:4}}></i>Rappel activé.</div>}
        </div>
      </aside>
    </div>
  </Wrap>;
}
function PageTutoriel(){
  const ETAPES=['Créer votre compte','Vérifier votre identité','C’est terminé'];
  const [et,setEt]=React.useState(0);
  const [email,setEmail]=React.useState(''),[mdp,setMdp]=React.useState(''),[cond,setCond]=React.useState(false);
  const [code,setCode]=React.useState('');
  const [err,setErr]=React.useState({});
  const valider0=()=>{const e={};
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))e.email='Saisissez une adresse électronique valide.';
    if(mdp.length<8)e.mdp='8 caractères minimum.';
    if(!cond)e.cond='Vous devez accepter les conditions.';
    setErr(e);if(Object.keys(e).length===0)setEt(1);};
  const valider1=()=>{const e={};
    if(code.trim()!=='123456')e.code='Code incorrect. Pour la démonstration, saisissez 123456.';
    setErr(e);if(Object.keys(e).length===0)setEt(2);};
  return <Wrap fil="Tutoriel — créer son compte citoyen">
    <div style={{maxWidth:760}}>
      <h1 style={{fontSize:'var(--sdcd-h1)',margin:'0 0 10px'}}>Créer son compte citoyen, pas à pas</h1>
      <p style={{color:'var(--sdcd-muet)',margin:'0 0 28px'}}>Le compte citoyen est votre identité numérique officielle, valable sur tous les sites en .gouv.cd. Trois minutes suffisent.</p>
      <ol style={{listStyle:'none',margin:'0 0 32px',padding:0,display:'flex'}}>
        {ETAPES.map((t,i)=>{const fait=i<et,cur=i===et;
          return <li key={i} aria-current={cur?'step':undefined} style={{flex:1,position:'relative',paddingTop:26}}>
            <span aria-hidden="true" style={{position:'absolute',top:9,left:0,right:0,height:3,background:i<=et?'var(--sdcd-action)':'var(--sdcd-ligne)'}}></span>
            <span aria-hidden="true" style={{position:'absolute',top:0,left:0,width:21,height:21,display:'flex',alignItems:'center',justifyContent:'center',background:fait||cur?'var(--sdcd-action)':'var(--sdcd-fond)',border:'2px solid '+(fait||cur?'var(--sdcd-action)':'var(--sdcd-ligne-forte)'),color:'#fff',fontSize:11,fontWeight:700}}>{fait?<i className="ri-check-line"></i>:i+1}</span>
            <span style={{fontSize:'var(--sdcd-xs)',fontWeight:cur?700:500,color:cur?'var(--sdcd-texte)':'var(--sdcd-muet)'}}>Étape {i+1}<br/><span style={{fontSize:'var(--sdcd-sm)'}}>{t}</span></span>
          </li>;})}
      </ol>
      {et===0&&<div style={{border:'1px solid var(--sdcd-ligne)',padding:28,display:'flex',flexDirection:'column',gap:18,maxWidth:520}}>
        <Input label="Adresse électronique" hint="Elle servira d’identifiant de connexion." placeholder="prenom.nom@exemple.cd" value={email} error={err.email} onChange={e=>setEmail(e.target.value)}/>
        <Input label="Mot de passe" type="password" hint="8 caractères minimum, dont un chiffre." value={mdp} error={err.mdp} onChange={e=>setMdp(e.target.value)}/>
        <div>
          <Checkbox label={<span>J’accepte les <a href="#">conditions générales d’utilisation</a></span>} checked={cond} onChange={e=>setCond(e.target.checked)}/>
          {err.cond&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:6}}><i className="ri-error-warning-line" style={{verticalAlign:'-2px',marginRight:5}}></i>{err.cond}</div>}
        </div>
        <Button iconRight="ri-arrow-right-line" onClick={valider0} style={{alignSelf:'flex-start'}}>Continuer</Button>
      </div>}
      {et===1&&<div style={{border:'1px solid var(--sdcd-ligne)',padding:28,maxWidth:520}}>
        <p style={{fontSize:'var(--sdcd-sm)',margin:'0 0 18px'}}>Un code à 6 chiffres a été envoyé par SMS au numéro associé à <strong>{email||'votre compte'}</strong>.</p>
        <Input label="Code de vérification" hint="Pour la démonstration : 123456" value={code} error={err.code} onChange={e=>setCode(e.target.value)} style={{maxWidth:240}}/>
        <div style={{display:'flex',gap:12,marginTop:18}}>
          <Button variant="secondaire" icon="ri-arrow-left-line" onClick={()=>{setErr({});setEt(0);}}>Retour</Button>
          <Button iconRight="ri-arrow-right-line" onClick={valider1}>Vérifier</Button>
        </div>
        <div style={{marginTop:14}}><a href="#" style={{fontSize:'var(--sdcd-xs)'}}>Je n’ai pas reçu le code</a></div>
      </div>}
      {et===2&&<div style={{maxWidth:560,display:'flex',flexDirection:'column',gap:18}}>
        <Alert type="succes" titre="Votre compte citoyen est créé">Un courriel de confirmation vient de vous être envoyé. Vous pouvez maintenant vous connecter sur tous les sites officiels avec le même identifiant.</Alert>
        <div style={{display:'flex',gap:12}}>
          <Button icon="ri-user-line">Accéder à l’espace citoyen</Button>
          <Button variant="tertiaire" onClick={()=>{setEt(0);setEmail('');setMdp('');setCond(false);setCode('');setErr({});}}>Rejouer le tutoriel</Button>
        </div>
      </div>}
    </div>
  </Wrap>;
}
function PageDonnees(){
  return <Wrap fil="Données du service public numérique">
    <h1 style={{fontSize:'var(--sdcd-h1)',margin:'0 0 10px'}}>Les chiffres du service public numérique</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:640,margin:'0 0 28px'}}>Données publiées chaque mois en licence ouverte. Chaque graphique est consultable en tableau accessible.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:16,marginBottom:24}}>
      {[["1 043","démarches en ligne","ri-file-list-3-line"],["126 000","visites en août","ri-line-chart-line"],["58 400","comptes citoyens","ri-user-line"],["15 j","délai moyen constaté","ri-time-line"]].map((k,i)=>
        <div key={i} style={{border:'1px solid var(--sdcd-ligne)',borderBottom:'3px solid var(--sdcd-action)',padding:'18px 20px'}}>
          <i className={k[2]} style={{fontSize:22,color:'var(--sdcd-action)'}}></i>
          <div style={{fontSize:'1.75rem',fontWeight:700,letterSpacing:'-0.02em',marginTop:8,fontFamily:'var(--sdcd-font-mono)'}}>{k[0]}</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{k[1]}</div>
        </div>)}
    </div>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1.15fr) minmax(0,1fr)',gap:20,marginBottom:20}}>
      <BarChart titre="Dossiers traités par trimestre" unite="dossiers" source="Direction générale de migration, 2026"
        categories={["T1","T2","T3","T4"]}
        series={[{nom:"2025",valeurs:[8200,9100,8800,10400]},{nom:"2026",valeurs:[11200,13400,15100,16800]}]}/>
      <DonutChart titre="Démarches par thématique" unite="démarches" source="gouv.cd, août 2026"
        donnees={[{nom:"Papiers et citoyenneté",valeur:412},{nom:"Impôts et taxes",valeur:230},{nom:"Entreprise",valeur:184},{nom:"Transports",valeur:121},{nom:"Autres",valeur:96}]}/>
    </div>
    <LineChart titre="Fréquentation mensuelle" unite="visites" hauteur={230} source="Mesure d’audience de l’État, 2026"
      categories={["Mars","Avril","Mai","Juin","Juillet","Août"]}
      series={[{nom:"Portail gouv.cd",valeurs:[42000,58000,71000,84000,97000,126000]},{nom:"Espace citoyen",valeurs:[8000,14000,22000,31000,42000,58000]}]}/>
  </Wrap>;
}

function PageReclamation(){
  const [d,setD]=React.useState({objet:'— Sélectionner —',gravite:'Gêne ponctuelle'});
  const [errs,setErrs]=React.useState({});
  const [ok,setOk]=React.useState(false);
  const maj=(k,v)=>setD({...d,[k]:v});
  const envoyer=()=>{const e={};
    if(!d.objet||d.objet==='— Sélectionner —')e.objet='Choisissez l’objet de la réclamation.';
    if(d.dossier&&!/^CD-\d{4}-\d{6}$/.test(d.dossier.trim().toUpperCase()))e.dossier='Format attendu : CD-AAAA-NNNNNN.';
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email||''))e.email='Adresse électronique invalide.';
    if(((d.desc||'').trim()).length<30)e.desc='Décrivez les faits (30 caractères minimum).';
    if(!d.honneur)e.honneur='La déclaration sur l’honneur est requise.';
    setErrs(e);if(Object.keys(e).length===0)setOk(true);};
  return <Wrap fil="Déposer une réclamation">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Déposer une réclamation</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:640}}>Pour contester une décision, signaler un retard anormal ou un dysfonctionnement d’un service public. Accusé de réception immédiat, réponse motivée sous 30 jours.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,640px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start',marginTop:20}}>
      {ok?<div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Alert type="succes" titre="Réclamation enregistrée">Référence <strong style={{fontFamily:'var(--sdcd-font-mono)'}}>REC-2026-00731</strong>. Un accusé de réception vous est adressé ; suivez le traitement depuis l’espace citoyen.</Alert>
        <div style={{display:'flex',gap:12}}>
          <Button icon="ri-search-line">Suivre ma réclamation</Button>
          <Button variant="tertiaire" onClick={()=>{setOk(false);setD({objet:'— Sélectionner —',gravite:'Gêne ponctuelle'});}}>Nouvelle réclamation</Button>
        </div>
      </div>
      :<div style={{border:'1px solid var(--sdcd-ligne)',padding:28,display:'flex',flexDirection:'column',gap:18,background:'var(--sdcd-fond)'}}>
        <Select label="Objet de la réclamation *" options={["— Sélectionner —","Retard anormal de traitement","Erreur sur un document délivré","Décision contestée","Problème de paiement","Comportement d’un agent","Autre"]} value={d.objet} error={errs.objet} onChange={e=>maj('objet',e.target.value)}/>
        <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:18}}>
          <Input label="Numéro de dossier concerné" hint="Facultatif — format CD-AAAA-NNNNNN" value={d.dossier||''} error={errs.dossier} onChange={e=>maj('dossier',e.target.value)}/>
          <Input label="Adresse électronique *" value={d.email||''} error={errs.email} onChange={e=>maj('email',e.target.value)}/>
        </div>
        <div>
          <div style={{fontWeight:500,marginBottom:8}}>Impact de la situation</div>
          <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
            {['Gêne ponctuelle','Blocage d’une démarche','Préjudice grave'].map(g=><Radio key={g} name="gravite" label={g} checked={d.gravite===g} onChange={()=>maj('gravite',g)}/>)}
          </div>
        </div>
        <div>
          <div style={{fontWeight:500,marginBottom:6}}>Description des faits *</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginBottom:6}}>Dates, service concerné, personnes contactées, réponses obtenues.</div>
          <textarea rows={6} value={d.desc||''} onChange={e=>maj('desc',e.target.value)} aria-label="Description des faits"
            style={{width:'100%',boxSizing:'border-box',fontFamily:'inherit',fontSize:'var(--sdcd-corps)',lineHeight:1.5,padding:'10px 12px',color:'var(--sdcd-texte)',background:'var(--sdcd-fond)',border:'1px solid '+(errs.desc?'var(--sdcd-erreur)':'var(--sdcd-ligne-forte)'),resize:'vertical'}}></textarea>
          {errs.desc&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:6}}><i className="ri-error-warning-line" style={{verticalAlign:'-2px',marginRight:5}}></i>{errs.desc}</div>}
        </div>
        <Upload label="Pièces à l’appui" hint="Courriers, reçus, captures — PDF, JPG, PNG, 5 Mo max."/>
        <div>
          <Checkbox label="Je déclare sur l’honneur l’exactitude des faits rapportés." checked={!!d.honneur} onChange={e=>maj('honneur',e.target.checked)}/>
          {errs.honneur&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:6}}><i className="ri-error-warning-line" style={{verticalAlign:'-2px',marginRight:5}}></i>{errs.honneur}</div>}
        </div>
        <Button icon="ri-send-plane-line" onClick={envoyer} style={{alignSelf:'flex-start'}}>Déposer la réclamation</Button>
      </div>}
      <aside style={{display:'flex',flexDirection:'column',gap:16,position:'sticky',top:24}}>
        <Alert type="info" titre="Avant de réclamer">Beaucoup de situations se résolvent en contactant d’abord le service instructeur via le suivi de dossier.</Alert>
        <Tile icon="ri-scales-3-line" titre="Médiateur de la République" description="Recours si la réponse ne vous satisfait pas"/>
        <Tile icon="ri-phone-line" titre="148 — numéro unique" description="Lun.–ven., 8 h – 16 h"/>
      </aside>
    </div>
  </Wrap>;
}
function PageService(){
  return <Wrap fil="Demande de service">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Demander un service public</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:640}}>Réservé aux entités publiques et à leurs agents : hébergement .gouv.cd, création de site officiel, certificats électroniques, raccordement.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,640px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start',marginTop:20}}>
      <Wizard titre="Demande de service numérique"
        etapes={[
          {titre:"Le service demandé",champs:[
            {cle:"service",label:"Service",type:"choix",options:["Hébergement d’un site en .gouv.cd","Création d’un site officiel (SDCD)","Certificats électroniques d’agents","Raccordement au réseau de l’État"],requis:true},
            {cle:"urgence",label:"Échéance souhaitée",type:"date",hint:"Facultatif"}]},
          {titre:"L’entité demandeuse",champs:[
            {cle:"entite",label:"Entité publique",requis:true,hint:"Ex. : Province du Haut-Katanga, Ville de Kinshasa…"},
            {cle:"fonction",label:"Votre fonction",requis:true},
            {cle:"habilitation",label:"N° d’habilitation",type:"nombre",hint:"Figure sur votre arrêté de nomination."}]},
          {titre:"Contact",champs:[
            {cle:"nom",label:"Nom et prénom",requis:true},
            {cle:"email",label:"Adresse électronique professionnelle",type:"email",requis:true,hint:"De préférence en .gouv.cd"},
            {cle:"tel",label:"Téléphone",type:"nombre"}]}]}/>
      <aside style={{display:'flex',flexDirection:'column',gap:16,position:'sticky',top:24}}>
        <Tile icon="ri-server-line" titre="Catalogue des services" description="Conditions et délais par service"/>
        <Tile icon="ri-book-2-line" titre="Documentation SDCD" description="Pour créer un site officiel conforme"/>
        <Alert type="alerte" titre="Habilitation requise">Toute demande est vérifiée auprès de l’entité signataire avant instruction.</Alert>
      </aside>
    </div>
  </Wrap>;
}

// ——————————————————————————————————————————————
// Famille « Comptes et accès »
// ——————————————————————————————————————————————
const CadreAuth=({children,large=false})=><div style={{maxWidth:large?960:520,margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere) min(64px,7vw)'}}>{children}</div>;
const CarteAuth=({children,style})=><div style={{background:'var(--sdcd-fond)',border:'1px solid var(--sdcd-ligne)',padding:'clamp(20px,5vw,32px)',...style}}>{children}</div>;
const SeparateurOu=()=><div style={{display:'flex',alignItems:'center',gap:14,margin:'22px 0'}}>
  <span style={{flex:1,height:1,background:'var(--sdcd-ligne)'}}></span>
  <span style={{fontSize:'var(--sdcd-xs)',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--sdcd-muet)'}}>ou</span>
  <span style={{flex:1,height:1,background:'var(--sdcd-ligne)'}}></span>
</div>;

// Panneau de marque — réservé aux écrans destinés aux usagers
function PanneauMarque({titre,sousTitre,swahili,points}){
  return <div style={{background:'var(--sdcd-bleu-aplat)',color:'#FFFFFF',padding:'clamp(24px,5vw,40px)',display:'flex',flexDirection:'column',gap:'clamp(18px,4vw,28px)',minHeight:'100%'}}>
    <div style={{display:'flex',height:4}} aria-hidden="true"><div style={{flex:1,background:'var(--sdcd-bleu)'}}></div><div style={{flex:1,background:'var(--sdcd-jaune)'}}></div><div style={{flex:1,background:'var(--sdcd-rouge)'}}></div></div>
    <img src="../../assets/armoiries-rdc.png" alt="Armoiries de la République Démocratique du Congo" style={{height:'clamp(56px,14vw,84px)',width:'auto',alignSelf:'flex-start'}}/>
    <div>
      <div style={{fontSize:'var(--sdcd-xs)',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',opacity:.85,marginBottom:10}}>République Démocratique du Congo</div>
      <h1 style={{fontSize:'var(--sdcd-h2)',color:'#FFFFFF',margin:'0 0 8px'}}>{titre}</h1>
      <p style={{margin:0,fontSize:'var(--sdcd-corps)',opacity:.9,maxWidth:380}}>{sousTitre}</p>
      {swahili&&<p lang="sw" style={{margin:'10px 0 0',fontSize:'var(--sdcd-sm)',fontStyle:'italic',opacity:.78,maxWidth:380}}>{swahili}</p>}
    </div>
    <ul style={{listStyle:'none',margin:'auto 0 0',padding:0,display:'flex',flexDirection:'column',gap:12}}>
      {points.map((p,i)=><li key={i} style={{display:'flex',gap:10,fontSize:'var(--sdcd-sm)',opacity:.92}}>
        <i className="ri-check-line" aria-hidden="true" style={{color:'var(--sdcd-jaune)',fontSize:16,marginTop:2}}></i><span>{p}</span></li>)}
    </ul>
    <div style={{fontSize:'var(--sdcd-xs)',opacity:.7,fontStyle:'italic'}}>Justice · Paix · Travail</div>
  </div>;
}

function PageConnexionUsager(){
  const [erreur,setErreur]=React.useState(false);
  return <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,420px) minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:0,alignItems:'stretch'}}>
    <PanneauMarque titre="Votre espace citoyen" sousTitre="Un seul compte pour toutes les démarches de l’État, sur tous les sites en .gouv.cd."
      swahili="Akaunti moja kwa huduma zote za Serikali."
      points={["Suivi de vos dossiers en temps réel","Vos documents officiels conservés en ligne","Notifications par SMS et courriel"]}/>
    <div style={{padding:'clamp(24px,5vw,48px) var(--sdcd-gouttiere)',background:'var(--sdcd-fond-alt)'}}>
      <div style={{maxWidth:440,margin:'0 auto'}}>
        <CarteAuth>
          <h2 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 6px'}}>Se connecter</h2>
          <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'0 0 20px'}}>La voie recommandée est CongoConnect : une seule identité, reconnue par toutes les administrations.</p>
          <ConnectButton assetsBase="../../"/>
          <SeparateurOu/>
          {erreur&&<div aria-live="assertive" style={{marginBottom:16}}>
            <Alert type="erreur" titre="Identifiants non reconnus" onClose={()=>setErreur(false)}>Vérifiez votre numéro de téléphone et votre mot de passe. Après cinq tentatives, le compte est bloqué une heure.</Alert></div>}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <Input label="Numéro de téléphone" type="tel" placeholder="+243 81 234 56 78" hint="Le numéro déclaré à la création du compte."/>
            <Password label="Mot de passe"/>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
              <Checkbox label="Rester connecté sur cet appareil"/>
              <a href="#" style={{fontSize:'var(--sdcd-sm)'}}>Mot de passe oublié ?</a>
            </div>
            <Button icon="ri-login-circle-line" onClick={()=>setErreur(true)} style={{justifyContent:'center'}}>Se connecter</Button>
          </div>
        </CarteAuth>
        <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',marginTop:18,textAlign:'center'}}>Pas encore de compte ? <a href="#">Créer un espace citoyen</a></p>
        <p style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:20,textAlign:'center'}}>Ce service est gratuit. L’État ne vous demandera jamais votre mot de passe par téléphone.</p>
      </div>
    </div>
  </div>;
}

function PageConnexionAgent(){
  return <div style={{background:'var(--sdcd-fond-alt)',minHeight:'100%',padding:'min(48px,7vw) var(--sdcd-gouttiere)'}}>
    <div style={{maxWidth:460,margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:22}}>
        <img src="../../assets/armoiries-rdc.png" alt="" aria-hidden="true" style={{height:44,width:'auto'}}/>
        <div>
          <div style={{fontWeight:700,fontSize:'var(--sdcd-sm)',letterSpacing:'.04em',textTransform:'uppercase',lineHeight:1.3}}>Espace agents de l’État</div>
          <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>Accès nominatif — toute session est journalisée</div>
        </div>
      </div>
      <CarteAuth>
        <h1 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 18px'}}>Connexion</h1>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <Input label="Matricule ou adresse .gouv.cd" placeholder="MIN-0-84517" hint="Figure sur votre arrêté d’affectation."/>
          <Password label="Mot de passe"/>
          <Select label="Service d’affectation" options={["Direction des services académiques (DSA)","Secrétariat général","Antenne de Lubumbashi","Antenne de Goma","Antenne de Matadi"]}/>
          <Button icon="ri-shield-keyhole-line" style={{justifyContent:'center'}}>Se connecter</Button>
        </div>
        <SeparateurOu/>
        <Button variant="secondaire" icon="ri-fingerprint-line" style={{justifyContent:'center',width:'100%'}}>CongoConnect Agents (certificat)</Button>
      </CarteAuth>
      <div style={{marginTop:16}}>
        <Alert type="alerte" titre="Usage strictement professionnel">Chaque consultation de dossier est enregistrée au journal d’audit avec votre matricule, l’heure et l’adresse IP. L’usage à des fins personnelles est passible de sanctions disciplinaires.</Alert>
      </div>
      <p style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:16}}>Assistance du service informatique : 148 (interne 2200) — du lundi au vendredi, 7 h 30 à 16 h 30.</p>
    </div>
  </div>;
}

function PageCreationCompte(){
  const [ok,setOk]=React.useState(false);
  return <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,420px) minmax(0,1fr)','--sdcd-cols-md':'minmax(0,1fr)',gap:0,alignItems:'stretch'}}>
    <PanneauMarque titre="Créer votre espace citoyen" sousTitre="Trois minutes suffisent. Munissez-vous de votre pièce d’identité et d’un téléphone qui reçoit les SMS."
      swahili="Fungua akaunti yako: dakika tatu zinatosha."
      points={["Numéro national ou passeport","Téléphone actif pour le code de vérification","Adresse électronique facultative"]}/>
    <div style={{padding:'clamp(24px,5vw,48px) var(--sdcd-gouttiere)',background:'var(--sdcd-fond-alt)'}}>
      <div style={{maxWidth:460,margin:'0 auto'}}>
        <Stepper etape={1} total={3} titre="Votre identité" suivant="Vérification du numéro" style={{marginBottom:22}}/>
        <CarteAuth>
          <h2 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 18px'}}>Votre identité</h2>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)','--sdcd-cols-sm':'minmax(0,1fr)',gap:14}}>
              <Input label="Nom" placeholder="Kalenga"/>
              <Input label="Prénom" placeholder="Grâce"/>
            </div>
            <Select label="Pièce d’identité" options={["Carte nationale d’identité","Passeport congolais","Carte d’électeur","Acte de naissance"]}/>
            <Input label="Numéro de la pièce" placeholder="000 000 000 000" hint="Douze chiffres, sans espace ni tiret."/>
            <Input label="Numéro de téléphone" type="tel" placeholder="+243 81 234 56 78" hint="Un code de vérification à six chiffres y sera envoyé."/>
            <Checkbox label="J’accepte les conditions d’utilisation et la politique de confidentialité de gouv.cd"/>
            <Button iconRight="ri-arrow-right-line" onClick={()=>setOk(true)} style={{justifyContent:'center'}}>Recevoir le code de vérification</Button>
            {ok&&<div aria-live="polite"><Alert type="succes" titre="Code envoyé">Un code à six chiffres a été envoyé au +243 81 234 56 78. Il est valable cinq minutes.</Alert></div>}
          </div>
        </CarteAuth>
        <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',marginTop:18,textAlign:'center'}}>Vous avez déjà un compte ? <a href="#">Se connecter</a></p>
      </div>
    </div>
  </div>;
}

function PageVerificationCode(){
  const [canal,setCanal]=React.useState(0);
  const [reste,setReste]=React.useState(300);
  const [err,setErr]=React.useState('');
  const [ok,setOk]=React.useState(false);
  React.useEffect(()=>{if(reste<=0)return;const it=setInterval(()=>setReste(r=>r-1),1000);return ()=>clearInterval(it);},[reste]);
  const mm=String(Math.floor(Math.max(reste,0)/60)).padStart(2,'0'),ss=String(Math.max(reste,0)%60).padStart(2,'0');
  const verifier=(code)=>{if(code==='000000'){setErr('Ce code est incorrect. Il vous reste deux tentatives.');setOk(false);}else{setErr('');setOk(true);}};
  return <CadreAuth>
    <Stepper etape={2} total={3} titre="Vérification du numéro" suivant="Choix du mot de passe" style={{marginBottom:24}}/>
    <CarteAuth>
      <h1 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 6px'}}>Vérifions votre {canal===0?'numéro':'adresse'}</h1>
      <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'0 0 4px'}}>
        Saisissez le code à six chiffres envoyé {canal===0?<span>par SMS au <strong style={{color:'var(--sdcd-texte)',fontFamily:'var(--sdcd-font-mono)',whiteSpace:'nowrap'}}>+243 81 •• •• 812</strong></span>:<span>à <strong style={{color:'var(--sdcd-texte)',whiteSpace:'nowrap'}}>g.k•••@gmail.com</strong></span>}.
      </p>
      <p lang="sw" style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontStyle:'italic',margin:'0 0 22px'}}>Andika nambari sita ulizopokea.</p>
      <Segmented label="Canal de réception" options={["SMS","Courriel"]} valeur={canal} onChange={setCanal} style={{marginBottom:22}}/>
      <CodeOTP longueur={6} label="Code de vérification" error={err} onComplet={verifier}
        hint="Le code expire au bout de cinq minutes. Saisir 000000 simule une erreur."/>
      <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',margin:'20px 0 0'}}>
        <span style={{fontSize:'var(--sdcd-sm)',color:reste<=60?'var(--sdcd-erreur)':'var(--sdcd-muet)'}} aria-live="polite">
          <i className="ri-time-line" aria-hidden="true" style={{verticalAlign:'-2px',marginRight:6}}></i>
          {reste>0?<span>Expire dans <span style={{fontFamily:'var(--sdcd-font-mono)',fontWeight:600}}>{mm}:{ss}</span></span>:'Code expiré'}
        </span>
        <button onClick={()=>{setReste(300);setErr('');}} style={{background:'none',border:'none',padding:0,color:'var(--sdcd-action)',fontFamily:'inherit',fontSize:'var(--sdcd-sm)',fontWeight:600,textDecoration:'underline',cursor:'pointer'}}>Renvoyer le code</button>
      </div>
      {ok&&<div aria-live="polite" style={{marginTop:20}}><Alert type="succes" titre="Numéro vérifié">Vous pouvez maintenant choisir votre mot de passe.</Alert></div>}
      <div style={{marginTop:24,display:'flex',gap:12,flexWrap:'wrap'}}>
        <Button iconRight="ri-arrow-right-line" disabled={!ok} style={{justifyContent:'center'}}>Continuer</Button>
        <Button variant="tertiaire" icon="ri-arrow-left-line">Modifier mon numéro</Button>
      </div>
    </CarteAuth>
    <p style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:18}}>Vous ne recevez rien ? Vérifiez le réseau, puis contactez le 148. Aucun agent ne vous demandera ce code.</p>
  </CadreAuth>;
}

function PageDoubleAuth(){
  const [methode,setMethode]=React.useState(0);
  return <CadreAuth>
    <CarteAuth>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
        <i className="ri-shield-check-line" aria-hidden="true" style={{fontSize:26,color:'var(--sdcd-action)'}}></i>
        <h1 style={{fontSize:'var(--sdcd-h3)',margin:0}}>Confirmation en deux étapes</h1>
      </div>
      <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'0 0 22px'}}>Cette vérification supplémentaire protège les actes signés en votre nom. Elle est obligatoire pour les agents habilités à décider.</p>
      <fieldset style={{border:'1px solid var(--sdcd-ligne)',padding:'16px 18px',margin:'0 0 22px'}}>
        <legend style={{fontWeight:700,fontSize:'var(--sdcd-sm)',padding:'0 8px'}}>Méthode de confirmation</legend>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[["ri-smartphone-line","Application d’authentification","Code renouvelé toutes les 30 secondes"],
            ["ri-message-2-line","SMS au +243 81 •• •• 812","Réseau requis"],
            ["ri-usb-line","Clé physique de l’État","Réservée aux signataires"]].map((m,i)=>
            <label key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 12px',border:'1px solid '+(methode===i?'var(--sdcd-bleu)':'var(--sdcd-ligne)'),background:methode===i?'var(--sdcd-bleu-pale)':'transparent',cursor:'pointer'}}>
              <input type="radio" name="methode-2fa" checked={methode===i} onChange={()=>setMethode(i)} style={{accentColor:'#0095C9',marginTop:3}}/>
              <span>
                <span style={{display:'flex',alignItems:'center',gap:8,fontWeight:600,fontSize:'var(--sdcd-sm)'}}><i className={m[0]} aria-hidden="true" style={{color:'var(--sdcd-action)'}}></i>{m[1]}</span>
                <span style={{display:'block',fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:2}}>{m[2]}</span>
              </span>
            </label>)}
        </div>
      </fieldset>
      <CodeOTP longueur={6} label="Code à six chiffres" autoFocus={false} hint={methode===2?"Insérez la clé, puis touchez le bouton lumineux.":"Ouvrez votre application et recopiez le code affiché."}/>
      <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',marginTop:22}}>
        <Button icon="ri-check-line" style={{justifyContent:'center'}}>Confirmer</Button>
        <Checkbox label="Ne plus demander sur cet appareil pendant 30 jours"/>
      </div>
    </CarteAuth>
    <p style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:18}}>Appareil perdu ou volé ? Appelez immédiatement le 148 pour révoquer vos accès.</p>
  </CadreAuth>;
}

function PageMotDePasseOublie(){
  const [envoye,setEnvoye]=React.useState(false);
  return <CadreAuth>
    <CarteAuth>
      <h1 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 6px'}}>Mot de passe oublié</h1>
      <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'0 0 22px'}}>Indiquez le numéro de téléphone ou l’adresse électronique de votre compte. Un lien de réinitialisation valable une heure vous sera envoyé.</p>
      {envoye
        ? <div aria-live="polite" style={{display:'flex',flexDirection:'column',gap:18}}>
            <Alert type="succes" titre="Message envoyé">Si un compte correspond à <strong>+243 81 •• •• 812</strong>, un lien de réinitialisation vient d’y être envoyé. Par sécurité, nous n’indiquons pas si ce compte existe.</Alert>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Button variant="secondaire" icon="ri-arrow-left-line">Retour à la connexion</Button>
              <Button variant="tertiaire" icon="ri-refresh-line" onClick={()=>setEnvoye(false)}>Renvoyer</Button>
            </div>
          </div>
        : <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <Input label="Téléphone ou adresse électronique" placeholder="+243 81 234 56 78"/>
            <Button icon="ri-mail-send-line" onClick={()=>setEnvoye(true)} style={{justifyContent:'center'}}>Envoyer le lien</Button>
            <a href="#" style={{fontSize:'var(--sdcd-sm)'}}>Je me souviens de mon mot de passe</a>
          </div>}
    </CarteAuth>
    <div style={{marginTop:18}}><Notice>Aucun agent de l’État ne vous appellera pour vous demander ce lien ou votre mot de passe.</Notice></div>
  </CadreAuth>;
}

function PageNouveauMotDePasse(){
  const [fait,setFait]=React.useState(false);
  return <CadreAuth>
    <Stepper etape={3} total={3} titre="Choix du mot de passe" style={{marginBottom:24}}/>
    <CarteAuth>
      <h1 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 6px'}}>Choisir un mot de passe</h1>
      <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'0 0 22px'}}>Douze caractères au minimum. Évitez un mot de passe déjà utilisé ailleurs.</p>
      {fait
        ? <div aria-live="polite" style={{display:'flex',flexDirection:'column',gap:18}}>
            <Alert type="succes" titre="Mot de passe enregistré">Votre espace citoyen est actif. Vos autres sessions ont été déconnectées par précaution.</Alert>
            <Button icon="ri-login-circle-line" style={{justifyContent:'center',alignSelf:'flex-start'}}>Accéder à mon espace</Button>
          </div>
        : <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <Password label="Nouveau mot de passe" creation={true}/>
            <Input label="Confirmer le mot de passe" type="password"/>
            <Checkbox label="Déconnecter mes autres appareils"/>
            <Button icon="ri-lock-line" onClick={()=>setFait(true)} style={{justifyContent:'center'}}>Enregistrer le mot de passe</Button>
          </div>}
    </CarteAuth>
  </CadreAuth>;
}

function PageDeconnexion(){
  return <CadreAuth>
    <CarteAuth style={{textAlign:'center'}}>
      <i className="ri-logout-circle-r-line" aria-hidden="true" style={{fontSize:44,color:'var(--sdcd-action)'}}></i>
      <h1 style={{fontSize:'var(--sdcd-h3)',margin:'14px 0 6px'}}>Vous êtes déconnecté</h1>
      <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:'0 0 4px'}}>Votre session a été fermée à 11 h 24. Aucune donnée n’a été perdue.</p>
      <p lang="sw" style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',fontStyle:'italic',margin:'0 0 22px'}}>Umetoka kwenye akaunti yako.</p>
      <div style={{border:'1px solid var(--sdcd-ligne)',background:'var(--sdcd-fond-alt)',padding:'14px 16px',textAlign:'left',marginBottom:22}}>
        <div className="sdcd-eyebrow" style={{marginBottom:8}}>Dernière session</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,150px),1fr))',gap:'8px 20px',fontSize:'var(--sdcd-sm)'}}>
          <div><span style={{color:'var(--sdcd-muet)'}}>Durée</span><div style={{fontWeight:600}}>38 minutes</div></div>
          <div><span style={{color:'var(--sdcd-muet)'}}>Dossiers consultés</span><div style={{fontWeight:600}}>2</div></div>
          <div><span style={{color:'var(--sdcd-muet)'}}>Appareil</span><div style={{fontWeight:600}}>Android · Kinshasa</div></div>
        </div>
      </div>
      <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
        <Button icon="ri-login-circle-line">Se reconnecter</Button>
        <Button variant="secondaire" icon="ri-home-4-line">Retour à gouv.cd</Button>
      </div>
      <p style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)',marginTop:20}}>Sur un ordinateur partagé, fermez aussi la fenêtre du navigateur.</p>
    </CarteAuth>
  </CadreAuth>;
}

function PageCompteBloque(){
  return <CadreAuth>
    <CarteAuth style={{borderTop:'4px solid var(--sdcd-erreur)'}}>
      <div style={{display:'flex',alignItems:'flex-start',gap:14,marginBottom:8}}>
        <i className="ri-lock-2-line" aria-hidden="true" style={{fontSize:30,color:'var(--sdcd-erreur)'}}></i>
        <div>
          <h1 style={{fontSize:'var(--sdcd-h3)',margin:'0 0 4px'}}>Compte temporairement bloqué</h1>
          <p style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-muet)',margin:0}}>Cinq tentatives de connexion ont échoué. L’accès est suspendu pour une heure, à des fins de sécurité.</p>
        </div>
      </div>
      <div style={{background:'var(--sdcd-erreur-pale)',padding:'12px 16px',margin:'18px 0',fontSize:'var(--sdcd-sm)'}}>
        Déblocage automatique à <strong style={{fontFamily:'var(--sdcd-font-mono)'}}>12 h 24</strong> · Référence de l’incident <strong style={{fontFamily:'var(--sdcd-font-mono)'}}>SEC-2026-4471</strong>
      </div>
      <h2 style={{fontSize:'var(--sdcd-h4)',margin:'0 0 10px'}}>Que faire maintenant ?</h2>
      <ol style={{margin:'0 0 22px',paddingLeft:22,fontSize:'var(--sdcd-sm)',color:'var(--sdcd-encre-2)',lineHeight:1.7}}>
        <li>Attendre l’heure indiquée, puis réessayer une seule fois.</li>
        <li>Si vous avez oublié votre mot de passe, utiliser la réinitialisation plutôt que de multiplier les essais.</li>
        <li>Si ces tentatives ne viennent pas de vous, appeler le 148 : votre numéro a peut-être été visé.</li>
      </ol>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <Button icon="ri-key-2-line">Réinitialiser mon mot de passe</Button>
        <Button variant="secondaire" icon="ri-customer-service-2-line">Contacter le 148</Button>
      </div>
    </CarteAuth>
  </CadreAuth>;
}

function App(){
  const [famille,setFamille]=React.useState(0);
  const [page,setPage]=React.useState(0);
  const PAGES=[[<PageFiche/>,<PageReclamation/>,<PageService/>,<PageTutoriel/>,<PageArticle/>,<PageSuivi/>,<PageRdv/>,<PageMedia/>,<PageDonnees/>],
    [<PageConnexionUsager/>,<PageConnexionAgent/>,<PageCreationCompte/>,<PageVerificationCode/>,<PageDoubleAuth/>,<PageMotDePasseOublie/>,<PageNouveauMotDePasse/>,<PageDeconnexion/>,<PageCompteBloque/>]];
  const gabarits=FAMILLES[famille].gabarits;
  return <div style={{background:'var(--sdcd-fond)',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <Header entite="gouv.cd" sousTitre="Modèles de pages — démonstration" nav={FAMILLES.map(f=>f.nom)} actif={famille}
      onNav={i=>{setFamille(i);setPage(0);}} assetsBase="../../"/>
    <div style={{background:'var(--sdcd-fond-alt)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'0 var(--sdcd-gouttiere)'}}>
        <Tabnav onglets={gabarits} actif={page} onChange={setPage} style={{borderBottom:'none'}}/>
      </div>
    </div>
    <main style={{flex:1}} data-screen-label={gabarits[page]}>{PAGES[famille][page]}</main>
    <Footer entite="gouv.cd — Portail officiel" assetsBase="../../"
      colonnes={[{titre:"Services",liens:["Démarches","Annuaire","Journal officiel","Données ouvertes"]},
                 {titre:"La République",liens:["Présidence","Primature","Assemblée nationale","Provinces"]},
                 {titre:"Le portail",liens:["À propos","Plan du site","Nous contacter"]}]}/>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
}).catch(function(e){document.getElementById('root').innerHTML='<pre style="padding:20px;color:#DB3832">'+((e&&e.stack)||e)+'</pre>';});