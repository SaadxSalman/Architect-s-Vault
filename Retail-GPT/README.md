# Retail-GPT 🛍️

An agent that creates a dynamic, personalized shopping experience from end to end. Retail-GPT generates unique product images, crafts custom descriptions, and designs a virtual storefront that is entirely tailored to a user's individual style, preferences, and aesthetic.

-----

## ✨ Features

  * **Hyper-Personalized Shopping Experience:** Goes beyond simple recommendations to create a fully customized and unique shopping environment for each user.
  * **AI-Powered Product Imaging:** Utilizes a advanced **diffusion model** to generate hyper-realistic product images on demand, allowing users to visualize products in custom scenarios (e.g., a dress on a beach, a shirt in a city).
  * **Dynamic Content Generation:** A **Copywriting Agent** automatically writes personalized product descriptions that resonate with the user's unique style and interests.
  * **Intelligent Visual Merchandising:** A **Visual Merchandiser Agent** creates a virtual storefront layout tailored to the user's historical preferences and style analysis.
  * **Style Analysis:** A **Stylist Agent** analyzes a user's style from their social media profiles to understand their fashion preferences.
  * **Aesthetic Vector Space:** Uses **Qdrant** to create a high-dimensional vector space of styles, brands, and aesthetics to power highly accurate and personalized recommendations.

-----

## 🛠️ Tech Stack

## 🏗️ Core Application Stack (MERN+)

This layer handles the traditional web application logic, data persistence, and routing.

* **Frontend:**
* **Next.js (App Router):** The React framework for production-grade web apps, providing server-side rendering (SSR) for SEO and fast initial loads.
* **TypeScript:** Ensures type safety across your agents' data structures.
* **Tailwind CSS:** Used by the *Visual Merchandiser Agent* to dynamically style the storefront (e.g., swapping themes from "Cyberpunk" to "Minimalist").


* **Backend:**
* **Node.js & Express.js:** The lightweight execution environment for our AI agents.
* **MongoDB (Mongoose):** Stores persistent user data, like saved style profiles, historical preferences, and cart items.



---

## 🧠 The "Brain" (AI & Vector Layer)

This is where the personalization magic happens, utilizing state-of-the-art models for 2025.

* **Vector Database:**
* **Weaviate:** A cloud-native vector database that powers your *Aesthetic Vector Space*. It stores product embeddings so the Stylist Agent can find "vibes" rather than just keywords.


* **Text Generation (LLM):**
* **Gemma 3 Flash (via Google AI SDK):** Used by the *Stylist Agent* for fast social media analysis and the *Copywriting Agent* for generating personalized descriptions in real-time.


* **Image Generation:**
* **Imagen 3 / Nano Banana Pro:** A state-of-the-art diffusion model used by the *Visual Agent* to create hyper-realistic, personalized product photography based on user context.


---

## 🛠️ Infrastructure & Dev Tools

* **Containerization:**
* **Docker:** Essential for running local instances of Weaviate and ensuring a consistent environment for your micro-services.


* **API Management:**
* **Google Generative AI SDK:** The primary connector for both Gemma (text) and Imagen (images).
* **Weaviate TS Client:** The TypeScript library used for searching and seeding the vector database.


* **Authentication & State:**
* **NextAuth.js:** For secure user login (to link social profiles).
* **React Context / Zustand:** To manage the "Style State" across the frontend.

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (for Next.js)
  * Docker (for Qdrant)
  * Access to your chosen text and image generation models

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Retail-GPT.git
    cd Retail-GPT
    ```
2.  **Set up the front-end:**
    ```bash
    cd frontend
    npm install
    ```
3.  **Start Docker containers:**
    Use the provided `docker-compose.yml` to run the Qdrant instance.

### Configuration

Create a `.env` file in the `frontend` directory and add your API keys for the generative models.

### Usage

Run the Next.js server and connect the front-end to your back-end agents to begin generating personalized content.

```bash
npm run dev
```

-----

To wrap everything up for **saadsalmanakram/Retail-GPT**, here is the final, comprehensive directory structure. This reflects the multi-agent architecture (Stylist, Copywriter, Visual, and Merchandiser) and the MERN stack integration with Weaviate.

### 📂 Final Project Structure

```text
Retail-GPT/
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   │   ├── stylistAgent.ts       # Parses social data -> Style DNA
│   │   │   ├── copywriterAgent.ts    # Personalized product descriptions
│   │   │   └── visualAgent.ts        # Imagen 3 API logic for custom images
│   │   ├── controllers/
│   │   │   └── storefrontController.ts # Orchestrates the 3 agents
│   │   ├── models/
│   │   │   └── User.ts               # MongoDB Schema for user persistence
│   │   ├── routes/
│   │   │   └── api.ts                # Express routes (POST /generate-storefront)
│   │   ├── services/
│   │   │   ├── aiService.ts          # Gemma & Google AI SDK configuration
│   │   │   └── vectorStore.ts        # Weaviate client & schema init
│   │   ├── scripts/
│   │   │   └── seedProducts.ts       # Populates Weaviate with base catalog
│   │   └── index.ts                  # Server entry point
│   ├── .env                          # API Keys (GEMINI, WEAVIATE, MONGO)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            # Global fonts & styles
│   │   │   └── page.tsx              # Main Input UI (Bio analysis trigger)
│   │   ├── components/
│   │   │   ├── StorefrontGrid.tsx    # The Visual Merchandiser logic
│   │   │   ├── ProductCard.tsx       # Individual AI-generated item card
│   │   │   └── Loader.tsx            # Visual feedback during generation
│   │   ├── lib/
│   │   │   └── api.ts                # Fetch wrappers for backend calls
│   │   └── hooks/
│   │       └── useStorefront.ts      # State management for generated data
│   ├── .env.local                    # Public API URLs
│   ├── tailwind.config.ts            # Theme config for dynamic styling
│   └── package.json
├── docker-compose.yml                # Weaviate & Text2Vec modules
└── README.md                         # Project documentation

```

---
