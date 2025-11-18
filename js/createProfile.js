// Create profile logic
(function(){
  // Must be logged in to create a profile
  // HC.requireAuth?.();

  const form = document.getElementById('profileForm');
  if(!form) return;

  const photoInput = document.getElementById('photo');
  const photoPreview = document.getElementById('photoPreview');

  photoInput.addEventListener('change', (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      photoPreview.src = reader.result;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const age = Number(document.getElementById('age').value);
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const facebook = document.getElementById('facebook').value.trim();
    const instagram = document.getElementById('instagram').value.trim();
    const snapchat = document.getElementById('snapchat').value.trim();
    const interestsRaw = document.getElementById('interests').value;
    const interests = interestsRaw.split(',').map(s=> s.trim()).filter(Boolean);

    if(!name || !age || !city || !country || !bio){
      return HC.toast('Please fill out all required fields.');
    }

    const session = HC.getSession();
    const id = session || 'profile-' + Date.now();
    const profiles = HC.getProfiles();

    const item = {
      id,
      email: session || undefined,
      name, age, city, country, bio,
      photo: photoPreview?.src || '',
      interests,
      socials: { facebook, instagram, snapchat }
    };

    const idx = profiles.findIndex(p => (session ? p.email === session : p.id === id));
    if(idx >= 0){ profiles[idx] = item; } else { profiles.unshift(item); }

    HC.setProfiles(profiles);
    HC.toast('Profile saved!');
    setTimeout(()=> window.location.href = 'profile.html', 600);
  });
})();
