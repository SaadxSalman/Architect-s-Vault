FROM node:20-slim

# Install Rust and build tools for NAPI-RS
RUN apt-get update && apt-get install -y curl build-essential python3
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

# Copy workspace configs
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY packages/computation-engine ./packages/computation-engine

# Install dependencies and build Rust bridge
RUN npm install
RUN cd packages/computation-engine && cargo build --release

# Run the app
WORKDIR /app/apps/backend
CMD ["npm", "run", "dev"]