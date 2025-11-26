// Minimal site script: replace these sample values with your real data
const data = {
  name: 'Darshan Chopda',
  title: 'Diploma IT — 1st year, 1st semester',
  location: 'Ahmedabad',
  email: 'jalpanakum91@gmail.com',
  phone: '',
  about: 'I am a 1st-year Diploma IT student at Government Polytechnic Ahmedabad. I enjoy building web applications with a focus on frontend development and modern JavaScript frameworks. I also know C++ and Java and practice Data Structures & Algorithms (DSA).',
  skills: [
    // Frontend
    'HTML5','CSS3','JavaScript (ES6+)','TypeScript','React.js','Next.js',
    // Backend
    'Node.js','Express.js','Python (APIs - basics)',
    // Database / Cloud
    'MongoDB','AWS (basic)',
    // Languages & DSA
    'C++','Java','Data Structures & Algorithms (DSA)'
  ],
  experiences: [
    {title:'Intern at Vikash Tech Solution',period:'1 November - 1 January',desc:'Worked as an intern at Vikash Tech Solution, gaining practical experience in software development and project management.'},
    {title:'Intern at Gharkiyade Startup',period:'June 2023 - August 2023',desc:'Worked on developing web applications for the Gharkiyade platform, focusing on frontend development with React.js and backend integration with Node.js. Contributed to improving user experience and implementing new features.'}
  ],
  projects: [
    {title:'Simple REST API',tech:'Node.js • Express • MongoDB',desc:'REST API for managing sample data; includes CRUD routes and basic auth.',link:'https://github.com/jalpanakum7'},
    {title:'E-Commerce Platform',tech:'React.js • Node.js • MongoDB • Stripe',desc:'Full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration.',link:'https://github.com/jalpanakum7'},
    {title:'Task Management App',tech:'Next.js • TypeScript • Prisma • PostgreSQL',desc:'Modern task management application with real-time updates, team collaboration features, and advanced filtering.',link:'https://github.com/jalpanakum7'}
  ],
  resume: '', // set to a relative path like 'assets/Resume.pdf' if you add one
  github: 'https://github.com/jalpanakum7',
  linkedin: 'https://www.linkedin.com/in/jalpa-nakum-16230a39a',
  twitter: ''
}

console.log('Script loaded, data:', data);

function populateContent() {
  console.log('populateContent called');
  console.log('Data object:', data);
  try {
    document.getElementById('name').textContent = data.name
  document.getElementById('title').textContent = data.title
  document.getElementById('location').textContent = data.location
  const metaEl = document.getElementById('meta')
  if(metaEl) metaEl.textContent = 'DOB : 24/03/2009  college : Government Polytechnic Ahmedabad'
  document.getElementById('aboutText').textContent = data.about

  // Group skills into categories
  const frontend = ['HTML5','CSS3','JavaScript (ES6+)','TypeScript','React.js','Next.js']
  const backend = ['Node.js','Express.js','Python (APIs - basics)']
  const infra = ['MongoDB','AWS (basic)']
  const langs = ['C++','Java','Data Structures & Algorithms (DSA)']
  const other = ['Photo Editing','Video Editing','Digital Marketing']

  // Combine backend, databases & cloud into one array for skillsInfra
  const combinedInfra = [...backend, ...infra]

  function renderList(id, arr){
    const el = document.getElementById(id)
    if(!el) return
    arr.forEach(s=>{
      const chip = document.createElement('div')
      chip.className = 'chip'
      chip.textContent = s
      el.appendChild(chip)
    })
  }

  renderList('skillsFrontend', frontend)
  renderList('skillsBackend', backend)
  renderList('skillsLang', langs)
  renderList('skillsInfra', infra)
  renderList('skillsOther', other)

  const experienceList = document.getElementById('experienceList')
  data.experiences.forEach(e=>{
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <h3>${e.title}</h3>
      <p class="meta">${e.period || ''}</p>
      <p>${e.desc}</p>
    `
    experienceList.appendChild(card)
  })

  const projectsList = document.getElementById('projectsList')
  data.projects.forEach(p=>{
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p class="meta">${p.tech || ''}</p>
      <p>${p.desc}</p>
      ${p.link?`<p><a href="${p.link}" target="_blank" rel="noopener" class="btn ghost">View Project</a></p>`:''}
    `
    projectsList.appendChild(card)
  })

  // Social links
  const github = document.getElementById('githubLink')
  if(github) github.href = data.github || '#'
  const linkedin = document.getElementById('linkedinLink')
  if(linkedin) linkedin.href = data.linkedin || '#'
  const emailBtn = document.getElementById('emailBtn')
  if(emailBtn) emailBtn.href = `mailto:${data.email}`
  // Twitter link removed

  const resumeLink = document.getElementById('resumeLink')
  if(data.resume){
    resumeLink.href = data.resume
  } else {
    resumeLink.style.display = 'none'
  }

  // Remove any leftover default contact paragraph that says "If you'd like to reach me" or contains a placeholder email
  // This ensures old placeholder text like "you@example.com" is removed if it exists in the page.
  try{
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
    const toRemove = []
    while(walker.nextNode()){
      const el = walker.currentNode
      if(el.children.length === 0 && el.textContent){
        const txt = el.textContent.trim()
        if(/If you'?d like to reach me/i.test(txt) || /you@example\.com/i.test(txt)){
          toRemove.push(el)
        }
      }
    }
    toRemove.forEach(n=>n.remove())
  }catch(e){
    // non-fatal
    console.warn('cleanup:', e)
  }

  // Contact Button Functionality
  const btn = document.getElementById('contactBtn')
  btn.addEventListener('click', function() {
    const mailtoLink = 'mailto:jalpanakum91@gmail.com?subject=Hello%20from%20your%20site&body=Hi%20Darshan%20Chopda%2C%0D%0A%0D%0AI%20saw%20your%20CV%20and%20would%20like%20to%20connect.'
    window.location.href = mailtoLink
  })

  // Email link is now a direct mailto link in HTML
  } catch (error) {
    console.error('Error in DOM manipulation:', error);
  }
}

document.addEventListener('DOMContentLoaded', populateContent);

// Also try to run immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateContent);
} else {
  populateContent();
}
