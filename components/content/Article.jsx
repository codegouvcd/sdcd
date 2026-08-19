import React from 'react';
const PARTAGE=[['ri-mail-line','Partager par courriel'],['ri-facebook-fill','Partager sur Facebook'],['ri-twitter-x-line','Partager sur X'],['ri-linkedin-fill','Partager sur LinkedIn'],['ri-printer-line','Imprimer']];
export function Article({surTitre, titre, chapo, date, tempsLecture, hero, sommaire=[], tags=[], children, className='', style}) {
  return <article className={['sdcd-article',className].filter(Boolean).join(' ')} style={style}>
    {surTitre&&<div className="sdcd-eyebrow sdcd-article__sur-titre">{surTitre}</div>}
    <h1 className="sdcd-article__titre">{titre}</h1>
    {chapo&&<p className="sdcd-article__chapo">{chapo}</p>}
    <div className="sdcd-article__meta">
      {date&&<span className="sdcd-article__info"><i className="ri-calendar-line" aria-hidden="true"></i>Publié le {date}</span>}
      {tempsLecture&&<span className="sdcd-article__info"><i className="ri-time-line" aria-hidden="true"></i>{tempsLecture} de lecture</span>}
      <div className="sdcd-article__partage">
        {PARTAGE.map((s,i)=><a key={i} className="sdcd-article__partage-lien" href="#" aria-label={s[1]} title={s[1]}>
          <i className={s[0]} aria-hidden="true"></i></a>)}
      </div>
    </div>
    {hero&&<div className="sdcd-article__hero">{hero}</div>}
    {hero&&<div className="sdcd-article__legende">Légende et crédit de l’image.</div>}
    {sommaire.length>0&&<nav aria-label="Sommaire" className="sdcd-article__sommaire">
      <div className="sdcd-eyebrow sdcd-article__sommaire-titre">Sommaire</div>
      <ol className="sdcd-article__sommaire-liste">
        {sommaire.map((s,i)=><li key={i}><a href="#">{s}</a></li>)}
      </ol></nav>}
    <div className="sdcd-article__corps">{children}</div>
    {tags.length>0&&<div className="sdcd-article__tags">
      {tags.map((t,i)=><a key={i} className="sdcd-article__tag" href="#">{t}</a>)}
    </div>}
  </article>;
}
