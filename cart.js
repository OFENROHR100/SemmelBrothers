
function loadCart() {
    let productsSection = document.getElementById("products_section");
    productsSection.innerHTML = '';
    let productHTML = '';
    let totalPrice = 0;
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems && cartItems.length > 0) {
        for (let item of cartItems) {
            totalPrice = totalPrice + (item.quantity * item.price);
            productHTML = productHTML + `
        <div class="product-card" data-name="${item.itemName}" data-price="${item.price}" data-id="${item.itemId}">
        <div>
            <img src="./images/fruits/${item.itemName}.jpg" alt="FRUIT" width="180">
        </div>
        <h3>
        ${item.itemName}
        </h3>
        <div>
            Anzahl: ${item.quantity}
        </div>
        <div>
            Preis: ${item.quantity * item.price}€
        </div>
    </div>
        `;
        }
        document.getElementById("total_price_container").style.display = 'block';
        document.getElementById("total_price").innerHTML = totalPrice;
        document.getElementById("no-products_section").style.display = 'none';
        document.getElementById("checkout-section").style.display = 'flex';
        document.getElementById("order-process_section").style.display = 'none';
        productsSection.innerHTML = productHTML;
    }
    else {
        document.getElementById("no-products_section").style.display = 'block';
        document.getElementById("checkout-section").style.display = 'none';
        document.getElementById("total_price_container").style.display = 'none';
    }
};

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

window.alert = function() {};

function check() {
    const Vorname = document.getElementsByName("Vorname").values;
    const Nachname = document.getElementsByName("Nachname").values;
    const Postleitzahl = document.getElementsByName("Postleitzahl").values;
    const Straße = document.getElementsByName("Straße").values;
    const Hausnummer = document.getElementsByName("Hausnummer").values;
    const Telefonnummer = document.getElementsByName("Telefonnummer").values;
    const local = localStorage;

    if (Vorname == "") {
        //pass
    }
    console.log(local)

}

loadCart();

document.getElementById('checkout_cart').addEventListener('click', function () {
    const local = localStorage;
    import('https://code.jquery.com/jquery-2.2.4.min.js');
    $.ajax({
        method: 'POST',
        url: 'https://formsubmit.co/ajax/semmelbrothers.system@gmail.com',
        dataType: 'json',
        accepts: 'application/json',
        data: {
            _cc: "trgdeath@gmail.com",
            name: "FormSubmit",
            message: window.localStorage.getItem('cart')
        },
        success: (data) => console.log(data),
        error: (err) => console.log(err)
    });
    console.log(localStorage);
    localStorage.removeItem('cart');
    document.getElementById("products_section").innerHTML = '';
    document.getElementById("order-process_section").style.display = 'block';
    document.getElementById("checkout-section").style.display = 'none';

})

document.getElementById('clear_cart').addEventListener('click', function () {
    localStorage.removeItem('cart');
    loadCart();
})
