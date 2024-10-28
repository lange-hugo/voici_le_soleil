# Voici-le-soleil

ATTENTION: J'ai laissé des commentaires avec TODO pour chaque élément à remplir afin que le projet marche à 100%

Normalement tout est fonctionnel en local sans rien faire, mais pour le déploiement et stripe il est nécessaire de remplir des variables.

## Backend

### Mise en place de Django

- Création du projet

```bash
django-admin startproject voici_le_soleil
```

- Création des applications

```bash
python manage.py startapp user
python manage.py startapp product
python manage.py startapp message
python manage.py startapp stripe_app
```

- Modification des settings pour la prise en compte des applications

```python
# Dans les settings
INSTALLED_APPS = [
    ...
    "user",
    "product",
    "message",
    "stripe",
]
```

Ensuite, il faut mettre en place les cors pour que le frontend puisse communiquer avec le backend.

### Run de django

```bash
python ./backend/manage.py makemigrations
python ./backend/manage.py migrate
python ./backend/manage.py runserver
```

## Docker

- Pour allumer les containers docker

```bash
docker compose -f docker/development.yml up -d --build
```

- Pour éteindre les containers docker

```bash
docker compose -f docker/development.yml down
```

## Frontend

### Mise en place du code

[Shadcn](https://ui.shadcn.com/) fournit une commande pour mettre en place un projet avec nextjs.

```bash
pnpm dlx shadcn@latest init
```

## Tests Backend

`docker exec django python manage.py test`

## Tests Frontend

Attention, des fois les tests échouent la première fois car le code frontend n'est pas encore compilé.

```bash
cd frontend
pnpm cypress run
```
