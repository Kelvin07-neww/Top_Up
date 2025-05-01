const games = [
    {
      name: "Mobile Legends",
      image: "https://c4.wallpaperflare.com/wallpaper/579/1/177/mobile-legends-chou-iori-yagami-hd-wallpaper-preview.jpg",
      diamonds: [
        { amount: 86, price: 70000 },
        { amount: 172, price: 120000 },
        { amount: 257, price: 150000 },
        { amount: 344, price: 210000}
      ],
      fields: ["ID", "Server"]
    },
    {
      name: "Free Fire",
      image: "https://c4.wallpaperflare.com/wallpaper/521/153/310/video-game-garena-fire-wallpaper-preview.jpg",
      diamonds: [
        { amount: 100, price: 50000},
        { amount: 210, price: 102000 },
        { amount: 530, price: 230000 },
        { amount: 1080, price: 320000 }
      ],
      fields: ["ID"]
    },
    {
      name: "PUBG Mobile",
      image: "https://c4.wallpaperflare.com/wallpaper/320/205/156/playerunknown-s-battlegrounds-pubg-mobile-game-hd-wallpaper-preview.jpg",
      diamonds: [
        { amount: 60, price: 120000 },
        { amount: 180, price: 180000 },
        { amount: 385, price: 240000 },
        { amount: 810, price: 420000 }
      ],
      fields: ["ID"]
    }
  ];
  
  const gameList = document.getElementById("game-list");
  const orderSection = document.getElementById("order-section");
  const gameIdFields = document.getElementById("game-id-fields");
  const diamondSelect = document.getElementById("diamond-select");
  const orderForm = document.getElementById("order-form");
  
  let selectedGame = null;
  
  games.forEach((game, index) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}" />
      <h3>${game.name}</h3>
    `;
    card.onclick = () => showOrderForm(index);
    gameList.appendChild(card);
  });
  
  function showOrderForm(index) {
    selectedGame = games[index];
    orderSection.classList.remove("hidden");
  
    // Tampilkan input sesuai kebutuhan game
    gameIdFields.innerHTML = "";
    selectedGame.fields.forEach(field => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `${field} Player`;
      input.required = true;
      input.name = field.toLowerCase();
      gameIdFields.appendChild(input);
    });
  
    // Pilihan diamond dengan harga
    diamondSelect.innerHTML = "";
    selectedGame.diamonds.forEach(diamond => {
      const option = document.createElement("option");
      option.value = diamond.amount;
      option.textContent = `${diamond.amount} Diamond - Rp ${diamond.price}`;
      diamondSelect.appendChild(option);
    });
  
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
  
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = gameIdFields.querySelectorAll("input");
    const idInfo = Array.from(inputs).map(input => `${input.placeholder}: ${input.value}`).join(", ");
    const diamondAmount = diamondSelect.value;
    const selectedDiamond = selectedGame.diamonds.find(d => d.amount == diamondAmount);
    const price = selectedDiamond ? selectedDiamond.price : 0;
    alert(`Pesanan:\nGame: ${selectedGame.name}\n${idInfo}\nDiamond: ${diamondAmount} - Rp ${price}\nPembayaran: DANA`);
    orderForm.reset();
    orderSection.classList.add("hidden");
 
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = gameIdFields.querySelectorAll("input");
        const idInfo = Array.from(inputs).map(input => `${input.placeholder}: ${input.value}`).join(", ");
        const diamondAmount = diamondSelect.value;
        const selectedDiamond = selectedGame.diamonds.find(d => d.amount == diamondAmount);
        const price = selectedDiamond ? selectedDiamond.price : 0;
      
        // Menampilkan pesan untuk simulasi pembayaran
        alert(`Pesanan:\nGame: ${selectedGame.name}\n${idInfo}\nDiamond: ${diamondAmount} - Rp ${price}\nPembayaran: DANA`);
      
        // Di sini, Anda akan mengirim data ke server backend untuk memproses pembayaran DANA
        processPayment(diamondAmount, price);
      });
      
      function processPayment(diamondAmount, price) {
        // Di sini, lakukan request ke backend yang terhubung dengan DANA API untuk memproses pembayaran
        // Misalnya menggunakan fetch atau AJAX untuk mengirimkan data ke server
        console.log("Proses pembayaran DANA dengan jumlah: " + price);
        alert("Pembayaran DANA berhasil. Terima kasih atas pesanan Anda!");
      }
      
});

  