// Efeito de partículas
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório entre 2 e 6 pixels
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Cor aleatória entre azul e roxo
        const colors = ['#4fc3f7', '#0288d1', '#b39ddb', '#7e57c2'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
    
    // Quiz interativo
    const quizOptions = document.querySelectorAll('.quiz-option');
    const submitButton = document.getElementById('submit-quiz');
    const quizResult = document.getElementById('quiz-result');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    submitButton.addEventListener('click', function() {
        const questions = document.querySelectorAll('.quiz-question');
        let correctAnswers = 0;
        let totalQuestions = questions.length;
        
        questions.forEach(question => {
            const correctOption = question.getAttribute('data-correct');
            const selectedOption = question.querySelector('.quiz-option.selected');
            
            if (selectedOption && selectedOption.getAttribute('data-option') === correctOption) {
                correctAnswers++;
                selectedOption.style.background = 'rgba(76, 175, 80, 0.3)';
                selectedOption.style.borderColor = '#4caf50';
            } else if (selectedOption) {
                selectedOption.style.background = 'rgba(244, 67, 54, 0.3)';
                selectedOption.style.borderColor = '#f44336';
                
                // Destacar a resposta correta
                question.querySelectorAll('.quiz-option').forEach(opt => {
                    if (opt.getAttribute('data-option') === correctOption) {
                        opt.style.background = 'rgba(76, 175, 80, 0.3)';
                        opt.style.borderColor = '#4caf50';
                    }
                });
            }
        });
        
        // Mostrar resultado
        quizResult.style.display = 'block';
        if (correctAnswers === totalQuestions) {
            quizResult.className = 'quiz-result correct';
            quizResult.innerHTML = `<h4>Parabéns! 🎉</h4><p>Você acertou todas as ${totalQuestions} questões! Você realmente conhece o assunto.</p>`;
        } else {
            quizResult.className = 'quiz-result incorrect';
            quizResult.innerHTML = `<h4>Resultado: ${correctAnswers}/${totalQuestions}</h4><p>Continue aprendendo sobre a preservação das geleiras!</p>`;
        }
        
        // Rolar para o resultado
        quizResult.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Efeito de digitação para títulos
    const titles = document.querySelectorAll('.section-title h2, .presentation h3, .card h3');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 1.5s infinite';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
    
    // Animação de scroll suave
    document.querySelectorAll('nav a, .btn').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Efeito parallax para partículas
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        particles.forEach(particle => {
            const speed = parseInt(particle.style.width) * 0.5;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
    
    // Animação para os cards quando entram na viewport
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar observer aos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});