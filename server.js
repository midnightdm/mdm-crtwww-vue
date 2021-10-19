const express = require('express');
//const history = require('connect-history-api-fallback');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
//app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> {
    res.sendFile('dist/index.html')
});
const port = process.env.PORT || 80;
app.listen(port, ()=> console.log('Server started on port ', port));