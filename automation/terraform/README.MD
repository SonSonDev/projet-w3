# Création du serveur AWS

## Ressources créées:

- Un groupe IAM et un utilisateur IAM pour executer le script terraform
- Une clé SSH
- Une Instance EC2 sur Ubuntu 18.04
- Un Security Group autorisant:
  - le port 22 pour se connecter via SSH
  - le port 80 pour accéder à l'application back-office
  - le port 3000 pour executer des requêtes vers l'API

---

## Créer un utilisateur AWS
Via la console AWS:
- Créer un groupe IAM et lui attacher la stratégie `AmazonEC2FullAccess`.
- Créer un utilisateur IAM avec un `accès par programmation` et l'ajouter au groupe créé précédemment.
- Noter l'`ID de clé d'accès` et la `Clé d'accès secrète` de l'utilisateur créé.

## Créer une clé SSH
Choisir un __passphrase__. Via le terminal, dans le dossier __terraform__  du projet:
```sh
ssh-keygen -f ./id_rsa -N passphrase
```

## Créer une instance AWS

Via le terminal, dans le dossier __terraform__ du projet:
```sh
terraform init
```
- Utiliser les clés de l'utilisateur créé précédemment et créer une instance AWS:
```sh
export AWS_ACCESS_KEY_ID="ID de clé d'accès"
export AWS_SECRET_ACCESS_KEY="Clé d'accès secrète"
terraform apply
```

- Obtenir l'adresse ip public de l'instance AWS créée:
```sh
terraform state pull | grep \"public_ip\"
```
