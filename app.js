const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const bag = document.querySelector(".bi-bag");
const cartmenu = document.querySelector(".cart");
const message = document.querySelector(".added");
const links = menu.querySelectorAll("ul li a");
let cartItems = [];

window.addEventListener("keydown", (e) => {
  if (e.key == "Escape" && hamburger.classList.contains("active")) {
    hamburger.classList.remove("active");
    menu.classList.remove("is-active");
  }
  if (e.key == "Escape" && cartmenu.classList.contains("show")) {
    cartmenu.classList.remove("show");
  }
});

hamburger.addEventListener("click", () => {
  cartmenu.classList.remove("show");
  hamburger.classList.toggle("active");

  if (hamburger.classList.contains("active")) {
    menu.classList.add("is-active");
  } else {
    menu.classList.remove("is-active");
  }

  if (hamburger.classList.contains("active")) {
    menu.classList.add("is-active");
  } else {
    menu.classList.remove("is-active");
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("is-active");
  });
});
bag.addEventListener("click", () => {
  cartmenu.classList.toggle("show");
});

const cart = {
  key: "products.json",
  setCart: function () {
    cartmenu.innerHTML = " ";
    fetch(this.key)
      .then((res) => res.json())
      .then((data) => {
        for (i of cartItems) {
          let template = `
              
        <img
          src="${data[i].img}"
          alt=""
        />
        <div class="title">${data[i].title}</div>`;
          const item = document.createElement("div");
          item.className = "item";
          item.innerHTML = template;
          cartmenu.appendChild(item);
        }
      });
  },
};
const products = {
  key: "products.json",
  getproducts: function () {
    fetch(this.key)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item, index) => {
          const container = document.querySelector(".store-container");
          let template = `
          <div class="img">
            <img
              src="${item.img}"
              alt="${item.title}"
            />
          </div>
          <div class="info">
            <div class="title">${item.title}</div>
            <div class="description">
            ${item.description}
            </div>
          </div>
          <button class="buy">add to cart</button>
        </div>`;
          let card = document.createElement("div");
          card.className = "card";
          card.setAttribute("data-index", index);
          card.innerHTML = template;
          container.append(card);
        });
      })
      .then(() => {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          card.querySelector("button").addEventListener("click", () => {
            cartItems.push(card.getAttribute("data-index"));
            message.classList.add("was-added");
            setTimeout(() => {
              message.classList.remove("was-added");
            }, 2000);
            cart.setCart();
          });
        });
      });
  },
};

products.getproducts();

let myrequest = new XMLHttpRequest();
myrequest.open("GET", "products.json");
myrequest.addEventListener("load", () => {
  if (myrequest.status == 200 && myrequest.readyState == 4) {
    console.table(JSON.parse(myrequest.responseText));
    mydata = JSON.parse(myrequest.responseText);
  } else {
    console.error("tf!");
  }
});
myrequest.send();
