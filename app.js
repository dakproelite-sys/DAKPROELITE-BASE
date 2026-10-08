// ============================================================
// LOGIQUE DE L'APPLICATION ET GESTION DE L'INTERFACE
// ============================================================

window.onload = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    document.getElementById('user-display').innerText = session.user.email;
  }
  initProjectList();
};

function getProjects() {
  const stored = localStorage.getItem('dakpro_projects');
  return stored ? JSON.parse(stored) : defaultProjects;
}

function initProjectList() {
  const projects = getProjects();
  const select = document.getElementById('project-selector');
  select.innerHTML = '';

  projects.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.innerText = p.name;
    select.appendChild(opt);
  });

  const savedProj = localStorage.getItem('active_project') || projects[0].name;
  select.value = savedProj;
  updateActiveProjectUI(savedProj);
}

function switchProject(name) {
  localStorage.setItem('active_project', name);
  updateActiveProjectUI(name);
}

function updateActiveProjectUI(name) {
  document.getElementById('current-project-label').innerText = name;
  const projects = getProjects();
  const current = projects.find(p => p.name === name) || projects[0];
  document.getElementById('active-project-key').innerText = current.key;
}

function handleCreateProject(e) {
  e.preventDefault();
  const appName = document.getElementById('new-app-name').value.trim();
  if (!appName) return;

  const generatedKey = 'dk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const projects = getProjects();
  
  if (projects.some(p => p.name.toLowerCase() === appName.toLowerCase())) {
    alert('Un projet portant ce nom existe déjà.');
    return;
  }

  projects.push({ name: appName, key: generatedKey });
  localStorage.setItem('dakpro_projects', JSON.stringify(projects));

  closeModal();
  document.getElementById('new-app-name').value = '';

  initProjectList();
  switchProject(appName);
  alert('Projet "' + appName + '" créé avec succès !');
}

function openModal() {
  document.getElementById('create-project-modal').classList.add('active');
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('create-project-modal').classList.remove('active');
  document.getElementById('modal-overlay').classList.remove('active');
}

function copyApiKey() {
  const keyText = document.getElementById('active-project-key').innerText;
  navigator.clipboard.writeText(keyText);
  alert('Clé API copiée !');
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

function toggleMenu() {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementById('sidebar-overlay').classList.toggle('active');
}

function switchModule(modId, title, element) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  document.querySelectorAll('.module-panel').forEach(panel => panel.classList.remove('active'));
  
  const targetPanel = document.getElementById('mod-' + modId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  document.getElementById('page-title').innerText = title;

  if (window.innerWidth <= 992) {
    toggleMenu();
  }
}

function addRtdbNode() {
  const path = document.getElementById('rtdb-path').value;
  const val = document.getElementById('rtdb-val').value;
  if (!path) return alert('Veuillez spécifier un chemin.');

  const container = document.getElementById('rtdb-container');
  const div = document.createElement('div');
  div.className = 'rtdb-node';
  div.innerHTML = `<span class="rtdb-key">"${path}":</span> <span class="rtdb-val">${val}</span>`;
  container.appendChild(div);
  alert('Nœud RTDB ajouté !');
}

function filterMenus() {
  const query = document.getElementById('menu-search-input').value.toLowerCase();
  document.querySelectorAll('.nav-item').forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(query) ? 'flex' : 'none';
  });
}
