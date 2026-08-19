import React from 'react';
const TONS=['neutre','info','succes','alerte','erreur','nouveau'];
export function Badge({ton='neutre', children, className='', style}) {
  const t=TONS.includes(ton)?ton:'neutre';
  const cls=['sdcd-badge',t!=='neutre'&&'sdcd-badge--'+t,className].filter(Boolean).join(' ');
  return React.createElement('span',{className:cls,style},children);
}
