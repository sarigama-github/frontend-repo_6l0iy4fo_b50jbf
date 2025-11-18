// Sign up logic
(function(){
  const form = document.getElementById('signupForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    // Clear errors
    document.querySelectorAll('.error').forEach(el=> el.textContent='');

    let valid = true;
    if(name.length < 2){ setErr('name','Please enter your name.'); valid = false; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setErr('email','Please enter a valid email.'); valid = false; }
    if(password.length < 6){ setErr('password','Minimum 6 characters.'); valid = false; }
    if(password !== confirm){ setErr('confirm','Passwords do not match.'); valid = false; }

    if(!valid) return;

    const users = SS.getUsers();
    if(users.find(u=> u.email === email)){
      setErr('email','Email already registered. Try logging in.');
      return;
    }

    users.push({ name, email, password });
    SS.saveUsers(users);
    SS.setCurrentUserEmail(email);
    // Create a starter empty profile for this user if not exist
    SS.upsertProfile({ id: SS.uid(), ownerEmail: email, name, age: '', city: '', country: '', bio: '', interests: [], photo: null, socials: {facebook:'', instagram:'', snapchat:''} });

    window.location.href = 'create-profile.html';
  });

  function setErr(key,msg){ const el = document.querySelector(`[data-error="${key}"]`); if(el) el.textContent = msg; }
})();
