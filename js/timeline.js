document.addEventListener('DOMContentLoaded', () => {
    const minYear = 2000;
    const maxYear = 2026;
    const totalYears = maxYear - minYear;

    const jobs = [
        { company: "DHL", role: "Customer Service Rep", start: 2000, end: 2004 },
        { company: "Link Conference Service", role: "Web Development Assistant", start: 2004, end: 2005 },
        { company: "Eastlake Community Church", role: "Media Director", start: 2005, end: 2008 },
        { company: "Great Lakes Church", role: "Media Director", start: 2008, end: 2011 },
        { company: "Timberlake Church", role: "Executive Director of Arts", start: 2011, end: 2012 },
        { company: "Microsoft", role: "UX Designer & Researcher", start: 2012, end: 2017 },
        { company: "Great Lakes Church", role: "Executive Pastor of Arts", start: 2017, end: 2018 },
        { company: "Microsoft", role: "Lead UX/UI Prototyper", start: 2018, end: 2025 },
        { company: "SAP", role: "Lead Digital Communications Designer oCMO", start: 2025, end: 2026 },
        { company: "Microsoft", role: "Lead AI Comms Designer", start: 2026, end: 2026 },
        { company: "TOP Graphic Design Studio", role: "Freelance UX/UI Designer", start: 2008, end: 2026, isSpecial: true }
    ];

    const ticksContainer = document.getElementById('ticks-container');
    const nodesContainer = document.getElementById('nodes-container');
    const detailBox = document.getElementById('detail-box');
    const detailTitle = document.getElementById('detail-title');
    const timelineModal = document.getElementById('timeline-modal');
    
    // Clear and build timeline only once if possible, but DOMContentLoaded is fine.
    
    // Generate ticks
    if(ticksContainer) {
        for (let year = minYear; year <= maxYear; year += 2) {
            const tick = document.createElement('div');
            tick.className = 'tick';
            tick.innerText = year;
            ticksContainer.appendChild(tick);
        }
    }

    // Generate nodes
    if(nodesContainer) {
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
            label.innerText = `${job.company} - ${job.role}`;
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
                
                let boxX = e.clientX + 15;
                let boxY = e.clientY + 15;
                
                if (boxX > window.innerWidth - 320) {
                    boxX = window.innerWidth - 340; 
                }
                
                detailBox.style.display = 'block';
                detailBox.style.left = `${boxX}px`;
                detailBox.style.top = `${boxY}px`;
                
                e.stopPropagation(); 
            });

            nodesContainer.appendChild(node);
        });
    }

    if(timelineModal) {
        timelineModal.addEventListener('click', (e) => {
            if (e.target === timelineModal || e.target.id === 'timeline-close') {
                timelineModal.style.display = 'none';
            }
        });
    }

    if(detailBox) {
        const detailClose = document.getElementById('detail-close-btn');
        if(detailClose) {
            detailClose.addEventListener('click', (e) => {
                detailBox.style.display = 'none';
                e.stopPropagation();
            });
        }
        
        // Hide detail box on global click inside modal
        timelineModal.addEventListener('click', () => {
            detailBox.style.display = 'none';
        });
    }
});

// Event wireup for the "Interactive Career Timeline" link.
// The link is created dynamically by app.js based on dashboard-content.json
// So we attach a listener to document and delegate it.
document.addEventListener('click', (e) => {
    // Check if clicked element or its parent is the link-1 element
    const linkEl = e.target.closest('[data-content="link-1"]');
    if (linkEl && linkEl.textContent.includes('Interactive Career Timeline')) {
        e.preventDefault();
        const timelineModal = document.getElementById('timeline-modal');
        if (timelineModal) {
            timelineModal.style.display = 'block';
        }
    }
});
