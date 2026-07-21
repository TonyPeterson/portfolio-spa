document.addEventListener('DOMContentLoaded', async () => {
            const body = document.body;
            const grid = document.querySelector('.dashboard-grid');
            const buttons = document.querySelectorAll('.tab-btn');
            
            let dashboardData = null;

            try {
                const response = await fetch('dashboard-content.json');
                dashboardData = await response.json();
                
                const initialHash = window.location.hash.replace('#', '');
                const initialTab = (initialHash && ['about', 'portfolio', 'arcade', 'contact'].includes(initialHash)) ? initialHash : 'about';
                switchTab(initialTab);
            } catch (error) {
                console.error("Failed to load dashboard content:", error);
            }

            function populateContent(tabName) {
                if (!dashboardData || !dashboardData[tabName]) return;
                
                const data = dashboardData[tabName];
                
                // For keys in the JSON for this tab, find all elements with matching data-content
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

            // Generate projects from dashboardData
            const projectList = document.getElementById('project-list');
            if (projectList && dashboardData && dashboardData.portfolio && dashboardData.portfolio.projects) {
                projectList.innerHTML = '';
                projectList.style.position = 'relative';

                const chevron = document.createElement('div');
                chevron.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="12" x2="18" y2="12"></line><polyline points="11 5 18 12 11 19"></polyline></svg>';
                chevron.style.position = 'absolute';
                chevron.style.left = '-6px';
                chevron.style.transition = 'top 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease';
                chevron.style.color = '#00bfff';
                chevron.style.display = 'flex';
                chevron.style.alignItems = 'center';
                chevron.style.pointerEvents = 'none';
                chevron.style.opacity = '0'; // Hidden initially until an item is selected or we can show it immediately
                projectList.appendChild(chevron);

                let activeLi = null;

                dashboardData.portfolio.projects.forEach((proj, i) => {
                    if (!proj.title) return;
                    const li = document.createElement('li');
                    li.textContent = proj.title;
                    li.style.padding = '0.66rem 0';
                    li.style.paddingLeft = '20px';
                    li.style.cursor = 'pointer';
                    li.style.fontSize = '1.2rem';
                    li.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s ease';
                    
                    li.addEventListener('mouseenter', () => {
                        if (activeLi !== li) li.style.color = '#00bfff';
                    });
                    li.addEventListener('mouseleave', () => {
                        if (activeLi !== li) li.style.color = '#fff';
                    });
                    
                    li.addEventListener('click', () => {
                        if (activeLi) {
                            activeLi.style.transform = 'translateX(0)';
                            activeLi.style.color = '#fff';
                        }
                        activeLi = li;
                        li.style.transform = 'translateX(15px)';
                        li.style.color = '#00bfff';

                        chevron.style.opacity = '1';
                        chevron.style.top = (li.offsetTop + 9) + 'px'; // vertically center the 24px arrow

                        const bioTitle = document.querySelector('.view-portfolio [data-content="bio-title"]');
                        const bioText = document.querySelector('.view-portfolio [data-content="bio-text"]');
                        const projContent = document.getElementById('portfolio-project-content');
                        const toolsContainer = document.getElementById('portfolio-tools-container');
                        const whatIDidContainer = document.getElementById('portfolio-what-i-did-container');
                        const roleContainer = document.getElementById('portfolio-role-container');
                        const didYouKnowContainer = document.getElementById('portfolio-did-you-know-container');
                        const linksContainer = document.getElementById('portfolio-links-container');
                        const wireframeImg = document.querySelector('.view-portfolio .wireframe-img');
                        
                        const elementsToAnimate = [bioTitle, projContent, toolsContainer, whatIDidContainer, roleContainer, didYouKnowContainer, linksContainer, wireframeImg].filter(el => el);
                        const isTabSwitching = window._isTabSwitching;
                        
                        elementsToAnimate.forEach(el => {
                            el.style.transition = isTabSwitching ? 'none' : 'opacity 0.3s ease, transform 0.3s ease';
                            el.style.opacity = '0';
                            el.style.transform = isTabSwitching ? 'translateY(0)' : 'translateY(10px)';
                        });

                        setTimeout(() => {
                            bioTitle.textContent = proj.title;
                            bioText.style.display = 'none';
                            projContent.style.display = 'block';
                            projContent.innerHTML = proj.content;

                            if (toolsContainer) {
                                toolsContainer.innerHTML = proj.tools || '';
                            }

                            if (whatIDidContainer) {
                                whatIDidContainer.innerHTML = proj['what-i-did'] || '';
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
                                        a.style.display = 'block';
                                        a.style.marginBottom = '1rem';
                                        a.style.fontSize = '1.2rem';
                                        a.style.color = '#fff';
                                        a.style.textDecoration = 'none';
                                        a.style.cursor = 'pointer';
                                        
                                        a.addEventListener('mouseenter', () => a.style.color = '#00bfff');
                                        a.addEventListener('mouseleave', () => a.style.color = '#fff');
                                        
                                        linksContainer.appendChild(a);
                                    });
                                }
                            }

                            if (wireframeImg) {
                                const projectImages = {
                                    'Shop in 3D': 'images/ShopIn3D_Menus2.gif',
                                    'Project Mio': 'images/ProjectMio1.jpg',
                                    'Terra Mine Diver': 'images/TerraMineDiver1.jpg',
                                    'CSO Showreel': 'images/CSOStudio_SizzleReel_June302023a051.jpg',
                                    'Microsoft Commute Poster': 'images/MS_ConnectorPoster1.png',
                                    'SAP Keynote': 'images/DES2020_CityscapeBG2.jpg',
                                    'Engage Series Bumper': 'images/RotatingSurface1.gif',
                                    'Virtual Store': 'images/VirtualStore1.gif',
                                    'Synergy Grant Quiz': 'images/SynergyQuizPhone1.jpg',
                                    'Optic8 Website': 'images/Optic8_Site1.jpg',
                                    'Picchu': 'images/PicchuRender1.jpg',
                                    'Trilogy Studios Website': 'images/TrilogySite1.jpg',
                                    'Motion Graphics Reel': 'images/SizzleReel1.gif',
                                    'Content Block Builder': 'images/ContentBlockBuilder_Render1.jpg',
                                    'Microsoft Web Framework': 'images/GuideIllustrations1.png',
                                    'Teams Holiday Background': 'images/3D_Holiday_Landscape_SledBox5.jpg',
                                    'Proactive Chat Invite': 'images/ProChat1.jpg',
                                    'Fluent Icon Refresh': 'images/FluentIcons2.gif',
                                    '8-Bit Takeover': 'images/8Bit_Render1.png',
                                    'Back to the Future Takeover': 'images/BTTF_Render1.jpg',
                                    'Tether': 'images/TetherPhone1.gif',
                                    'Xbox Gift Card': 'images/GiftCard1.jpg',
                                    'Simplified Office': 'images/SimplifiedOffice1.jpg',
                                    'Microsoft Complete Rebrand': 'images/CompleteLogo1.jpg',
                                    'Chatbot Redesign': 'images/ChatbotCompare1.jpg',
                                    'Value Prop Glyphs': 'images/ValueProps1.jpg',
                                    'Microsoft Holiday Campaign': 'images/HolidayMaterials1.jpg',
                                    'Microsoft Pride Campaign': 'images/PridePins3.jpg',
                                    'This is Our Story': 'images/GLC_Documentary1.jpg',
                                    'GLC Design Makeover': 'images/GLC_Redesign1.jpg',
                                    'Great Lakes Church': 'images/BuildingSignage1.jpg',
                                    '#staymarried': 'images/StaymarriedSocial1.jpg',
                                    'Eco Packaging Concept': 'images/EcoPackaging1.jpg',
                                    'Mailers & Invites': 'images/Invites1.jpg'
                                };
                                
                                const projectVideos = {
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
                            
                            // Force reflow
                            elementsToAnimate.forEach(el => void el.offsetWidth);
                            
                            elementsToAnimate.forEach(el => {
                                if (!isTabSwitching) {
                                    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                                }
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            });
                        }, isTabSwitching ? 0 : 300);
                    });
                    
                    projectList.appendChild(li);
                    
                    // Select first project by default so chevron is always present
                    if (i === 0) {
                        // wait for render
                        setTimeout(() => {
                            li.click();
                        }, 50);
                    }
                });
            }

            function updateBentoLabels(tabName) {
                const portfolioLabels = {
                    'socials-tile': 'links',
                    'quote-tile': 'projects',
                    'links-tile': 'role',
                    'soft-skills-tile': 'what i did',
                    'hard-skills-tile': 'tools i used',
                    'did-you-know-tile': 'did you know',
                    'hobbies-tile': 'tbd'
                };
                
                document.querySelectorAll('.bento-label').forEach(labelEl => {
                    const parent = labelEl.parentElement;
                    const tileClass = Array.from(parent.classList).find(cls => cls.endsWith('-tile') && cls !== 'grid-tile');
                    
                    if (!tileClass) return;
                    
                    if (tabName === 'arcade' || tabName === 'contact') {
                        labelEl.textContent = 'tbd';
                    } else if (tabName === 'about') {
                        labelEl.textContent = tileClass.replace('-tile', '').replace(/-/g, ' ');
                    } else if (tabName === 'portfolio') {
                        labelEl.textContent = portfolioLabels[tileClass] || 'tbd';
                    }
                });
            }

            function switchTab(tabName) {
                populateContent(tabName);
                updateBentoLabels(tabName);
                
                if (tabName === 'portfolio') {
                    const firstProject = document.querySelector('#project-list li');
                    if (firstProject) {
                        window._isTabSwitching = true;
                        firstProject.click();
                        window._isTabSwitching = false;
                    }
                }

                grid.setAttribute('data-active-tab', tabName);
                body.setAttribute('data-active-tab', tabName);

                buttons.forEach(btn => {
                    btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tabName);
                });

                history.pushState({ tab: tabName }, '', `#${tabName}`);
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

            // Contact Form Logic
            const contactForm = document.getElementById('top-contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const submitBtn = document.getElementById('contact-submit-btn');
                    if (submitBtn) submitBtn.textContent = 'SENDING...';

                    const formData = new FormData();
                    
                    // Access key
                    const accessKey = document.querySelector('input[name="access_key"]');
                    if (accessKey) formData.append('access_key', accessKey.value);
                    
                    // Main inputs
                    const nameInput = document.querySelector('input[name="name"]');
                    const emailInput = document.querySelector('input[name="email"]');
                    const msgInput = document.querySelector('textarea[name="message"]');
                    
                    if (nameInput) formData.append('name', nameInput.value);
                    if (emailInput) formData.append('email', emailInput.value);
                    if (msgInput) formData.append('message', msgInput.value);

                    // Optional hidden spam/config inputs
                    const subjectInput = document.querySelector('input[name="subject"]');
                    const fromNameInput = document.querySelector('input[name="from_name"]');
                    const replytoInput = document.querySelector('input[name="replyto"]');
                    const botcheckInput = document.querySelector('input[name="botcheck"]');
                    
                    if (subjectInput) formData.append('subject', subjectInput.value);
                    if (fromNameInput) formData.append('from_name', fromNameInput.value);
                    if (replytoInput) formData.append('replyto', replytoInput.value);
                    if (botcheckInput && botcheckInput.checked) formData.append('botcheck', botcheckInput.value);
                    
                    // hCaptcha token
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

            // Image Modal Logic
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-image');
            const modalVideo = document.getElementById('modal-video');
            const modalIframe = document.getElementById('modal-iframe');
            const modalCloseBtn = document.querySelector('.modal-close');
            const portfolioTopLeftImg = document.querySelector('.top-left .view-portfolio .wireframe-img');

            if (portfolioTopLeftImg && modal && modalImg && modalVideo && modalCloseBtn) {
                portfolioTopLeftImg.addEventListener('click', () => {
                    const videoSrc = portfolioTopLeftImg.getAttribute('data-video');
                    
                    // Reset all displays
                    modalImg.style.display = 'none';
                    modalVideo.style.display = 'none';
                    if (modalIframe) modalIframe.style.display = 'none';
                    modalVideo.pause();
                    modalVideo.src = "";
                    if (modalIframe) modalIframe.src = "";

                    if (videoSrc) {
                        if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
                            // Extract video ID and create embed URL
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
                    } else if (portfolioTopLeftImg.src) {
                        modalImg.style.display = 'block';
                        modalImg.src = portfolioTopLeftImg.src;
                        modal.classList.add('active');
                    }
                });

                function closeModal() {
                    modal.classList.remove('active');
                    modalVideo.pause();
                    modalVideo.src = "";
                    if (modalIframe) modalIframe.src = "";
                }

                modalCloseBtn.addEventListener('click', closeModal);

                // Close modal when clicking outside the image/video
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
            }
        });
