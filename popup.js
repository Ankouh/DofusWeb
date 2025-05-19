document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const linkCards = document.querySelectorAll('.link-card');

    // Fonction de recherche
    function filterLinks(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        
        linkCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const site = card.getAttribute('data-site').toLowerCase();
            
            const isVisible = title.includes(searchTerm) || 
                            description.includes(searchTerm) || 
                            site.includes(searchTerm);
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Événement de recherche en temps réel
    searchInput.addEventListener('input', function(e) {
        filterLinks(e.target.value);
    });

    // Animation de délai pour les cartes
    linkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    // Gestion du clic sur les cartes
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le lien
            if (e.target.tagName !== 'A') {
                const link = card.querySelector('a');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
    });
}); 