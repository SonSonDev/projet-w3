# BACK

## Membres évalués
* [Florian Sahbi](https://github.com/FlorianSahbi)
* [Théodore Yip](https://github.com/yip-theodore)

## Schéma base de donnée
![schéma](db.png)

## Techno et Librairies

- graphQL
- prisma
- jsonwebtoken
- bcryptjs
- nodemailer
- stripe

dev:
- faker.js

## Principe d'authentification

- Un call `login` permet de s'authentifier. L'email et le password sont vérifiés et un jwt `x-auth-token` contenant l'id de l'utilisateur correspondant est ajouté dans les cookies du client.
- Un call `checkAuth` est executé des qu'on ouvre l'application back-office. Si un cookie `x-auth-token` est présent dans le header, il est vérifié et renvoie les informations de l'utilisateur en réponse. Côté client, si les informations de l'utilisateur ont été reçu avec succès, on a accès au back-office, sinon on est renvoyé vers la page de login.
- Le call `logout` supprime le cookie `x-auth-token`.

## Lien vers l'api déployée et documentation
http://35.180.197.38:3000/

## Comptes
| role | email | password
| --- | --- | ---
| SUPER_ADMIN | `w3p2020g7@gmail.com` | `admin`
| SUPER_ADMIN | `eric.priou@gmail.com` | `admin`
| ADMIN | `theodore.yip@hetic.net` | `admin`

