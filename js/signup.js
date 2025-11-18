// Signup page logic
(function(){
  const form = document.getElementById('signupForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if(password.length < 6){ return HC.toast('Password must be at least 6 characters.'); }
    if(password !== confirm){ return HC.toast('Passwords do not match.'); }

    const users = HC.getUsers();
    if(users.some(u => u.email === email)){
      return HC.toast('Email already registered.');
    }

    users.push({ name, email, password });
    HC.setUsers(users);
    HC.setSession(email);
    HC.toast('Welcome, account created!');
    setTimeout(()=> window.location.href = 'create-profile.html', 800);
  });
})();
