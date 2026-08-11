const projectImages = {
    'Shop in 3D': 'images/ShopIn3D_Menus2.gif',
    'Project Mio': 'images/ProjectMio1.jpg',
    'Terra Mine Diver': 'images/TerraMineDiver1.jpg',
    'CSO Showreel': 'images/CSOStudio_SizzleReel_June302023a051.jpg',
    'Microsoft Commute Poster': 'images/MS_ConnectorPoster1.png',
    'Meet the Makers Campaign': 'images/MeetTheMakers1.gif',
    'Virtual Store': 'images/VirtualStore1.gif',
    'Synergy Grant Quiz': 'images/SynergyQuizPhone1.jpg',
    'Optic8 Website': 'images/Optic8_Site1.jpg',
    'Picchu': 'images/PicchuRender1.jpg',
    'Trilogy Studios Website': 'images/TrilogySite1.jpg',
    'Motion Graphics Reel': 'images/MotionReel_Poster1.jpg',
    'Content Block Builder': 'images/ContentBlockBuilder_Render1.jpg',
    'Microsoft Web Framework': 'images/Moray4.gif',
    'Teams Holiday Background': 'images/BirdRoomTest13.jpg',
    'Proactive Chat Invite': 'images/ProChat1.jpg',
    'Fluent Icon Refresh': 'images/FluentIcons2.gif',
    '8-Bit Takeover': 'images/8Bit_Render1.png',
    'Back to the Future Takeover': 'images/BTTF_Render1.jpg',
    'Tether': 'images/TetherPhone1.gif',
    'Xbox Gift Card': 'images/GiftCard1.jpg',
    'Simplified Office': 'images/SimplifiedOffice1.jpg',
    'Microsoft Complete Rebrand': 'images/CompleteLogo_OneSheet1.png',
    'Chatbot Redesign': 'images/ChatbotCompare1.jpg',
    'Value Prop Glyphs': 'images/ValueProps1.jpg',
    'Microsoft Holiday Campaign': 'images/3D_Holiday_Landscape_SledBox5.jpg',
    'Microsoft Pride Campaign': 'images/PridePins3.jpg',
    'This is Our Story': 'images/GLC_Documentary1.jpg',
    'GLC Design Makeover': 'images/GLC_Redesign1.jpg',
    'Great Lakes Church Signage': 'images/BuildingSignage1.jpg',
    '#staymarried': 'images/StaymarriedSocial1.jpg',
    'Eco Packaging Concept': 'images/EcoPackaging1.jpg',
    'Mailers & Invites': 'images/Invites1.jpg'
};

const projectVideos = {
    'Meet the Makers Campaign': 'videos/MeetTheMakers_Chapter1.mp4',
    'Back to the Future Takeover': 'videos/BackToTheFuture1.mp4',
    'Chatbot Redesign': 'videos/ChatbotLogoAnims1.mp4',
    'CSO Showreel': 'videos/CSOStudio_SizzleReel_June302023a.mp4',
    'Xbox Gift Card': 'videos/GiftCardAnimation1_1106_1920x1080_EN-US.mp4',
    '8-Bit Takeover': 'videos/Microsoft8BitDay1.mp4',
    'Optic8 Website': 'videos/Optic8_Site1.mp4',
    'Eco Packaging Concept': 'videos/PackagingAnim3.mp4',
    'Microsoft Pride Campaign': 'videos/Pride_ButtonAnimBumper8.mp4',
    'Project Mio': 'videos/ProjectMioOverview.mp4',
    'Simplified Office': 'videos/SimplifiedOfficeDemo.mp4',
    'Virtual Store': 'videos/SurfaceHelpMe_Conversational_2up.mp4',
    'Terra Mine Diver': 'videos/TerraMineDiver_Gamepaly1.mp4',
    'Motion Graphics Reel': 'videos/TonyPeterson_MotionGraphicsReel1.mp4',
    'Trilogy Studios Website': 'videos/Trilogy_Site1.mp4'
};

document.addEventListener('DOMContentLoaded', async () => {
    const body = document.body;
    const grid = document.querySelector('.dashboard-grid');
    const buttons = document.querySelectorAll('.tab-btn');

    let dashboardData = null;

    try {
        const response = await fetch('dashboard-content.json');
        dashboardData = await response.json();
        window.portfolioData = dashboardData.portfolio;

        const initialHash = window.location.hash.replace('#', '');
        const initialTab = (initialHash && ['about', 'portfolio', 'arcade', 'contact'].includes(initialHash)) ? initialHash : 'about';
        switchTab(initialTab);
    } catch (error) {
        console.error("Failed to load dashboard content:", error);
    }

    function populateContent(tabName) {
        if (!dashboardData || !dashboardData[tabName]) return;

        const data = dashboardData[tabName];

        Object.keys(data).forEach(key => {
            const elements = document.querySelectorAll(`[data-content="${key}"]`);
            elements.forEach(el => {
                const value = data[key];
                if (el.tagName === 'IMG') {
                    if (value) {
                        el.src = value;
                        el.style.display = 'block';
                    } else {
                        el.style.display = 'none';
                    }
                } else if (key === 'quote-text-html') {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            });
        });
    }

    const projectList = document.getElementById('project-list');
    if (projectList && dashboardData && dashboardData.portfolio && dashboardData.portfolio.projects) {
        projectList.innerHTML = '';
        projectList.style.position = 'relative';

        const chevron = document.createElement('div');
        chevron.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="12" x2="18" y2="12"></line><polyline points="11 5 18 12 11 19"></polyline></svg>';
        chevron.classList.add('project-chevron');
        projectList.appendChild(chevron);

        let activeLi = null;

        dashboardData.portfolio.projects.forEach((proj, i) => {
            if (!proj.title) return;
            const li = document.createElement('li');
            li.textContent = proj.title;
            li.classList.add('project-list-item');

            li.addEventListener('mouseenter', () => {
                if (activeLi !== li) li.classList.add('hovered');
            });
            li.addEventListener('mouseleave', () => {
                if (activeLi !== li) li.classList.remove('hovered');
            });

            li.addEventListener('click', () => {
                if (activeLi) {
                    activeLi.classList.remove('active');
                    activeLi.classList.remove('hovered');
                }
                activeLi = li;
                li.classList.add('active');

                chevron.classList.add('visible');
                chevron.style.top = (li.offsetTop + 9) + 'px';


                if (window.innerWidth > 768) {
                    li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                const bioTitle = document.querySelector('.view-portfolio [data-content="bio-title"]');
                const bioText = document.querySelector('.view-portfolio [data-content="bio-text"]');
                const projContent = document.getElementById('portfolio-project-content');
                const toolsContainer = document.getElementById('portfolio-tools-container');
                const whatIDidContainer = document.getElementById('portfolio-what-i-did-container');
                const roleContainer = document.getElementById('portfolio-role-container');
                const didYouKnowContainer = document.getElementById('portfolio-did-you-know-container');
                const linksContainer = document.getElementById('portfolio-links-container');
                const wireframeImg = document.querySelector('.view-portfolio .wireframe-img');

                const changingGridItems = document.querySelectorAll('.dashboard-grid > section:not(.box-area-e):not(nav):not(.box-area-j)');
                const isTabSwitching = window._isTabSwitching;

                const changingViews = [];
                if (!isTabSwitching) {
                    changingGridItems.forEach(item => {
                        const view = item.querySelector('.view-portfolio');
                        if (view) {
                            view.style.transitionDelay = '0s';
                            view.classList.remove('view-portfolio');
                            changingViews.push(view);
                        }
                    });
                }

                setTimeout(() => {
                    bioTitle.textContent = proj.title;
                    bioText.style.display = 'none';
                    projContent.style.display = 'block';
                    projContent.innerHTML = proj.hook;

                    const boxAreaC = document.querySelector('.box-area-c');

                    const oldButtons = boxAreaC.querySelector('.action-buttons-container');
                    if (oldButtons) oldButtons.remove();

                    let buttonsHTML = '<div class="action-buttons-container">';
                    if (proj.hype) {
                        buttonsHTML += `<button class="action-btn hover-trigger" data-key="hype">The Impact</button>`;
                    }
                    if (proj['behind-the-scenes']) {
                        buttonsHTML += `<button class="action-btn hover-trigger" data-key="behind-the-scenes">Behind the Scenes</button>`;
                    }
                    buttonsHTML += '</div>';

                    if (proj.hype || proj['behind-the-scenes']) {
                        boxAreaC.insertAdjacentHTML('beforeend', buttonsHTML);
                    }

                    const tooltip = document.getElementById('project-tooltip');

                    if (tooltip) {
                        boxAreaC.querySelectorAll('.hover-trigger').forEach(btn => {
                            btn.addEventListener('mouseenter', (e) => {
                                const key = e.target.getAttribute('data-key');
                                tooltip.innerHTML = proj[key];
                                
                                tooltip.classList.add('visible');
                                
                                const btnRect = e.target.getBoundingClientRect();
                                const tooltipRect = tooltip.getBoundingClientRect();
                                
                                let topPos = btnRect.top - tooltipRect.height - 24; 
                                let leftPos = btnRect.right - tooltipRect.width;    
                                
                                if (topPos < 10) topPos = 10;
                                if (leftPos < 10) leftPos = 10;
                                
                                tooltip.style.top = `${topPos}px`;
                                tooltip.style.left = `${leftPos}px`;
                            });

                            btn.addEventListener('mouseleave', () => {
                                tooltip.classList.remove('visible');
                            });
                        });
                    }

                    if (toolsContainer) {
                        toolsContainer.innerHTML = proj.tools || '';
                    }

                    if (whatIDidContainer) {
                        whatIDidContainer.innerHTML = proj.hustle || '';
                    }

                    if (roleContainer) {
                        roleContainer.innerHTML = proj.role || '';
                    }

                    if (didYouKnowContainer) {
                        didYouKnowContainer.innerHTML = proj['did-you-know'] || '';
                    }

                    if (linksContainer) {
                        linksContainer.innerHTML = '';
                        if (proj.links && proj.links.length > 0) {
                            proj.links.forEach(link => {
                                const a = document.createElement('a');
                                a.href = link.url;
                                a.textContent = link.text + ' ›';
                                a.target = '_blank';
                                a.classList.add('portfolio-link-item');

                                linksContainer.appendChild(a);
                            });
                        }
                    }

                    if (wireframeImg) {
                        const imgSrc = projectImages[proj.title];
                        const vidSrc = projectVideos[proj.title];

                        if (vidSrc) {
                            wireframeImg.setAttribute('data-video', vidSrc);
                        } else {
                            wireframeImg.removeAttribute('data-video');
                        }

                        if (imgSrc) {
                            wireframeImg.src = imgSrc;
                            wireframeImg.style.display = 'block';
                        } else {
                            wireframeImg.style.display = 'none';
                        }
                    }

                    if (!isTabSwitching) {
                        applyRandomStagger(changingViews);
                        
                        void document.body.offsetHeight;

                        changingViews.forEach(view => {
                            view.classList.add('view-portfolio');
                        });
                    }
                }, isTabSwitching ? 0 : 600);
            });

            projectList.appendChild(li);

            if (i === 0) {
                setTimeout(() => {
                    li.click();
                }, 50);
            }
        });
    }

    const arcadeListContainer = document.querySelector('.box-area-e .view-arcade');
    let arcadeList = document.getElementById('arcade-list');
    if (!arcadeList && arcadeListContainer) {
        arcadeListContainer.innerHTML = '';
        arcadeList = document.createElement('ul');
        arcadeList.id = 'arcade-list';
        arcadeList.classList.add('project-list');
        arcadeListContainer.appendChild(arcadeList);
        arcadeListContainer.classList.add('scrollable-list-content');
    }

    if (arcadeList && dashboardData && dashboardData.arcade && dashboardData.arcade.games) {
        arcadeList.innerHTML = '';
        arcadeList.style.position = 'relative';

        const arcadeChevron = document.createElement('div');
        arcadeChevron.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="12" x2="18" y2="12"></line><polyline points="11 5 18 12 11 19"></polyline></svg>';
        arcadeChevron.classList.add('project-chevron');
        arcadeList.appendChild(arcadeChevron);

        let activeArcadeLi = null;

        dashboardData.arcade.games.forEach((game, i) => {
            if (!game.title) return;
            const li = document.createElement('li');
            li.textContent = game.title;
            li.classList.add('project-list-item');

            li.addEventListener('mouseenter', () => {
                if (activeArcadeLi !== li) li.classList.add('hovered');
            });
            li.addEventListener('mouseleave', () => {
                if (activeArcadeLi !== li) li.classList.remove('hovered');
            });

            li.addEventListener('click', () => {
                if (activeArcadeLi) {
                    activeArcadeLi.classList.remove('active');
                    activeArcadeLi.classList.remove('hovered');
                }
                activeArcadeLi = li;
                li.classList.add('active');

                arcadeChevron.classList.add('visible');
                arcadeChevron.style.top = (li.offsetTop + 9) + 'px';

                if (window.innerWidth > 768) {
                    li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                window._activeArcadeUrl = game.url;

                const boxAreaCView = document.querySelector('.box-area-c .view-arcade');
                const boxAreaAView = document.querySelector('.box-area-a .view-arcade');
                const arcadeWhyContainer = document.getElementById('arcade-why-container');
                
                const isTabSwitching = window._isTabSwitching;

                setTimeout(() => {
                    if (boxAreaCView) {
                        boxAreaCView.innerHTML = `
                            <h2 class="bento-heading-secondary">${game.title}</h2>
                            <div class="project-content-container" style="display: block;">
                                <p>${game.pitch || ''}</p>
                            </div>
                        `;
                    }
                    if (arcadeWhyContainer) {
                        arcadeWhyContainer.innerHTML = `<p>${game.intention || ''}</p>`;
                    }
                    if (boxAreaAView) {
                        let img = boxAreaAView.querySelector('.wireframe-img');
                        if (!img) {
                            boxAreaAView.innerHTML = '';
                            img = document.createElement('img');
                            img.classList.add('wireframe-img');
                            img.style.display = 'block';
                            img.style.cursor = 'pointer';
                            boxAreaAView.appendChild(img);
                        }
                        img.src = game.image || 'images/placeholder.jpg';
                        img.style.display = 'block';
                    }
                }, isTabSwitching ? 0 : 600);
            });

            arcadeList.appendChild(li);

            if (i === 0) {
                setTimeout(() => {
                    li.click();
                }, 50);
            }
        });
    }

    function updateBentoLabels(tabName) {
        const portfolioLabels = {
            'box-area-d': 'links',
            'box-area-e': 'projects',
            'box-area-f': 'role',
            'box-area-g': 'what i did',
            'box-area-h': 'tools i used',
            'box-area-i': 'did you know'
        };

        const aboutLabels = {
            'box-area-d': 'socials',
            'box-area-e': 'quote',
            'box-area-f': 'links',
            'box-area-g': 'soft skills',
            'box-area-h': 'hard skills',
            'box-area-i': 'did you know'
        };

        document.querySelectorAll('.bento-label').forEach(labelEl => {
            const parent = labelEl.parentElement;
            const tileClass = Array.from(parent.classList).find(cls => cls.startsWith('box-area-'));

            if (!tileClass) return;

            if (tabName === 'arcade' || tabName === 'contact') {
                if (tabName === 'arcade' && tileClass === 'box-area-e') {
                    labelEl.textContent = 'GAMES';
                } else {
                    labelEl.textContent = 'tbd';
                }
            } else if (tabName === 'about') {
                labelEl.textContent = aboutLabels[tileClass] || 'tbd';
            } else if (tabName === 'portfolio') {
                labelEl.textContent = portfolioLabels[tileClass] || 'tbd';
            }
        });
    }

    function switchTab(tabName) {
        const elementsToClear = document.querySelectorAll('.dashboard-grid > section, .dashboard-grid > nav, .stacked-content');
        elementsToClear.forEach(item => {
            item.style.transitionDelay = '0s';
        });

        grid.setAttribute('data-active-tab', 'switching');
        body.setAttribute('data-active-tab', 'switching');

        buttons.forEach(btn => {
            btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tabName);
        });

        setTimeout(() => {
            populateContent(tabName);
            updateBentoLabels(tabName);

            const orphanButtons = document.querySelector('.box-area-c .action-buttons-container');
            if (orphanButtons) {
                orphanButtons.remove();
            }

            if (tabName === 'portfolio') {
                const firstProject = document.querySelector('#project-list li');
                if (firstProject) {
                    window._isTabSwitching = true;
                    firstProject.click();
                    window._isTabSwitching = false;
                }
            }

            const elementsToStagger = document.querySelectorAll('.dashboard-grid > section, .dashboard-grid > nav, .stacked-content');
            applyRandomStagger(elementsToStagger);

            void document.body.offsetHeight;

            grid.setAttribute('data-active-tab', tabName);
            body.setAttribute('data-active-tab', tabName);

            history.pushState({ tab: tabName }, '', `#${tabName}`);
        }, 300);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    window.addEventListener('popstate', (event) => {
        const activeTab = event.state?.tab || window.location.hash.replace('#', '') || 'about';
        switchTab(activeTab);
    });

    const contactForm = document.getElementById('top-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            if (submitBtn) submitBtn.textContent = 'SENDING...';

            const formData = new FormData();

            const accessKey = document.querySelector('input[name="access_key"]');
            if (accessKey) formData.append('access_key', accessKey.value);

            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const msgInput = document.querySelector('textarea[name="message"]');

            if (nameInput) formData.append('name', nameInput.value);
            if (emailInput) formData.append('email', emailInput.value);
            if (msgInput) formData.append('message', msgInput.value);

            const subjectInput = document.querySelector('input[name="subject"]');
            const fromNameInput = document.querySelector('input[name="from_name"]');
            const replytoInput = document.querySelector('input[name="replyto"]');
            const botcheckInput = document.querySelector('input[name="botcheck"]');

            if (subjectInput) formData.append('subject', subjectInput.value);
            if (fromNameInput) formData.append('from_name', fromNameInput.value);
            if (replytoInput) formData.append('replyto', replytoInput.value);
            if (botcheckInput && botcheckInput.checked) formData.append('botcheck', botcheckInput.value);

            const hCaptchaResponse = document.querySelector('[name="h-captcha-response"]');
            if (hCaptchaResponse) {
                formData.append('h-captcha-response', hCaptchaResponse.value);
            }

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                if (response.ok) {
                    if (submitBtn) submitBtn.textContent = 'SENT!';
                    if (msgInput) msgInput.value = '';
                    if (nameInput) nameInput.value = '';
                    if (emailInput) emailInput.value = '';
                } else {
                    if (submitBtn) submitBtn.textContent = 'ERROR';
                    const result = await response.json();
                    console.error('Web3Forms Error:', result);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                if (submitBtn) submitBtn.textContent = 'ERROR';
            }
        });
    }

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalIframe = document.getElementById('modal-iframe');
    const modalCloseBtn = document.querySelector('.modal-close');
    const boxAreaA = document.querySelector('.box-area-a');

    if (boxAreaA && modal && modalImg && modalVideo && modalCloseBtn) {
        boxAreaA.addEventListener('click', (e) => {
            const targetImg = e.target.closest('.view-portfolio .wireframe-img, .view-arcade .wireframe-img');
            if (!targetImg) return;
            
            const isArcade = targetImg.closest('.view-arcade') !== null;

            modalImg.style.display = 'none';
            modalVideo.style.display = 'none';
            if (modalIframe) modalIframe.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = "";
            if (modalIframe) modalIframe.src = "";

            if (isArcade) {
                if (window._activeArcadeUrl && modalIframe) {
                    modalIframe.src = window._activeArcadeUrl;
                    modalIframe.style.display = 'block';
                    modal.classList.add('active');
                }
            } else {
                const videoSrc = targetImg.getAttribute('data-video');
                if (videoSrc) {
                    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
                        let videoId = '';
                        if (videoSrc.includes('youtube.com/watch')) {
                            videoId = new URL(videoSrc).searchParams.get('v');
                        } else if (videoSrc.includes('youtu.be/')) {
                            videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
                        }

                        if (videoId && modalIframe) {
                            modalIframe.src = `https://www.youtube.com/embed/${videoId}`;
                            modalIframe.style.display = 'block';
                            modal.classList.add('active');
                        }
                    } else {
                        modalVideo.style.display = 'block';
                        modalVideo.src = videoSrc;
                        modalVideo.play();
                        modal.classList.add('active');
                    }
                } else if (targetImg.src) {
                    modalImg.style.display = 'block';
                    modalImg.src = targetImg.src;
                    modal.classList.add('active');
                }
            }
        });

        function closeModal() {
            modal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = "";
            if (modalIframe) modalIframe.src = "";
        }

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    const boxAreaE = document.querySelector('.box-area-e');
    let idleTimer = null;

    function checkAndScrollActiveProject() {
        const activeProject = document.querySelector('#project-list li.active');
        if (!activeProject) return;

        const container = document.querySelector('.box-area-e .scrollable-list-content') || document.querySelector('.box-area-e');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const activeRect = activeProject.getBoundingClientRect();

        const isFullyVisible = (
            Math.floor(activeRect.top) >= Math.floor(containerRect.top) &&
            Math.ceil(activeRect.bottom) <= Math.ceil(containerRect.bottom)
        );

        if (!isFullyVisible) {
            if (window.innerWidth > 768) {
                activeProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(checkAndScrollActiveProject, 5000);
    }

    if (boxAreaE) {
        boxAreaE.addEventListener('mousemove', resetIdleTimer);
        boxAreaE.addEventListener('scroll', resetIdleTimer, true);
        boxAreaE.addEventListener('wheel', resetIdleTimer);
        boxAreaE.addEventListener('touchstart', resetIdleTimer);

        resetIdleTimer();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const minYear = 2000;
    const maxYear = 2026;
    const totalYears = maxYear - minYear;

    const jobs = [
        { 
            company: "DHL", role: "Customer Service Rep", start: 2000, end: 2004,
            details: [
                "Served as a customer service contract manager stationed directly onsite at Microsoft, acting as the primary logistics liaison between the two corporate giants.",
                "Handled high-level service communications and managed complex shipping logistics to ensure seamless operations for a massive enterprise client.",
                "Navigated daily operational challenges and tracked critical deliveries, keeping the corporate supply chain moving without a hitch."
            ]
        },
        { 
            company: "Link Conference Service", role: "Web Development Assistant", start: 2004, end: 2005,
            details: [
                "Designed and maintained both the public-facing and internal company websites to ensure a seamless digital presence.",
                "Built interactive marketing presentations and managed all print materials for trade shows and direct mailers.",
                "Engineered online sales forms and developed client care reporting macros using SQL and .NET to streamline internal workflows."
            ]
        },
        { 
            company: "Eastlake Community Church", role: "Media Director", start: 2005, end: 2008,
            details: [
                "Managed the end-to-end creation of graphic elements, web development, and video production to support both weekly services and broader marketing initiatives.",
                "Produced and edited a massive volume of video components, ranging from motion graphics to personal testimonies, to elevate the visual narrative of the organization.",
                "Handled the technical execution and live media setups to ensure seamless, high-quality presentations for weekly services."
            ]
        },
        { 
            company: "Great Lakes Church", role: "Media Director", start: 2008, end: 2011,
            details: [
                "Owned the entire creative pipeline, managing all graphic design, video production, and web development from concept to final delivery.",
                "Designed and deployed massive outreach campaigns targeting 50,000 local households, intentionally dropping the alienating jargon for a transparent visual strategy that actually drove community engagement.",
                "Shot, directed, edited, and produced a 45-minute documentary chronicling the unconventional origins of the organization, wrangling a team of volunteers to help capture the story over a six-month production schedule."
            ]
        },
        { 
            company: "Timberlake Church", role: "Executive Director of Arts", start: 2011, end: 2012,
            details: [
                "Served on the executive board to guide high-level organizational strategy and make critical structural decisions.",
                "Led a six-person creative department consisting of four full-time staff and two interns. I managed the entire output pipeline, overseeing all graphics, video production, web development, environmental signage, and digital communications.",
                "Directed the technical crew and musicians to build welcoming, high-energy environments. We consistently delivered engaging live experiences across five weekly services for an audience of 3,000 members and guests."
            ]
        },
        {
            company: "Microsoft", role: "Marcom & UX/UI Designer", start: 2012, end: 2017,
            details: [
                "Spearheaded the evolution of the microsoft.com design system, unifying the user aesthetic across core properties including Xbox, Skype, HoloLens, and Office through rigorous UX research and heuristic validation.",
                "Conceptualized and crafted web graphics for over 40 marketing campaigns, leveraging this strong visual communication foundation to transition into a core UX Prototyper and Researcher role driving data-backed aesthetic decisions.",
                "Directed end-to-end UX/UI development as Design Lead for a tight-knit prototyping team, steering the research, testing, and dynamic presentations for specialized initiatives including the web app Tether and the video game Project Mio."
            ]
        },
        {
            company: "Great Lakes Church", role: "Executive Pastor of Creative Arts", start: 2017, end: 2018,
            details: [
                "Directed and executed over 400 design projects within a 14-month window. This included a comprehensive organizational rebrand, digital and print campaigns, and end-to-end web development for a massive website redesign.",
                "Managed the execution of eight weekly live services across two separate campuses, delivering highly polished presentations and video storytelling to a diverse audience of over 1,200 attendees.",
                "Served on the executive board and directly managed the personal development of 66 volunteers. I built tailored team management tools and provided one-on-one coaching to keep the creative pipeline moving without burning people out.",
                "Completely overhauled the interior wayfinding signage across both campus locations in three months, ensuring visitors could actually navigate the new spaces without needing a map."
            ]
        },
        {
            company: "Microsoft", role: "Lead Interaction Designer & Prototyper", start: 2018, end: 2025,
            details: [
                "Drove a 3% uplift in Surface hardware sales conversions by pioneering and developing Microsoft’s first 3D immersive e-commerce platform utilizing WebGL and Babylon.js.",
                "Increased customer engagement by 35% by orchestrating cross-functional creative collaboration to revamp core web experiences through elevated visual storytelling.",
                "Drastically reduced development cycles and design-to-engineering friction by delivering production-ready front-end code alongside high-fidelity visual assets."
            ]
        },
        {
            company: "SAP", role: "Lead UX & Visual Experience Designer", start: 2025, end: 2026,
            details: [
                "Spearheaded the UX and visual modernization of a global legacy architecture for the SAP Office of the CMO by redesigning data-dense B2B interfaces, resulting in highly scannable internal tools utilized daily by thousands of employees.",
                "Elevated the internal brand story and user experience by partnering directly with executive leadership to translate complex, ambiguous business requirements into polished, user-centric visual narratives."
            ]
        },
        {
            company: "Microsoft Digital", role: "Lead AI Comms Designer", start: 2026, end: 2026,
            details: [
                "Standardized visual design frameworks across Microsoft Digital by developing scalable graphic and email templates, resulting in strict brand consistency across internal campaigns executed by Program Managers.",
                "Accelerated cross-company adoption of emerging AI workflows by directing and producing a high-visibility motion graphics video series highlighting internal AI agent innovations.",
                "Optimized the internal design-to-delivery process by designing cohesive omni-channel assets spanning a centralized SharePoint hub to campus-wide physical marketing for the Microsoft Connector commute."
            ]
        },
        {
            company: "TOP Graphic Design Studio", role: "Freelance UX/UI Designer", start: 2008, end: 2026, isSpecial: true,
            details: [
                "Freelance multidisciplinary UX, UI, and visual design."
            ]
        }
    ];

    const ticksContainer = document.getElementById('ticks-container');
    const nodesContainer = document.getElementById('nodes-container');
    const detailBox = document.getElementById('detail-box');
    const detailTitle = document.getElementById('detail-title');
    const timelineModal = document.getElementById('timeline-modal');


    if (ticksContainer) {
        for (let year = minYear; year <= maxYear; year += 2) {
            const tick = document.createElement('div');
            tick.className = 'tick';
            tick.innerText = year;
            ticksContainer.appendChild(tick);
        }
    }

    if (nodesContainer) {
        jobs.forEach((job) => {
            const node = document.createElement('div');
            node.className = 'job-node';

            if (job.start >= 2024 && !job.isSpecial) {
                node.classList.add('flip-label');
            }

            const startPercent = ((job.start - minYear) / totalYears) * 100;
            const durationPercent = ((job.end - job.start) / totalYears) * 100;

            const label = document.createElement('div');
            label.className = 'job-label';
            label.innerHTML = `<h4>${job.company}</h4><p>${job.role}</p>`;
            node.appendChild(label);

            if (job.isSpecial) {
                node.classList.add('special-node');

                node.style.left = `calc(100% + 16px)`;
                node.style.width = `var(--timeline-special-dot-size)`;

                node.addEventListener('mouseenter', () => {
                    node.style.left = `calc(${startPercent}% + 16px)`;
                    node.style.width = `calc(${durationPercent}% + 30px)`;
                });

                node.addEventListener('mouseleave', () => {
                    node.style.left = `calc(100% + 16px)`;
                    node.style.width = `var(--timeline-special-dot-size)`;
                });
            } else if (job.start === job.end) {
                node.style.left = `${startPercent}%`;
                node.style.width = `var(--timeline-dot-size)`;

                node.addEventListener('mouseenter', () => {
                    node.style.width = `var(--timeline-dot-size)`;
                });

                node.addEventListener('mouseleave', () => {
                    node.style.width = `var(--timeline-dot-size)`;
                });
            } else {
                node.style.left = `${startPercent}%`;
                node.style.width = `var(--timeline-dot-size)`;

                node.addEventListener('mouseenter', () => {
                    node.style.width = `calc(${durationPercent}% - 4px)`;
                });

                node.addEventListener('mouseleave', () => {
                    node.style.width = `var(--timeline-dot-size)`;
                });
            }

            node.addEventListener('click', (e) => {
                detailTitle.innerText = `${job.company} - ${job.role}`;

                const descEl = document.getElementById('detail-desc');
                if (job.details && job.details.length > 0) {
                    const ul = document.createElement('ul');
                    ul.style.paddingLeft = '20px';
                    ul.style.margin = '0';
                    job.details.forEach(detail => {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        li.style.marginBottom = '8px';
                        li.style.fontSize = '0.9rem';
                        ul.appendChild(li);
                    });
                    descEl.innerHTML = '';
                    descEl.appendChild(ul);
                } else {
                    descEl.innerHTML = '<p style="font-size: 0.9rem; margin: 0;">No additional details available.</p>';
                }

                let boxX = e.clientX + 15;
                let boxY = e.clientY + 15;

                detailBox.classList.remove('shift-left');

                if (e.clientX + 560 > window.innerWidth) {
                    detailBox.classList.add('shift-left');
                }

                detailBox.style.display = 'block';
                detailBox.style.left = `${boxX}px`;
                detailBox.style.top = `${boxY}px`;

                e.stopPropagation();
            });

            nodesContainer.appendChild(node);
        });
    }

    if (timelineModal) {
        timelineModal.addEventListener('click', (e) => {
            if (e.target === timelineModal || e.target.id === 'timeline-close') {
                timelineModal.style.display = 'none';
            }
        });
    }

    if (detailBox) {
        const detailClose = document.getElementById('detail-close-btn');
        if (detailClose) {
            detailClose.addEventListener('click', (e) => {
                detailBox.style.display = 'none';
                e.stopPropagation();
            });
        }

        timelineModal.addEventListener('click', () => {
            detailBox.style.display = 'none';
        });
    }
});

document.addEventListener('click', (e) => {
    const linkEl = e.target.closest('[data-content="link-1"]');
    if (linkEl && linkEl.textContent.includes('Interactive Career Timeline')) {
        e.preventDefault();
        const timelineModal = document.getElementById('timeline-modal');
        if (timelineModal) {
            timelineModal.style.display = 'block';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const statuses = [
        "Compiling Pulpscript & evading cache bugs.",
        "Building interactive DOM timelines.",
        "Watching sequential James Bond films.",
        "Wrenching on 2015 Mini Cooper mass air flow sensors.",
        "Cooking Earthenware Chili Colorado.",
        "Negotiating peace treaties with three teenagers.",
        "Tracking down missing guitar picks.",
        "Dodging Crown Hill potholes on my e-bike.",
        "Rolling natural ones in the current D&D campaign.",
        "Stubbornly forcing a Quilboar build in Hearthstone BG.",
        "Hoarding obscure adapters to resurrect vintage tech.",
        "Devising the perfect engine for a cutthroat game of Dominion."
    ];

    const typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) return;

    let statusIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentStatus = statuses[statusIndex];

        if (isDeleting) {
            typewriterText.textContent = currentStatus.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterText.textContent = currentStatus.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 + Math.random() * 20 : 50 + Math.random() * 50;

        if (!isDeleting && charIndex === currentStatus.length) {
            typeSpeed = 8000;

            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            statusIndex = (statusIndex + 1) % statuses.length;
            typeSpeed = 500;

        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 500);

});

function applyRandomStagger(elements) {
    const gridItems = Array.from(elements);
    const shuffled = gridItems.sort(() => 0.5 - Math.random());
    
    shuffled.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.02}s`; 
    });
}

window.addEventListener('load', () => {
    if (typeof portfolioData !== 'undefined' && portfolioData.projects) {
        portfolioData.projects.forEach(project => {
            const imageUrl = projectImages[project.title];
            if (imageUrl) {
                const preloadImg = new Image();
                preloadImg.src = imageUrl;
            }
        });
    }
});

