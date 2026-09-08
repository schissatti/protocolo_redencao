// State Management
let currentCategoryFilter = 'all';
let currentSearchQuery = '';
let activeModule = null;
let activeLesson = null;

// LocalStorage Keys
const STORAGE_COMPLETED_KEY = 'truque_mulher_completed_lessons';
const STORAGE_UNLOCKED_KEY = 'truque_mulher_unlocked_modules';

function getCompletedLessons() {
  const saved = localStorage.getItem(STORAGE_COMPLETED_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveCompletedLesson(lessonPath, isCompleted) {
  const completed = getCompletedLessons();
  if (isCompleted) {
    completed[lessonPath] = true;
  } else {
    delete completed[lessonPath];
  }
  localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(completed));
  updateUI();
}

function getUnlockedModules() {
  const saved = localStorage.getItem(STORAGE_UNLOCKED_KEY);
  return saved ? JSON.parse(saved) : {};
}

function setModuleUnlocked(moduleId, unlocked = true) {
  const unlockedMap = getUnlockedModules();
  if (unlocked) {
    unlockedMap[moduleId] = true;
  } else {
    delete unlockedMap[moduleId];
  }
  localStorage.setItem(STORAGE_UNLOCKED_KEY, JSON.stringify(unlockedMap));
  updateUI();
}

// Calculate Progress Metrics
function calculateProgress() {
  const completedMap = getCompletedLessons();
  let totalLessons = 0;
  let completedCount = 0;

  MODULES_DATA.forEach(module => {
    module.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        totalLessons++;
        if (completedMap[lesson.path]) {
          completedCount++;
        }
      });
    });
  });

  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  return { percent, completedCount, totalLessons };
}

function calculateModuleProgress(module) {
  const completedMap = getCompletedLessons();
  let total = 0;
  let done = 0;

  module.sections.forEach(sec => {
    sec.lessons.forEach(les => {
      total++;
      if (completedMap[les.path]) {
        done++;
      }
    });
  });

  return total > 0 ? Math.round((done / total) * 100) : 0;
}

// Update Rank & Gamification UI
function updateGamificationUI() {
  const { percent } = calculateProgress();
  const unlockedMap = getUnlockedModules();

  // Header progress
  document.getElementById('headerPercentText').textContent = `${percent}%`;
  document.getElementById('headerProgressFill').style.width = `${percent}%`;
  document.getElementById('completionPercentText').textContent = `${percent}%`;

  // Determine Level Rank
  let currentLevel = 'Novato na Cama';
  let nextLevel = 'Sedutor Nato';
  let nextTarget = 20;

  if (percent >= 100) {
    currentLevel = 'Mestre da Sedução';
    nextLevel = 'Nível Máximo Alcançado';
    nextTarget = 100;
  } else if (percent >= 80) {
    currentLevel = 'Dominante';
    nextLevel = 'Mestre';
    nextTarget = 100;
  } else if (percent >= 60) {
    currentLevel = 'Senhor';
    nextLevel = 'Dominante';
    nextTarget = 80;
  } else if (percent >= 40) {
    currentLevel = 'Conquistador';
    nextLevel = 'Senhor';
    nextTarget = 60;
  } else if (percent >= 20) {
    currentLevel = 'Sedutor';
    nextLevel = 'Conquistador';
    nextTarget = 40;
  } else {
    currentLevel = 'Novato na Cama';
    nextLevel = 'Sedutor Nato';
    nextTarget = 20;
  }

  document.getElementById('currentLevelName').textContent = currentLevel;
  document.getElementById('nextLevelName').textContent = nextLevel;

  const needed = Math.max(0, nextTarget - percent);
  const badgeEl = document.getElementById('nextLevelNeededBadge');
  if (percent >= 100) {
    badgeEl.textContent = 'Mapeamento 100% Completo!';
  } else {
    badgeEl.textContent = `Faltam ${needed}% para desbloquear`;
  }

  // Update Roadmap Nodes
  const nodes = document.querySelectorAll('.roadmap-node');
  nodes.forEach(node => {
    const nodePercent = parseInt(node.getAttribute('data-percent'), 10);
    const circle = node.querySelector('.node-icon-circle');

    if (percent >= nodePercent) {
      node.classList.add('active');
      circle.textContent = '✓';
    } else {
      node.classList.remove('active');
      circle.textContent = nodePercent === 0 ? '✓' : (nodePercent / 20 + 1);
    }
  });

  // Roadmap fill line
  document.getElementById('roadmapProgressFill').style.width = `${percent}%`;
}

// Render Module Cards Grid
function renderModulesGrid() {
  const grid = document.getElementById('modulesGrid');
  grid.innerHTML = '';

  const unlockedMap = getUnlockedModules();

  const filtered = MODULES_DATA.filter(module => {
    // Category Filter
    if (currentCategoryFilter !== 'all' && module.category !== currentCategoryFilter) {
      return false;
    }
    // Search Query Filter
    if (currentSearchQuery.trim() !== '') {
      const q = currentSearchQuery.toLowerCase();
      const matchTitle = module.title.toLowerCase().includes(q);
      const matchDesc = module.description.toLowerCase().includes(q);
      const matchLesson = module.sections.some(s =>
        s.lessons.some(l => l.title.toLowerCase().includes(q) || l.filename.toLowerCase().includes(q))
      );
      if (!matchTitle && !matchDesc && !matchLesson) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
      Nenhum módulo ou conteúdo encontrado para "${currentSearchQuery}".
    </div>`;
    return;
  }

  filtered.forEach(module => {
    const isUnlocked = true;
    const modProgress = calculateModuleProgress(module);

    const card = document.createElement('div');
    card.className = 'module-card';

    card.innerHTML = `
      <div class="card-thumb-container">
        <span class="card-badge">${module.badge}</span>
        <img class="card-thumb-img" src="${module.thumb}" alt="${module.title}">
        ${!isUnlocked ? `
          <div class="card-lock-overlay">
            <div class="lock-box">🔒</div>
          </div>
        ` : ''}
      </div>
      <div class="card-body">
        <div>
          <h3 class="card-title">${module.title}</h3>
          <p class="card-desc">${module.description}</p>
        </div>
        <div class="card-footer-stats">
          <div class="card-progress-row">
            <span class="card-progress-label">Progresso do Módulo</span>
            <span class="card-progress-val">${modProgress}%</span>
          </div>
          <div class="card-action-btn">
            ${isUnlocked ? '<span>Acessar Módulo</span> <span>→</span>' : '<span>🔒 Desbloquear Conteúdo VIP</span> <span>→</span>'}
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (isUnlocked) {
        openPlayerModal(module);
      } else {
        openUpsellModal(module);
      }
    });

    grid.appendChild(card);
  });
}

// Player Modal Logic
function openPlayerModal(module, lessonToSelect = null) {
  activeModule = module;
  document.getElementById('modalModuleTitle').textContent = module.title;

  const modal = document.getElementById('playerModal');
  modal.classList.add('open');

  renderPlaylistSections();

  // Select lesson
  if (lessonToSelect) {
    selectLesson(lessonToSelect);
  } else {
    // Select first lesson or first uncompleted lesson
    const completedMap = getCompletedLessons();
    let target = null;

    for (const sec of module.sections) {
      for (const les of sec.lessons) {
        if (!target) target = les;
        if (!completedMap[les.path]) {
          target = les;
          break;
        }
      }
      if (target && !completedMap[target.path]) break;
    }

    if (target) {
      selectLesson(target);
    }
  }
}

function closePlayerModal() {
  const modal = document.getElementById('playerModal');
  modal.classList.remove('open');
  const video = document.getElementById('mainVideoPlayer');
  if (video) {
    video.pause();
    video.src = '';
  }
  const wrapper = document.getElementById('playerMediaWrapper');
  wrapper.innerHTML = '';
  activeLesson = null;
}

function renderPlaylistSections() {
  const container = document.getElementById('playlistSectionsContainer');
  container.innerHTML = '';

  const completedMap = getCompletedLessons();

  activeModule.sections.forEach(sec => {
    const secGroup = document.createElement('div');
    secGroup.className = 'section-group';

    const secTitle = document.createElement('div');
    secTitle.className = 'section-header-title';
    secTitle.textContent = sec.sectionTitle;
    secGroup.appendChild(secTitle);

    sec.lessons.forEach(les => {
      const isDone = !!completedMap[les.path];
      const isActive = activeLesson && activeLesson.path === les.path;

      const lesBtn = document.createElement('button');
      lesBtn.className = `lesson-item-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`;

      lesBtn.innerHTML = `
        <span style="display:flex; align-items:center; gap: 8px;">
          <span>${les.type === 'video' ? '🎬' : '📄'}</span>
          <span>${les.title}</span>
        </span>
        <span class="status-icon">${isDone ? '✓' : '○'}</span>
      `;

      lesBtn.addEventListener('click', () => {
        selectLesson(les);
      });

      secGroup.appendChild(lesBtn);
    });

    container.appendChild(secGroup);
  });
}

function selectLesson(lesson) {
  activeLesson = lesson;
  renderPlaylistSections();

  document.getElementById('currentLessonTitle').textContent = lesson.title;

  const wrapper = document.getElementById('playerMediaWrapper');
  const encodedPath = encodeURI(lesson.path);

  if (lesson.type === 'video') {
    wrapper.className = 'video-player-wrapper';
    wrapper.innerHTML = `
      <video id="mainVideoPlayer" controls controlsList="nodownload" style="width:100%; height:100%; object-fit:contain;" preload="metadata">
        <source src="${encodedPath}" type="video/mp4">
        Seu navegador não suporta a reprodução de vídeo.
      </video>
    `;
    const newVideo = document.getElementById('mainVideoPlayer');
    newVideo.play().catch(() => {});

    newVideo.addEventListener('ended', () => {
      saveCompletedLesson(lesson.path, true);
      playNextLesson();
    });

    newVideo.onerror = () => {
      wrapper.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:20px; text-align:center; color:#fff; gap:12px;">
          <span style="font-size:32px;">🎬</span>
          <h4 style="font-size:16px; font-weight:700;">Vídeo da Aula</h4>
          <p style="font-size:12px; color:var(--text-muted); max-width:400px;">
            Clique abaixo para assistir à videoaula diretamente em alta definição.
          </p>
          <a href="${encodedPath}" target="_blank" class="pdf-action-link primary" style="padding:10px 20px; font-size:13px;">
            <span>▶</span> Abrir Videoaula em Nova Guia
          </a>
        </div>
      `;
    };
  } else if (lesson.type === 'image') {
    wrapper.className = 'image-viewer-wrapper';
    wrapper.innerHTML = `
      <img src="${encodedPath}" alt="${lesson.title}" title="${lesson.title}">
    `;
  } else if (lesson.type === 'spotify') {
    const spotifyUrl = lesson.spotifyUrl || 'https://open.spotify.com/playlist/72aFmh0aUP6zx7xWBF4pLy?si=YoYQNTQUQ9a4yz8ohXvFGA&pi=u-gg-dzt-wSKuV';
    wrapper.className = 'spotify-container';
    wrapper.innerHTML = `
      <div class="spotify-logo-badge">🎵</div>
      <h3 class="spotify-heading">Playlist Oficial de Músicas Hot (Spotify)</h3>
      <p class="spotify-subheading">
        Acesse a seleção musical exclusiva desenvolvida para criar o clima e a atmosfera perfeita durante o Protocolo do Nexo.
      </p>
      <a href="${spotifyUrl}" target="_blank" class="spotify-btn">
        <span>🟢</span> ACESSAR PLAYLIST NO SPOTIFY
      </a>
      <div style="width:100%; max-width:500px; margin-top:10px;">
        <iframe style="border-radius:12px;" src="https://open.spotify.com/embed/playlist/72aFmh0aUP6zx7xWBF4pLy?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    `;
  } else {
    // Embedded PDF Reader
    wrapper.className = 'pdf-embedded-wrapper';
    wrapper.innerHTML = `
      <div class="pdf-toolbar">
        <div class="pdf-toolbar-title">
          <span>📖 Leitor de E-book VIP</span>
        </div>
        <div class="pdf-toolbar-actions">
          <a href="${encodedPath}" target="_blank" class="pdf-action-link" title="Abrir em Nova Guia">
            <span>🔗</span> Nova Guia
          </a>
          <a href="${encodedPath}" download class="pdf-action-link primary" title="Baixar PDF">
            <span>📥</span> Baixar PDF
          </a>
        </div>
      </div>
      <iframe src="${encodedPath}#toolbar=1" class="pdf-iframe-viewer" title="${lesson.title}"></iframe>
    `;
  }

  // Update Complete Button State
  updateCompleteButtonState();
}

function updateCompleteButtonState() {
  if (!activeLesson) return;

  const completedMap = getCompletedLessons();
  const isDone = !!completedMap[activeLesson.path];

  const btn = document.getElementById('toggleCompleteBtn');
  const icon = document.getElementById('completeBtnIcon');
  const text = document.getElementById('completeBtnText');

  if (isDone) {
    btn.classList.add('completed');
    icon.textContent = '✓';
    text.textContent = 'Aula Concluída';
  } else {
    btn.classList.remove('completed');
    icon.textContent = '○';
    text.textContent = 'Marcar como concluída';
  }
}

function playNextLesson() {
  if (!activeModule || !activeLesson) return;

  let foundCurrent = false;
  let nextLesson = null;

  for (const sec of activeModule.sections) {
    for (const les of sec.lessons) {
      if (foundCurrent) {
        nextLesson = les;
        break;
      }
      if (les.path === activeLesson.path) {
        foundCurrent = true;
      }
    }
    if (nextLesson) break;
  }

  if (nextLesson) {
    selectLesson(nextLesson);
  }
}

// Upsell Modal Logic
function openUpsellModal(module) {
  activeModule = module;
  document.getElementById('upsellModalTitle').textContent = module.title;
  document.getElementById('upsellModalDesc').textContent = module.description;

  const modal = document.getElementById('upsellModal');
  modal.classList.add('open');
}

function closeUpsellModal() {
  const modal = document.getElementById('upsellModal');
  modal.classList.remove('open');
}

// Initialize & Event Listeners
function updateUI() {
  updateGamificationUI();
  renderModulesGrid();
}

document.addEventListener('DOMContentLoaded', () => {
  // Category Tab Clicks
  const tabBtns = document.querySelectorAll('.filter-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryFilter = btn.getAttribute('data-category');
      renderModulesGrid();
    });
  });

  // Search Input Event
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    renderModulesGrid();
  });

  // Hero Continue Button
  document.getElementById('continueBtn').addEventListener('click', () => {
    const firstModule = MODULES_DATA[0];
    openPlayerModal(firstModule);
  });

  // Player Modal Close Buttons
  document.getElementById('closePlayerModalBtn').addEventListener('click', closePlayerModal);
  document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target.id === 'playerModal') closePlayerModal();
  });

  // Toggle Complete Lesson
  document.getElementById('toggleCompleteBtn').addEventListener('click', () => {
    if (!activeLesson) return;
    const completedMap = getCompletedLessons();
    const isCurrentlyDone = !!completedMap[activeLesson.path];
    saveCompletedLesson(activeLesson.path, !isCurrentlyDone);
    updateCompleteButtonState();
    renderPlaylistSections();
  });

  // Upsell Modal Close Buttons
  document.getElementById('closeUpsellModalBtn').addEventListener('click', closeUpsellModal);
  document.getElementById('upsellModal').addEventListener('click', (e) => {
    if (e.target.id === 'upsellModal') closeUpsellModal();
  });

  // Demo Unlock Link
  document.getElementById('demoUnlockBtn').addEventListener('click', () => {
    if (activeModule) {
      setModuleUnlocked(activeModule.id, true);
      closeUpsellModal();
      openPlayerModal(activeModule);
    }
  });

  // Reset test unlocks on startup so upsells remain locked by default
  localStorage.removeItem(STORAGE_UNLOCKED_KEY);

  // Initial Render
  updateUI();
});
