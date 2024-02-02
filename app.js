// This api is basically used for the working of the application which is as following 
// https://github.com/fawazahmed0/currency-api



//Base url for the api
const BaseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

//elements for Dom
const dropdown=document.querySelectorAll(".dropdown select")
const button=document.querySelector("form button");
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const message=document.querySelector(".finalmsg p");


// for(code in countryList){
//     console.log(code);
// }

// selecting items form dropdown to add all the country names in the options
// dropdown is an Array
for(let select of dropdown){
    // countryList is an object 
    for(code in countryList){

        // creating a option element in the javascript
            let newoption= document.createElement("option");
            newoption.innerText=code;
            newoption.value=code;
            select.append(newoption)

            //logic to give select the name of country by default
            if(select.name=="from" && code==="USD"){
                newoption.selected="selected";
            }
            if(select.name=="to" && code==="INR"){
                newoption.selected="selected";
            }
        }
    // to update the flag image we use an event lisner which says if any value change then listen to the funciton 
    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);      
    });
}

const updateFlag=(element)=>{
    // console.log(element)
    let currencycode=element.value;
    let countrycode=countryList[currencycode]; //IN EU etc
    // console.log(countrycode);
    let newflaglink=`https://flagsapi.com/${countrycode}/flat/64.png`

    //look here the parent element of element is select-container class hence the image of selct container will be selected and elemetnt is specfied hence the accurate image will be choosen of
    let img=element.parentElement.querySelector("img")
    img.src=newflaglink;
};

// adding a event listner for the form submission
button.addEventListener("click",async (evt)=>{
    evt.preventDefault(); // form auto reload when submitted so we don't want this kind of porperty here in our fomr;
    work();
})

//function to change the value inside the link and give the output using the api 
async function work(){
    let amount=document.querySelector(".amount input")
    let amounntval=amount.value;
    if(amounntval<0 || amounntval===""){
        amounntval=1;
    }
    // console.log(fromcurr.value);
    // console.log(tocurr.value);
    const url=`${BaseUrl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

    // console.log(url)
    let response= await fetch(url);
    // console.log(response);
    let valres= await response.json();
    // console.log(valres);

    let currvalue=valres[tocurr.value.toLowerCase()];
    // console.log(currvalue);
    message.innerText=`${amounntval} ${fromcurr.value} = ${amounntval*currvalue} ${tocurr.value}`;


}