# sae3.01-3.03-groupe-4

### Diagramme de composants de l'application web
![Diagramme de composants](assets/images/Diagramme_de_composants.png)

### Présentation technique de l'application NaMasteroo

#### **1. Introduction**
NaMaster est une application web conçue pour accompagner les étudiants dans leur recherche et sélection de masters. Elle propose une interface intuitive et des fonctionnalités avancées, telles que la visualisation de données, les avis utilisateurs, et la comparaison de formations. L’objectif est de centraliser toutes les informations pertinentes pour faciliter la prise de décision.

---

#### **2. Hébergement et environnement**
- **Serveur d'hébergement** : L’application sera hébergée sur la plateforme universitaire [https://perso.univ-lemans.fr/](https://perso.univ-lemans.fr/).
- **Base de données** : La base de données est gérée avec **PHPMyAdmin**, ce qui offre une interface web simplifiée pour la gestion des données MySQL.
- **Langages utilisés** :
  - **Frontend** : HTML, CSS (via Tailwind CSS), JavaScript.
  - **Backend** : PHP (compatible avec l'hébergement universitaire).
  - **Base de données** : MySQL.

---

#### **3. Architecture technique**
L’architecture est construite sur une approche modulaire, respectant les bonnes pratiques de développement web :
- **Frontend** :
  - Mobile-first design avec **Tailwind CSS**.
  - Scripts interactifs développés en **JavaScript**.
- **Backend** :
  - Gestion des requêtes et logique d’affaires en **PHP**.
  - Communication avec la base de données via PDO pour une sécurité renforcée.
- **Base de données** :
  - Structure relationnelle conçue avec MySQL.
  - Gestion via **PHPMyAdmin** pour simplifier les tâches d’administration et de maintenance.

---

#### **4. Fonctionnalités principales**
1. **Recherche de master** :
   - Système de recherche avancée par filtres (région, secteur, établissement, etc.).
2. **Visualisation des données** :
   - Graphiques interactifs (courbes et cartes de chaleur) générés via **ECharts**.
   - Comparaison des masters selon des critères précis (taux d’insertion, salaires, etc.).
3. **Avis utilisateurs** :
   - Consultation et ajout d'avis similaires à Google Reviews.
   - Classement des masters par retours d’expérience.
4. **Favoris** :
   - Possibilité de sauvegarder des masters ou des recherches pour un accès rapide.
5. **Profil utilisateur** :
   - Gestion des informations personnelles et des paramètres.
   - Suivi des candidatures en cours.
6. **Candidatures** :
   - Affichage des statistiques des candidatures pour chaque master.
   - Suivi des candidatures personnelles

---

#### **5. Déploiement**
- **Procédure** :
  - Déploiement initial via l'interface de gestion sur [perso.univ-lemans.fr](https://perso.univ-lemans.fr/).
  - Installation de la base de données sur le serveur MySQL intégré à l’hébergement.
  - Configuration des fichiers PHP pour pointer vers la base de données.
- **Structure des fichiers** :
  - **/assets/** : Contient les ressources front-end (CSS, JS, images).
  - **/php/** : Regroupe les scripts backend (logique métier, connexion BDD).
  - **/views/** : Fichiers HTML partiels pour les différentes pages.
  - **/database/** : Fichiers SQL pour l’initialisation des tables.

---

#### **6. Sécurité**
- Utilisation de requêtes préparées avec PDO pour éviter les injections SQL.
- HTTPS activé sur [perso.univ-lemans.fr](https://perso.univ-lemans.fr/) pour sécuriser les échanges.

---

### Guide de Déploiement pour le Site Web **NaMaster**

---

#### **Pré-requis**

1. **Environnement local** :
   - **Node.js** : Version ≥ 22.
   - **Navigateur moderne** : Supportant HTML5 et JavaScript.
   - Un serveur HTTP local ou un **Live Server** fourni par des IDE comme Visual Studio Code.
   - **npm** installé pour gérer les dépendances.

2. **Base de données** :
   - **PHPMyAdmin** ou un autre outil de gestion MySQL/MariaDB pour configurer la base de données.

3. **Dépôt Git** :
   - Clonez ou téléchargez le dépôt GitHub : [NaMaster - SAE3.01-3.03](https://github.com/i2301534/sae3.01-3.03-groupe-4/tree/main).

---

#### **Étapes de Déploiement**

---

##### 1. **Cloner le projet**
   - Clonez le dépôt Git sur votre machine locale :
     ```bash
     git clone https://github.com/i2301534/sae3.01-3.03-groupe-4.git
     ```
   - Accédez au dossier cloné :
     ```bash
     cd sae3.01-3.03-groupe-4
     ```

##### 2. **Installer les dépendances**
   - Installez les dépendances requises avec npm :
     ```bash
     npm install
     ```

---

##### 3. **Configurer la base de données**

1. **Créer la base de données** :
   - Ouvrez votre outil de gestion (ex. : PHPMyAdmin) et créez une base de données nommée `namaster`.

2. **Importer le fichier SQL** :
   - Allez dans l’onglet **Importer** et sélectionnez le fichier `database/schema.sql` fourni dans le projet.

3. **Configurer l’accès à la base de données** :
   - Modifiez le fichier `config.js` ou `.env` (selon la structure) avec vos informations :
     ```
     DB_HOST=localhost
     DB_NAME=namaster
     DB_USER=root
     DB_PASSWORD=yourpassword
     ```

---

##### 4. **Lancer l’application**

1. **Utilisation d’un Live Server** :
   - Si vous utilisez un IDE comme Visual Studio Code :
     - Cliquez droit sur `index.html` et sélectionnez **"Open with Live Server"**.
   - Accédez à l'application depuis le navigateur à l’adresse fournie par le Live Server (par défaut, `http://127.0.0.1:5500/`).

2. **Utilisation d’un serveur personnel**
