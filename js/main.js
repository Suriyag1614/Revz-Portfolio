/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('side-bar'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close'),
    navLink = document.querySelectorAll('.nav__link');

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar');
    })
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar');
    })
}
navLink.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar');
    });
});

/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll("[data-target"),
    tabcontent = document.querySelectorAll('[data-content');

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabcontent.forEach(tabcontents => {
            tabcontents.classList.remove("skills__active")
        })
        target.classList.add("skills__active")

        tabs.forEach(tab => {
            tab.classList.remove("skills__active")
        })
        tab.classList.add("skills__active")
    })
})

/*===== LOAD CUSTOM PROJECTS FROM LOCALSTORAGE =====*/
function loadCustomProjects() {
    // Clear old custom cards first to prevent duplication on re-render
    document.querySelectorAll('.custom-project-card').forEach(card => card.remove());

    const customProjects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
    const container = document.querySelector('.work__container');

    if (container) {
        customProjects.forEach(project => {
            const projectCard = `
                <div class="work__card mix ${project.category} custom-project-card" data-id="${project.id}">
                    <img src="${project.image}" alt="${project.name}" class="work__img">
                    <h3 class="work__title">${project.name}</h3>
                    <span class="work__button">Demo
                        <i class="uil uil-arrow-right work__button-icon"></i>
                    </span>
                    <div class="portfolio__item-details" style="display: none;">
                        <h3 class="details__title">${project.name}</h3>
                        <p class="detail__description">${project.description}</p>
                        ${project.link ? `
                        <ul class="detail__info">
                            <li>Link - <span><a href="${project.link}" target="_blank">${project.link}</a></span></li>
                        </ul>
                        ` : ''}
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', projectCard);
        });
    }
}

// Load dynamic custom projects before initializing MixItUp
loadCustomProjects();

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
    linkWork.forEach(x => x.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(x => x.addEventListener("click", activeWork))

/*===== Work Popup =====*/
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("work__button")) {
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector(".portfolio__popup").classList.toggle("open");
}
document.querySelector('.portfolio__popup-close').addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".work__img").src;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".work__title").innerHTML;
    document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__button"),
    modalCloses = document.querySelectorAll(".services__modal-close");

/*  modal függvény létrehozása */
let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");

    modalViews[modalClick].addEventListener("click", function (e) {
        if (e.target === this) {
            closeModal(modalClick);
        }
    });
};

/* a closeModal függvény létrehozása */
let closeModal = function (modalClick) {
    modalViews[modalClick].classList.remove("active-modal");
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose, i) => {
    modalClose.addEventListener("click", () => {
        closeModal(i);
    });
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonials__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        567: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    }
});

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove('focus');
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 30,
            sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

/*=============== SHOW SCROLL UP ===============*/

/*=============== CONTACT FORM SUBMISSION (Direct mailto) ===============*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop page reload

        // 1. Get input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // 2. Format email subject and body
        const subject = encodeURIComponent(`New Portfolio Message from ${name}`);
        const body = encodeURIComponent(
            `Hi Revan,\n\nYou have received a new message from your portfolio site:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}\n\n` +
            `Best regards,\n${name}`
        );

        // 3. Open native email client with pre-filled details
        window.location.href = `mailto:revanjoshh@gmail.com?subject=${subject}&body=${body}`;

        // 4. Reset the form inputs
        contactForm.reset();

        // 5. Reset floating label styling
        const inputContainers = document.querySelectorAll('.input__container');
        inputContainers.forEach(container => {
            container.classList.remove('focus');
        });
    });
}

/*=============== ADMIN PANEL MODAL & ADD PROJECTS LOGIC ===============*/
const adminModal = document.getElementById('adminModal'),
    adminDashboardBtn = document.getElementById('adminDashboardBtn'),
    closeAdminModal = document.getElementById('closeAdminModal'),
    addProjectTrigger = document.getElementById('addProjectTrigger'),
    btnBackToAdmin = document.getElementById('btnBackToAdmin'),
    adminMainView = document.getElementById('adminMainView'),
    adminFormView = document.getElementById('adminFormView'),
    addProjectForm = document.getElementById('addProjectForm'),
    projImage = document.getElementById('projImage'),
    imageDropzone = document.getElementById('imageDropzone'),
    imagePreview = document.getElementById('imagePreview'),
    imagePreviewContainer = document.getElementById('imagePreviewContainer'),
    removePreviewBtn = document.getElementById('removePreviewBtn'),
    adminToast = document.getElementById('adminToast'),
    projDesign = document.getElementById('projDesign'),
    linkFieldContainer = document.getElementById('linkFieldContainer'),
    projLink = document.getElementById('projLink');

let base64ImageString = ""; // Stores base64 data URL representation of project image
let editingProjectId = null; // Tracks custom project currently being edited

// Open Admin Modal & Render the Project List
if (adminDashboardBtn) {
    adminDashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        adminModal.classList.add('active-modal');
        renderAdminProjects();
    });
}

// Close Admin Modal
if (closeAdminModal) {
    closeAdminModal.addEventListener('click', () => {
        closeAdminPanel();
    });
}

if (adminModal) {
    adminModal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeAdminPanel();
        }
    });
}

function closeAdminPanel() {
    adminModal.classList.remove('active-modal');
    // Reset to main dashboard option panel with transition delay
    setTimeout(() => {
        adminMainView.classList.remove('admin__view-hidden');
        adminFormView.classList.add('admin__view-hidden');
        resetProjectForm();
    }, 400);
}

// Switch view from dashboard select card to Add Project Form
if (addProjectTrigger) {
    addProjectTrigger.addEventListener('click', () => {
        adminMainView.classList.add('admin__view-hidden');
        adminFormView.classList.remove('admin__view-hidden');
    });
}

if (btnBackToAdmin) {
    btnBackToAdmin.addEventListener('click', () => {
        adminMainView.classList.remove('admin__view-hidden');
        adminFormView.classList.add('admin__view-hidden');
        resetProjectForm();
    });
}

// Category change listener to toggle Project Link field
if (projDesign && linkFieldContainer) {
    projDesign.addEventListener('change', () => {
        if (projDesign.value === 'web' || projDesign.value === 'app') {
            linkFieldContainer.classList.remove('admin__view-hidden');
        } else {
            linkFieldContainer.classList.add('admin__view-hidden');
            if (projLink) projLink.value = '';
        }
    });
}

// Drag & Drop File upload
if (projImage) {
    projImage.addEventListener('change', function (e) {
        const file = e.target.files[0];
        handleImageFile(file);
    });
}

if (imageDropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
        imageDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            imageDropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        imageDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            imageDropzone.classList.remove('dragover');
        }, false);
    });

    imageDropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleImageFile(file);
    });
}

function handleImageFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            base64ImageString = reader.result;
            imagePreview.src = base64ImageString;
            imagePreviewContainer.classList.remove('admin__preview-hidden');
        }
    }
}

if (removePreviewBtn) {
    removePreviewBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid opening browse dialog
        e.preventDefault();
        projImage.value = "";
        base64ImageString = "";
        imagePreview.src = "";
        imagePreviewContainer.classList.add('admin__preview-hidden');
    });
}

function resetProjectForm() {
    addProjectForm.reset();
    projImage.value = "";
    base64ImageString = "";
    imagePreview.src = "";
    imagePreviewContainer.classList.add('admin__preview-hidden');
    if (linkFieldContainer) linkFieldContainer.classList.add('admin__view-hidden');
    
    // Reset edit state variables
    editingProjectId = null;
    if (projImage) projImage.required = true;

    // Reset heading & submit buttons
    const formTitle = document.querySelector('#adminFormView .admin__box-title');
    if (formTitle) formTitle.innerText = "Add New Project";

    const submitBtn = document.querySelector('#addProjectForm button[type="submit"]');
    if (submitBtn) submitBtn.innerHTML = '<i class="uil uil-plus button__icon"></i> Add Project';
}

// Admin Form Submission Setup
if (addProjectForm) {
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('projName').value.trim();
        const category = document.getElementById('projDesign').value;
        const description = document.getElementById('projDesc').value.trim();
        const link = (category === 'web' || category === 'app') ? document.getElementById('projLink').value.trim() : '';

        if (!base64ImageString) {
            alert("Please upload a project image!");
            return;
        }

        let customProjects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];

        if (editingProjectId !== null) {
            // Update existing project
            customProjects = customProjects.map(project => {
                if (project.id === editingProjectId) {
                    return {
                        ...project,
                        name: name,
                        category: category,
                        image: base64ImageString,
                        description: description,
                        link: link
                    };
                }
                return project;
            });
            localStorage.setItem('portfolio_projects', JSON.stringify(customProjects));
            document.querySelector('.admin__toast-msg').innerText = "Project updated successfully!";
        } else {
            // Create new project details
            const newProject = {
                id: Date.now(),
                name: name,
                category: category,
                image: base64ImageString,
                description: description,
                link: link
            };
            customProjects.push(newProject);
            localStorage.setItem('portfolio_projects', JSON.stringify(customProjects));
            document.querySelector('.admin__toast-msg').innerText = "Project added successfully!";
        }

        // Refresh dynamic UI elements
        loadCustomProjects();
        refreshMixer();
        renderAdminProjects();

        // Show Success Toast
        showSuccessToast();

        // Close and clean
        closeAdminPanel();
    });
}

function showSuccessToast() {
    adminToast.classList.add('toast-active');
    setTimeout(() => {
        adminToast.classList.remove('toast-active');
    }, 3000);
}

// Re-index MixItUp dynamically
function refreshMixer() {
    if (typeof mixerPortfolio !== 'undefined' && mixerPortfolio) {
        mixerPortfolio.destroy();
    }

    mixerPortfolio = mixitup('.work__container', {
        selectors: {
            target: '.work__card'
        },
        animation: {
            duration: 300
        }
    });
}

// Render dynamic custom project list in the Admin panel main view
function renderAdminProjects() {
    const adminProjectsList = document.getElementById('adminProjectsList');
    if (!adminProjectsList) return;

    const customProjects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];

    if (customProjects.length === 0) {
        adminProjectsList.innerHTML = `<div class="admin__no-projects">No custom projects added yet.</div>`;
        return;
    }

    adminProjectsList.innerHTML = customProjects.map(project => `
        <div class="admin__project-item">
            <div class="admin__project-info">
                <img src="${project.image}" alt="${project.name}" class="admin__project-thumb">
                <div class="admin__project-meta">
                    <span class="admin__project-name">${project.name}</span>
                    <span class="admin__project-category">${project.category}</span>
                </div>
            </div>
            <div class="admin__project-actions">
                <button type="button" class="admin__action-btn admin__action-btn-edit" onclick="editProject(${project.id})">
                    <i class="uil uil-pen"></i>
                </button>
                <button type="button" class="admin__action-btn admin__action-btn-delete" onclick="deleteProject(${project.id})">
                    <i class="uil uil-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Edit custom project action
function editProject(id) {
    const customProjects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
    const project = customProjects.find(p => p.id === id);
    if (!project) return;

    // Set edit mode states
    editingProjectId = id;

    // Populate inputs
    document.getElementById('projName').value = project.name;
    document.getElementById('projDesign').value = project.category;
    document.getElementById('projDesc').value = project.description;

    // Toggle link field visibility
    if (project.category === 'web' || project.category === 'app') {
        if (linkFieldContainer) linkFieldContainer.classList.remove('admin__view-hidden');
        if (projLink) projLink.value = project.link || '';
    } else {
        if (linkFieldContainer) linkFieldContainer.classList.add('admin__view-hidden');
        if (projLink) projLink.value = '';
    }

    // Populate Preview Image
    base64ImageString = project.image;
    imagePreview.src = project.image;
    imagePreviewContainer.classList.remove('admin__preview-hidden');

    // Make file input optional since we already have an image
    if (projImage) projImage.required = false;

    // Modify Form UI Headings/Buttons
    const formTitle = document.querySelector('#adminFormView .admin__box-title');
    if (formTitle) formTitle.innerText = "Edit Project";

    const submitBtn = document.querySelector('#addProjectForm button[type="submit"]');
    if (submitBtn) submitBtn.innerHTML = '<i class="uil uil-save button__icon"></i> Save Changes';

    // Transition views inside modal
    adminMainView.classList.add('admin__view-hidden');
    adminFormView.classList.remove('admin__view-hidden');
}

// Delete custom project action
function deleteProject(id) {
    if (confirm("Are you sure you want to delete this project?")) {
        let customProjects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
        customProjects = customProjects.filter(p => p.id !== id);
        localStorage.setItem('portfolio_projects', JSON.stringify(customProjects));

        // Reload views
        loadCustomProjects();
        refreshMixer();
        renderAdminProjects();

        // Show Toast
        document.querySelector('.admin__toast-msg').innerText = "Project removed successfully!";
        showSuccessToast();
    }
}

// Expose actions to global window context so inline click event listeners can access them
window.editProject = editProject;
window.deleteProject = deleteProject;

/*=============== PROJECTS CAROUSEL MODAL LOGIC ===============*/
const projectsModal = document.getElementById('projectsModal'),
    projectsBtn = document.getElementById('projectsBtn'),
    projectsFooterBtn = document.getElementById('projectsFooterBtn'),
    closeProjectsModal = document.getElementById('closeProjectsModal');

// Open Projects Modal from Sidebar
if (projectsBtn) {
    projectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (projectsModal) {
            projectsModal.classList.add('active-modal');
            populateProjectsCarousel();
        }
    });
}

// Open Projects Modal from Footer
if (projectsFooterBtn) {
    projectsFooterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (projectsModal) {
            projectsModal.classList.add('active-modal');
            populateProjectsCarousel();
        }
    });
}

// Close Projects Modal
if (closeProjectsModal) {
    closeProjectsModal.addEventListener('click', () => {
        if (projectsModal) projectsModal.classList.remove('active-modal');
    });
}

if (projectsModal) {
    projectsModal.addEventListener('click', function (e) {
        if (e.target === this) {
            projectsModal.classList.remove('active-modal');
        }
    });
}

// Populates and Initializes Swiper Projects Slider
function populateProjectsCarousel() {
    const slidesWrapper = document.querySelector('#projectsModal .swiper-wrapper');
    if (!slidesWrapper) return;

    slidesWrapper.innerHTML = ''; // Clear previous slides

    // Gather all currently loaded project cards
    const cards = document.querySelectorAll('.work__container .work__card');

    cards.forEach(card => {
        const imgElement = card.querySelector('.work__img');
        const titleElement = card.querySelector('.work__title');
        
        if (!imgElement || !titleElement) return;

        const img = imgElement.src;
        const title = titleElement.innerText;

        // Get details if available
        const details = card.querySelector('.portfolio__item-details');
        const desc = details ? details.querySelector('.detail__description').innerText : 'No project description details are available for this portfolio piece.';
        const linkElement = details ? details.querySelector('.detail__info a') : null;
        const link = linkElement ? linkElement.href : null;

        const slideHTML = `
            <div class="swiper-slide">
                <div class="work__card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 0.75rem; background-color: rgba(255, 255, 255, 0.01);">
                    <div>
                        <img src="${img}" alt="${title}" class="work__img" style="border-radius: 0.5rem; margin-bottom: 1rem; width: 100%; height: 180px; object-fit: cover;">
                        <h3 class="work__title" style="font-size: var(--normal-font-size); margin-bottom: 0.5rem; text-align: left;">${title}</h3>
                        <p style="font-size: var(--smaller-font-size); color: var(--text-color); margin-bottom: 1rem; line-height: 1.5; text-align: left; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${desc}</p>
                    </div>
                    ${link ? `
                    <a href="${link}" target="_blank" class="button" style="padding: 0.6rem 1rem; font-size: var(--small-font-size); display: inline-flex; justify-content: center; column-gap: 0.25rem; align-items: center; width: 100%;">
                        <i class="uil uil-external-link-alt"></i> View Demo
                    </a>
                    ` : ''}
                </div>
            </div>
        `;
        slidesWrapper.insertAdjacentHTML('beforeend', slideHTML);
    });

    // Initialize/Update Swiper Slider
    if (window.projectsSwiper) {
        window.projectsSwiper.update();
    } else {
        window.projectsSwiper = new Swiper('.projects__slider', {
            spaceBetween: 24,
            grabCursor: true,
            pagination: {
                el: '#projectsModal .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#projectsModal .swiper-button-next',
                prevEl: '#projectsModal .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
}
