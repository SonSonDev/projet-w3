# Création du serveur AWS

## Créer une clé SSH
Choisir un __passphrase__. Via le terminal, dans le dossier __terraform__  du projet:
```console
ssh-keygen -f ./id_rsa -N passphrase
```

## Créer un utilisateur AWS
Via la console AWS:
- Créer un groupe IAM et lui attacher la stratégie `AmazonEC2FullAccess`.
- Créer un utilisateur IAM avec un `accès par programmation` et l'ajouter au groupe créé précédemment.
- Noter l'`ID de clé d'accès` et la `Clé d'accès secrète` de l'utilisateur créé.


## Créer une instance AWS

Via le terminal, dans le dossier __terraform__ du projet:
```
terraform init
```
- Utiliser les clés de l'utilisateur créé précédemment et créer une instance AWS:
```console
export AWS_ACCESS_KEY_ID="ID de clé d'accès"
export AWS_SECRET_ACCESS_KEY="Clé d'accès secrète"
terraform apply
```

- Obtenir l'adresse ip public de l'instance AWS créée:
```console
terraform state pull | grep \"public_ip\"
```