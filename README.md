# Forum Diskusi — React + Redux

Aplikasi forum diskusi yang dibangun menggunakan React dan Redux, memanfaatkan
[Dicoding Forum API](https://forum-api.dicoding.dev/v1). Proyek submission kelas
**Menjadi React Web Developer Expert** (Dicoding) — submission **Menerapkan
Automation Testing dan CI/CD pada Aplikasi Forum Diskusi**.

## Fitur

### Kriteria Utama

- Registrasi dan login akun.
- Menampilkan daftar thread (diskusi).
- Menampilkan detail thread beserta komentar.
- Membuat thread baru (wajib login).
- Menambahkan komentar pada thread (wajib login).
- Loading indicator ketika memuat data dari API (React Redux Loading Bar).

### Fitur Tambahan (opsional)

- **Votes** pada thread dan komentar (up-vote / down-vote / netral) dengan
  penerapan _optimistic update_.
- **Leaderboard** pengguna paling aktif.
- **Filter thread** berdasarkan kategori (murni sisi front-end).

## Arsitektur

Kode dipisah antara lapisan **UI** dan **state**:

```
src/
├── components/   # Komponen UI yang modular dan reusable
├── pages/        # Halaman (route)
├── states/       # Redux: store, action, dan reducer per domain
│   ├── authUser/
│   ├── isPreload/
│   ├── leaderboards/
│   ├── shared/
│   ├── threadDetail/
│   ├── threads/
│   └── users/
├── hooks/        # Custom hooks (useInput)
├── utils/        # Pembungkus API dan helper
└── styles/       # Berkas CSS
```

- Seluruh state yang bersumber dari API disimpan pada **Redux Store**.
- Tidak ada pemanggilan REST API di dalam _lifecycle_ komponen; semua lewat
  _thunk_ (Redux Toolkit sudah menyertakan `redux-thunk`).
- `React.StrictMode` diaktifkan pada `main.jsx`.
- **ESLint** dengan konfigurasi **Airbnb JavaScript Style Guide**.

## Menjalankan Proyek

```bash
npm install
npm run dev      # menjalankan mode pengembangan (http://localhost:5173)
npm run build    # membangun untuk produksi
npm run lint     # menjalankan ESLint
```

## Automation Testing

### 1. Unit & Component Test (Vitest + React Testing Library)

```bash
npm test              # jalankan seluruh test sekali
npm run test:watch    # mode watch
npm run test:coverage # dengan laporan coverage
```

Total **37 test** pada 11 berkas. Setiap berkas diawali komentar **skenario test**
sesuai konvensi Dicoding dan mengikuti pola **AAA (Arrange–Action–Assert)**.

| Kategori | Berkas | Yang diuji |
|----------|--------|------------|
| **Reducer** | `src/states/threads/reducer.test.js` | receive, add, up/down/neutralize vote |
| | `src/states/threadDetail/reducer.test.js` | receive, clear, add comment, vote thread & komentar |
| | `src/states/authUser/reducer.test.js` | set & unset auth user |
| | `src/states/leaderboards/reducer.test.js` | receive leaderboards |
| | `src/states/isPreload/reducer.test.js` | set is-preload |
| **Thunk** | `src/states/authUser/action.test.js` | `asyncSetAuthUser` (sukses & gagal) |
| | `src/states/threads/action.test.js` | `asyncAddThread`, `asyncUpVoteThread` (optimistic + rollback) |
| | `src/states/users/action.test.js` | `asyncRegisterUser` (sukses & gagal) |
| **Component** | `src/components/LoginInput.test.jsx` | input email/password & submit form |
| | `src/components/VoteButtons.test.jsx` | tampilan jumlah vote & callback klik |
| | `src/components/CategoryFilter.test.jsx` | render chip & toggle kategori |

### 2. End-to-End Test (Cypress)

```bash
npm run dev       # terminal 1: jalankan aplikasi
npm run e2e       # terminal 2: Cypress headless
npm run e2e:open  # atau Cypress GUI
```

`cypress/e2e/login.cy.js` menguji alur **Login**: tampilan halaman, validasi input
wajib (email & password), serta penanganan kredensial salah.

## Storybook

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # build statis
```

Story tersedia untuk `VoteButtons`, `CategoryFilter`, dan `LoginInput`.

## CI/CD

### Continuous Integration — `.github/workflows/ci.yml`

Dijalankan otomatis pada setiap **push** & **pull request** ke `main`:
install → lint → unit test → build. Perubahan hanya digabung bila semua lulus.

### Continuous Deployment — Vercel Git Integration

Aplikasi di-deploy ke **Vercel** melalui **Vercel Git Integration**: setiap push
ke branch `main` memicu build & deploy otomatis di Vercel. URL produksi
dilampirkan pada catatan submission.

### Branch Protection

Branch `main` diproteksi (require pull request + require status check `CI`
lulus sebelum merge), sehingga kode hanya masuk `main` setelah CI hijau.

Bukti konfigurasi CI/CD & branch protection tersedia pada folder `screenshots/`.
