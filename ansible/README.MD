# Déploiement de l'application sur le serveur AWS

Dans les fichiers `ansible/inventory/group_vars/madu.yml` et `ansible/inventory/inventory`, remplacer `insert_ip` par l'ip obtenu dans lors de la création du serveur AWS avec Terraform.

## Installation du serveur

```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu --key-file "../terraform/id_rsa"
```


## Mise à jour du serveur

```sh
ansible-playbook -i inventory/inventory madu.yml --user ubuntu -t madu --key-file "../terraform/id_rsa"
```