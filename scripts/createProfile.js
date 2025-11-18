// Create / Edit profile
(function(){
  if(!SS.requireAuth('login.html')) return;

  const email = SS.getCurrentUserEmail();
  const myProfile = (SS.getProfiles().find(p=> p.ownerEmail === email)) || {};

  const form = document.getElementById('profileForm');
  const interestsWrap = document.getElementById('interests');
  const fileInput = document.getElementById('photo');
  const preview = document.getElementById('preview');
  const errorBox = document.getElementById('formError');

  const INTERESTS = ['Hiking','Coffee','Art','Photography','Reading','Movies','Board Games','Cooking','Travel','Yoga','Running','Gaming','Music','Dancing','Brunch'];

  // Render chips
  INTERESTS.forEach(name=>{
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'tag hover-grow';
    chip.textContent = name;
    chip.setAttribute('aria-pressed', myProfile.interests?.includes(name) ? 'true' : 'false');
    chip.addEventListener('click', ()=>{
      const cur = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', cur ? 'false' : 'true');
      chip.style.borderColor = cur ? 'var(--border)' : 'rgba(255,102,196,0.6)';
      chip.style.background = cur ? 'rgba(255,255,255,0.06)' : 'rgba(255,102,196,0.18)';
    });
    interestsWrap.appendChild(chip);
  });

  // Prefill
  ['name','age','city','country','bio','facebook','instagram','snapchat'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    if(id in myProfile) el.value = myProfile[id] || '';
    if(myProfile.socials){
      if(['facebook','instagram','snapchat'].includes(id)) el.value = myProfile.socials[id] || '';
    }
  });
  if(myProfile.photo){ preview.src = myProfile.photo; preview.style.display = 'block'; }

  fileInput.addEventListener('change', async ()=>{
    const file = fileInput.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      preview.src = reader.result; preview.style.display = 'block';
      preview.onload = ()=>{ URL.revokeObjectURL(preview.src); };
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    errorBox.textContent = '';

    const data = {
      id: myProfile.id || SS.uid(),
      ownerEmail: email,
      name: document.getElementById('name').value.trim(),
      age: Number(document.getElementById('age').value),
      city: document.getElementById('city').value.trim(),
      country: document.getElementById('country').value.trim(),
      bio: document.getElementById('bio').value.trim(),
      photo: preview.src || myProfile.photo || null,
      interests: Array.from(interestsWrap.children).filter(c=> c.getAttribute('aria-pressed')==='true').map(c=> c.textContent),
      socials: {
        facebook: document.getElementById('facebook').value.trim(),
        instagram: document.getElementById('instagram').value.trim(),
        snapchat: document.getElementById('snapchat').value.trim()
      }
    };

    if(!data.name){ errorBox.textContent = 'Please enter your name.'; return; }
    if(!data.age || data.age < 18){ errorBox.textContent = 'Age must be 18 or older.'; return; }

    SS.upsertProfile(data);
    window.location.href = 'profile.html?id=' + data.id;
  });
})();
