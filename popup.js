document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const addSiteBtn = document.getElementById('addSiteBtn');
    const addSiteForm = document.getElementById('addSiteForm');
    const cancelAddSite = document.getElementById('cancelAddSite');
    const siteName = document.getElementById('siteName');
    const siteDesc = document.getElementById('siteDesc');
    const siteUrl = document.getElementById('siteUrl');
    const linksContainer = document.querySelector('.links-container');

    // Liste des sites de base
    const defaultSites = [
        { name: 'Kaio3', desc: 'Gestionnaire de multicompte', url: 'https://github.com/Ankouh/Kaio3', key: 'kaio3' },
        { name: 'Dofus Pour Les Noobs', desc: 'Guide complet du jeu', url: 'https://www.dofuspourlesnoobs.com/', key: 'dofuspourlesnoobs' },
        { name: 'DofusBook', desc: 'Encyclopédie Dofus', url: 'https://www.dofusbook.net/fr/', key: 'dofusbook' },
        { name: 'Dofensive', desc: 'Calculateur de builds', url: 'https://dofensive.com/fr', key: 'dofensive' },
        { name: 'Dofus Portals', desc: 'Portails et trajets', url: 'https://dofus-portals.fr/', key: 'dofusportals' },
        { name: 'Nokazu', desc: 'Almanax et quêtes', url: 'https://nokazu.com/almanax', key: 'nokazu' },
        { name: 'DofusDB', desc: 'Base de données Dofus', url: 'https://dofusdb.fr/fr/', key: 'dofusdb' },
        { name: 'Ganymede', desc: 'Arbre de compétences', url: 'https://ganymede-dofus.com/tree', key: 'ganymede' },
        { name: 'Dofus Guide', desc: 'Guides et tutoriels', url: 'https://dofusguide.fr/accueil', key: 'dofusguide' },
        { name: 'Monifus', desc: 'Gestion de compte', url: 'https://monifus.fr/connexion', key: 'monifus' },
        { name: 'Dofus Planet', desc: 'Actualités et guides', url: 'https://dofusplanet.fr/', key: 'dofusplanet' },
        { name: 'Papycha', desc: 'Ressources et guides', url: 'https://papycha.fr/', key: 'papycha' },
        { name: 'Metamob', desc: 'Suivi des familiers', url: 'https://www.metamob.fr/', key: 'metamob' },
        { name: 'Barbok Rétro', desc: 'Ressources Dofus Rétro', url: 'https://www.barbok-retro.com/', key: 'barbok' },
        { name: 'Site Officiel Dofus', desc: 'Site officiel du jeu', url: 'http://dofus.com/fr', key: 'dofus' }
    ];

    // Récupérer l'ordre sauvegardé
    function getSitesOrder() {
        return JSON.parse(localStorage.getItem('sitesOrder') || 'null');
    }
    function saveSitesOrder(order) {
        localStorage.setItem('sitesOrder', JSON.stringify(order));
    }
    // Récupérer les sites utilisateur
    function getUserSites() {
        return JSON.parse(localStorage.getItem('userSites') || '[]');
    }
    function saveUserSites(sites) {
        localStorage.setItem('userSites', JSON.stringify(sites));
    }
    // Générer la liste complète selon l'ordre
    function getAllSites() {
        const userSites = getUserSites();
        const order = getSitesOrder();
        let allSites = [
            ...defaultSites.map(site => ({...site, type: 'default'})),
            ...userSites.map(site => ({...site, type: 'user'}))
        ];
        if (order && Array.isArray(order)) {
            // Trier selon l'ordre sauvegardé
            allSites = order.map(idx => allSites[idx]).filter(Boolean);
        }
        return allSites;
    }
    // Affichage dynamique
    function renderAllSites() {
        linksContainer.innerHTML = '';
        const allSites = getAllSites();
        allSites.forEach((site, idx) => {
            const card = document.createElement('div');
            card.className = 'link-card';
            if(site.type === 'user') card.classList.add('user-site');
            card.setAttribute('data-site', (site.key || site.name.toLowerCase().replace(/\s+/g, '')));
            card.setAttribute('draggable', 'true');
            card.dataset.index = idx;
            card.innerHTML = `
                <h3>${site.name}</h3>
                <p>${site.desc}</p>
                <a href="${site.url}" target="_blank">Visiter</a>
            `;
            // Bouton suppression pour sites utilisateur
            if(site.type === 'user') {
                const delBtn = document.createElement('button');
                delBtn.className = 'delete-site-btn';
                delBtn.title = 'Supprimer ce site';
                delBtn.innerHTML = '&times;';
                delBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const userSites = getUserSites();
                    // Trouver l'index réel dans userSites
                    const userIndex = idx - defaultSites.length;
                    userSites.splice(userIndex, 1);
                    saveUserSites(userSites);
                    // Réinitialiser l'ordre si besoin
                    localStorage.removeItem('sitesOrder');
                    renderAllSites();
                });
                card.appendChild(delBtn);
            }
            // Drag events
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragover', handleDragOver);
            card.addEventListener('drop', handleDrop);
            card.addEventListener('dragend', handleDragEnd);
            // Clic sur la carte
            card.addEventListener('click', function(e) {
                if (e.target.tagName !== 'A') {
                    const link = card.querySelector('a');
                    if (link) window.open(link.href, '_blank');
                }
            });
            linksContainer.appendChild(card);
        });
        setCardAnimation();
    }
    // Recherche
    function filterLinks(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        const allCards = document.querySelectorAll('.link-card');
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const site = card.getAttribute('data-site').toLowerCase();
            const isVisible = title.includes(searchTerm) || 
                            description.includes(searchTerm) || 
                            site.includes(searchTerm);
            card.style.display = isVisible ? 'block' : 'none';
        });
    }
    searchInput.addEventListener('input', function(e) {
        filterLinks(e.target.value);
    });
    // Animation
    function setCardAnimation() {
        const allCards = document.querySelectorAll('.link-card');
        allCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.05}s`;
        });
    }
    // Drag and drop global
    let dragSrcIndex = null;
    function handleDragStart(e) {
        dragSrcIndex = +this.dataset.index;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    }
    function handleDrop(e) {
        e.stopPropagation();
        this.classList.remove('drag-over');
        const dropIndex = +this.dataset.index;
        if (dragSrcIndex === null || dragSrcIndex === dropIndex) return;
        // Calculer le nouvel ordre
        const allSites = getAllSites();
        const order = Array.from({length: allSites.length}, (_, i) => i);
        const [moved] = order.splice(dragSrcIndex, 1);
        order.splice(dropIndex, 0, moved);
        saveSitesOrder(order);
        renderAllSites();
    }
    function handleDragEnd() {
        this.classList.remove('dragging');
        document.querySelectorAll('.link-card').forEach(card => card.classList.remove('drag-over'));
        dragSrcIndex = null;
    }
    // Ajout site utilisateur
    addSiteBtn.addEventListener('click', function() {
        addSiteForm.style.display = 'flex';
        addSiteBtn.style.display = 'none';
    });
    cancelAddSite.addEventListener('click', function() {
        addSiteForm.style.display = 'none';
        addSiteBtn.style.display = 'block';
        addSiteForm.reset();
    });
    addSiteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = siteName.value.trim();
        const desc = siteDesc.value.trim();
        const url = siteUrl.value.trim();
        if (!name || !desc || !url) return;
        const userSites = getUserSites();
        userSites.push({ name, desc, url });
        saveUserSites(userSites);
        // Réinitialiser l'ordre pour inclure le nouveau site à la fin
        localStorage.removeItem('sitesOrder');
        renderAllSites();
        addSiteForm.reset();
        addSiteForm.style.display = 'none';
        addSiteBtn.style.display = 'block';
    });
    // Initialisation
    renderAllSites();
}); 