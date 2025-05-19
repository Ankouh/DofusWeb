# DofusWeb - Extension Navigateur

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Chrome](https://img.shields.io/badge/Chrome-✓-green.svg)
![Firefox](https://img.shields.io/badge/Firefox-✓-green.svg)

## 📝 Description

DofusWeb est une extension de navigateur qui rassemble tous les liens utiles pour Dofus dans une interface moderne et intuitive. Cette extension permet d'accéder rapidement aux meilleures ressources Dofus sans avoir à mémoriser les URLs.

## ✨ Fonctionnalités

- 🔍 Barre de recherche en temps réel
- 🎨 Interface moderne et responsive
- 📱 Design adaptatif
- 🎯 Accès rapide aux sites Dofus
- 💫 Animations fluides
- 🎨 Thème personnalisé
- 🌐 Support multilingue (français)
- 🔄 Compatible Chrome et Firefox

## 📋 Sites inclus

- **Kaio3** - Gestionnaire de multicompte
- **Dofus Pour Les Noobs** - Guide complet du jeu
- **DofusBook** - Encyclopédie Dofus
- **Dofensive** - Calculateur de builds
- **Dofus Portals** - Portails et trajets
- **Nokazu** - Almanax et quêtes
- **DofusDB** - Base de données Dofus
- **Ganymede** - Arbre de compétences
- **Dofus Guide** - Guides et tutoriels
- **Monifus** - Gestion de compte
- **Dofus Planet** - Actualités et guides
- **Papycha** - Ressources et guides
- **Metamob** - Suivi des familiers
- **Barbok Rétro** - Ressources Dofus Rétro
- **Site Officiel Dofus** - Site officiel du jeu

## 🚀 Installation

### Chrome

1. Téléchargez ou clonez ce dépôt
2. Ouvrez Chrome et accédez à `chrome://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier `DofusWeb`

### Firefox

#### Installation depuis le code source

1. Téléchargez ou clonez ce dépôt
2. Installez Node.js si ce n'est pas déjà fait
3. Ouvrez un terminal dans le dossier du projet
4. Exécutez les commandes suivantes :
   ```bash
   npm install
   npm run build:firefox
   ```
5. Ouvrez Firefox et accédez à `about:debugging#/runtime/this-firefox`
6. Cliquez sur "Charger un module temporaire"
7. Sélectionnez le fichier `manifest.json` dans le dossier `dist/firefox`

#### Installation depuis le fichier XPI

1. Téléchargez le fichier `.xpi` depuis la section Releases
2. Ouvrez Firefox et accédez à `about:addons`
3. Cliquez sur l'icône d'engrenage en haut à droite
4. Sélectionnez "Installer un module depuis un fichier"
5. Choisissez le fichier `.xpi` téléchargé

## 🛠️ Structure du projet

```
DofusWeb/
├── manifest.json      # Configuration de l'extension
├── popup.html        # Interface utilisateur
├── popup.css         # Styles
├── popup.js          # Logique JavaScript
└── icons/            # Icônes de l'extension
    ├── icon16.png    # Icône 16x16
    ├── icon48.png    # Icône 48x48
    └── icon128.png   # Icône 128x128
```

## 🎨 Personnalisation

L'extension utilise des variables CSS pour faciliter la personnalisation :

```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #2c3e50;
    --background-color: #f5f6fa;
    --card-background: #ffffff;
    --text-color: #2c3e50;
    --hover-color: #e3f2fd;
}
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ⚠️ Avertissement

Cette extension n'est pas affiliée à Ankama Games. Dofus est une marque déposée d'Ankama Games.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

## 🙏 Remerciements

- Tous les sites Dofus listés pour leur excellent travail
- La communauté Dofus pour son soutien
- Les contributeurs de l'extension

---

Made with ❤️ for the Dofus community 

## 🛠️ Développement

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (généralement inclus avec Node.js)

### Installation des dépendances

```bash
npm install
```

### Commandes disponibles

- `npm run build:firefox` - Construit l'extension pour Firefox
- `npm run build:chrome` - Construit l'extension pour Chrome
- `npm run lint` - Vérifie le code source
- `npm run sign` - Signe l'extension pour la publication (nécessite des clés API AMO) 