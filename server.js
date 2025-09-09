const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// 所有请求都返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});