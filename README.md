# NaMaster - SAE3.01-3.03 Groupe 4

### Diagramme de composants de l'application web
![Diagramme de composants](assets/images/Diagramme_de_composants.png)

---

## Présentation technique de l'application **NaMaster**

### **1. Introduction**
NaMaster est une application web interactive conçue pour accompagner les étudiants dans leur choix de Masters. Elle centralise les informations pertinentes sur les Masters disponibles en France et propose des outils avancés pour simplifier la recherche, la comparaison, et la prise de décision. L'application intègre des fonctionnalités telles que :
- Une recherche avancée par filtres.
- Une carte interactive pour visualiser les formations disponibles.
- Des statistiques dynamiques pour chaque Master.
- Une page dédiée aux informations générales sur les Masters et leurs débouchés.

---

### **2. Hébergement et environnement**
- **Serveur d'hébergement** : [https://perso.univ-lemans.fr/](https://perso.univ-lemans.fr/).
- **Base de données** : MySQL, gérée via **PHPMyAdmin**.
- **Langages utilisés** :
  - **Frontend** : HTML5, CSS (via Tailwind CSS), JavaScript (modules ES6).
  - **Backend** : API REST pour les données.

---

### **3. Fonctionnalités principales**
1. **Recherche avancée** :
   - Recherche par filtres (département, ville, secteur disciplinaire, etc.).
   - Auto-complétion et gestion des résultats dynamiques.
2. **Carte interactive** :
   - Marqueurs géographiques basés sur les coordonnées GPS des formations.
   - Redirection vers la page de présentation du Master sélectionné.
3. **Statistiques dynamiques** :
   - Graphiques interactifs générés via **ECharts** (barres, camemberts, courbes).
   - Analyse des taux d'admission, candidatures, et salaires par région ou formation.
4. **Favoris** :
   - Gestion des Masters favoris pour un accès rapide.
5. **Page d'informations générales** :
   - Présentation complète des débouchés et conseils sur le choix d’un Master.
6. **Candidatures** :
   - Visualisation des taux d’acceptation et des effectifs pour chaque formation.
   - Comparaison entre formations similaires.

---

### **4. Déploiement**

#### **Prérequis**
- **Environnement local** :
  - Node.js (v22 ou plus).
  - Un serveur HTTP ou un Live Server via un IDE (comme Visual Studio Code).
  - MySQL et PHPMyAdmin pour gérer la base de données.
- **Dépôt Git** :
  - Clonez le dépôt : [NaMaster - SAE3.01-3.03](https://github.com/i2301534/sae3.01-3.03-groupe-4).

---

#### **Étapes de Déploiement**

##### 1. **Cloner le projet**
   - Ouvrez un terminal et entrez :
     ```bash
     git clone https://github.com/i2301534/sae3.01-3.03-groupe-4.git
     cd sae3.01-3.03-groupe-4
     ```

##### 2. **Installer les dépendances**
   - Si applicable, installez les dépendances via npm :
     ```bash
     npm install
     ```

##### 3. **Configurer la base de données**
   - Ouvrez PHPMyAdmin, créez une base de données nommée `namaster`.
   - Importez le fichier SQL situé dans `/database/schema.sql`.
   - Mettez à jour le fichier `config.js` ou `.env` avec vos informations de connexion :
     ```
     DB_HOST=localhost
     DB_NAME=namaster
     DB_USER=root
     DB_PASSWORD=yourpassword
     ```

##### 4. **Lancer l’application**
   - Ouvrez `index.html` via un Live Server (VSCode ou autre).
   - Accédez à `http://localhost:5500/index.html` ou une URL équivalente.

---

### **5. Sécurité**
- Utilisation de **requêtes préparées avec PDO** pour éviter les injections SQL.
- Configuration HTTPS via [perso.univ-lemans.fr](https://perso.univ-lemans.fr/).
- Politique de cookies transparente et conformité au RGPD.

---

### **6. Structure des fichiers**

- **/assets/** : Contient les ressources front-end (CSS, JS, images).
- **/scripts/** : Regroupe les scripts JavaScript (logique frontend et fonctionnalités interactives).
- **/database/** : Contient le fichier SQL d’initialisation.
- **/views/** : Pages HTML pour chaque fonctionnalité (recherche, carte, statistiques).
- **/config/** : Fichiers de configuration (base de données, API).

---
### **7. Bugs Tracking**
[Consulter le Bug Tracking](assets/images/Bugs_Tracking.pdf)

### **8. Améliorations futures**
1. Optimisation des temps de chargement des formations et des statistiques.
2. Ajout de nouveaux filtres dynamiques.
3. Intégration d’un système de favoris pour retrouver facilement les Masters.
4. Développement d’un mode clair.
