const keylayout=["`1234567890-=","qwertyuiop[]|","asdfghjkl;'","zxcvbnm,./"];
let k = document.getElementById("keyboard-layout");
let box_button = (item) => {
    return '<div class="key-button">'+item.toUpperCase()+'</div>';
}
let createLayout= (layout) => {
    let tem = "";
    for(let i = 0; i<layout.length;++i){
         tem=tem+'<div class=\"board\">'
         charA = Array.from(layout[i]);
         let la = charA.reduce(mytemplate, "");
         tem = tem+la;
         tem = tem+"</div>";

    }
    k.innerHTML= tem;
} 
function mytemplate(prev, value) {
    return prev + box_button(value);
  }
function addEvents(){
    let eles = document.querySelectorAll(".key-button");
    for(let ele of eles){
        ele.addEventListener("click",function (){
            alert(this.innerHTML);
        })
    }
}
createLayout(keylayout);
addEvents();