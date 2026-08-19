import React from 'react';
export function Quote({children, auteur, source, className='', style}) {
  return <figure className={['sdcd-quote',className].filter(Boolean).join(' ')} style={style}>
    <i className="sdcd-quote__guillemet ri-double-quotes-l" aria-hidden="true"></i>
    <blockquote className="sdcd-quote__texte">{children}</blockquote>
    {(auteur||source)&&<figcaption className="sdcd-quote__source"><strong>{auteur}</strong>{source?' — '+source:''}</figcaption>}
  </figure>;
}
