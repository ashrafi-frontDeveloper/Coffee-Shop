// Nav Menu - 
const submenuOpenBtn = document.querySelector(".submenu-open-btn");
const submenu = document.querySelector(".submenu");
const navOpenBtn = document.querySelector(".nav-icon");
const navCloseBtn = document.querySelector(".nav-close-btn");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");

// Nav Shopping-cart
const cartOpenBtn = document.querySelector('.cart-icon')
const cart = document.querySelector('.cart')
const cartCloseBtn = document.querySelector('.cart-close-btn')

// افزودن رویداد کلیک به دکمه‌ها
const toggleThemeBtns = document.querySelectorAll('.toggle-theme');

// تنظیم تم بر اساس localStorage هنگام بارگذاری صفحه
if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

toggleThemeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });
});


// Nav Menu - Shapping cart

submenuOpenBtn.addEventListener("click", (e) => {
  e.currentTarget.parentElement.classList.toggle("text-orange-300");
  submenu.classList.toggle("submenu--open");
})
navOpenBtn.addEventListener("click",() => {
  nav.classList.remove("-right-64");
  nav.classList.add("right-0");
  overlay.classList.add("overlay--visible");
  
})


function closeNav() {
  nav.classList.remove("right-0");
  nav.classList.add("-right-64");
  overlay.classList.remove("overlay--visible");
}

navCloseBtn.addEventListener("click",closeNav)
overlay.addEventListener("click",closeNav)

// Nav - cart-Shopping

cartOpenBtn.addEventListener('click', () => {
  cart.classList.remove("-left-64")
  cart.classList.add("left-0")
  overlay.classList.add("overlay--visible");
})

function closeCart() {
  cart.classList.remove("left-0");
  cart.classList.add("-left-64");
  overlay.classList.remove("overlay--visible");
}
cartCloseBtn.addEventListener('click', closeCart)

// داینامیک کردن محصولات
const productsContainer = document.querySelector('#products')
const cartContainer = document.querySelector('#cart-container')
const totalPriceElement = document.querySelector('#total-price')
const totalPriceMobileElement = document.querySelector('#total-price-mobile')
const cartContainerMobile = document.querySelector('#cartContainerMobile')
const emptyCartMessage = document.querySelector('#empty-cart-message')
// لیست محصولات
let products = [
  {id:1 , name: "قهوه ترک بن مانو مقدار 250 گرم" , price: 175_000 , img: './img/products/p1.png' , inStock: false , quantity: 1},
  {id:2 , name: "قهوه عربیکار بن مانو مقدار 250 گرم" , price: 215_000 , discount: 12, img: './img/products/p2.png' , inStock: true , quantity: 1},
  {id:3 , name: "قهوه روبوستا بن مانو مقدار 250 گرم" , price: 165_000 , img: './img/products/p3.png' , quantity: 1},
  {id:4 , name: "قهوه لیبریکا بن مانو مقدار 250 گرم" , price: 155_000 , discount: 12, img: './img/products/p4.png' , inStock: true , quantity: 1},
  {id:5 , name: "قهوه اکسلسا بن مانو مقدار 250 گرم" , price: 165_000 , img: './img/products/p5.png' , inStock: true , quantity: 1},
  {id:6 , name: "پودر کاپچینو بن مانو مقدار 250 گرم" , price: 125_000 , discount: 12, img: './img/products/p6.png' , inStock: true , quantity: 1},
  {id:7 , name: "پودر قهوه اسپرسو بن مانو مقدار 250 گرم" , price: 130_000 , img: './img/products/p7.png' , inStock: true , quantity: 1},
  {id:8 , name: "قهوه دله بن مانو مقدار 250 گرم" , price: 75_000 , img: './img/products/p8.png' , inStock: false , quantity: 1}
]
// سبد خرید
let basketBuy = []
// داینامیک کردن محصولات

function renderProducts() {
  productsContainer.innerHTML = ''
  products.forEach(product => {
    const discountedPrice = product.discount > 0 
    ? (product.price - (product.price * product.discount) / 100).toFixed(0) 
    : product.price;
    productsContainer.innerHTML += `
    <div class="p-2 md:p-5 bg-white dark:bg-zinc-700 rounded-2xl shadow-normal ${!product.inStock ? 'opacity-50' : ''}">
        <div class="relative mb-2 md:mb-5">
            <img class="w-32 md:w-auto mx-auto" src="${product.img}" loading="lazy" alt="products">
            ${product.discount > 0 
                ? `<span class="absolute top-1.5 right-1.5 block h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaDemiBold text-white bg-orange-300 dark:text-zinc-700 px-2.5 md:px-3.5 rounded-full">${product.discount}%</span>`
                : ''
            }
        </div>
        <h5 class="h-10 md:h-14 font-DanaMedium text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-2">${product.name}</h5>
        <div class="flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
            ${product.inStock 
                ? `<div class="text-teal-600 dark:text-emerald-500">
                    <span class="font-DanaDemiBold text-base md:text-xl">${discountedPrice}</span>
                    <span class="text-xs md:text-sm tracking-tighter">تومان</span>
                </div>`
                : '' 
            }
            ${!product.inStock 
                ? `<div>
                    <span class="text-red-400 text-base md:text-xl">موجود نیست</span>
                </div>` 
                : ''
            }
            ${product.discount > 0
                ? `<div class="offer">
                    <span class="text-xs xl:text-xl">${product.price}</span>
                </div>`
                : ''
            }
        </div>
        <div class="flex items-center justify-between mt-2.5">
            <div class="flex items-center gap-x-2.5 md:gap-x-3">
                <span class="flex-center w-[26px] md:w-9 h-[26px] md:h-9 rounded-full bg-gray-100 dark:bg-zinc-800 
                    ${!product.inStock ? 'cursor-not-allowed opacity-50' : 'hover:bg-teal-600 dark:hover:bg-emerald-500 hover:text-white'}
                    text-gray-400 transition-all cursor-pointer">
                    <svg class="basketBuys w-4 h-4 md:w-[22px] md:h-[22px]">
                        <use href="#shopping-cart"></use>
                    </svg>
                </span>
                <span class="block rounded-full 
                    ${!product.inStock ? 'cursor-not-allowed opacity-50' : 'hover:text-teal-600 dark:hover:text-emerald-500'}
                    text-gray-400 transition-all cursor-pointer">
                    <svg class="w-4 h-4 md:w-6 md:h-6">
                        <use href="#arrow-right-left"></use>
                    </svg>
                </span>
            </div>
            <div class="flex text-yellow-400">
                <svg class="w-4 md:h-6 h-4 md:w-6 text-gray-300 dark:text-gray-400">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 md:h-6 h-4 md:w-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 md:h-6 h-4 md:w-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 md:h-6 h-4 md:w-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 md:h-6 h-4 md:w-6">
                    <use href="#star"></use>
                </svg>
            </div>
        </div>
    </div>
`
  })
  // مدیریت و ساخت سبد خرید
function addToCart() {
  const cartShopping = document.querySelectorAll('.basketBuys');
  cartShopping.forEach((item, index) => {
    item.addEventListener('click', () => {
      const selectedProduct = products[index]; // محصول انتخاب‌شده

      // بررسی اینکه محصول موجود است یا نه
      if (!selectedProduct.inStock) {
        alert("این محصول موجود نیست.");
        return;  // جلوگیری از افزودن محصول به سبد خرید اگر موجود نباشد
      }

      // بررسی اینکه محصول قبلاً در سبد خرید هست یا نه
      const existingProduct = basketBuy.find(product => product.id === selectedProduct.id);

      if (existingProduct) {
        // اگر محصول وجود دارد، فقط تعداد آن را افزایش بده
        existingProduct.quantity += 1;
      } else {
        // اگر محصول وجود ندارد، به سبد خرید اضافه کن
        basketBuy.push({ ...selectedProduct, quantity: 1 });
      }

      // نمایش آرایه سبد خرید در کنسول
      console.log("basket: ", basketBuy);

      // بروزرسانی قیمت کل
      updateTotalPrice();
      // بروزرسانی قیمت کل
      updateTotalPriceMobile();

      // فراخوانی renderCart بعد از به‌روزرسانی سبد خرید
      renderCart();
      // فراخوانی renderCartMobile بعد از به‌روزرسانی سبد خرید
      renderCartMobile();
    });
  });

  // نمایش سبد خرید
  function renderCart() {
    console.log("Rendering Cart...");
    cartContainer.innerHTML = ''
      
      basketBuy.forEach(product => {
        cartContainer.innerHTML += `
        <div class="pb-1 border-b border-b-gray-300 dark: border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5">
              <div class="flex gap-x-2.5">
                  <img src="${product.img}" class="w-30 h-30" alt="products 1">
                  <div class="flex flex-col justify-between">
                      <h4 class="font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2">${product.name}</h4>
                      <div>
                      ${product.discount > 0
                          ?`<span class="text-teal-600 dark:text-emerald-500 text-xs tracking-tighter">${product.discount} تخفیف %</span>`
                          :''}
                          <div class="text-zinc-700 dark:text-white font-DanaDemiBold">
                              ${product.price}
                              <span class="font-Dana text-xs">تومان</span>
                          </div>
                          <svg class="closes cursor-pointer w-5 h-5" data-product-id="${product.id}"><use href="#x-mark"></use></svg>
                      </div>
                  </div>
              </div>
          </div>
        `
      });
      const closeBtns = document.querySelectorAll('.closes');
      closeBtns.forEach(item => {
          item.addEventListener('click', () => {
              const productId = item.dataset.productId; // دریافت شناسه محصول از data attribute
              removeFromCart(Number(productId)); // فراخوانی تابع برای حذف محصول از سبد خرید
          });
});

// حذف محصول از سبد خرید
function removeFromCart(productId) {
    basketBuy = basketBuy.filter(product => product.id !== productId); // حذف محصول از آرایه
    renderCart(); // به‌روزرسانی نمایش سبد خرید
    updateTotalPrice(); // به‌روزرسانی قیمت کل
}


  }
// نمایش سبد خرید در موبایل
function handleCartClick(productId) {
  const productInCart = basketBuy.find(item => item.id === productId);
  
  if (productInCart) {
      // اگر محصول قبلاً در سبد خرید باشد، تعداد آن را افزایش می‌دهیم
      productInCart.number += 1;
  } else {
      // اگر محصول قبلاً در سبد خرید نباشد، آن را به سبد خرید اضافه می‌کنیم
      const productToAdd = products.find(item => item.id === productId); // فرض می‌کنیم products آرایه‌ای از محصولات است
      if (productToAdd) {
          basketBuy.push({
              ...productToAdd,
              number: 1 // ابتدا یک عدد از محصول به سبد خرید اضافه می‌شود
          });
      }
  }

  renderCartMobile(); // به‌روزرسانی نمایش سبد خرید
  updateTotalPriceMobile(); // به‌روزرسانی قیمت کل
}

// نمایش سبد خرید در موبایل
function renderCartMobile() {
  console.log("Rendering Cart...");
  cartContainerMobile.innerHTML = ''
  basketBuy.forEach(product => {
    cartContainerMobile.innerHTML += `
    <div class="flex gap-x-1 border-b border-b-gray-100 dark:border-b-white/10">
          <img src="${product.img}" class="w-[90px] h-[90px]" alt="products 1">
          <div class="flex flex-col justify-between gap-y-1.5">
              <h4 class="font-DanaMedium text-zinc-700 dark:text-white text-sm line-clamp-2">${product.name}</h4>
              <div>
              ${product.discount > 0
                  ?`<span class="text-teal-600 dark:text-emerald-500 font-DanaMedium text-xs tracking-tighter">${product.discount} % تخفیف</span>`
                  :''}
                  <div class="text-zinc-700 dark:text-white font-DanaDemiBold">
                      ${product.price}
                      <span class="font-Dana text-xs">تومان</span>
                     <div class="flex items-center justify-between">
                      <svg class="closes cursor-pointer w-5 h-5" data-product-id="${product.id}"><use href="#x-mark"></use></svg>
                      <span class="text-gray-300 tracking-tighter text-xs md:text-xl" id="someProduct">${product.quantity} عدد</span>
                     </div>
                  </div>
              </div>
          </div>
    </div>
    `
  });
  const closeBtns = document.querySelectorAll('.closes');
    closeBtns.forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.dataset.productId; // دریافت شناسه محصول از data attribute
            removeFromCartMobile(Number(productId)); // فراخوانی تابع برای حذف محصول از سبد خرید
        });
});

// حذف محصول از سبد خرید
function removeFromCartMobile(productId) {
  basketBuy = basketBuy.filter(product => product.id !== productId); // حذف محصول از آرایه
  renderCartMobile(); // به‌روزرسانی نمایش سبد خرید
  updateTotalPriceMobile(); // به‌روزرسانی قیمت کل
}
}

// حذف محصول از سبد خرید
function removeFromCartMobile(productId) {
  basketBuy = basketBuy.filter(product => product.id !== productId); // حذف محصول از آرایه
  renderCartMobile(); // به‌روزرسانی نمایش سبد خرید
  updateTotalPriceMobile(); // به‌روزرسانی قیمت کل
}


// نمایش سبد خرید در موبایل
function renderCartMobile() {
  console.log("Rendering Cart...");
  cartContainerMobile.innerHTML = ''; // خالی کردن محتوای قبلی
  basketBuy.forEach(product => {
      cartContainerMobile.innerHTML += `
      <div class="flex gap-x-1 border-b border-b-gray-100 dark:border-b-white/10">
          <img src="${product.img}" class="w-[90px] h-[90px]" alt="products 1">
          <div class="flex flex-col justify-between gap-y-1.5">
              <h4 class="font-DanaMedium text-zinc-700 dark:text-white text-sm line-clamp-2">${product.name}</h4>
              <div>
                  ${product.discount > 0
                      ?`<span class="text-teal-600 dark:text-emerald-500 font-DanaMedium text-xs tracking-tighter">${product.discount} % تخفیف</span>`
                      :''}
                  <div class="text-zinc-700 dark:text-white font-DanaDemiBold">
                      ${product.price}
                      <span class="font-Dana text-xs">تومان</span>
                      <div class="flex items-center justify-between">
                          <svg class="closes cursor-pointer w-5 h-5" data-product-id="${product.id}"><use href="#x-mark"></use></svg>
                          <span class="text-gray-300 tracking-tighter text-xs md:text-xl" id="someProduct-${product.id}">${product.quantity} عدد</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `;
  });

  const closeBtns = document.querySelectorAll('.closes');
  closeBtns.forEach(item => {
      item.addEventListener('click', () => {
          const productId = item.dataset.productId;
          removeFromCartMobile(Number(productId)); // حذف محصول از سبد خرید
      });
  });
}

// حذف محصول از سبد خرید
function removeFromCartMobile(productId) {
  basketBuy = basketBuy.filter(product => product.id !== productId); // حذف محصول از آرایه
  renderCartMobile(); // به‌روزرسانی نمایش سبد خرید
  updateTotalPriceMobile(); // به‌روزرسانی قیمت کل
}


// حذف محصول از سبد خرید
function removeFromCartMobile(productId) {
    basketBuy = basketBuy.filter(product => product.id !== productId); // حذف محصول از آرایه
    renderCartMobile(); // به‌روزرسانی نمایش سبد خرید
    updateTotalPriceMobile(); // به‌روزرسانی قیمت کل
}

}



// محاسبه قیمت کل
function updateTotalPrice() {
  let totalPrice = 0;
  basketBuy.forEach(product => {
    const productPrice = product.discount > 0 
      ? product.price - (product.price * product.discount) / 100 
      : product.price;
    totalPrice += productPrice * product.quantity;
  });
  // نمایش قیمت کل
  totalPriceElement.innerHTML = `${totalPrice.toLocaleString()}`;
}
// محاسبه قیمت کل در موبایل
function updateTotalPriceMobile() {
  let totalPrice = 0;
  basketBuy.forEach(product => {
    const productPrice = product.discount > 0 
      ? product.price - (product.price * product.discount) / 100 
      : product.price;
    totalPrice += productPrice * product.quantity;
  });
  // نمایش قیمت کل
  totalPriceMobileElement.innerHTML = `${totalPrice.toLocaleString()}`;
}

// فراخوانی تابع اصلی
addToCart();


}


renderProducts()