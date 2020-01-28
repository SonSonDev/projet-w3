# MADU


## Developpement

Cloner le projet:
```shell script
git clone https://github.com/ShonhTan/projet-w3.git madu
cd madu
```
 
Démarrer le projet en mode développement :
```
docker-compose up
```

Une fois que l'api est servie sur http://localhost:3000 :
```
docker exec -it projet-w3_api_1 npm run deploy 
```