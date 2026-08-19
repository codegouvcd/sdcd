(function(){
  var FILES=['components/buttons/Button.jsx','components/buttons/IconButton.jsx','components/forms/Input.jsx','components/forms/Select.jsx','components/forms/Checkbox.jsx','components/forms/Radio.jsx','components/forms/Toggle.jsx','components/forms/SearchBar.jsx','components/brand/BlocMarque.jsx','components/brand/ConnectButton.jsx','components/navigation/LangMenu.jsx','components/navigation/Header.jsx','components/navigation/Footer.jsx','components/navigation/Breadcrumb.jsx','components/data-display/Card.jsx','components/data-display/Tile.jsx','components/data-display/Badge.jsx','components/data-display/Table.jsx','components/feedback/Alert.jsx','components/feedback/Notice.jsx','components/feedback/Loader.jsx','components/content/Accordion.jsx','components/content/Tabs.jsx','components/content/Pagination.jsx','components/content/Quote.jsx','components/content/Article.jsx','components/media/Carousel.jsx','components/media/Gallery.jsx','components/media/MediaPlayer.jsx','components/media/TagCloud.jsx','components/charts/BarChart.jsx','components/charts/LineChart.jsx','components/charts/DonutChart.jsx','components/services/Calendar.jsx','components/services/Rdv.jsx','components/services/Tracking.jsx','components/forms/Upload.jsx','components/data-display/Tag.jsx','components/content/Callout.jsx','components/navigation/Sidemenu.jsx','components/navigation/Stepper.jsx','components/navigation/SkipLink.jsx','components/navigation/Follow.jsx','components/overlays/Modal.jsx','components/overlays/Tooltip.jsx','components/overlays/BandeauCookies.jsx','components/data-display/DataTable.jsx','components/services/Wizard.jsx','components/forms/Segmented.jsx','components/forms/Range.jsx','components/forms/Password.jsx','components/forms/CodeOTP.jsx','components/content/Highlight.jsx','components/content/Lien.jsx','components/content/Summary.jsx','components/content/Share.jsx','components/navigation/Tabnav.jsx','components/navigation/Dropdown.jsx','components/navigation/Display.jsx'];
  var src=document.currentScript&&document.currentScript.src;
  var root=src?src.replace(/sdcd-fallback\.js.*$/,''):'';
  window.__sdcdReady=(async function(){
    var has=Object.keys(window).some(function(k){return /_[0-9a-fA-F]{6}$/.test(k)&&window[k]&&typeof window[k]==='object'&&window[k].Button;});
    if(has)return;
    var root2=document.getElementById('root');
    var splash=null;
    if(root2&&!root2.childElementCount){
      splash=document.createElement('div');
      splash.setAttribute('role','status');
      splash.style.cssText='display:flex;align-items:center;gap:10px;padding:28px;font-family:system-ui,sans-serif;font-size:13px;color:#56616B';
      splash.innerHTML='<span style="width:14px;height:14px;border:2px solid #DCE3E8;border-top-color:#0095C9;border-radius:50%;display:inline-block;animation:sdcdspin .8s linear infinite"></span>Chargement du système de design…<style>@keyframes sdcdspin{to{transform:rotate(360deg)}}</style>';
      root2.appendChild(splash);
    }
    var exp={};
    // fetch en parallèle ; la clé de cache encode le contenu (longueurs cumulées) → toute édition d'un composant invalide le cache
    var lire=function(f,essai){return fetch(root+f,{cache:'no-cache'}).then(function(r){return r.ok?r.text():'';}).catch(function(){return '';})
      .then(function(txt){return (txt||essai>=2)?txt:new Promise(function(res){setTimeout(function(){res(lire(f,essai+1));},120*essai);});});};
    var textes=await Promise.all(FILES.map(function(f){return lire(f,1);}));
    var incomplet=textes.some(function(x){return !x;});
    if(incomplet)console.error('SDCD fallback : fichier(s) non chargé(s) :',FILES.filter(function(f,i){return !textes[i];}).join(', '));
    var empreinte=0;for(var t=0;t<textes.length;t++){empreinte=(empreinte*31+textes[t].length)>>>0;}
    var CACHE_KEY='sdcd-fb-v6-'+FILES.length+'-'+empreinte.toString(36);
    try{Object.keys(sessionStorage).forEach(function(k){if(k.indexOf('sdcd-fb-')===0&&k!==CACHE_KEY)sessionStorage.removeItem(k);});}catch(e){}
    var cache=null;
    try{cache=JSON.parse(sessionStorage.getItem(CACHE_KEY)||'null');}catch(e){}
    var compiled;
    if(cache&&cache.length===FILES.length){compiled=cache;}
    else{
      compiled=textes.map(function(txt,i){
        try{
          var names=[];var re=/export\s+(?:function|const)\s+(\w+)/g;var m;
          while((m=re.exec(txt)))names.push(m[1]);
          var code=txt.replace(/^import[^\n]*$/gm,'').replace(/\bexport\s+/g,'');
          code+='\n;'+names.map(function(n){return '__exp.'+n+'='+n+';';}).join('');
          return Babel.transform(code,{presets:[['react',{runtime:'classic'}]]}).code;
        }catch(e){console.error('SDCD fallback (transform):',FILES[i],e);return '';}
      });
      if(!incomplet){try{sessionStorage.setItem(CACHE_KEY,JSON.stringify(compiled));}catch(e){}}
    }
    // évaluation séquentielle (les dépendances arrivent par paramètres)
    for(var i=0;i<compiled.length;i++){
      var js=compiled[i];if(!js)continue;
      try{
        var keys=Object.keys(exp).filter(function(k){return !(new RegExp('(?:function|const|let|var|class)\\s+'+k+'\\b')).test(js);});
        new Function('React','__exp',...keys,js)(React,exp,...keys.map(function(k){return exp[k];}));
      }catch(e){console.error('SDCD fallback (eval):',FILES[i],e);}
    }
    if(splash&&splash.parentNode)splash.parentNode.removeChild(splash);
    window.SDCD_ab12cd=exp;
  })();
})();