# BACK

## Membres évalués

- [Florian Sahbi](https://github.com/FlorianSahbi)
- [Théodore Yip](https://github.com/yip-theodore)

## Schéma base de donnée
[mongoDB](https://www.mongodb.com/fr) : Pour le stockage de nos données

![schéma](db.png)

## Techno et Librairies

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
: Fonction de hachage pour encoder les mots de passe.
- [graphql-yoga](https://www.npmjs.com/package/graphql-yoga)
: Serveur GraphQL complet, axé sur la facilité d'installation et les performances.

    Graphql-yoga est basé sur : 
    - [express/apollo-server](https://github.com/apollographql/apollo-server)
    - [graphql-subscriptions/subscriptions-transport-ws](https://github.com/apollographql/graphql-subscriptions)
    - [graphql.js/graphql-tools](https://github.com/graphql/graphql-js)
    - [graphql-playground](https://github.com/graphcool/graphql-playground)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
: Voir *Principe d'authentification*
- [nodemailer](https://www.npmjs.com/package/nodemailer)
: Pour permettre l'envoi de d'emails.
- [stripe](https://www.npmjs.com/package/stripe)
: Solution de traitement des paiements en ligne pour les entreprises Internet.
- [prisma](https://www.npmjs.com/package/prisma)
: Prisma génère automatiquement pour nous un client qui nous permet de manipuler notre base de données sans apprendre les spécificités de chaque base de données. Il suffit de connaître la programmation orientée object pour utiliser Prisma. Il est utilisé comme ORM.

dev:

- [faker](https://www.npmjs.com/package/faker)
: Pour rapidement générer nos fixtures avec des données lisisbles.
- [eslint](https://www.npmjs.com/package/eslint)
: Analyse notre code et vérifie que celui-ci respecte un certain nombre de règles.

## Principe d'authentification

- Un call `login` permet de s'authentifier. L'email et le password sont vérifiés et un jwt `x-auth-token` contenant l'id de l'utilisateur correspondant est ajouté dans les cookies du client.
- Un call `checkAuth` est executé des qu'on ouvre l'application back-office. Si un cookie `x-auth-token` est présent dans le header, il est vérifié et renvoie les informations de l'utilisateur en réponse. Côté client, si les informations de l'utilisateur ont été reçu avec succès, on a accès au back-office, sinon on est renvoyé vers la page de login.
- Le call `logout` supprime le cookie `x-auth-token`.

## Lien vers l'api déployée et documentation

http://35.180.197.38:3000/

## Comptes

| role        | email                    | password |
| ----------- | ------------------------ | -------- |
| SUPER_ADMIN | `w3p2020g7@gmail.com`    | `admin`  |
| SUPER_ADMIN | `eric.priou@gmail.com`   | `admin`  |
| ADMIN       | `theodore.yip@hetic.net` | `admin`  |
