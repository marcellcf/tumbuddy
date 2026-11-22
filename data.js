// ================================================================
//  DATA WEBSITE TUMBUDDY_ID
//  Ubah isi file ini saja untuk mengganti teks, harga, kontak,
//  dan testimoni. Tidak perlu menyentuh file lain.
// ================================================================

const SITE = {
  // Nomor WhatsApp pakai format 62, tanpa + dan tanpa spasi. Contoh: "6281234567890"
  whatsapp: "6282123095188",
  // Username Instagram tanpa @
  instagram: "tumbuddy_id",
  // Link YouTube dan TikTok
  youtube: "https://youtube.com/@tumbuddy_id",
  tiktok: "https://www.tiktok.com/@tumbuddy_id",
  // Pesan awal saat pembeli klik tombol WhatsApp
  waGreeting: "Halo Tumbuddy_ID, aku mau tanya-tanya soal strap tumbler.",
};

// ---------------- OUR PRODUCTS ----------------
// price: isi angka (contoh 45000). Kalau dibiarkan null, tampil "Tanya harga".
// name: nama kelompok yang tampil di kartu. variant: keterangan warna, ikut masuk ke pesan WhatsApp.
// type: candy / pookie / sleek / charm (dipakai untuk tombol filter)
// colors: warna yang tampil sebagai titik di kartu produk
const PRODUCTS = [
  { id: "sky-lemon",     name: "Candy Braid", variant: "tali biru-kuning, ring biru", type: "candy", price: null, img: "sky-lemon.jpg",
    colors: ["#6FB6E8", "#F3D33F"], ring: "Biru",  desc: "Anyaman spiral biru dan kuning dengan tali katun kuning dan charm karakter." },
  { id: "pink-noir",     name: "Candy Braid", variant: "tali pink-hitam, ring hitam", type: "candy", price: null, img: "pink-noir.jpg",
    colors: ["#F2A7BE", "#262326"], ring: "Hitam", desc: "Spiral pink dan hitam, kalem tapi tetap manis." },
  { id: "cotton-pop",    name: "Pookie Loop", variant: "tali pink-biru, ring pink", type: "pookie", price: null, img: "cotton-pop.jpg",
    colors: ["#F4AFC4", "#7EB8E5", "#F3D33F"], ring: "Pink", desc: "Anyaman pink dan biru dengan aksen kuning dan ring silikon pink." },
  { id: "sunny-sky",     name: "Pookie Loop", variant: "tali kuning-biru, ring biru", type: "pookie", price: null, img: "sunny-sky.jpg",
    colors: ["#F3D33F", "#6FB6E8"], ring: "Biru",  desc: "Kuning cerah dan biru langit, cocok untuk tumbler warna netral." },
  { id: "storm-blue",    name: "Pookie Loop", variant: "tali abu-biru, ring biru", type: "pookie", price: null, img: "storm-blue.jpg",
    colors: ["#3D3F45", "#7EB8E5"], ring: "Biru",  desc: "Simpul abu tua dengan tali biru dan aksen tali abu." },
  { id: "candy-lemon",   name: "Pookie Loop", variant: "tali pink-biru-kuning, ring biru", type: "pookie", price: null, img: "candy-lemon.jpg",
    colors: ["#F4AFC4", "#7EB8E5", "#F3D33F"], ring: "Biru", desc: "Anyaman pink-biru dengan tali kuning dan charm bintang pink." },
  { id: "sky-shadow",    name: "Pookie Loop", variant: "tali biru-hitam, ring biru", type: "pookie", price: null, img: "sky-shadow.jpg",
    colors: ["#7EB8E5", "#2B2D31"], ring: "Biru",  desc: "Tali biru dengan simpul hitam dan charm bintang pink." },
  { id: "midnight-puff", name: "Pookie Loop", variant: "tali hitam-abu, ring hitam", type: "pookie", price: null, img: "midnight-puff.jpg",
    colors: ["#1F1F22", "#B9BDC4"], ring: "Hitam", desc: "Serba hitam dengan aksen tali abu dan charm karakter." },
  { id: "black-lemon",   name: "Sleek Rope", variant: "tali hitam-kuning, ring hitam", type: "sleek", price: null, img: "black-lemon.jpg",
    colors: ["#2B2D31", "#F3D33F"], ring: "Hitam", desc: "Tali hitam dengan aksen kuning dan charm bintang kuning." },
  { id: "black-rose",    name: "Sleek Rope", variant: "tali hitam-pink, ring hitam", type: "sleek", price: null, img: "black-rose.jpg",
    colors: ["#1F1F22", "#F2A7BE"], ring: "Hitam", desc: "Perpaduan hitam dan pink dengan charm karakter lucu." },
  { id: "charm-name",    name: "Charm", variant: "lonceng dan huruf nama", type: "charm", price: null, img: "charm-roy.jpg",
    colors: ["#7EB8E5", "#F4AFC4", "#F3D33F"], ring: "-", desc: "Gantungan dengan lonceng, huruf nama sesuai request, dan figur mungil." },
  { id: "charm-sandwich", name: "Charm", variant: "bentuk kue kotak", type: "charm", price: null, img: "charm-sandwich.jpg",
    colors: ["#F4AFC4", "#F3D33F"], ring: "-", desc: "Charm resin bentuk kue kotak dengan pengait pink atau kuning." },
  { id: "charm-bear",    name: "Charm", variant: "beruang kuning", type: "charm", price: null, img: "charm-bear.jpg",
    colors: ["#F3D33F"], ring: "-", desc: "Charm beruang kuning dengan berbagai pose, pengait kuning." },
  { id: "charm-bell",    name: "Charm", variant: "lonceng pastel", type: "charm", price: null, img: "charm-bell.jpg",
    colors: ["#F4AFC4", "#F3D33F", "#7EB8E5"], ring: "-", desc: "Lonceng warna pastel dengan manik huruf dan charm hati." },
];

const FILTERS = [
  { id: "all",   label: "Semua" },
  { id: "candy",  label: "Candy Braid" },
  { id: "pookie", label: "Pookie Loop" },
  { id: "sleek",  label: "Sleek Rope" },
  { id: "charm",  label: "Charm" },
];

// ---------------- PRODUCT DETAILS ----------------
// Teks dalam [kurung siku] perlu diganti dengan ukuran sebenarnya.
const DETAILS = {
  specs: [
    { label: "Material tali", value: "Tali paracord (tali parasut) nylon yang dianyam tangan, dengan aksen tali katun." },
    { label: "Jenis pengait", value: "Ring silikon elastis untuk badan tumbler, ring kait besi, dan snap hook pada charm." },
    { label: "Cocok untuk", value: "Cocok digunakan untuk menemani aktivitas sehari-hari, mulai dari kuliah, bekerja, hangout, hingga traveling." },
  ],
  howto: [
    "Masukkan ring silikon ke badan tumbler sampai posisinya pas dan tidak melorot.",
    "Kaitkan ujung strap ke ring kait yang ada di ring silikon.",
    "Pasang charm favoritmu, lalu tumbler siap ditenteng atau diselempangkan.",
  ],
  perks: [
    { icon: "hand",   title: "Anyaman tangan", text: "Dibuat satu per satu, rapi dan kuat." },
    { icon: "shield", title: "Tali kuat",      text: "Paracord nylon tahan tarikan dan tidak mudah putus." },
    { icon: "grip",   title: "Ring anti-slip", text: "Silikon elastis yang mencengkeram tumbler." },
    { icon: "heart",  title: "Bisa custom",    text: "Pilih warna tali dan charm sesuai selera." },
  ],
};

// Warna untuk model 3D (tombol warna di bagian Product Details)
const SWATCHES = [
  { name: "Biru Kuning", a: "#6FB6E8", b: "#F3D33F", ring: "#3B9EDB" },
  { name: "Pink Hitam", a: "#F2A7BE", b: "#2A2629", ring: "#1D1D20" },
  { name: "Pink Biru", a: "#F4AFC4", b: "#7EB8E5", ring: "#E98F9D" },
  { name: "Abu Biru", a: "#3D3F45", b: "#8EC2EA", ring: "#3B9EDB" },
  { name: "Wine", a: "#7D1830", b: "#F3E3CF", ring: "#5B0E1E" },
];

// ---------------- PILIHAN KAMI ----------------
// Bagian produk unggulan setelah katalog
const FEATURED = {
  title: "Candy Braid",
  desc: "Dua strap anyaman spiral dengan karakter yang berbeda, satu ceria, satu lebih tenang. Nyaman dipakai bergantian sehari-hari atau kembaran bersama teman.",
  points: ["Anyaman spiral dua warna", "Ring silikon biru atau hitam", "Dapat ditambah charm pilihanmu"],
  waMessage: "Halo Tumbuddy_ID, aku mau pesan Candy Braid.",
};

// ---------------- ABOUT US ----------------
// Ini draf, silakan disesuaikan dengan cerita aslinya.
const ABOUT = {
  // Kalimat besar di atas bagian About (warnanya berubah kata demi kata saat di-scroll).
  // Kata di antara *bintang* tampil miring dan berwarna merah.
  quote: "Kami percaya tumbler yang *nyaman* dibawa adalah tumbler yang *benar-benar dipakai.* Karena itu, setiap strap kami anyam *satu per satu* supaya kuat, rapi, dan tetap *lucu* dilihat.",
  // Judul bagian About Us. Teks di antara *bintang* tampil miring merah.
  title: "Berawal dari Hal Sederhana, *Hadir untuk Lebih Praktis*",
  // Teks di antara **dua bintang** tampil tebal.
  story: [
    "Tumbuddy_ID hadir dari keinginan untuk membuat membawa tumbler lebih mudah dan menyenangkan. Melihat tumbler sering merepotkan saat dibawa beraktivitas, muncul ide untuk menciptakan strap yang praktis sekaligus stylish.",
    "Setiap strap dibuat secara handmade dari tali paracord yang dianyam satu per satu, dilengkapi ring silikon dan charm lucu untuk memberikan sentuhan personal pada tumbler kesayanganmu.",
    "Bagi Tumbuddy_ID, strap bukan hanya aksesori, tetapi juga pelengkap gaya dalam aktivitas sehari-hari.",
    "**Little Strap, Big Style!**",
  ],
  vision: "Menjadi produk aksesori tumbler yang inovatif, fungsional, dan praktis dalam mendukung kebutuhan masyarakat modern, serta memberikan pengalaman membawa tumbler yang lebih mudah, nyaman, dan fleksibel dalam berbagai aktivitas sehari-hari.",
  mission: [
    "Menghadirkan aksesori tumbler yang praktis dan fungsional.",
    "Memberikan kemudahan dan kenyamanan pengguna dalam menjalankan aktivitas.",
    "Mengutamakan kualitas, kenyamanan, dan fungsionalitas dalam setiap produk.",
    "Mengembangkan desain produk yang menarik dan inovatif.",
    "Meningkatkan nilai guna tumbler melalui aksesori pelengkap yang bermanfaat.",
  ],
};

// ---------------- REVIEWS ----------------
// Isi dengan testimoni ASLI dari pembeli. Contoh format:
// { name: "Nama Pembeli", rating: 5, text: "Isi testimoni", product: "Candy Braid" },
const REVIEWS = [
  { name: "Nadia R.",   rating: 5, product: "Candy Braid",
    text: "Anyamannya rapi banget dan warnanya cerah. Tumbler jadi gampang dibawa ke kampus, tinggal diselempangin." },
  { name: "Dimas P.",   rating: 5, product: "Sleek Rope",
    text: "Talinya kuat, dipakai buat tumbler 1 liter juga aman. Desainnya simpel tapi tetap ada sentuhan lucunya." },
  { name: "Salsa A.",   rating: 5, product: "Pookie Loop",
    text: "Lucu parah, warnanya pastel dan ring silikonnya pas di tumbler. Pengirimannya juga cepat." },
  { name: "Kevin T.",   rating: 5, product: "Pookie Loop",
    text: "Suka sama warna hitamnya, cocok dipakai kerja. Ringnya nggak gampang melorot." },
  { name: "Aurel M.",   rating: 5, product: "Charm",
    text: "Charm beruangnya gemes banget. Aku pasang di strap Pookie Loop, jadi makin standout." },
  { name: "Fikri H.",   rating: 4, product: "Candy Braid",
    text: "Beli buat kado pacar dan dia suka banget. Packaging pouch holografiknya juga cakep." },
];

// Keterangan kecil di bawah ulasan. Kosongkan ("") kalau tidak mau ditampilkan.
const REVIEWS_NOTE = "*Ulasan di atas merupakan contoh untuk keperluan tugas.";

// Foto produk dari pelanggan. Simpan fotonya di folder ini lalu tulis namanya. Contoh:
// { img: "pelanggan-1.jpg", caption: "@namapembeli" },
const CUSTOMER_PHOTOS = [
  { img: "hero-pair.jpg",     caption: "Candy Braid" },
  { img: "flatlay.jpg",       caption: "Koleksi Tumbuddy" },
  { img: "charms-marble.jpg", caption: "Charm lonceng" },
  { img: "studio-pair.jpg",   caption: "Candy Braid" },
];

// ---------------- CONTACT & ORDER ----------------
const ORDER_STEPS = [
  { title: "Pilih model", text: "Lihat katalog dan catat nama model serta warna yang kamu suka." },
  { title: "Chat WhatsApp", text: "Kirim nama model, warna, dan charm pilihanmu ke WhatsApp kami." },
  { title: "Bayar", text: "Kami kirimkan total harga dan ongkir, lalu lakukan pembayaran." },
  { title: "Dikirim", text: "Pesanan dikemas rapi dan dikirim, nomor resi kami kabari lewat chat." },
];

// Teks dalam [kurung siku] perlu diganti.
const SHIPPING = [
  { label: "Dikirim dari", value: "[Isi kota asal pengiriman]" },
  { label: "Ekspedisi", value: "[Isi ekspedisi yang tersedia, misalnya JNE, J&T, SiCepat]" },
  { label: "Waktu proses", value: "[Isi lama proses pesanan, misalnya 1–3 hari kerja]" },
  { label: "Kemasan", value: "Setiap produk dikemas dalam pouch zip holografik." },
];


// ================================================================
//  PENGHITUNG KLIK (tidak perlu diubah)
//  Setiap tombol keluar (WhatsApp, Instagram) lewat alamat /klik/...
//  supaya jumlah kliknya tercatat di Vercel Analytics, lalu
//  langsung diteruskan ke tujuannya.
// ================================================================
function tujuanKlik(slug) {
  const wa = (m) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(m)}`;
  if (slug === "instagram") return `https://instagram.com/${SITE.instagram}`;
  if (slug === "youtube") return SITE.youtube;
  if (slug === "tiktok") return SITE.tiktok;
  if (slug === "pesan-duo") return wa(FEATURED.waMessage);
  if (slug === "custom") return wa("Halo Tumbuddy_ID, aku mau request strap custom. Warna tali dan charm yang aku mau: ");
  if (slug === "ulasan") return wa("Halo Tumbuddy_ID, aku mau kasih ulasan untuk strap yang aku beli.");
  if (slug.indexOf("pesan-") === 0) {
    const p = PRODUCTS.find((x) => x.id === slug.slice(6));
    if (p) return wa(`Halo Tumbuddy_ID, aku mau pesan ${p.name} (${p.variant}). Masih ada stok?`);
  }
  return wa(SITE.waGreeting);
}
function linkKlik(slug) {
  // Saat dibuka langsung dari laptop (bukan dari Vercel), tombol langsung ke tujuan.
  return location.protocol === "file:" ? tujuanKlik(slug) : "/klik/" + slug;
}
