// Menu mobile com animação suave
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const nav = document.querySelector('nav');
    
    // Configurar o estilo inicial do menu mobile
    if (window.innerWidth <= 768) {
        nav.style.display = 'none';
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-20px)';
        nav.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
    
    mobileMenuIcon.addEventListener('click', function() {
        if (nav.style.display === 'none' || nav.style.display === '') {
            // Abrir menu
            nav.style.display = 'block';
            // Forçar reflow para garantir que a transição funcione
            nav.offsetHeight;
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        } else {
            // Fechar menu
            nav.style.opacity = '0';
            nav.style.transform = 'translateY(-20px)';
            setTimeout(function() {
                nav.style.display = 'none';
            }, 300); // Tempo igual à duração da transição
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.opacity = '0';
                nav.style.transform = 'translateY(-20px)';
                setTimeout(function() {
                    nav.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Ajustar menu ao redimensionar a tela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'block';
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        } else {
            nav.style.display = 'none';
            nav.style.opacity = '0';
            nav.style.transform = 'translateY(-20px)';
        }
    });
    
    // Formulário de contato
    const contactForm = document.querySelector('.contato-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Animação suave de scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar efeitos de hover e feedback tátil para melhor experiência em dispositivos móveis
    const allButtons = document.querySelectorAll('.btn, .btn-small');
    allButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
