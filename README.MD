# MADU


## Developpement

Cloner le projet:
```shell script
git clone https://github.com/ShonhTan/projet-w3.git madu
cd madu
```
 
Démarrer le projet en mode développement:
```
docker-compose up
```

Pour initialiser la base de donnée ou mettre à jour les modèles de données:
```
docker exec -it projet-w3_api_1 npm run deploy 
```