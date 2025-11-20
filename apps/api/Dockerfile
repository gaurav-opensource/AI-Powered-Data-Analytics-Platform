FROM node:18

WORKDIR /app

# Copy ONLY backend package files
COPY package.json package-lock.json ./

# Install backend deps (including devDependencies)
RUN npm install

# Copy all backend code
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
