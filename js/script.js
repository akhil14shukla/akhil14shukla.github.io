document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Optional: unobserve to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Scroll animations -> reveal
    const hiddenElements = document.querySelectorAll(".hidden-fade-up, .hidden-zoom-in");
    hiddenElements.forEach(el => observer.observe(el));

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        rootEl.setAttribute('data-theme', 'dark');
        if(themeToggleBtn) themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = rootEl.getAttribute('data-theme') === 'dark';
            if (isDark) {
                rootEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            } else {
                rootEl.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
        });
    }

    // Custom Luxe Cursor
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let outlineX = cursorX;
    let outlineY = cursorY;

    window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        if(cursorDot) {
            cursorDot.style.left = `${cursorX}px`;
            cursorDot.style.top = `${cursorY}px`;
        }
    });

    function renderCursor() {
        // Lerp for smooth trailing effect
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        if(cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Expand cursor on interactive elements
    const iteractables = document.querySelectorAll('a, button, .card, .project-card, .tag');
    iteractables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorOutline) cursorOutline.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            if(cursorOutline) cursorOutline.classList.remove('hovering');
        });
    });

    // Scroll-Driven Parallax
    const parallaxText = document.getElementById('parallax-text');
    window.addEventListener('scroll', () => {
        if(parallaxText) {
            const scrollVal = window.scrollY;
            // Translates horizontally and vertically slightly
            parallaxText.style.transform = `translate3d(${scrollVal * 0.2}px, ${scrollVal * 0.05}px, 0)`;
        }
    });

    // Neural Network Canvas Animation
    const canvas = document.getElementById('networkCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width, height;
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.querySelector('.hero').offsetHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
        const connectionDistance = 150;

        // Mouse interaction
        let mouse = {
            x: null,
            y: null,
            radius: 150
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Prevent particles from getting stuck off screen when mouse leaves
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                // Mouse Interaction (Magnetic Repulsion)
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        // Determine repulsion intensity
                        const directionX = forceDirectionX * force * 3;
                        const directionY = forceDirectionY * force * 3;
                        
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                // Standard Drift
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls smoothly
                if (this.x < 0) { this.x = 0; this.vx *= -1; }
                if (this.x > width) { this.x = width; this.vx *= -1; }
                if (this.y < 0) { this.y = 0; this.vy *= -1; }
                if (this.y > height) { this.y = height; this.vy *= -1; }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(176, 141, 87, 0.4)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(156, 121, 68, ${0.4 * (1 - dist / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
                
                // Draw connection to Mouse
                if (mouse.x !== null && mouse.y !== null) {
                    let dxMouse = particles[i].x - mouse.x;
                    let dyMouse = particles[i].y - mouse.y;
                    let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                    
                    if (distMouse < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(176, 141, 87, ${0.6 * (1 - distMouse / connectionDistance)})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Easter Egg Interactive Data Curve
    const easterCanvas = document.getElementById('easterEggCanvas');
    if(easterCanvas) {
        const ctxEast = easterCanvas.getContext('2d');
        let widthEast, heightEast;
        
        function resizeEaster() {
            widthEast = easterCanvas.width = easterCanvas.parentElement.clientWidth;
            heightEast = easterCanvas.height = easterCanvas.parentElement.clientHeight;
        }
        window.addEventListener('resize', resizeEaster);
        resizeEaster();

        const numBars = 40;
        let easterMouseX = widthEast / 2;
        let easterMouseY = heightEast / 2;
        let isHoveringEaster = false;

        easterCanvas.addEventListener('mousemove', (e) => {
            const rect = easterCanvas.getBoundingClientRect();
            easterMouseX = e.clientX - rect.left;
            easterMouseY = e.clientY - rect.top;
            isHoveringEaster = true;
        });

        easterCanvas.addEventListener('mouseleave', () => {
            isHoveringEaster = false;
        });

        function animateEaster() {
            ctxEast.clearRect(0, 0, widthEast, heightEast);
            ctxEast.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-main').trim() || '#B08D57';
            
            const barWidth = widthEast / numBars;
            // Target center for the bell curve logic
            let centerPoint = isHoveringEaster ? easterMouseX : widthEast / 2;

            for(let i = 0; i < numBars; i++) {
                let x = i * barWidth;
                
                // Gaussian function to create bell curve distribution around the centerPoint
                let dist = Math.abs((x + barWidth/2) - centerPoint);
                // Standard deviation spread
                let sigma = widthEast / 5; 
                // Math.exp for bell shape
                let yVal = Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(sigma, 2)));
                
                // Height based on gaussian multiplier
                let h = yVal * (heightEast * 0.8) + 10;
                let y = heightEast - h;

                // Adjust gap
                ctxEast.fillRect(x + 1, y, barWidth - 2, h);
            }

            requestAnimationFrame(animateEaster);
        }
        animateEaster();
    }
});
