import app from './src/app.js';
import connectToDatabase from './src/config/database.js';

const port = process.env.PORT || 3000;

connectToDatabase();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
