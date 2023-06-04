# Utilisez une image de base Node.js
FROM node:14-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json (s'ils existent)
COPY package*.json ./

# Installez les dépendances
RUN npm install --production

# Copiez le reste des fichiers du backend
COPY . .

# Exposez le port sur lequel votre application backend écoutera (par exemple, le port 3000)
# EXPOSE 3000

# Démarrez votre application backend
CMD ["npm", "run", "start"]