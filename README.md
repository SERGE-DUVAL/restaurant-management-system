# restaurant-management-system
Backend Laravel + Frontend web pour gestion de restaurant
# 🍽️ Restaurant Management System – API Laravel

API REST complète pour la gestion d’un restaurant : utilisateurs, plats, commandes, paiements, stocks, notifications et commandes en ligne.

Ce projet est conçu avec **Laravel**, **Sanctum** pour l’authentification et une gestion des rôles (admin, caissier, serveur, gestionnaire).

---

## 🚀 Fonctionnalités

- 🔐 Authentification sécurisée (login / logout / reset password)
- 👤 Gestion des utilisateurs et des rôles
- 📂 Gestion des catégories de plats
- 🍔 Gestion des plats (menu)
- 🧾 Gestion des commandes
- 💳 Paiements et génération de factures
- 📦 Gestion des stocks et mouvements
- 🌐 Commandes en ligne (panier, checkout)
- 🔔 Notifications internes
- 📊 Tableau de bord & statistiques

---

## 🛠️ Technologies utilisées

- **Laravel**
- **Laravel Sanctum** (authentification API)
- **MySQL / PostgreSQL**
- **REST API**
- **JSON**

---

## ⚙️ Installation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/SERGE-DUVAL/restaurant-management-system.git
cd restaurant-management-system
## 🔁 Requêtes API REST (Guide pour le développeur Frontend)

Toutes les routes protégées nécessitent le header suivant après connexion :

Authorization: Bearer {TOKEN}
Accept: application/json
Content-Type: application/json

---

## 🔐 Authentification

### ➤ Connexion
**POST** `/api/login`

📌 Sert à connecter un utilisateur et récupérer le token.

```json
{
  "email": "admin@restaurant.com",
  "password": "password"
}

✅ Réponse : token d’authentification + infos utilisateur

➤ Déconnexion
POST /api/logout
📌 Déconnecte l’utilisateur (invalide le token).

👤 Utilisateurs (Admin)
➤ Lister les utilisateurs
GET /api/users
📌 Affiche tous les comptes utilisateurs.

➤ Ajouter un utilisateur
POST /api/users
{
  "name": "Jean",
  "email": "jean@mail.com",
  "password": "123456",
  "role": "serveur"
}

📌 Crée un nouvel utilisateur.

➤ Modifier un utilisateur
PUT /api/users/{id}
📌 Met à jour les informations d’un utilisateur.

➤ Supprimer un utilisateur
DELETE /api/users/{id}
📌 Supprime définitivement un compte.

➤ Changer le rôle
PATCH /api/users/{id}/role
{
  "role": "caissier"
}

📌 Modifie le rôle de l’utilisateur.

📂 Catégories
➤ Lister les catégories
GET /api/categories
📌 Récupère toutes les catégories de plats.

➤ Ajouter une catégorie
POST /api/categories
{
  "name": "Boissons"
}


🍽️ Plats (Menu)
➤ Lister les plats
GET /api/dishes
📌 Récupère le menu.

➤ Ajouter un plat
POST /api/dishes
{
  "name": "Pizza",
  "price": 2500,
  "category_id": 1
}


➤ Rechercher un plat
GET /api/dishes/search?query=pizza
📌 Recherche par nom.

🧾 Commandes (Salle / Caissier)
➤ Créer une commande
POST /api/orders
{
  "table_number": 5
}

📌 Ouvre une nouvelle commande.

➤ Ajouter un plat à une commande
POST /api/orders/{id}/add-dish
{
  "dish_id": 2,
  "quantity": 3
}

📌 Ajoute un plat dans la commande.

➤ Retirer un plat
POST /api/orders/{id}/remove-dish
{
  "dish_id": 2
}


➤ Historique des commandes
GET /api/orders/history
📌 Affiche les commandes déjà payées.

💳 Paiements
➤ Effectuer un paiement
POST /api/paiements
{
  "order_id": 10,
  "amount": 8000,
  "method": "cash"
}

📌 Enregistre le paiement d’une commande.

➤ Générer la facture
GET /api/paiements/{order_id}/facture
📌 Génère la facture PDF.

📦 Stocks
➤ Voir les stocks
GET /api/stocks
📌 Liste des produits et quantités.

➤ Ajouter un produit en stock
POST /api/stocks
{
  "product_name": "Fromage",
  "quantity": 50
}


🌐 Commandes en ligne (Client)
➤ Voir le menu
GET /api/menu
📌 Menu public pour commande en ligne.

➤ Ajouter au panier
POST /api/cart/add
{
  "dish_id": 3,
  "quantity": 2
}


➤ Valider la commande
POST /api/cart/checkout
📌 Crée la commande en ligne.

➤ Suivre le statut
GET /api/cart/status/{order_id}
📌 Suivi en temps réel.

🔔 Notifications
➤ Envoyer une notification
POST /api/notify
{
  "message": "Commande prête",
  "user_id": 4
}


➤ Marquer comme lue
PATCH /api/notifications/{id}/read
📌 Notification vue par l’utilisateur.

📊 Dashboard
➤ Données générales
GET /api/dashboard
📌 Statistiques globales (ventes, commandes, etc.)

➤ Graphique des ventes
GET /api/dashboard/sales-chart
📌 Données pour graphiques frontend.

