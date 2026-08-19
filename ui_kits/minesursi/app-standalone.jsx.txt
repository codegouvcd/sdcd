(window.__sdcdReady||Promise.resolve()).then(()=>{
const NS = window[Object.keys(window).find(k=>/_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button)]||{};
const {Header,Footer,Breadcrumb,Button,Input,Alert,Badge,Tile,Card,Accordion,Highlight,Lien,Stepper,Wizard,Tracking,Follow,SearchBar} = NS;
const NAV=["Accueil","La démarche d’équivalence","Déposer ma demande","Suivre mon dossier","Contact"];
const Wrap=({fil,children})=><div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(24px,7vw) var(--sdcd-gouttiere) min(56px,6vw)'}}>
  <Breadcrumb items={["Accueil",fil]} style={{marginBottom:22}}/>{children}</div>;

function Accueil({go}){
  return <div>
    <div style={{background:'var(--sdcd-bleu-pale)',borderBottom:'1px solid var(--sdcd-ligne)'}}>
      <div style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(48px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'minmax(0,1.2fr) minmax(0,1fr)',gap:'clamp(26px,3.5vw,48px)',alignItems:'center'}}>
        <div>
          <div className="sdcd-eyebrow" style={{marginBottom:10}}>Enseignement supérieur, universitaire, recherche scientifique et innovations</div>
          <h1 style={{fontSize:'var(--sdcd-h1)',lineHeight:1.15,margin:'0 0 12px'}}>Faire reconnaître un diplôme étranger en RDC</h1>
          <p style={{color:'var(--sdcd-muet)',margin:'0 0 22px',maxWidth:520}}>L’équivalence donne à votre diplôme obtenu à l’étranger la même valeur juridique qu’un grade congolais — indispensable pour la fonction publique, les ordres professionnels et la poursuite d’études.</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <Button iconRight="ri-arrow-right-line" onClick={()=>go(2)}>Déposer ma demande</Button>
            <Button variant="secondaire" icon="ri-search-line" onClick={()=>go(3)}>Suivre mon dossier</Button>
          </div>
        </div>
        <div style={{height:280}}><image-slot id="minesursi-hero" shape="rect" placeholder="Photo officielle — déposez une image"></image-slot></div>
      </div>
    </div>
    <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)'}}>
      <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:16}}>
        {[['ri-time-line','4,2 mois','délai médian constaté'],['ri-cash-line','85 USD','ou 238 000 CDF de frais'],['ri-file-list-3-line','3 202','dossiers déposés en 2026'],['ri-checkbox-circle-line','86 %','d’avis favorables']].map((k,i)=>
          <div key={i} style={{border:'1px solid var(--sdcd-ligne)',borderBottom:'3px solid var(--sdcd-action)',padding:'18px 20px'}}>
            <i className={k[0]} aria-hidden="true" style={{fontSize:22,color:'var(--sdcd-action)'}}></i>
            <div style={{fontSize:'1.6rem',fontWeight:700,fontFamily:'var(--sdcd-font-mono)',letterSpacing:'-0.02em',marginTop:8}}>{k[1]}</div>
            <div style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-muet)'}}>{k[2]}</div>
          </div>)}
      </div>
    </section>
    <div style={{background:'var(--sdcd-fond-alt)'}}>
      <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)'}}>
        <h2 style={{fontSize:'var(--sdcd-h2)',margin:'0 0 20px'}}>Les 4 étapes de votre démarche</h2>
        <div className="sdcd-grid" style={{'--sdcd-cols':'repeat(4,minmax(0,1fr))','--sdcd-cols-lg':'repeat(2,minmax(0,1fr))','--sdcd-cols-md':'repeat(2,minmax(0,1fr))','--sdcd-cols-sm':'repeat(2,minmax(0,1fr))',gap:16}}>
          {[['ri-edit-box-line','1. Déposer en ligne','Formulaire et pièces numérisées, 15 minutes.'],['ri-bank-card-line','2. Payer les frais','En ligne, par mobile money ou au guichet.'],['ri-search-eye-line','3. Instruction','Vérification des pièces et de l’authenticité, avis de la commission.'],['ri-award-line','4. Arrêté d’équivalence','Notifié par SMS et courriel, retirable en ligne.']].map((e,i)=>
            <Tile key={i} icon={e[0]} titre={e[1]} description={e[2]}/>)}
        </div>
      </section>
    </div>
    <section style={{maxWidth:'var(--sdcd-maxw)',margin:'0 auto',padding:'min(40px,7vw) var(--sdcd-gouttiere)',display:'grid','--sdcd-cols':'minmax(0,1.2fr) minmax(0,1fr)',gap:'clamp(26px,3.5vw,48px)'}}>
      <div>
        <h2 style={{fontSize:'var(--sdcd-h2)'}}>Questions fréquentes</h2>
        <Accordion items={[
          {titre:'Mon diplôme est en anglais, que faire ?',contenu:'Joignez une traduction assermentée portant le sceau d’un traducteur agréé — c’est la première cause de dossiers incomplets.'},
          {titre:'Combien de temps dure l’instruction ?',contenu:'4,2 mois en médiane. Le délai réglementaire maximal est de 6 mois ; vous êtes notifié à chaque étape.'},
          {titre:'Puis-je déposer depuis l’étranger ?',contenu:'Oui, la démarche est entièrement en ligne ; seul le retrait de l’arrêté papier peut être fait par un mandataire.'},
          {titre:'Que faire en cas de rejet ?',contenu:'La décision motivée vous est notifiée avec les voies de recours : recours gracieux sous 30 jours, puis recours devant le Conseil d’État.'}]}/>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Card surTitre="Actualité" titre="La commission d’équivalence siège désormais chaque semaine" description="Les délais d’instruction se réduisent : 4,2 mois en médiane en août." meta="12 août 2026"/>
        <Highlight taille="sm">Méfiez-vous des intermédiaires : la démarche est personnelle, au tarif unique de 85 USD / 238 000 CDF, uniquement sur ce site officiel.</Highlight>
      </div>
    </section>
  </div>;
}
function Demarche({go}){
  return <Wrap fil="La démarche d’équivalence">
    <div style={{maxWidth:760}}>
      <div className="sdcd-eyebrow" style={{marginBottom:10}}>Fiche démarche</div>
      <h1 style={{fontSize:'var(--sdcd-h1)',margin:'0 0 12px'}}>Demander l’équivalence d’un diplôme étranger</h1>
      <div style={{display:'flex',gap:8,marginBottom:20}}><Badge ton="succes">Démarche en ligne</Badge><Badge>Mise à jour : 1er août 2026</Badge></div>
      <Alert type="info" titre="En bref">Dépôt en ligne, frais de <strong>85 USD ou 238 000 CDF</strong> (arrêté interministériel, non remboursables), délai médian <strong>4,2 mois</strong>, décision notifiée par SMS et courriel.</Alert>
      <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Pièces à fournir</h2>
      <Accordion items={[
        {titre:'Dans tous les cas',contenu:'Diplôme original légalisé, relevés de notes de toutes les années, acte de naissance, preuve de paiement.'},
        {titre:'Diplôme non francophone',contenu:'Traduction assermentée avec sceau du traducteur agréé (art. 12 de l’arrêté).'},
        {titre:'Perte du diplôme',contenu:'Attestation officielle de l’établissement d’origine + déclaration de perte.'}]}/>
      <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Documents à télécharger</h2>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <Lien telechargement detail="PDF – 320 Ko">Notice explicative de la démarche</Lien>
        <Lien telechargement detail="PDF – 180 Ko">Liste des traducteurs agréés</Lien>
        <Lien telechargement detail="PDF – 95 Ko">Barème officiel des frais</Lien>
      </div>
      <h2 style={{fontSize:'var(--sdcd-h3)',margin:'32px 0 12px'}}>Textes de référence</h2>
      <ul style={{margin:0,paddingLeft:18,display:'flex',flexDirection:'column',gap:8,fontSize:'var(--sdcd-sm)'}}>
        <li><a href="#">Loi-cadre n° 14/004 du 11 février 2014 de l’enseignement national</a></li>
        <li><a href="#">Arrêté ministériel fixant la procédure d’équivalence des diplômes étrangers</a></li>
      </ul>
      <div style={{display:'flex',gap:12,marginTop:32}}>
        <Button iconRight="ri-arrow-right-line" onClick={()=>go(2)}>Commencer ma demande</Button>
        <Button variant="tertiaire" icon="ri-printer-line">Imprimer la fiche</Button>
      </div>
    </div>
  </Wrap>;
}
function Depot(){
  return <Wrap fil="Déposer ma demande">
    <div style={{maxWidth:720}}>
      <h1 style={{fontSize:'var(--sdcd-h1)',margin:'0 0 8px'}}>Déposer ma demande d’équivalence</h1>
      <p style={{color:'var(--sdcd-muet)',margin:'0 0 24px'}}>Comptez 15 minutes. À l’envoi, vous recevez un accusé avec votre numéro de dossier au format <span style={{fontFamily:'var(--sdcd-font-mono)',fontSize:'var(--sdcd-sm)'}}>MINESURSI/DSA/…</span> — conservez-le pour le suivi.</p>
      <Wizard titre="Demande d’équivalence"
        etapes={[
          {titre:'Votre identité',champs:[
            {cle:'nom',label:'Nom et prénom',requis:true},
            {cle:'naissance',label:'Date de naissance',type:'date',requis:true},
            {cle:'province',label:'Province de résidence',type:'choix',options:['Kinshasa','Kongo-Central','Haut-Katanga','Nord-Kivu','Sud-Kivu','Tshopo','Lualaba','Kasaï','Ituri'],requis:true}]},
          {titre:'Votre diplôme',champs:[
            {cle:'intitule',label:'Intitulé exact du diplôme',requis:true,hint:'Tel qu’il figure sur le document original.'},
            {cle:'etab',label:'Établissement d’origine',requis:true},
            {cle:'pays',label:'Pays d’obtention',type:'choix',options:['Afrique du Sud','Belgique','Chine','France','Inde','Kenya','Maroc','Ouganda','Rwanda','Sénégal'],requis:true},
            {cle:'annee',label:'Année d’obtention',type:'nombre',requis:true}]},
          {titre:'Contact et paiement',champs:[
            {cle:'email',label:'Adresse électronique',type:'email',requis:true,hint:'L’accusé de réception y sera envoyé.'},
            {cle:'tel',label:'Téléphone (notifications SMS)',type:'nombre'},
            {cle:'paiement',label:'Mode de paiement des 85 USD / 238 000 CDF',type:'choix',options:['Mobile money','Virement bancaire','Espèces au guichet'],requis:true}]}]}/>
    </div>
  </Wrap>;
}
function Suivi(){
  const [num,setNum]=React.useState('MINESURSI/DSA/1602/02/0847/2026');
  const [shown,setShown]=React.useState(null);
  const [err,setErr]=React.useState('');
  const chercher=()=>{const v=num.trim().toUpperCase();
    if(!/^MINESURSI\/DSA\/\d{4}\/\d{2}\/\d{4}\/\d{4}$/.test(v)){setErr('Format attendu : MINESURSI/DSA/NNNN/NN/NNNN/AAAA (sur votre accusé de réception).');setShown(null);return;}
    setErr('');setShown(v);};
  return <Wrap fil="Suivre mon dossier">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Suivre mon dossier d’équivalence</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Le numéro figure sur votre accusé de réception. Les informations sont les mêmes que celles vues par l’agent instructeur.</p>
    <div style={{display:'flex',gap:12,alignItems:'flex-end',maxWidth:640,marginTop:20}}>
      <div style={{flex:1}}><Input label="Numéro de dossier" hint="Ex. : MINESURSI/DSA/1602/02/0847/2026" value={num} error={err} onChange={e=>setNum(e.target.value)}/></div>
      <div style={{paddingBottom:err?34:0}}><Button icon="ri-search-line" onClick={chercher}>Suivre</Button></div>
    </div>
    {shown&&<div style={{marginTop:28,display:'flex',flexDirection:'column',gap:20,maxWidth:640}}>
      <Alert type="succes" titre="Dossier trouvé">Dernière mise à jour : 16 août 2026 à 09 h 42.</Alert>
      <Tracking dossier={shown} demarche="Demande d’équivalence — Licence en sciences infirmières"
        etapes={[
          {titre:'Demande déposée et jugée recevable',detail:'Dépôt en ligne',date:'7 avril 2026',statut:'fait'},
          {titre:'Frais acquittés',detail:'85 USD',date:'9 avril 2026',statut:'fait'},
          {titre:'Instruction en cours',detail:'Vérification auprès de l’établissement d’origine',date:'Depuis le 30 juin 2026',statut:'encours'},
          {titre:'Avis de la commission',detail:'',date:'',statut:'avenir'},
          {titre:'Arrêté signé et notifié',detail:'Vous serez notifié par SMS et courriel',date:'',statut:'avenir'}]}/>
    </div>}
    {!shown&&!err&&<div style={{marginTop:28,maxWidth:640}}><Alert type="info" titre="Exemple">Le numéro pré-rempli est un dossier de démonstration : cliquez sur « Suivre ».</Alert></div>}
  </Wrap>;
}
function Contact(){
  const {Select:Sel,Upload:Up,Checkbox:Cb}=NS;
  const [d,setD]=React.useState({sujet:'— Sélectionner —'});
  const [errs,setErrs]=React.useState({});
  const [ok,setOk]=React.useState(false);
  const maj=(k,v)=>setD({...d,[k]:v});
  const envoyer=()=>{const e={};
    if(!d.sujet||d.sujet==='— Sélectionner —')e.sujet='Choisissez un sujet.';
    if(!(d.nom||'').trim())e.nom='Ce champ est requis.';
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email||''))e.email='Adresse électronique invalide.';
    if(d.dossier&&!/^MINESURSI\/DSA\/\d{4}\/\d{2}\/\d{4}\/\d{4}$/.test(d.dossier.trim().toUpperCase()))e.dossier='Format : MINESURSI/DSA/NNNN/NN/NNNN/AAAA.';
    if(((d.message||'').trim()).length<20)e.message='Décrivez votre demande (20 caractères minimum).';
    if(!d.rgpd)e.rgpd='Le consentement est requis pour traiter votre demande.';
    setErrs(e);if(Object.keys(e).length===0)setOk(true);};
  return <Wrap fil="Contact">
    <h1 style={{fontSize:'var(--sdcd-h1)'}}>Contacter le service des équivalences</h1>
    <p style={{color:'var(--sdcd-muet)',maxWidth:620}}>Réponse sous 5 jours ouvrés. Pour un dossier en cours, indiquez son numéro : votre message y sera rattaché.</p>
    <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,640px) 320px','--sdcd-cols-md':'minmax(0,1fr)',gap:'clamp(35px,3.5vw,64px)',justifyContent:'space-between',alignItems:'start',marginTop:24}}>
      {ok?<div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Alert type="succes" titre="Message envoyé">Enregistré sous la référence <strong style={{fontFamily:'var(--sdcd-font-mono)'}}>CT-MIN-2026-00318</strong>. Un accusé de réception vient de vous être adressé{d.dossier?' ; le message est rattaché au dossier '+d.dossier:''}.</Alert>
        <Button variant="tertiaire" onClick={()=>{setOk(false);setD({sujet:'— Sélectionner —'});setErrs({});}}>Envoyer un autre message</Button>
      </div>
      :<div style={{border:'1px solid var(--sdcd-ligne)',padding:28,display:'flex',flexDirection:'column',gap:18,background:'var(--sdcd-fond)'}}>
        <Sel label="Sujet *" options={["— Sélectionner —","Question sur ma démarche","Pièce refusée — que faire ?","Délai dépassé","Problème de paiement","Erreur sur l’arrêté délivré","Autre"]} value={d.sujet} error={errs.sujet} onChange={e=>maj('sujet',e.target.value)}/>
        <div className="sdcd-grid" style={{'--sdcd-cols':'minmax(0,1fr) minmax(0,1fr)',gap:18}}>
          <Input label="Nom et prénom *" value={d.nom||''} error={errs.nom} onChange={e=>maj('nom',e.target.value)}/>
          <Input label="Adresse électronique *" value={d.email||''} error={errs.email} onChange={e=>maj('email',e.target.value)}/>
        </div>
        <Input label="Numéro de dossier (facultatif)" hint="Ex. : MINESURSI/DSA/1602/02/0847/2026 — le message sera rattaché au dossier." value={d.dossier||''} error={errs.dossier} onChange={e=>maj('dossier',e.target.value)}/>
        <div>
          <label htmlFor="ct-msg" style={{display:'block',fontWeight:500,marginBottom:6}}>Votre message *</label>
          <textarea id="ct-msg" rows={5} value={d.message||''} onChange={e=>maj('message',e.target.value)}
            style={{width:'100%',boxSizing:'border-box',fontFamily:'inherit',fontSize:'var(--sdcd-corps)',lineHeight:1.5,padding:'10px 12px',color:'var(--sdcd-texte)',background:'var(--sdcd-fond)',border:'1px solid '+(errs.message?'var(--sdcd-erreur)':'var(--sdcd-ligne-forte)'),resize:'vertical'}}></textarea>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
            {errs.message?<span style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)'}}><i className="ri-error-warning-line" style={{verticalAlign:'-2px',marginRight:5}}></i>{errs.message}</span>:<span></span>}
            <span style={{fontSize:'var(--sdcd-xs)',color:'var(--sdcd-inactif)',fontFamily:'var(--sdcd-font-mono)'}}>{(d.message||'').length} / 2000</span>
          </div>
        </div>
        <Up label="Pièces jointes (facultatif)" hint="Capture, reçu, courrier — PDF, JPG, PNG, 5 Mo max."/>
        <div>
          <Cb label="J’accepte que mes données soient traitées pour répondre à ma demande (RGPD)." checked={!!d.rgpd} onChange={e=>maj('rgpd',e.target.checked)}/>
          {errs.rgpd&&<div style={{fontSize:'var(--sdcd-sm)',color:'var(--sdcd-erreur)',marginTop:6}}><i className="ri-error-warning-line" style={{verticalAlign:'-2px',marginRight:5}}></i>{errs.rgpd}</div>}
        </div>
        <Button icon="ri-send-plane-line" onClick={envoyer} style={{alignSelf:'flex-start'}}>Envoyer le message</Button>
      </div>}
      <aside style={{display:'flex',flexDirection:'column',gap:16,position:'sticky',top:24}}>
        <Tile icon="ri-phone-line" titre="148 — numéro unique" description="Lun.–ven., 8 h – 16 h"/>
        <Tile icon="ri-map-pin-line" titre="Guichets" description="Kinshasa-Gombe · Lubumbashi · Goma · Matadi"/>
        <Tile icon="ri-mail-line" titre="equivalences@minesursi.gouv.cd" description="Réponse sous 5 jours ouvrés"/>
        <Highlight taille="sm">Pour une réclamation formelle sur un dossier, utilisez le formulaire dédié du portail gouv.cd — instruite sous 30 jours.</Highlight>
      </aside>
    </div>
  </Wrap>;
}
function App(){
  const [page,setPage]=React.useState(0);
  const PAGES=[<Accueil go={setPage}/>,<Demarche go={setPage}/>,<Depot/>,<Suivi/>,<Contact/>];
  return <div style={{background:'var(--sdcd-fond)',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <Header entite="MINESURSI" sousTitre="minesursi.gouv.cd" nav={NAV} actif={page} onNav={setPage} assetsBase="../../"/>
    <main style={{flex:1}} data-screen-label={NAV[page]}>{PAGES[page]}</main>
    <Follow/>
    <Footer entite="MINESURSI — minesursi.gouv.cd" assetsBase="../../"
      colonnes={[{titre:'Démarches',liens:['Équivalence de diplôme','Homologation d’établissement','Bourses d’études']},
                 {titre:'Le ministère',liens:['Missions','La commission d’équivalence','Textes officiels']},
                 {titre:'La République',liens:['gouv.cd','Journal officiel','Présidence']}]}/>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
}).catch(function(e){document.getElementById('root').innerHTML='<pre style="padding:20px;color:#DB3832">'+((e&&e.stack)||e)+'</pre>';});