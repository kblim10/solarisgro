# SolarisGro - IoT Platform

SolarisGro adalah platform IoT yang memungkinkan pengguna untuk mengelola dan memantau perangkat IoT mereka dengan mudah.

## Fitur

- Manajemen perangkat IoT
- Template perangkat yang dapat dikustomisasi
- Visualisasi data real-time
- Autentikasi pengguna
- API RESTful
- WebSocket untuk komunikasi real-time

## Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Socket.IO Client

## Persyaratan

- Node.js (v14 atau lebih baru)
- MongoDB
- npm atau yarn

## Instalasi

1. Clone repositori
```bash
git clone https://github.com/username/solarisgro.git
cd solarisgro
```

2. Install dependensi
```bash
npm run install-all
```

3. Buat file `.env` di folder backend dengan konfigurasi berikut:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/solarisgro
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

4. Jalankan aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Struktur Proyek

```
solarisgro/
├── backend/           # Backend Node.js/Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── .env
├── frontend/         # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── styles/
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- POST /api/auth/register - Registrasi pengguna baru
- POST /api/auth/login - Login pengguna

### Devices
- GET /api/devices - Mendapatkan semua perangkat
- GET /api/devices/:id - Mendapatkan detail perangkat
- POST /api/devices - Membuat perangkat baru
- PUT /api/devices/:id - Update perangkat
- DELETE /api/devices/:id - Hapus perangkat
- PATCH /api/devices/:id/status - Update status perangkat
- POST /api/devices/:id/data - Tambah data perangkat

### Templates
- GET /api/templates - Mendapatkan semua template
- GET /api/templates/:id - Mendapatkan detail template
- POST /api/templates - Membuat template baru
- PUT /api/templates/:id - Update template
- DELETE /api/templates/:id - Hapus template

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

MIT License 