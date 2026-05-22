# Nusantara Tycoon

Board game with Indonesian Theme.

**Nusantara Tycoon** adalah prototype board game digital bertema Indonesia yang terinspirasi dari mekanik Monopoly, dengan sistem kota, wisata, infrastruktur, sumber daya alam, pajak, penjara, bebas parkir, event nasional, dan karakter pemain.

## Fitur

- Setup pemain sebelum game dimulai
- Pilihan 2 sampai 4 pemain
- Nama pemain custom
- Pilihan logo pemain dari folder `icon/`
- Board canvas bertema Nusantara
- Animasi lempar dadu
- Animasi pion berjalan tile-by-tile
- Sistem beli aset dan upgrade pembangunan
- Pajak, sewa, event nasional, Penjara KPK, dan Bebas Parkir
- Notifikasi pergantian giliran

## Cara Menjalankan

Project ini adalah static web app. Buka langsung:

```txt
index.html
```

Atau jalankan server lokal sederhana:

```bash
npm run serve
```

Lalu buka URL yang ditampilkan di terminal.

## Struktur Project

```txt
.
|-- index.html
|-- styles.css
|-- app.js
|-- icon/
|-- package.json
`-- README.md
```

## Deploy ke GitHub Pages

1. Push repository ke GitHub.
2. Buka **Settings** repository.
3. Pilih **Pages**.
4. Source: `Deploy from a branch`.
5. Branch: `main`, folder `/root`.
6. Simpan, lalu tunggu URL Pages aktif.

## Roadmap

- Trading antar pemain
- AI player untuk single-player
- Save/load local storage
- Multiplayer lobby dengan Socket.io
- Mode ranked dan chaos
- Audio ambience dan efek suara

## Lisensi

MIT
