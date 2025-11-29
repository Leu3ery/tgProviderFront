# 📱 TgProvider Frontend

Angular-based Telegram Mini App frontend for TgProvider.

## 🚀 Tech Stack

- Angular 20
- TypeScript
- Telegram Web App SDK
- TON Connect

## ⚙️ Local Setup

### 1. Configure Environment

Edit `src/environment.ts` to set your backend API URL and configuration:

```typescript
export const config = {
    basicURL: 'http://localhost:3000/api',                    // Backend API URL
    botURL: 'https://t.me/your_bot',                         // Telegram bot URL
    manifestURL: 'http://localhost:4200/tonconnect-manifest.json',  // TON Connect manifest URL
    tonAddress: 'your_ton_wallet_address',                   // TON wallet address for payments
    koefizzient: 0.10                                        // Exchange rate coefficient
}
```

### 2. Run the Development Server

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

### 3. Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
tgProviderFront/
├── src/
│   ├── app/
│   │   ├── core/           # Core services and interceptors
│   │   ├── features/       # Feature components (main, stars, header, footer)
│   │   └── models/         # TypeScript models
│   └── environment.ts      # Environment configuration
└── public/                 # Static assets
```

## 🔗 Related Repository

- **Backend**: [tgProvider](https://github.com/Leu3ery/tgProvider) - See backend README for complete setup instructions
