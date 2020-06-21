# MADU


## Developpement

Cloner le projet:
```sh
git clone https://github.com/ShonhTan/projet-w3.git
cd projet-w3
```

Créer le fichier `.env`:
```
ansible-vault decrypt .env.encrypted --output .env --ask-vault-pass
```
 
Démarrer le projet en mode développement:
```sh
docker-compose up
```

Pour initialiser la base de donnée ou mettre à jour les modèles de données prisma:
```sh
docker-compose exec api yarn deploy 
```

Insérer des fausses données dans la base:
```sh
docker-compose exec api node src/fixtures.js
```

## Documentation

- [API](/api)
- [Back-office](/back-office)
- [Automation](/automation)
  - [Création du serveur AWS avec Terraform](/automation/terraform)
  - [Déploiement avec Ansible](/automation/ansible)
<!-- 
## Projet déployé

[http://15.236.90.231/](http://15.236.90.231/) -->
