const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = require('./config/db');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Logging: consola + archivo
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
morgan.token('user', (req) => {
  if (req.user) {
    return `user:${req.user.id}`;
  }
  return 'user:anonymous';
});

morgan.token('date', () => {
  return new Date().toISOString();
}
);
morgan.token('method', (req) => {
  return req.method;
}
);
morgan.token('url', (req) => {
  return req.originalUrl;
}
);
morgan.token('status', (req, res) => {
  return res.statusCode;
}
);
morgan.token('remote-addr', (req) => {
  return req.ip;
}
);
morgan.token('user-agent', (req) => {
  return req.headers['user-agent'];
}
);
morgan.token('body', (req) => {
  const cleanBody = { ...req.body };
  if (cleanBody.password) cleanBody.password = '******';
  return JSON.stringify(cleanBody);
});

morgan.token('response', (req, res) => {
  return JSON.stringify(res.body);
}
);

const customFormat = ':date :remote-addr :method :url :status - :response-time ms :user - agent::user-agent body::body';
app.use(morgan(customFormat, {
  stream: accessLogStream
}));

app.use(morgan('dev'));


app.use((req, res, next) => {
  console.log('Pasó por middleware', req.method, req.originalUrl);
  next();
});


// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/productos', require('./routes/productRoutes'));
app.use('/api/carrito', require('./routes/cartRoutes'));

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1'); // Test de conexión a la BD
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Middleware de errores
app.use((err, req, res, next) => {
  const errorLog = `${new Date().toISOString()} - ❌ Error en ${req.method} ${req.originalUrl} - ${err.message} - Body: ${JSON.stringify(req.body)}\n`;
  accessLogStream.write(errorLog);
  console.error(errorLog.trim());

  res.status(500).json({ error: 'Error interno del servidor' });
});

// Verificación de conectividad a la BD antes de levantar el server
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  pool.connect()
    .then(() => {
      const startMsg = `${new Date().toISOString()} - ✅ Conexión a la base de datos establecida\n`;
      accessLogStream.write(startMsg);
      console.log(startMsg.trim());

      app.listen(PORT, () => {
        const serverMsg = `${new Date().toISOString()} - 🚀 Servidor corriendo en puerto ${PORT}\n`;
        accessLogStream.write(serverMsg);
        console.log(serverMsg.trim());
      });
    })
    .catch(err => {
      const errorMsg = `${new Date().toISOString()} - ❌ Error al conectar con la base de datos: ${err.message}\n`;
      accessLogStream.write(errorMsg);
      console.error(errorMsg.trim());
      process.exit(1);
    });
}

module.exports = app;

process.on('unhandledRejection', (reason, promise) => {
  const msg = `${new Date().toISOString()} - 🔴 Unhandled Rejection: ${reason}\n`;
  accessLogStream.write(msg);
  console.error(msg.trim());
});

process.on('uncaughtException', (err) => {
  const msg = `${new Date().toISOString()} - 🔴 Uncaught Exception: ${err.message}\n`;
  accessLogStream.write(msg);
  console.error(msg.trim());
  process.exit(1); // importante para que no quede inestable
});

process.on('SIGINT', () => {
  const msg = `${new Date().toISOString()} - 🛑 Servidor detenido manualmente\n`;
  accessLogStream.write(msg);
  console.log(msg.trim());
  process.exit(0);
});
