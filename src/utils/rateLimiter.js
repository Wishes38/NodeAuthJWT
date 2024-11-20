import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.'
});

export const loginAttempts = {};

export const customLoginLimiter = (req, res, next) => {
    const username = req.body.username;

    if (!username) {
        console.log('Username bulunamadı, limiter çalışmadı.');
        return next(); // Eğer username yoksa işlem devam etsin
    }

    const now = Date.now();

    if (!loginAttempts[username]) {
        loginAttempts[username] = []; // İlk giriş denemesi için dizi oluştur
    }

    // Eski giriş denemelerini temizle (örneğin, 15 dakika öncesini)
    loginAttempts[username] = loginAttempts[username].filter(
        (timestamp) => now - timestamp < 15 * 60 * 1000
    );

    // Yeni giriş denemesini kaydet
    loginAttempts[username].push(now);

    console.log('Login attempts:', loginAttempts[username]);

    // Eğer giriş denemesi limiti aşılmışsa
    if (loginAttempts[username].length > 5) {
        console.log('Too many failed login attempts:', username);
        return res.status(429).json({
            message: 'Too many failed login attempts, please try again later.'
        });
    }

    next(); // Limit aşılmadıysa bir sonraki middleware'e geç
};



