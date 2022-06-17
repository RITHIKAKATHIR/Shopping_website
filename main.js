let shop = document.getElementById('shop');
console.log(shop);

let basket= JSON.parse(localStorage.getItem("data")) || [];


let generateShop =()=>{
  return (shop.innerHTML = shopitemsDATA.map((x)=>{
      let{id,name,price,desc,img} = x;
      let search= basket.find((y)=>y.id === id) || [];
      return `
      <div id=product-id-${id} class="item">
         <img width="220" src=${img} alt=""> 
         <div class="details">
            <h3>${name}</h3>
            <p> 
                 ${desc}
            </p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="button">
                    <i onclick=" decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${search.item === undefined? 0:search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                  
                </div>
                
            </div>
         </div>
      </div>
      `
  }).join(""))
};
generateShop();

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
//console.log(basket);

localStorage.setItem("data", JSON.stringify(basket));
};

let update= (id)=>{
   let search= basket.find((x)=>x.id === id);
  // console.log(search.item);
   document.getElementById(id).innerHTML= search.item;
   calculation();
};

let calculation= ()=>{
   let carticon= document.getElementById("cartamount");
   carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
 // console.log();
}

calculation();

