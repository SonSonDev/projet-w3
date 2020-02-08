# MADU


## Developpement

Cloner le projet:
```shell script
git clone https://github.com/ShonhTan/projet-w3.git
cd projet-w3
```
 
Démarrer le projet en mode développement:
```
docker-compose up
```

Pour initialiser la base de donnée ou mettre à jour les modèles de données prisma:
```
docker exec -it projet-w3_api_1 npm run deploy 
```

## Documentation

- [Création du serveur AWS](/terraform)
- [Déploiement](/ansible)