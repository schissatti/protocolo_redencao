/* ==========================================================================
   AREA DE MEMBROS LOGIC - TALITA GOIS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const coursesData = window.COURSES_DATA || [];
  
  // DOM Elements
  const coursesGrid = document.getElementById('coursesGrid');
  const searchInput = document.getElementById('searchInput');
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  // Level & Stepper Elements
  const rankTitle = document.getElementById('rankTitle');
  const nextRankTitle = document.getElementById('nextRankTitle');
  const overallPercentageText = document.getElementById('overallPercentageText');
  const missingPercentText = document.getElementById('missingPercentText');
  const stepperBarFill = document.getElementById('stepperBarFill');
  const overallProgressTop = document.getElementById('overallProgressTop');
  const stepNodes = document.querySelectorAll('.step-node');

  // Modal Elements
  const courseModal = document.getElementById('courseModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const videoPlayer = document.getElementById('videoPlayer');
  const pdfViewerBox = document.getElementById('pdfViewerBox');
  const pdfTitle = document.getElementById('pdfTitle');
  const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');
  const lessonActiveTitle = document.getElementById('lessonActiveTitle');
  const btnCompleteLesson = document.getElementById('btnCompleteLesson');
  const btnPrevLesson = document.getElementById('btnPrevLesson');
  const btnNextLesson = document.getElementById('btnNextLesson');
  const btnContinueHero = document.getElementById('btnContinueHero');

  // Unlock Modal Elements
  const unlockModal = document.getElementById('unlockModal');
  const closeUnlockModalBtn = document.getElementById('closeUnlockModalBtn');
  const unlockModalCourseName = document.getElementById('unlockModalCourseName');
  const unlockModalDesc = document.getElementById('unlockModalDesc');
  const unlockCheckoutBtn = document.getElementById('unlockCheckoutBtn');

  // State
  let currentCategory = 'all';
  let searchTerm = '';
  let activeCourse = null;
  let activeLesson = null;
  let flatLessonsList = [];

  // Completed Lessons Storage
  function getCompletedLessons() {
    try {
      return JSON.parse(localStorage.getItem('TG_COMPLETED_LESSONS') || '[]');
    } catch(e) {
      return [];
    }
  }

  function setCompletedLessons(list) {
    localStorage.setItem('TG_COMPLETED_LESSONS', JSON.stringify(list));
    updateOverallProgress();
    renderCourses();
  }

  function isLessonCompleted(lessonId) {
    return getCompletedLessons().includes(lessonId);
  }

  function toggleLessonCompleted(lessonId) {
    let list = getCompletedLessons();
    if (list.includes(lessonId)) {
      list = list.filter(id => id !== lessonId);
    } else {
      list.push(lessonId);
    }
    setCompletedLessons(list);
  }

  // Calculate Overall Progress & Gamification Ranks
  function updateOverallProgress() {
    let totalLessonsCount = 0;
    let completedCount = 0;
    const completedList = getCompletedLessons();

    coursesData.forEach(course => {
      course.modules.forEach(mod => {
        mod.lessons.forEach(les => {
          totalLessonsCount++;
          if (completedList.includes(les.id)) {
            completedCount++;
          }
        });
      });
    });

    const percent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;
    
    // Update Header
    if (overallProgressTop) overallProgressTop.textContent = `${percent}%`;
    if (overallPercentageText) overallPercentageText.textContent = `${percent}%`;
    if (stepperBarFill) stepperBarFill.style.width = `${percent}%`;

    // Ranks:
    // 0 - 19%: Novato (Next: Seducador)
    // 20 - 39%: Seducador (Next: Conquistador)
    // 40 - 59%: Conquistador (Next: Senhor)
    // 60 - 79%: Senhor (Next: Dominante)
    // 80 - 99%: Dominante (Next: Mestre)
    // 100%: Mestre

    const ranks = [
      { min: 0, title: 'Novato na Cama', next: 'Seducador', nextMin: 20 },
      { min: 20, title: 'Seducador', next: 'Conquistador', nextMin: 40 },
      { min: 40, title: 'Conquistador', next: 'Senhor', nextMin: 60 },
      { min: 60, title: 'Senhor', next: 'Dominante', nextMin: 80 },
      { min: 80, title: 'Dominante', next: 'Mestre', nextMin: 100 },
      { min: 100, title: 'Mestre da Sedução', next: 'Nível Máximo', nextMin: 100 }
    ];

    let currentRank = ranks[0];
    for (let r of ranks) {
      if (percent >= r.min) {
        currentRank = r;
      }
    }

    if (rankTitle) rankTitle.textContent = currentRank.title;
    if (nextRankTitle) nextRankTitle.textContent = currentRank.next;

    const remaining = currentRank.nextMin > percent ? (currentRank.nextMin - percent) : 0;
    if (missingPercentText) {
      if (percent >= 100) {
        missingPercentText.textContent = 'Parabéns! Você alcançou o nível supremo!';
      } else {
        missingPercentText.textContent = `Faltam ${remaining}% para desbloquear`;
      }
    }

    // Update Stepper Nodes
    stepNodes.forEach(node => {
      const stepVal = parseInt(node.dataset.percent || '0', 10);
      node.classList.remove('active', 'completed');
      if (percent >= stepVal) {
        node.classList.add('completed');
      } else if (currentRank.min === stepVal) {
        node.classList.add('active');
      }
    });
  }

  // Calculate Single Course Progress
  function getCourseProgress(course) {
    let total = 0;
    let completed = 0;
    const completedList = getCompletedLessons();

    course.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        total++;
        if (completedList.includes(les.id)) completed++;
      });
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  // Filter & Render Cards
  function renderCourses() {
    if (!coursesGrid) return;
    coursesGrid.innerHTML = '';

    const filtered = coursesData.filter(course => {
      // Category Filter
      const matchCat = (currentCategory === 'all') || 
                       (currentCategory === 'principais' && course.category === 'principais') ||
                       (currentCategory === 'ebooks' && (course.category === 'ebooks' || course.id === 'efeito-touro'));
      
      // Search Filter
      let matchSearch = true;
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const titleMatch = course.title.toLowerCase().includes(query);
        const descMatch = course.desc.toLowerCase().includes(query);
        let lessonMatch = false;

        course.modules.forEach(m => {
          m.lessons.forEach(l => {
            if (l.title.toLowerCase().includes(query)) lessonMatch = true;
          });
        });

        matchSearch = titleMatch || descMatch || lessonMatch;
      }

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      coursesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <svg style="width: 48px; height: 48px; stroke: var(--gold-primary); margin-bottom: 16px;" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
          </svg>
          <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 8px;">Nenhum conteúdo encontrado</h3>
          <p>Tente ajustar os termos de busca ou mudar a categoria selecionada.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(course => {
      const progPercent = getCourseProgress(course);
      const isLocked = course.locked === true;

      const cardEl = document.createElement('div');
      cardEl.className = `course-card ${isLocked ? 'is-locked' : ''}`;
      cardEl.innerHTML = `
        <div class="card-thumb-wrapper">
          ${isLocked ? `
            <div class="lock-badge">🔒 BLOQUEADO</div>
            <div class="lock-center-icon">
              <svg style="width:24px;height:24px;fill:url(#goldGradient);" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
          ` : ''}
          <img class="card-thumb" src="${course.thumb}" alt="${course.title}" loading="lazy">
        </div>
        <div class="card-body">
          <h3 class="card-title">${course.title}</h3>
          <p class="card-desc">${course.desc}</p>
          <div class="card-footer-meta">
            <div class="card-progress-label">
              <span>${isLocked ? 'Status do Módulo' : 'Progresso do Módulo'}</span>
              <span>${isLocked ? '🔒 Exclusivo' : progPercent + '%'}</span>
            </div>
            <div class="card-progress-bar">
              <div class="card-progress-fill" style="width: ${isLocked ? 0 : progPercent}%;"></div>
            </div>
            <button class="btn-card-action ${isLocked ? 'is-locked-btn' : ''}" data-course-id="${course.id}">
              ${isLocked ? '🔒 Desbloquear Acesso' : 'Acessar Módulo ➔'}
            </button>
          </div>
        </div>
      `;

      const handleAction = (e) => {
        e.stopPropagation();
        if (isLocked) {
          openUnlockModal(course);
        } else {
          openCourseModal(course);
        }
      };

      cardEl.querySelector('.btn-card-action').addEventListener('click', handleAction);
      cardEl.addEventListener('click', handleAction);

      coursesGrid.appendChild(cardEl);
    });
  }

  // Open Locked Course Upsell Modal
  function openUnlockModal(course) {
    if (unlockModalCourseName) unlockModalCourseName.textContent = course.title;
    if (unlockModalDesc) unlockModalDesc.textContent = `O treinamento "${course.title}" é uma Masterclass exclusiva com técnicas avançadas para transformação completa, disponível como upgrade no aplicativo.`;
    if (unlockCheckoutBtn) {
      unlockCheckoutBtn.href = '#';
    }
    if (unlockModal) unlockModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeUnlockModal() {
    if (unlockModal) unlockModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeUnlockModalBtn) closeUnlockModalBtn.addEventListener('click', closeUnlockModal);
  if (unlockModal) {
    unlockModal.addEventListener('click', (e) => {
      if (e.target === unlockModal) closeUnlockModal();
    });
  }

  // Open Modal & Load Course Player
  function openCourseModal(course, targetLessonId = null) {
    activeCourse = course;
    modalCourseTitle.textContent = course.title;
    
    // Flatten lessons list for navigation
    flatLessonsList = [];
    course.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        flatLessonsList.push({
          ...les,
          moduleTitle: mod.title
        });
      });
    });

    // Render Sidebar Accordion
    renderSidebarAccordion();

    // Select initial lesson
    let initialLesson = flatLessonsList[0];
    if (targetLessonId) {
      const found = flatLessonsList.find(l => l.id === targetLessonId);
      if (found) initialLesson = found;
    } else {
      // Find first uncompleted lesson
      const uncompleted = flatLessonsList.find(l => !isLessonCompleted(l.id));
      if (uncompleted) initialLesson = uncompleted;
    }

    if (initialLesson) {
      loadLesson(initialLesson);
    }

    courseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    courseModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.src = '';
    }
    const pdfIframe = document.getElementById('pdfIframe');
    if (pdfIframe) pdfIframe.src = '';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (courseModal) {
    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) closeModal();
    });
  }

  // Load a Specific Lesson into the Player Stage
  function loadLesson(lesson) {
    activeLesson = lesson;

    if (lessonActiveTitle) {
      lessonActiveTitle.textContent = `${lesson.moduleTitle} • ${lesson.title}`;
    }

    // Toggle Video or PDF Stage
    if (lesson.type === 'pdf') {
      videoPlayer.style.display = 'none';
      videoPlayer.pause();
      videoPlayer.src = '';
      
      pdfViewerBox.style.display = 'flex';
      const pdfTitleText = document.getElementById('pdfTitleText');
      if (pdfTitleText) pdfTitleText.textContent = lesson.title;
      const pdfIframe = document.getElementById('pdfIframe');
      if (pdfIframe) pdfIframe.src = encodeURI(lesson.file);
      if (pdfDownloadBtn) {
        pdfDownloadBtn.href = encodeURI(lesson.file);
        pdfDownloadBtn.setAttribute('download', '');
      }
    } else {
      pdfViewerBox.style.display = 'none';
      const pdfIframe = document.getElementById('pdfIframe');
      if (pdfIframe) pdfIframe.src = '';
      videoPlayer.style.display = 'block';
      videoPlayer.src = encodeURI(lesson.file);
      videoPlayer.load();
    }

    // Update Mark Complete Button
    updateCompleteBtnState();

    // Update Nav Step Buttons
    updateNavButtonsState();

    // Highlight active item in sidebar
    const items = accordionList.querySelectorAll('.lesson-item');
    items.forEach(el => {
      if (el.dataset.lessonId === lesson.id) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  function updateCompleteBtnState() {
    if (!activeLesson || !btnCompleteLesson) return;
    const completed = isLessonCompleted(activeLesson.id);
    if (completed) {
      btnCompleteLesson.classList.add('completed');
      btnCompleteLesson.innerHTML = `✓ Aula Concluída`;
    } else {
      btnCompleteLesson.classList.remove('completed');
      btnCompleteLesson.innerHTML = `◯ Marcar como Concluída`;
    }
  }

  function updateNavButtonsState() {
    if (!activeLesson || flatLessonsList.length === 0) return;
    const idx = flatLessonsList.findIndex(l => l.id === activeLesson.id);
    
    if (btnPrevLesson) {
      btnPrevLesson.disabled = (idx <= 0);
    }
    if (btnNextLesson) {
      btnNextLesson.disabled = (idx >= flatLessonsList.length - 1);
    }
  }

  if (btnCompleteLesson) {
    btnCompleteLesson.addEventListener('click', () => {
      if (!activeLesson) return;
      toggleLessonCompleted(activeLesson.id);
      updateCompleteBtnState();
      renderSidebarAccordion();
    });
  }

  if (btnPrevLesson) {
    btnPrevLesson.addEventListener('click', () => {
      if (!activeLesson) return;
      const idx = flatLessonsList.findIndex(l => l.id === activeLesson.id);
      if (idx > 0) loadLesson(flatLessonsList[idx - 1]);
    });
  }

  if (btnNextLesson) {
    btnNextLesson.addEventListener('click', () => {
      if (!activeLesson) return;
      const idx = flatLessonsList.findIndex(l => l.id === activeLesson.id);
      if (idx < flatLessonsList.length - 1) loadLesson(flatLessonsList[idx + 1]);
    });
  }

  // Render Sidebar Accordion for Active Course
  function renderSidebarAccordion() {
    if (!accordionList || !activeCourse) return;
    accordionList.innerHTML = '';

    activeCourse.modules.forEach((mod, modIdx) => {
      const modGroup = document.createElement('div');
      modGroup.className = 'module-group';

      const completedList = getCompletedLessons();
      const modCompletedCount = mod.lessons.filter(l => completedList.includes(l.id)).length;

      const trigger = document.createElement('button');
      trigger.className = 'module-trigger';
      trigger.innerHTML = `
        <span>${mod.title}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">
          ${modCompletedCount}/${mod.lessons.length}
        </span>
      `;

      const lessonsList = document.createElement('div');
      lessonsList.className = 'lessons-list';

      mod.lessons.forEach((les) => {
        const item = document.createElement('div');
        const completed = completedList.includes(les.id);
        const isActive = activeLesson && (activeLesson.id === les.id);

        item.className = `lesson-item ${completed ? 'completed' : ''} ${isActive ? 'active' : ''}`;
        item.dataset.lessonId = les.id;
        item.innerHTML = `
          <div class="lesson-check">${completed ? '✓' : ''}</div>
          <span style="flex: 1; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
            ${les.type === 'pdf' ? '📄 ' : '▶ '}${les.title}
          </span>
        `;

        item.addEventListener('click', () => {
          loadLesson({ ...les, moduleTitle: mod.title });
        });

        lessonsList.appendChild(item);
      });

      modGroup.appendChild(trigger);
      modGroup.appendChild(lessonsList);
      accordionList.appendChild(modGroup);
    });
  }

  // Category Tabs Event Listeners
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      renderCourses();
    });
  });

  // Live Search Input Event Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderCourses();
    });
  }

  // Hero "Continuar de Onde Parei" Button
  if (btnContinueHero) {
    btnContinueHero.addEventListener('click', () => {
      // Find first uncompleted lesson across all courses
      const completedList = getCompletedLessons();
      for (let course of coursesData) {
        for (let mod of course.modules) {
          for (let les of mod.lessons) {
            if (!completedList.includes(les.id)) {
              openCourseModal(course, les.id);
              return;
            }
          }
        }
      }
      // If all completed, open first course
      if (coursesData.length > 0) openCourseModal(coursesData[0]);
    });
  }

  // Initialize Page
  updateOverallProgress();
  renderCourses();
});
