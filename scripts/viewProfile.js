// View profile page
(function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const profile = SS.getProfileById(id) || SS.ensureMockProfiles().find(p=> String(p.id)===String(id));

  if(!profile){
    // fallback: go back to dashboard
    location.href = 'dashboard.html';
    return;
  }

  const pic = document.getElementById('profilePic');
  const nameEl = document.getElementById('profileName');
  const meta = document.getElementById('profileMeta');
  const bio = document.getElementById('profileBio');
  const interests = document.getElementById('profileInterests');
  const socials = document.getElementById('socialLinks');

  if(profile.photo){ pic.src = profile.photo; } else { pic.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' rx='60' fill='url(#g)'/><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#ff9bd7'/><stop offset='100%' stop-color='#c1b0ff'/></linearGradient></defs></svg>`); }
  nameEl.textContent = profile.name + (profile.age? ` • ${profile.age}` : '');
  meta.textContent = [profile.city, profile.country].filter(Boolean).join(', ');
  bio.textContent = profile.bio || 'No bio yet.';

  interests.innerHTML = '';
  (profile.interests||[]).forEach((t,i)=>{
    const span = document.createElement('span');
    const colors = ['pink','purple','blue','green'];
    span.className = 'tag';
    span.setAttribute('color', colors[i%colors.length]);
    span.textContent = t;
    interests.appendChild(span);
  });

  socials.innerHTML = '';
  if(profile.socials?.facebook){ addLink('Facebook','fb', profile.socials.facebook); }
  if(profile.socials?.instagram){ addLink('Instagram','ig', profile.socials.instagram); }
  if(profile.socials?.snapchat){ addLink('Snapchat','sc', profile.socials.snapchat); }

  function addLink(label, cls, href){
    const a = document.createElement('a');
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = label;
    a.className = cls;
    a.classList.add(cls);
    a.classList.add('hover-grow');
    socials.appendChild(a);
  }
})();
