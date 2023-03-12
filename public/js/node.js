// document.cookie = 'json=sss'
// alert(document.cookie)

// function writeCookie(name, val, expires){
// let date = new Date();
// date.setDate(date.getDate() + expires)
// document.cookie = name + '=' + val + '; path=/; expires=' + date.toUTCString()
// }


// Cookies.set('name','ostap');
// console.log(Cookies.get('name'))
let themeValue;
$('.wrap').css('background-color',Cookies.get('theme' || 'white'))
$('#btn').click(function(){
    if(Cookies.get('theme')== 'white'){
        themeValue = 'black';
        Cookies.set('theme',themeValue)
        console.log(Cookies.get('theme'))
        $('.wrap').css('background-color',themeValue);
    }else{
        themeValue = 'white';
        Cookies.set('theme',themeValue)
        $('.wrap').css('background-color',themeValue);   
        console.log(Cookies.get('theme'))
    }
})


setInterval(function(){
$('.tgPopup').css('margin-left','0px')
},5000)


$('.basket__btn').click(function(){
   $('.basket__btn').css('display','none'); 
   $('.wrap__basket').css('margin-right','0px'); 
})

$('.cancelBnt').click(function(){
    $('.basket__btn').css('display','flex'); 
    $('.wrap__basket').css('margin-right','-670px'); 
})

let data = ''
fetch('js/phone.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data = data;
    for(let el of data){
       $('.main').append(`
       <div class="wrap__item">
       <div class="item__img" id="img${el.id}"></div>
       <div class="item__name">${el.name}</div>
       <div class="item__row">
           <div class="item__left">
               <div class="item__price">${el.price}</div>
           </div>
           <div class="item__right">
               <div class="item__buyBtn" id="buy${el.id}">Buy</div>
               <div class="item__toBasketBtn" id="basket${el.id}">To Basket</div>
               
           </div>
       </div>
   </div>
       `)
       $(`#img${el.id}`).css('background-image',`url(img/${el.img})`)
    }
    

    let basketDb;

    if(Cookies.get('basketArr') == undefined){
      basketDb =[];
    }else{
   basketDb = Cookies.get('basketArr').split(',')
    }

    console.log(basketDb)
    if(basketDb.length != 0){
      try{
        console.log(basketDb)
        for(let i = 0; i < basketDb.length;i++){
          appendToBasket(basketDb[i])
      }
      }catch(e){
      console.log(e)
      }
  }
 
  
    $('.item__toBasketBtn').click(function(e){
        let itemId =e.target.id.substr(e.target.id.length - 1)
          for(let el of data){
           
            if(itemId == el.id){
               if(basketDb.length == 0){
                basketDb.push(`${el.id}`)
                Cookies.set('basketArr', basketDb)
                appendToBasket(itemId)
                console.log('first')
                }else{
              if(!basketDb.includes(`${el.id}`)){
                basketDb.push(`${el.id}`)
                appendToBasket(itemId)
                console.log('second')
                Cookies.set('basketArr', basketDb)
                console.log(basketDb)
              }else{
                alert('you have this item')
              }
               }
            }
        }
    })

    function appendToBasket(itemId){
      for(let el of data){
        if(itemId == el.id){
          $('.wrap__basket').append(`
          <div class="basket__item">
          <div class="basket__item__img" id="basketItemImgId${el.id}"></div>
          <div class="basket__item__row">
              <div class="basket__item__name">${el.name}</div>
              <div class="basket__item__btn" id="basketItemBtnId${el.id}">Buy</div>
          </div>
      </div>
          `)
          $(`#basketItemImgId${el.id}`).css('background-image',`url(img/${el.img})`)
        }
      }
    }
  })

 

    