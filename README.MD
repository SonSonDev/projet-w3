# MADU

<p align="center">
  <img height="100" src="https://i.imgur.com/KukPjFy.png">
</p>
<p align="center"> Projet final de Web 3 à Hetic - Groupe 7 </p>

---


## Mise en place de l'application

On utilise le fichier `.env` pour contenir les variables d'environnement nécessaires à l'exécution de :
- __terraform__ pour la création des différentes instances d'AWS
- __ansible__ pour le déploiement des projets sur ces instances
- __github-actions__ pour le déploiement continu lorsqu'on met à jour le projet sur la branch __master__

Copiez le fichier `.env-example` et renommez-le `.env` et remplissez le avec les variables d'environnement.


### ⚠️ Attention

Pour exécuter le script __terraform__, il est nécessaire d'avoir entré les variables :
- __AWS_ACCESS_KEY_ID__
- __AWS_SECRET_ACCESS_KEY__
- __SSH_PUBLIC_KEY__
- __SSH_PRIVATE_KEY__

Pour exécuter le playbook __Ansible__ et pour le bon fonctionnement de l'application, toutes les variables sont nécessaires (à l'exception de FRONT_URL et API_URL).

Après avoir rempli le fichier `.env`, avant d'exécuter ces scripts, il faut exporter toutes les variables d’environnement.
```
set -a && source .env && set +a
```

Pour faire fonctionner __github-actions__, il faut encrypter le fichier `.env` avec __ansible-vault__
```
ansible-vault encrypt .env --output .env.encrypted --ask-vault-pass
```
Ajoutez ensuite le mot de passe utilisé pour encrypter le fichier `.env` dans __VAULT_PASS__ dans les Secrets du projet Github.

---
### 🧩 Variables d'environnement

#### 📦 Amazon Web Services
On utilise les __services d'Amazon__ pour créer et gérer les différentes instances de l'application. __terraform__ et __Ansible__ ont besoin d'identifiants pour se connecter aux services d'Amazon et gérer ces instances.

Il est nécessaire de créer un __utilisateur IAM__ avec les permissions :
- AmazonEC2FullAccess
- AmazonS3FullAccess

Les variables nécessaires sont :
- __AWS_ACCESS_KEY_ID__ : ID de clé d'accès de l'utilisateur IAM
- __AWS_SECRET_ACCESS_KEY__ : Clé d'accès secrète de l'utilisateur IAM

Pour créer les instances EC2 avec terraform, une clé SSH est nécessaire :
- __SSH_PUBLIC_KEY__ : Clé public SSH
- __SSH_PRIVATE_KEY__ : Clé privée SSH

Une fois les instances créées via __terraform__, pour utiliser le Bucket S3 pour stocker les images. La variable nécessaire est :
- __AWS_S3_BUCKET__ : Nom du bucket S3


#### 🐳 Docker
On utilise __Docker__ pour monter différentes parties de l'application :
- un serveur API en __GraphQL__ utilisant __Prisma__ et __Mongoose__
- une Base de données __mongoDB__
- le Back-Office, développé en __React__, servi avec un serveur __Nginx__

Il faut créer un compte __Docker Hub__ sur lequel seront stockés les images construites lors de l'exécution des scripts __ansible__ ou __github-actions__. Les variables nécessaires sont :
- __DOCKER_USERNAME__ : Nom d'utilisateur du compte Docker Hub
- __DOCKER_PASSWORD__ : Mot de passe du compte Docker Hub


#### 🍃 mongoDB
On utilise __mongoDB__ pour la base de données. Les variables à choisir sont :
- __MONGO_INITDB_ROOT_USERNAME__ : Nom d'utilisateur pour accéder à la base de données
- __MONGO_INITDB_ROOT_PASSWORD__ : Mot de passe pour accéder à la base de données


#### 💎 Prisma
On utilise __Prisma__ ([Documentation](https://www.prisma.io/docs/)) qui permet de faire des requêtes de l'API vers la base de données avec une syntaxe objet. La variable à choisir est :
- __PRISMA_SECRET__


#### 🏦 Stripe
On utilise __Stripe__ ([Documentation](https://stripe.com/docs)) pour gérer la facturation des entreprises. Il faut créer un compte Stripe. La variable nécessaire est :
- __STRIPE_SECRET_KEY__ : Clé secrète du compte Stripe
- __STRIPE_EMAIL__ : Adresse email du compte Stripe
- __STRIPE_PASSWORD__ : Mot de passe du compte Stripe


#### 🕵️ JSON Web Token
On utilise le __JSON Web Token__  ([Introduction](https://jwt.io/introduction/)) pour encrypter les informations de l'utilisateur nécessaires l'authentification au Back-office et à l'application et autoriser les requêtes vers l'API. La variable à choisir est :
- __APP_SECRET__


#### 📍 Google Maps API
On utilise l'__API Google Maps__ ([Documentation](https://developers.google.com/maps/documentation)) pour obtenir les coordonnées GPS des entreprises et des points d'intérêt à partir de leur adresse lors de l'ajout à base de données. Il faut un compte Google. La variable nécessaire à générer :
- __GOOGLE_MAPS_API_KEY__ : [Pour obtenir la clé](https://developers.google.com/maps/documentation/javascript/get-api-key)


#### 📱 Expo
On utilise __Expo__ ([Documentation](https://docs.expo.io/)) pour développer l'application en __React Native__ et pour déployer l'application avec github-actions lors d'un push sur la branche master. Il faut créer un compte Expo. La variable nécessaire est :
- __EXPO_USERNAME__ : Nom d'utilsateur Expo
- __EXPO_PASSWORD__ : Mot de passe Expo


#### 🌐 Noms de domaines
Si des noms de domaines particuliers sont désirés pour l'API et le Back-office, les variables sont :
- __FRONT_URL__ : URL du back-office
- __API_URL__ : URL de l'API

---

## Développement

**Cloner le projet:**
```sh
git clone https://github.com/ShonhTan/projet-w3.git
cd projet-w3
```

**Créer le fichier `.env`:**
```
ansible-vault decrypt .env.encrypted --output .env --ask-vault-pass
```
 
**Démarrer le projet en mode développement:**
```sh
docker-compose up
```

**Pour initialiser la base de données ou mettre à jour les modèles de données prisma:**
```sh
docker-compose exec api yarn deploy 
```

**Insérer des fausses données dans la base:**
```sh
docker-compose exec api node src/fixtures.js
```

## Changer le logo

Pour changer l'icone et l'écran de démarrage de l'application, remplacer les fichiers __App_Icon.png__, __Splashscreen.png__ situés `app/assets`


## Documentation

- [API](/api)
- [Back-office](/back-office)
- [Automation](/automation)
  - [Création du serveur AWS avec Terraform](/automation/terraform)
  - [Déploiement avec Ansible](/automation/ansible)
  
  
## Contributors 

- [Christella Levieux](https://www.linkedin.com/in/christella-levieux/) - Designer
- [Quentin Lenglin](https://quentinlenglin.xyz/) - Designer
- [Valentine Leroy](https://www.linkedin.com/in/valentine-leroy/) - Designer
- [Vincent Pham](https://github.com/ShonhTan) - Développeur
- [Florian Sahbi](https://github.com/FlorianSahbi) - Développeur
- [Théodore Yip](https://github.com/yip-theodore) - Développeur
- [Mahel Zeroual](https://github.com/M00NBOY) - Développeur

