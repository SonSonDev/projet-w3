# MADU


## Developpement

Cloner le projet:
```sh
git clone https://github.com/ShonhTan/projet-w3.git
cd projet-w3
```

Créer le fichier `.env`:
```
cp .env.example .env
```
 
Démarrer le projet en mode développement:
```sh
docker-compose up
```

Pour initialiser la base de donnée ou mettre à jour les modèles de données prisma:
```sh
docker exec -it projet-w3_api_1 npm run deploy 
```

## Documentation

- [Création du serveur AWS](/terraform)
- [Déploiement](/ansible)


## Projet déployé

[http://35.180.197.38/](http://35.180.197.38/)