const hostname =
  typeof window !== 'undefined' ? window.location.hostname : '';

export const config = {
    basicURL: 'https://tgprovider.leuzery.live/api',
    botURL: 'https://t.me/yourtgprovider_bot',
    manifestURL: 'https://tgprovider.leuzery.live/api/public/tonconnect-manifest.json',
    tonAddress: 'UQCWzA7eUOgqAlU_csbWv2Z-qWS4tYlnktTquMhDR9SKbrkv',
    koefizzient : 0.10,
    defaultPremiumUsdPrices: {
        3: 11.99,
        6: 17.99,
        12: 29.99,
    },
    devMode: hostname === 'localhost' || hostname === '127.0.0.1',
    devUser: {
        id: 1095667504,
        username: 'Leuzery',
        photoUrl: '',
        balance: 100000000000,
    }
}
