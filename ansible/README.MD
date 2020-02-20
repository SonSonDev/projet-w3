# Déploiement de l'application sur le serveur AWS

Dans les fichiers `ansible/inventory/group_vars/madu.yml` et `ansible/inventory/inventory`, remplacer `insert_ip` par l'ip obtenu dans lors de la création du serveur AWS avec Terraform.

---

## Roles

- common: Installation de python qui permet d'utiliser les rôles suivants.
- geerlingguy.docker: Installation de docker et docker-compose permettant de déployer l'application sur le serveur.
- madu: Installation de l'application:
  - copie des dossiers api et back-office
  - copie de docker-compose pour déployer la base de données mongo, l'api et le back-office
  - arret des containers docker pour éviter des crash lors des builds
  - création de l'image docker de l'api en node
  - création de l'image docker du back-office servi avec nginx
  - lancement du docker-compose
- madu-user: Ajout d'un utilisateur super administrateur dans la base de donnée
---

## Mise en place du serveur

Remplacer les `{value}` dans les commandes suivantes avant de les executer.

Installation de l'application sur le serveur AWS:
```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu --key-file "../terraform/id_rsa" -e mongo_initdb_root_username={value} -e mongo_initdb_root_password={value} -e prisma_secret={value} -e stripe_secret_key={value} -e app_secret={value}
```

Mise à jour de l'application:
```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu --key-file "../terraform/id_rsa" -e mongo_initdb_root_username={value} -e mongo_initdb_root_password={value} -e api_secret={value} -e stripe_secret_key={value} -e app_secret={value} -t update
```

Insérer utilisateur super administrateur:
```sh
ansible-playbook -i inventory/inventory madu-insert.yml --user ubuntu --key-file "../terraform/id_rsa" -e user_firstName=Antoine -e user_lastName=Masselot -e user_email=antoine.masselot@hetic.net -e user_password=admin
```

---

Insérer fixtures (vide puis remplit la base de données):
```sh
ansible-playbook -i inventory/inventory madu-fixtures.yml --user ubuntu --key-file "../terraform/id_rsa"
```