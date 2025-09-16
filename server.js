import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Only serve files that exist
    if (!fs.existsSync(filePath)) {
        res.end();
        return;
    }
    
    const data = fs.readFileSync(filePath);
    
    // Set correct content type for CSS
    if (filePath.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    
    res.end(data);
}
);

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});