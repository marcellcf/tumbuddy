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
  // Pesan awal saat pembeli klik tombol WhatsApp
  waGreeting: "Halo Kak Jessica, aku mau tanya-tanya soal strap tumbler Tumbuddy_ID.",
};

// ---------------- OUR PRODUCTS ----------------
// price: isi angka (contoh 45000). Kalau dibiarkan null, tampil "Tanya harga".
// type: twist / cobra / knot / rope / charm (dipakai untuk tombol filter)
// colors: warna yang tampil sebagai titik di kartu produk
const PRODUCTS = [
  { id: "sky-lemon",     name: "Sky Lemon",     type: "twist", price: null, img: "sky-lemon.jpg",
    colors: ["#6FB6E8", "#F3D33F"], ring: "Biru",  desc: "Anyaman spiral biru dan kuning dengan tali katun kuning dan charm karakter." },
  { id: "pink-noir",     name: "Pink Noir",     type: "twist", price: null, img: "pink-noir.jpg",
    colors: ["#F2A7BE", "#262326"], ring: "Hitam", desc: "Spiral pink dan hitam, kalem tapi tetap manis." },
  { id: "cotton-pop",    name: "Cotton Pop",    type: "cobra", price: null, img: "cotton-pop.jpg",
    colors: ["#F4AFC4", "#7EB8E5", "#F3D33F"], ring: "Pink", desc: "Anyaman pink dan biru dengan aksen kuning dan ring silikon pink." },
  { id: "sunny-sky",     name: "Sunny Sky",     type: "cobra", price: null, img: "sunny-sky.jpg",
    colors: ["#F3D33F", "#6FB6E8"], ring: "Biru",  desc: "Kuning cerah dan biru langit, cocok untuk tumbler warna netral." },
  { id: "storm-blue",    name: "Storm Blue",    type: "knot",  price: null, img: "storm-blue.jpg",
    colors: ["#3D3F45", "#7EB8E5"], ring: "Biru",  desc: "Simpul abu tua dengan tali biru dan aksen tali abu." },
  { id: "candy-lemon",   name: "Candy Lemon",   type: "cobra", price: null, img: "candy-lemon.jpg",
    colors: ["#F4AFC4", "#7EB8E5", "#F3D33F"], ring: "Biru", desc: "Anyaman pink-biru dengan tali kuning dan charm bintang pink." },
  { id: "sky-shadow",    name: "Sky Shadow",    type: "knot",  price: null, img: "sky-shadow.jpg",
    colors: ["#7EB8E5", "#2B2D31"], ring: "Biru",  desc: "Tali biru dengan simpul hitam dan charm bintang pink." },
  { id: "midnight-puff", name: "Midnight Puff", type: "knot",  price: null, img: "midnight-puff.jpg",
    colors: ["#1F1F22", "#B9BDC4"], ring: "Hitam", desc: "Serba hitam dengan aksen tali abu dan charm karakter." },
  { id: "black-lemon",   name: "Black Lemon",   type: "rope",  price: null, img: "black-lemon.jpg",
    colors: ["#2B2D31", "#F3D33F"], ring: "Hitam", desc: "Tali hitam dengan aksen kuning dan charm bintang kuning." },
  { id: "black-rose",    name: "Black Rose",    type: "knot",  price: null, img: "black-rose.jpg",
    colors: ["#1F1F22", "#F2A7BE"], ring: "Hitam", desc: "Perpaduan hitam dan pink dengan charm karakter lucu." },
  { id: "charm-name",    name: "Name Bell Charm",  type: "charm", price: null, img: "charm-roy.jpg",
    colors: ["#7EB8E5", "#F4AFC4", "#F3D33F"], ring: "-", desc: "Gantungan dengan lonceng, huruf nama sesuai request, dan figur mungil." },
  { id: "charm-sandwich",name: "Sweet Bite Charm", type: "charm", price: null, img: "charm-sandwich.jpg",
    colors: ["#F4AFC4", "#F3D33F"], ring: "-", desc: "Charm resin bentuk kue kotak dengan pengait pink atau kuning." },
  { id: "charm-bear",    name: "Honey Bear Charm", type: "charm", price: null, img: "charm-bear.jpg",
    colors: ["#F3D33F"], ring: "-", desc: "Charm beruang kuning dengan berbagai pose, pengait kuning." },
  { id: "charm-bell",    name: "Jingle Charm",     type: "charm", price: null, img: "charm-bell.jpg",
    colors: ["#F4AFC4", "#F3D33F", "#7EB8E5"], ring: "-", desc: "Lonceng warna pastel dengan manik huruf dan charm hati." },
];

const FILTERS = [
  { id: "all",   label: "Semua" },
  { id: "twist", label: "Twist" },
  { id: "cobra", label: "Cobra" },
  { id: "knot",  label: "Knot" },
  { id: "rope",  label: "Rope" },
  { id: "charm", label: "Charm" },
];

// ---------------- PRODUCT DETAILS ----------------
// Teks dalam [kurung siku] perlu diganti dengan ukuran sebenarnya.
const DETAILS = {
  specs: [
    { label: "Material tali", value: "Tali paracord (tali parasut) nylon yang dianyam tangan, dengan aksen tali katun." },
    { label: "Panjang tali", value: "[Isi panjang tali, misalnya ± 100 cm]" },
    { label: "Jenis pengait", value: "Ring silikon elastis untuk badan tumbler, ring kait besi, dan snap hook pada charm." },
    { label: "Cocok untuk", value: "[Isi ukuran tumbler, misalnya tumbler 30–40 oz]" },
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
  { name: "Sky Lemon", a: "#6FB6E8", b: "#F3D33F", ring: "#3B9EDB" },
  { name: "Pink Noir", a: "#F2A7BE", b: "#2A2629", ring: "#1D1D20" },
  { name: "Cotton Pop", a: "#F4AFC4", b: "#7EB8E5", ring: "#E98F9D" },
  { name: "Storm Blue", a: "#3D3F45", b: "#8EC2EA", ring: "#3B9EDB" },
  { name: "Wine", a: "#7D1830", b: "#F3E3CF", ring: "#5B0E1E" },
];

// ---------------- PILIHAN KAMI ----------------
// Bagian produk unggulan setelah katalog
const FEATURED = {
  title: "Duo Twist: Sky Lemon & Pink Noir",
  desc: "Dua strap anyaman spiral dengan karakter yang berbeda. Satu cerah, satu kalem, pas untuk dipakai bergantian atau dibeli berdua dengan teman.",
  points: ["Anyaman spiral dua warna", "Ring silikon biru atau hitam", "Bisa ditambah charm pilihanmu"],
  waMessage: "Halo Kak Jessica, aku mau pesan Duo Twist (Sky Lemon & Pink Noir).",
};

// ---------------- ABOUT US ----------------
// Ini draf, silakan disesuaikan dengan cerita aslinya.
const ABOUT = {
  // Kalimat besar di atas bagian About (warnanya berubah kata demi kata saat di-scroll).
  // Kata di antara *bintang* tampil miring dan berwarna merah.
  quote: "Kami percaya tumbler yang *nyaman* dibawa adalah tumbler yang *benar-benar dipakai.* Karena itu, setiap strap kami anyam *satu per satu* supaya kuat, rapi, dan tetap *lucu* dilihat.",
  story: [
    "Tumbuddy_ID dimulai oleh Jessica dari hal sederhana: tumblernya sering ketinggalan karena repot dibawa. Tangan penuh, tumbler harus dipeluk, dan ujung-ujungnya ditinggal di meja.",
    "Dari situ Jessica mulai menganyam strap sendiri. Awalnya untuk dipakai sendiri, lalu teman-teman ikut minta dibuatkan. Sekarang setiap strap Tumbuddy_ID dibuat dengan tangan, lengkap dengan charm yang bikin tumbler terasa lebih personal.",
  ],
  vision: "Menjadi teman setia tumbler yang membuat kebiasaan membawa botol minum sendiri terasa praktis dan menyenangkan.",
  mission: [
    "Membuat strap yang kuat, nyaman, dan rapi lewat anyaman tangan.",
    "Menyediakan pilihan warna dan charm yang bisa disesuaikan dengan gaya pembeli.",
    "Mendukung kebiasaan memakai tumbler supaya penggunaan botol plastik sekali pakai berkurang.",
  ],
};

// ---------------- REVIEWS ----------------
// Isi dengan testimoni ASLI dari pembeli. Contoh format:
// { name: "Nama Pembeli", rating: 5, text: "Isi testimoni", product: "Sky Lemon" },
const REVIEWS = [];

// Foto produk dari pelanggan. Simpan fotonya di folder  lalu tulis namanya. Contoh:
// { img: "pelanggan-1.jpg", caption: "@namapembeli" },
const CUSTOMER_PHOTOS = [];

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
  if (slug === "pesan-duo") return wa(FEATURED.waMessage);
  if (slug.indexOf("pesan-") === 0) {
    const p = PRODUCTS.find((x) => x.id === slug.slice(6));
    if (p) return wa(`Halo Kak Jessica, aku mau pesan ${p.name} dari Tumbuddy_ID. Masih ada stok?`);
  }
  return wa(SITE.waGreeting);
}
function linkKlik(slug) {
  // Saat dibuka langsung dari laptop (bukan dari Vercel), tombol langsung ke tujuan.
  return location.protocol === "file:" ? tujuanKlik(slug) : "/klik/" + slug;
}
