let label= document.getElementById('label');
let shoppingcart= document.getElementById('shopping-cart');



let basket= JSON.parse(localStorage.getItem("data")) || [];
//console.log(basket);

let calculation= ()=>{
    let carticon= document.getElementById("cartamount");
    carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
  // console.log();
 }
 
 calculation();
 
 let generatecartitem= ()=>{
    if(basket.length!== 0){
     //console.log("not empty");
      return shoppingcart.innerHTML= basket
      .map((x)=>{
       // console.log(x);
        let{ id, item}=x;
        let search=shopitemsDATA.find((y)=>y.id === id) || [];
        return` <div class="cart-item">
        <img width=100 src=${search.img} alt="">
        <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price"> $ ${search.price}</p>
            </h4>
            <i onclick="removeitem(${id})" class="bi bi-bag-x"></i>
            
            </div>

                <div class="button">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            
                </div>
            <h3>$ ${item *search.price}</h3>
        </div>
         </div>`
      })

    }
    else{
       // console.log("emptyy");
    shoppingcart.innerHTML= ``
    label.innerHTML= `
    <h3>Your cart is empty</h3>
    <p>You have no items in your cart. Please add some items to your cart.</p>
    <a href="index.html">
    <button class="btnprimary">Continue Shopping</button>
    </a>
    `

    }
 }

 generatecartitem();

 let increment= (id)=>{
    let selected_item= id;
   
    let search= basket.find((x)=>x.id === selected_item.id);
   if(search===undefined){
    basket.push({id: selected_item.id,
       item: 1,
       })
   } 
   else{
    search.item+=1;
   }  
   
  
 //console.log(basket);
 generatecartitem();

 update(selected_item.id);

 
 localStorage.setItem("data", JSON.stringify(basket));
 };
 
 let decrement= (id)=>{
    //let selected_item= id;
    //console.log(selected_item.id);
 
    let selected_item= id;
   
    let search = basket.find((x)=>x.id === selected_item.id);
    if(search === undefined) return ;
    else if(search.item === 0) return ;
    else
    {
    search.item-=1;
    }  
   
    update(selected_item.id);
   basket=basket.filter((x)=> x.item !== 0);
   generatecartitem();
 
 localStorage.setItem("data", JSON.stringify(basket));
 };

 let update= (id)=>{
    let search= basket.find((x)=>x.id === id);
   // console.log(search.item);
    document.getElementById(id).innerHTML= search.item;
    calculation();
    Total();
 };
 

 let removeitem= (id)=>{
 let selected_item=id;
 //console.log(selected_item.id);
    basket=basket.filter((x)=>x.id !== selected_item.id);
    generatecartitem();
    calculation();
    Total();
    localStorage.setItem("data", JSON.stringify(basket));
}

let Clear= ()=>{
    basket=[];
    generatecartitem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    //Total();
}
 
let check=()=>{
    alert("Thank you for shopping with us");
    
}

let Total= ()=>{
    if(basket.length!==0){
        let amount= basket.map((x)=>{
            let{item,id}=x;
            let search=shopitemsDATA.find((y)=>y.id === id) || [];
            return item*search.price;

        }).reduce((x,y)=>x+y,0);
        //console.log(amount);
        label.innerHTML=`
        <h3>Total Bill: $ ${amount}</h3>
        <button onclick="check()" class="Checkout">Checkout</button>
        <button onclick="Clear()" class="Clear">Clear Cart</button>
        
        `
    }
    else{

    }
}

Total();

