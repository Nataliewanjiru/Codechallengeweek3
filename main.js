let box= document.getElementById("posters")


function display(data){
var p = document.createElement("p")
p.innerText="Menu"
p.id ="menu"
document.body.appendChild(p)
let click = 0;
let check = 0    
p.addEventListener("click", ()=>{  
    let list =document.getElementById("films") 
    if(click === 1){
        list.style.display= "none"
        click = 0
    }else{
    click = 1
    list.innerText=""
    list.style.display = "block"
    }

    for(let i =0; i<data.length; i++){
        var li = document.createElement("li")
        li.innerText += data[i].title
        li.setAttribute("class","filmitem")
        list.appendChild(li)
        document.body.appendChild(list)
   
    li.addEventListener("click", ()=>{
       
       let image = document.createElement("img")
       if(check === 1){
        box.style.display= "none"
         check = 0
       }else{
       check = 1
       box.innerHTML = " "
       box.style.display = "block"
       }
       image.id = "image"
       image.setAttribute("src",data[i].poster)
       box.append(image)
       document.body.append(box)
       let h2 = document.createElement("h2")
       h2.innerText = data[i].title
       box.append(h2)
       let p =document.createElement("p")
       p.innerHTML=`
         ${data[i].description}
         <br><br>
          Duration: ${data[i].runtime}
          <br><br>
          Showtime: ${data[i].showtime}
          `
          box.append(p)
          buy(data,i)
           }) }
    }) 
}



function buy(detail,i){
        let buyButton = document.createElement("button")
        let p = document.createElement("p")
        p.setAttribute("id","status")
        let remaining = detail[i].capacity - detail[i].tickets_sold
        p.innerText = "Tickets remaining: " + remaining;
        box.append(p)
        buyButton.innerText="Buy Ticket"
        box.append(buyButton)
        
        buyButton.addEventListener("click",()=>{
        detail[i].tickets_sold +=1
        remaining = detail[i].capacity - detail[i].tickets_sold
        p.innerText ="Tickets remaining: " + remaining
        console.log(remaining)
        if (remaining <=0){
            alert("Tickets soled out!")
            p.innerText = "Tickets remaining : Tickets sold out"
            detail[i].tickets_sold = detail[i].capacity
        }
       fetch(`http://localhost:3000/films/${detail[i].id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({tickets_sold: detail[i].tickets_sold}),
            })
        })

    }


   
fetch("http://localhost:3000/films")
  .then(response => response.json())
  .then(data => {
    display(data);
  });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  