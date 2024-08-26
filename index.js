import menuArray from "/data.js"
const sectOne = document.getElementById("sect-one")
const sectTwo = document.getElementById("sect-two")
const sectThree = document.getElementById("sect-three")
const orderTotal = document.getElementById("order-total")
const purchaseBtn = document.getElementById("purchase-btn")
const closePaymentBtn = document.getElementById("close-payment")
const orderAgainBtn = document.getElementById("order-again-btn")
const paymentForm = document.getElementById("payment-form")
let orderObj = {}
let orderArr = []
let orderExists = false

function renderSnacks() {
    menuArray.map(function(snack){
        sectOne.innerHTML += `<div class="snack">
                                <p class="emoji">${snack.emoji}</p>
                                <div class="snack-details">
                                    <h3 class="no-margin snack-name"> ${snack.name} </h3>
                                    <p class="no-margin little-padding grey"> ${snack.ingredients} </p>
                                    <p>$${snack.price}</p>
                                </div>
                                <button class="add-btn" data-name="${snack.name}" data-price="${snack.price}"> + </button>
                                <button class="subtract-btn" data-name="${snack.name}" data-price="${snack.price}"> - </button>
                            </div>`
    })
}

function renderOrder(){
    let total = ""
    let totalPrice = 0
    let totalCalc = ``
    orderArr.map(function(order){
        totalPrice += (order.no * order.price)
        total += `
                    <div class="total">
                            <div class="total-details">
                                <h5 class="total-name">${order.snack}</h5>
                                <p class="total-number">X ${order.no}</p>
                                <button class="remove-btn" data-rem="${order.snack}">remove</button>
                            </div>
                            <p class="total-price">$${order.price * order.no}</p>
                    </div>
                    `
    })
    
    
    
    totalCalc = `<div class="total-calc">
                    <p>Total Price:</p>
                    <p class="total-price">$${totalPrice}</p>
                </div>`
    orderTotal.innerHTML = `${total} <hr></hr> ${totalCalc}`
}

addEventListener("click",function(e){
    function newObj(){
                     orderObj = {
                                    snack : e.target.dataset.name,
                                    price : e.target.dataset.price,
                                    no : 1
                     }
                     orderArr.push(orderObj)
    }
    
    if(e.target.classList.contains("add-btn")){
            if(orderArr.length === 0){
                  newObj()
                  sectTwo.classList.remove('disabled')  
            }
            else {
                orderExists = false
                orderArr.forEach(function(order){
                    if(e.target.dataset.name === order.snack) {
                        order.no += 1
                        orderExists = true
                        return;
                    }  
                })
                if(!orderExists){
                        newObj()
                }     
            }
    }
    
    if(e.target.classList.contains("subtract-btn")){
        orderArr.forEach(function(order){
                    if(e.target.dataset.name === order.snack && order.no >=1) {
                        order.no -= 1
                        return;
                    }  
        })
    }
    
    if(e.target.classList.contains("remove-btn")){
        let me = {}
        orderArr.forEach(function(order){
                    if(e.target.dataset.rem === order.snack) {
                        orderArr.splice(orderArr.indexOf(order),1)
                        renderOrder()
                        return;
                    }
        })
    }
    if(orderArr.length === 0){
        sectTwo.classList.add("disabled")
    }
    renderOrder()
})

renderSnacks()
renderOrder()

purchaseBtn.addEventListener("click", function(){
    sectThree.classList.remove("disabled")
    sectOne.classList.add('unclickable')
    sectTwo.classList.add('unclickable')
    closePaymentBtn.addEventListener("click", function(){
        sectThree.classList.add("disabled")
        sectOne.classList.remove('unclickable')
        sectTwo.classList.remove('unclickable')
    })
})

paymentForm.addEventListener("submit", function(){
    event.preventDefault()
    sectThree.classList.add("disabled")
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')
    sectTwo.innerHTML = `<div class="ty-note">
                            <p>Thanks ${name}! Your order is on the way!</p>
                        </div>`
    orderAgainBtn.classList.remove("hidden")
})

orderAgainBtn.addEventListener("click", function(){
        location.reload()
})