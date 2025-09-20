/**
 * Khedun Digital - 3D Atom Component
 * Interactive 3D atom structure with smooth animations
 */

class KDAtom {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }

        this.options = {
            size: options.size || 384,
            colors: options.colors || {
                primary: '#FFD700',
                secondary: '#E95A0C',
                accent: '#FF6B35'
            },
            animationSpeed: options.animationSpeed || 1,
            interactive: options.interactive !== false,
            ...options
        };

        this.isInitialized = false;
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;

        this.init();
    }

    init() {
        this.createStructure();
        this.setupEventListeners();
        this.startAnimation();
        this.isInitialized = true;

        console.log('KD Atom initialized successfully');
    }

    createStructure() {
        this.container.innerHTML = '';

        // Set container styles
        this.container.style.cssText = `
            position: relative;
            width: ${this.options.size}px;
            height: ${this.options.size}px;
            margin: 0 auto;
            perspective: 1200px;
            transform-style: preserve-3d;
        `;

        // Create main atom container
        const atom = document.createElement('div');
        atom.className = 'kd-atom';
        atom.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
        `;

        // Create particle field background
        const particleField = document.createElement('div');
        particleField.className = 'kd-particle-field';
        particleField.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 120%;
            height: 120%;
            margin: -60% 0 0 -60%;
            background:
                radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(233, 90, 12, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 60% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
        `;

        // Create nucleus
        const nucleus = document.createElement('div');
        nucleus.className = 'kd-nucleus';
        nucleus.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            margin: -20px 0 0 -20px;
            background: radial-gradient(circle, ${this.options.colors.primary} 0%, ${this.options.colors.secondary} 70%);
            border-radius: 50%;
            box-shadow:
                0 0 30px ${this.options.colors.primary},
                0 0 60px ${this.options.colors.secondary},
                inset 0 0 20px rgba(255, 215, 0, 0.5);
            transform-style: preserve-3d;
            z-index: 10;
        `;

        // Create orbital rings
        const orbitals = [
            { class: 'kd-orbital-ring-1', size: 40, color: this.options.colors.primary, speed: 8 },
            { class: 'kd-orbital-ring-2', size: 60, color: this.options.colors.secondary, speed: 12 },
            { class: 'kd-orbital-ring-3', size: 80, color: this.options.colors.accent, speed: 16 }
        ];

        orbitals.forEach((orbital, index) => {
            const ring = document.createElement('div');
            ring.className = `kd-orbital-ring ${orbital.class}`;
            ring.style.cssText = `
                position: absolute;
                top: ${50 - orbital.size/2}%;
                left: ${50 - orbital.size/2}%;
                width: ${orbital.size}%;
                height: ${orbital.size}%;
                border: 2px solid ${orbital.color};
                border-radius: 50%;
                transform-style: preserve-3d;
                box-shadow: 0 0 20px ${orbital.color};
                z-index: 2;
            `;
            atom.appendChild(ring);
        });

        // Create electrons
        const electrons = [
            { class: 'kd-electron-1', orbitRadius: 192, color: this.options.colors.primary, duration: 4 },
            { class: 'kd-electron-2', orbitRadius: 192, color: this.options.colors.secondary, duration: 6 },
            { class: 'kd-electron-3', orbitRadius: 192, color: this.options.colors.accent, duration: 5 },
            { class: 'kd-electron-4', orbitRadius: 192, color: this.options.colors.primary, duration: 7 }
        ];

        electrons.forEach((electron, index) => {
            const electronEl = document.createElement('div');
            electronEl.className = `kd-electron ${electron.class}`;
            electronEl.style.cssText = `
                position: absolute;
                width: 12px;
                height: 12px;
                background: radial-gradient(circle, ${electron.color} 0%, transparent 70%);
                border-radius: 50%;
                box-shadow: 0 0 15px ${electron.color};
                transform-style: preserve-3d;
                z-index: 5;
            `;

            // Position electrons based on orbit
            const positions = [
                { top: '50%', left: '0%', transformOrigin: `${electron.orbitRadius}px 0` },
                { top: '0%', left: '50%', transformOrigin: `0 ${electron.orbitRadius}px` },
                { top: '50%', right: '0%', transformOrigin: `-${electron.orbitRadius}px 0` },
                { bottom: '0%', left: '50%', transformOrigin: `0 -${electron.orbitRadius}px` }
            ];

            const pos = positions[index];
            electronEl.style.top = pos.top;
            electronEl.style.left = pos.left;
            electronEl.style.right = pos.right || 'auto';
            electronEl.style.bottom = pos.bottom || 'auto';
            electronEl.style.transformOrigin = pos.transformOrigin;

            atom.appendChild(electronEl);
        });

        // Assemble the structure
        this.container.appendChild(particleField);
        this.container.appendChild(atom);
        atom.appendChild(nucleus);

        // Add CSS animations
        this.addCSSAnimations();
    }

    addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes nucleusPulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow:
                        0 0 30px ${this.options.colors.primary},
                        0 0 60px ${this.options.colors.secondary},
                        inset 0 0 20px rgba(255, 215, 0, 0.5);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow:
                        0 0 50px ${this.options.colors.primary},
                        0 0 100px ${this.options.colors.secondary},
                        inset 0 0 30px rgba(255, 215, 0, 0.8);
                }
            }

            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                33% { transform: translate(10px, -10px) rotate(120deg); }
                66% { transform: translate(-5px, 15px) rotate(240deg); }
            }

            .kd-nucleus {
                animation: nucleusPulse 3s ease-in-out infinite;
            }

            .kd-particle-field {
                animation: particleFloat 15s ease-in-out infinite;
            }

            .kd-electron {
                animation: electronOrbit var(--orbit-duration) linear infinite;
            }

            .kd-electron-1 { --orbit-duration: 4s; animation-delay: 0s; }
            .kd-electron-2 { --orbit-duration: 6s; animation-delay: -1s; }
            .kd-electron-3 { --orbit-duration: 5s; animation-delay: -2s; }
            .kd-electron-4 { --orbit-duration: 7s; animation-delay: -3s; }

            @keyframes electronOrbit {
                0% { transform: rotateZ(0deg); }
                100% { transform: rotateZ(360deg); }
            }

            .kd-orbital-ring-1 { animation: orbitalRotate1 ${8 / this.options.animationSpeed}s linear infinite; }
            .kd-orbital-ring-2 { animation: orbitalRotate2 ${12 / this.options.animationSpeed}s linear infinite reverse; }
            .kd-orbital-ring-3 { animation: orbitalRotate3 ${16 / this.options.animationSpeed}s linear infinite; }

            @keyframes orbitalRotate1 {
                0% { transform: rotateZ(0deg); }
                100% { transform: rotateZ(360deg); }
            }

            @keyframes orbitalRotate2 {
                0% { transform: rotateZ(0deg); }
                100% { transform: rotateZ(-360deg); }
            }

            @keyframes orbitalRotate3 {
                0% { transform: rotateZ(0deg); }
                100% { transform: rotateZ(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        if (!this.options.interactive) return;

        // Mouse movement for 3D rotation
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;

            this.targetRotationX = this.mouseY * 30;
            this.targetRotationY = this.mouseX * 30;
        });

        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
                this.mouseY = (touch.clientY / window.innerHeight) * 2 - 1;

                this.targetRotationX = this.mouseY * 30;
                this.targetRotationY = this.mouseX * 30;
            }
        });

        // Pause animation on hover
        this.container.addEventListener('mouseenter', () => {
            const atom = this.container.querySelector('.kd-atom');
            if (atom) {
                atom.style.animationPlayState = 'paused';
            }
        });

        this.container.addEventListener('mouseleave', () => {
            const atom = this.container.querySelector('.kd-atom');
            if (atom) {
                atom.style.animationPlayState = 'running';
            }
        });
    }

    startAnimation() {
        const animate = () => {
            // Smooth rotation interpolation
            this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
            this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

            const atom = this.container.querySelector('.kd-atom');
            if (atom) {
                atom.style.transform = `rotateX(${this.currentRotationX}deg) rotateY(${this.currentRotationY}deg)`;
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    updateColors(colors) {
        this.options.colors = { ...this.options.colors, ...colors };
        // Recreate the structure with new colors
        this.createStructure();
    }

    setSpeed(speed) {
        this.options.animationSpeed = speed;
        // Update animation speeds
        const style = document.querySelector('style');
        if (style) {
            style.textContent = style.textContent.replace(
                /orbitalRotate1 \d+s/g,
                `orbitalRotate1 ${8 / speed}s`
            ).replace(
                /orbitalRotate2 \d+s/g,
                `orbitalRotate2 ${12 / speed}s`
            ).replace(
                /orbitalRotate3 \d+s/g,
                `orbitalRotate3 ${16 / speed}s`
            );
        }
    }

    destroy() {
        this.stopAnimation();
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isInitialized = false;
    }
}

// Global function for easy initialization
window.KDAtom = KDAtom;