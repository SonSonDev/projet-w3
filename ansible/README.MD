# Déploiement de l'application sur le serveur AWS



Dans le fichier `ansible/inventory/madu.yml`, remplacer `insert_ip` par l'ip obtenu dans lors de la création du serveur AWS avec Terraform.

## Installation du serveur

```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu
```


## Mise à jour du serveur

```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu -t madu
```