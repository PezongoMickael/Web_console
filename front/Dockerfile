# Utilisez une image de base Node.js
FROM node:14-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json (s'ils existent)
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application React en utilisant la commande de build
RUN npm run build

# Exposez le port sur lequel l'application React sera exécutée (par défaut, le port 80)
# EXPOSE 3000

# Démarrez l'application en utilisant un serveur HTTP simple comme serve ou http-server
CMD ["npx", "serve", "-s", "build"]
