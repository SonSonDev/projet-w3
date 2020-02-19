# Déploiement de l'application sur le serveur AWS

Dans les fichiers `ansible/inventory/group_vars/madu.yml` et `ansible/inventory/inventory`, remplacer `insert_ip` par l'ip obtenu dans lors de la création du serveur AWS avec Terraform.

---

## Roles

- common: Installation de python qui permet d'utiliser les rôles suivants.
- geerlingguy.docker: Installation de docker et docker-compose permettant de déployer l'application sur le serveur.
- madu:
  - copie des dossiers api et back-office
  - création de l'image docker de l'api en node
  - création de l'image docker du back-office servi avec nginx
  - copie et lancement de docker-compose pour déployer la base de données mongo, l'api et le back-office.

---

## Mise en place du serveur

Remplacer les `{value}` dans les commandes suivantes avant de les executer.

Installation de l'application sur le serveur AWS:
```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu --key-file "../terraform/id_rsa" -e mongo_initdb_root_username={value} -e mongo_initdb_root_password={value}  -e api_secret={value}
```

Mise à jour de l'application:
```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu -t madu --key-file "../terraform/id_rsa" -e mongo_initdb_root_username={value} -e mongo_initdb_root_password={value} -e api_secret={value}
```
