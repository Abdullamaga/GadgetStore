let data = [
  {
    id: 1,
    name: "iPhone 13 pro",
    price: 60000,
    img: "./assets/products/iphone-13-pro.png",
    inCart: false,
  },

  {
    id: 2,
    name: "iPhone 12",
    price: 40000,
    img: "./assets/products/iphone-12.png",
    inCart: false,
  },

  {
    id: 3,
    name: "iPhone 11",
    price: 32000,
    img: "./assets/products/iphone-11.png",
    inCart: false,
  },

  {
    id: 4,
    name: "iPhone 12 pro",
    price: 52000,
    img: "./assets/products/iphone-12-pro.png",
    inCart: false,
  },

  {
    id: 5,
    name: "iPhone 13",
    price: 45000,
    img: "./assets/products/iphone-13.png",
    inCart: false,
  },

  {
    id: 6,
    name: "iPhone 14 pro",
    price: 75000,
    img: "./assets/products/iphone-14-pro.png",
    inCart: false,
  },

  {
    id: 7,
    name: "MacBook Air M1",
    price: 72000,
    img: "./assets/products/macbook-m1.png",
    inCart: false,
  },
];

let cartData = []

let productsWrapper = document.querySelector(".products-wrapper");
let cartModalProducts = document.querySelector(".cart-modal-products")
let cartIcon = document.querySelector(".cart-icon")
let cartModal = document.querySelector(".cart-modal")
let totalSum = document.querySelector(".cart-modal-order-sum-number")
let cartModalOrderBtn = document.querySelector(".cart-modal-order-btn")
let introArrow = document.querySelector(".intro-arrow");

introArrow.addEventListener("click", () => {
  productsWrapper.scrollIntoView({
    behavior: "smooth"
  })
})


cartIcon.addEventListener("click", () => {
  cartModal.classList.toggle("hide")
})

function renderProducts() {
  productsWrapper.innerHTML = ''
  for (let i = 0; i < data.length; i++) {
    productsWrapper.innerHTML += `
                <div class="product-card">
                        <div class="product-img">
                            <img src=${data[i].img} alt="">
                        </div>

                        <div class="product-info">
                            <span class="product-name">
                                ${data[i].name}
                            </span>
                            <span class="product-price">
                                ${data[i].price} руб.
                            </span>
                            <button class="product-btn ${data[i].inCart ? "inCart" : ""} "> 
                            ${data[i].inCart === true ? "в корзине" : "купить"}
                            </button>
                        </div>
                    </div>
        `;
  }

  let productBtns = document.querySelectorAll(".product-btn");
  for (let i = 0; i < productBtns.length; i++) {
    if (data[i].inCart === false) {
      productBtns[i].addEventListener("click", () => {
        cartData.push(data[i]);
        data[i].inCart = true;
        renderProducts()
        renderCartProducts()
      })
    }
  }
}

renderProducts();

function renderCartProducts() {
  let totalSumNumber = 0;

  cartModalProducts.innerHTML = ''
  for (let i = 0; i < cartData.length; i++) {
    totalSumNumber += cartData[i].price
    cartModalProducts.innerHTML += `<div class="cart-modal-product">
              <div class="cart-modal-product-img">
                <img src=${cartData[i].img} alt="">
              </div>

              <div class="cart-modal-product-info">
                <span class="cart-modal-product-name">${cartData[i].name}</span>
                <span class="cart-modal-product-price">${cartData[i].price} руб.</span>
                <button class="cart-modal-product-btn">Удалить</button>
              </div>
            </div>`
  }
  totalSum.innerHTML = totalSumNumber + " руб."

  let deleteBtns = document.querySelectorAll(".cart-modal-product-btn");

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", () => {
      let index = data.indexOf(data.find((el) => el.id === cartData[i].id))
      data[index].inCart = false;
      cartData.splice(i, 1);
      renderProducts()
      renderCartProducts();
    });
  }
}

cartModalOrderBtn.addEventListener("click", () => {
  if (cartData.length) {

    cartData = [];
    alert("Спасибо за покупку")
    for (let i = 0; i < data.length; i++) {
      data[i].inCart = false
    }
    renderProducts()
    renderCartProducts()
  }

})

