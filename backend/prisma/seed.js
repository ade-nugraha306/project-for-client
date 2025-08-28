const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Buat beberapa produk
  const produk1 = await prisma.products.create({
    data: {
      nama_produk: "Kaos Hitam Polos",
      deskripsi: "Kaos katun 100%, nyaman dipakai sehari-hari.",
      gambar: "https://example.com/kaos-hitam.jpg",
      harga: 85000,
      Stok: 20,
    },
  });

  const produk2 = await prisma.products.create({
    data: {
      nama_produk: "Jaket Hoodie Abu",
      deskripsi: "Hoodie berbahan fleece, cocok untuk musim hujan.",
      gambar: "https://example.com/hoodie-abu.jpg",
      harga: 150000,
      Stok: 10,
    },
  });

  // Buat review anonim untuk produk 1
  await prisma.reviews.create({
    data: {
      review: "Produk bagus, bahannya adem!",
      user_token: "anon-token-123",
      productId: produk1.id,
    },
  });

  await prisma.reviews.create({
    data: {
      review: "Pas banget dipakai buat nongkrong.",
      user_token: "anon-token-456",
      productId: produk1.id,
    },
  });

  // Review untuk produk 2
  await prisma.reviews.create({
    data: {
      review: "Hoodie-nya hangat, kualitas oke.",
      user_token: "anon-token-789",
      productId: produk2.id,
    },
  });

  console.log("Seeding selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
