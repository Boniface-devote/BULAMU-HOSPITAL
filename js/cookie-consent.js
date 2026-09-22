(function(){'use strict';
if (!window || !document) return;
var key='bulamu_cookie_consent_v1';
function accepted(){try{localStorage.setItem(key,'1');}catch(e){}
var el=document.getElementById('ccBanner'); if(el) el.remove();}
if (localStorage && localStorage.getItem && localStorage.getItem(key)) return;
var b=document.createElement('div'); b.id='ccBanner'; b.className='cookie-consent'; b.innerHTML="<p>We use cookies for analytics and to improve your experience. By continuing you accept our <a href='privacy.html'>privacy policy</a>.</p><div class='cc-actions'><button class='btn btn-ghost' id='ccDecline'>Decline</button><button class='btn btn-primary' id='ccAccept'>Accept</button></div>";
document.body.appendChild(b);
setTimeout(function(){var a=document.getElementById('ccAccept'); if(a) a.focus();},1200);
document.addEventListener('click', function(e){ if(e.target && e.target.id==='ccAccept'){accepted();}});
})();
