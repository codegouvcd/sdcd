import React from 'react';
export function MediaPlayer({type='video', titre, duree, poster, transcription=true, className='', style}) {
  const [play,setPlay]=React.useState(false);
  return <figure className={['sdcd-mediaplayer',className].filter(Boolean).join(' ')} style={style}>
    {type==='video'&&<div className="sdcd-mediaplayer__scene">
      <div className="sdcd-mediaplayer__poster">{poster}</div>
      <button type="button" className="sdcd-mediaplayer__lecture" aria-label={play?'Mettre en pause':'Lire la vidéo'} onClick={()=>setPlay(!play)}>
        <i className={play?'ri-pause-fill':'ri-play-fill'} aria-hidden="true"></i></button>
    </div>}
    <div className="sdcd-mediaplayer__barre">
      {type==='audio'&&<button type="button" className="sdcd-mediaplayer__lecture sdcd-mediaplayer__lecture--audio"
        aria-label={play?'Pause':'Écouter'} onClick={()=>setPlay(!play)}>
        <i className={play?'ri-pause-fill':'ri-play-fill'} aria-hidden="true"></i></button>}
      <div className="sdcd-mediaplayer__infos">
        <div className="sdcd-mediaplayer__titre">{titre}</div>
        <div className="sdcd-mediaplayer__progression">
          <div className="sdcd-mediaplayer__piste">
            <div className="sdcd-mediaplayer__avancement" style={{'--sdcd-progression':play?'38%':'0%'}}></div>
          </div>
          <span className="sdcd-mediaplayer__duree">{duree||'00:00'}</span>
        </div>
      </div>
      <a href="#" className="sdcd-mediaplayer__telecharger" aria-label="Télécharger" title="Télécharger">
        <i className="ri-download-line" aria-hidden="true"></i></a>
    </div>
    {transcription&&<div className="sdcd-mediaplayer__transcription">
      <a href="#">Consulter la transcription textuelle</a>
    </div>}
  </figure>;
}
