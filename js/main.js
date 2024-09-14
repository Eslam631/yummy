/// <reference types="../@types/jquery"/>
main('')

let categories=[];
let products=[];
let country=[];
let ingredients=[];
let productsByCategory = [];

async function meals() {
    try {   
        $('.loading').removeClass("hidden")
        
        let api=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        let data=await api.json()
        categories=data.categories;
        
         
         displayData()
         $('.loading').addClass("hidden")
         $(document).on('click', '.categories', function(e) {
             let nameMeal = $(this).find('h2').html(); 
             
             
            mealsCatogry(nameMeal)
     
              $("section").addClass("hidden")
             $("#home").removeClass("hidden")
     
         });
         
        
    } catch (error) {
        
    }

}


function displayData(){
    let cartona = ``;
    for(let i=0;i<categories.length;i++){
    cartona+=`  
                <div class=" categories  p-4">

                    <div class=" relative group overflow-hidden ">
                        <img src="${categories[i].strCategoryThumb}" class=" rounded  " alt="">
                        <div
                            class="text-center  absolute bottom-0 left-0 top-0 right-0 transition-all duration-500 rounded bg-stone-50 bg-opacity-75 translate-y-full group-hover:translate-y-0">
                            <h2 class="text-black text-3xl font-semibold">${categories[i].strCategory}</h2>
                            <p class="text-black p-10">${categories[i].strCategoryDescription}</p>
                        </div>
                    </div>
                    </div>`
    }
    document.getElementById('meals').innerHTML=cartona;



}
meals()

async function main(name) {
    try {$('.loading').removeClass("hidden")
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        let data = await api.json()
        products =data.meals
    console.log(products)
        displayDataMain()
        $('.loading').addClass("hidden")
        $(".discripatin").on('click',function(){
            let idMeal=$(this).attr('id')
            deatiles(idMeal)
            $("aside").addClass("hidden")
            $("section").addClass("hidden")
            $("#dscribtion").removeClass("hidden")
            $('.loading').addClass("hidden")
        })
    } 
  
    catch (error) {
        
    }
}

function displayDataMain(){
    let cartona = ``
  
    for(let i=0;i<products.length;i++){
        if(i<20){
            cartona+=`
            <div class=" discripatin  p-4" id="${products[i].idMeal}">
                     <div class=" relative group overflow-hidden ">
                         <img src="${products[i].strMealThumb}" class="rounded  " alt="">
                         <div
                             class="flex items-center absolute bottom-0 left-0 top-0 right-0 transition-all duration-500 rounded bg-opacity-75 bg-stone-100 translate-y-full group-hover:translate-y-0">
                             <h2 class="text-black text-3xl font-semibold">${products[i].strMeal}</h2>
                         </div>
                     </div>
 
                 </div>
 `
        }
    
    }
    document.getElementById("main").innerHTML=cartona
}



$(".open i").on('click',function(){ $(".outerside").animate({width:'toggle',},500)
$(".open i").toggleClass('hidden')

})
$("#dscribtion i").on('click',function(){
    $("#dscribtion").addClass("hidden")
    $("#home").removeClass("hidden")
    $("aside").removeClass("hidden")
})

$("aside a").on('click',function(e){
    let links=$(e.target).html()
    console.log(links)
   if(links=="Categories"){
    
    $('section').addClass("hidden")
    $('#categories').removeClass("hidden")
    
   }
   else if(links=="Area"){
   
    $('section').addClass("hidden")
    $('#area').removeClass("hidden")
   }
   else if(links=="Search"){
    $('section').addClass("hidden")
    $('#lineHot').removeClass("hidden")
    $("#search").removeClass("hidden")
    $("#contactus").addClass("hidden")
    $("#lineHot button").addClass("hidden")
}
else if(links=="Ingredients"){
    $('section').addClass("hidden")
    $('#ingredients').removeClass("hidden")
}
else if(links="ContactUs"){
    $('section').addClass("hidden")
    $('#lineHot').removeClass("hidden")
    $("#search").addClass("hidden")
    $("#contactus").removeClass("hidden")
    $("#lineHot button").removeClass("hidden")

}

})


async function area() {
try {
    $('.loading').removeClass("hidden")
    let aoi =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let data =await aoi.json()
    country=data.meals
    console.log(country)
    displayDataCountry()
    $('.loading').addClass("hidden")
    $(document).on('click', '.country', function(e) {
        let nameMeal = $(this).find('h2').html(); 
        
        mealsCountry(nameMeal)
       

         $("section").addClass("hidden")
        $("#home").removeClass("hidden")

    });
} 
   
    catch (error) {
    
    }
}

function displayDataCountry(){
    let cartona=``
    for(let i=0 ;i<country.length ;i++){
    cartona+=`<div class="text-center country p-4">
                    <i class="fa-solid fa-house-laptop text-9xl"></i>
                    <h2 class="text-3xl py-6">${country[i].strArea}</h2>
                   
                </div>`}
                document.getElementById("country").innerHTML=cartona
}
   
area()
live()
async function live() {
    try {$('.loading').removeClass("hidden")
        let aoi =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        let data =await aoi.json()
        ingredients=data.meals
        console.log(ingredients)
        
        displayDataIngredients()
        $('.loading').addClass("hidden")
        $(document).on('click', '.ingredients', function(e) {
            let nameMeal = $(this).find('h2').html(); 
            
            mealsIntegrient(nameMeal)
           
    
             $("section").addClass("hidden")
            $("#home").removeClass("hidden")
    
        });
    } 
 
    catch (error) {
        
    }
}

function displayDataIngredients(){
    let cartona=``;
    for(let i=0 ;i<ingredients.length ;i++){
        if(i<20){
    cartona+=`<div class="text-center ingredients p-4">
                    <i class="fa-solid fa-drumstick-bite text-9xl"></i>
                    <h2 class="text-3xl py-4">${ingredients[i].strIngredient}</h2>
                    <p>${ingredients[i].strDescription.slice(0,100)}</p>
                </div>`}}
                document.getElementById("live").innerHTML=cartona
}

async function deatiles(id){
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        let data=await api.json()

        productsByCategory=data.meals
        displayDataDeatiles()


    
}

function displayDataDeatiles(){
    let cartona=``
    for(let i=0 ;i<productsByCategory.length ;i++){
        let ingredientsList = ``;
        for (let j = 1; j <= 20; j++) {
            if (productsByCategory[i][`strIngredient${j}`]) {
                ingredientsList += `<span class=" p-10 rounded ">${productsByCategory[i][`strIngredient${j}`]} ${productsByCategory[i][`strMeasure${j}`]}</span> `;
            }
        }
        cartona+=`    
         
        <div class=""><img src="${productsByCategory[i].strMealThumb}" class="rounded w-full" alt="">
                    <h2 class="mx-10 text-3xl p-5">${productsByCategory[i].strMeal}</h2>
                </div>
                <div class="p-5">
                    <h2 class="text-2xl font-bold p-3">Instructions</h2>
                    <p class="p-6">${productsByCategory[i].strInstructions}</p>

                    <p class="text-4xl font-bold">Area :${productsByCategory[i].strArea}</p>
                    <p class="text-4xl font-bold">Category :${productsByCategory[i].strCategory}</p>
                    <p class="text-4xl  font-bold">Recipes :
                    <div class="spacial  ">
                       ${ingredientsList}
               
                </div>
                    </p>
                    <p class="text-4xl font-bold p-5">Tags :
                    <div><span class="bg-red-300 p-2  text-black">${productsByCategory[i].strTags}</span></div>
                    </p>
                    <div class="m-5 ">
                   <a href="${productsByCategory[i].strSource} " target="_blank"> <button  class="bg-green-700 text-2xl my-3 p-2 text-center rounded mx-3">source</button></a>
                   <a href="${productsByCategory[i].strYoutube}" target="_blank"> <button  class="bg-red-800 text-2xl my-3 p-2 text-center rounded mx-3">youtube</button></a>
               </div> </div>  `
    }
    document.getElementById("detalis").innerHTML=cartona
}

async function mealsCatogry(eslam){
    try{
        $('.loading').removeClass("hidden")
        let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${eslam}`)
    let data=await api.json()
    products=data.meals

    displayDataMain()
    $('.loading').addClass("hidden")
    $(".discripatin").on('click',function(){
        let idMeal=$(this).attr('id')
        deatiles(idMeal)
        $("section").addClass("hidden")
        $("#dscribtion").removeClass("hidden")

    })}
    catch (error) {
    
    }
    
    
}

async function mealsCountry(demo){
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demo}`)
        let data=await api.json()
        products=data.meals

        displayDataMain()
        $(".discripatin").on('click',function(){
            let idMeal=$(this).attr('id')
            deatiles(idMeal)
            $("section").addClass("hidden")
            $("#dscribtion").removeClass("hidden")
    
        })
    
}
async function mealsIntegrient(hamada){
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hamada}`)
        let data=await api.json()
        products=data.meals

        displayDataMain()
        $(".discripatin").on('click',function(){
            let idMeal=$(this).attr('id')
            deatiles(idMeal)
            $("section").addClass("hidden")
            $("#dscribtion").removeClass("hidden")
    
        })
    
}


$("#searchName").on('input',function search(){
let searchInput=$('#searchName').val()
main(searchInput)
$('.loading').addClass("hidden")

$("section").addClass("hidden")
$('#lineHot').removeClass("hidden")
$("#search").removeClass("hidden")
$("#home").removeClass("hidden")
$("#contactus").addClass("hidden")
$("#lineHot button").addClass("hidden")
})

async function mainLetter(name) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    let data = await api.json()
    products =data.meals
console.log(products)
    displayDataMain()

    $(".discripatin").on('click',function(){
        let idMeal=$(this).attr('id')
        deatiles(idMeal)
        $("section").addClass("hidden")
        $("#dscribtion").removeClass("hidden")

    })
}

$("#searchLetter").on('input',function searchLetter(){
    let searchInput=$('#searchLetter').val()

    mainLetter(searchInput)
    $("section").addClass("hidden")
    $('#lineHot').removeClass("hidden")
    $("#search").removeClass("hidden")
    $("#home").removeClass("hidden")
    $("#contactus").addClass("hidden")
    $("#lineHot button").addClass("hidden")
    })

    let nameInput = $('#nameInput');
    let numberInput = $('#numberInput');
    let inputEmail = $('#inputEmail');
    let passwordInput = $('#passwordInput');
    let ageInput = $('#ageInput');
    let repasswordInput = $('#repasswordInput');
    
    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, only letters and spaces
    const numberRegex = /^\d{11}$/; // Exactly 10 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number
    const ageRegex = /^(?:1[01][0-9]|120|1[7-9]|[2-9]\d)$/; // Age between 18 and 120
    
    function showError(input, message) {
        $(input).next('.error-message').text(message).show();
    }
    
    function hideError(input) {
        $(input).next('.error-message').hide();
    }
    
    function validateName() {
        let value = nameInput.val();
        if (!nameRegex.test(value)) {
            showError(nameInput, 'Name must be at least 3 characters long and contain only letters and spaces.');
            return false;
        }
        hideError(nameInput);
        return true;
    }
    
    function validateNumber() {
        let value = numberInput.val();
        if (!numberRegex.test(value)) {
            showError(numberInput, 'Number must be exactly 11 digits.');
            return false;
        }
        hideError(numberInput);
        return true;
    }
    
    function validateEmail() {
        let value = inputEmail.val();
        if (!emailRegex.test(value)) {
            showError(inputEmail, 'Enter a valid email address.');
            return false;
        }
        hideError(inputEmail);
        return true;
    }
    
    function validatePassword() {
        let value = passwordInput.val();
        if (!passwordRegex.test(value)) {
            showError(passwordInput, 'Password must be at least 8 characters long and contain at least one letter and one number.');
            return false;
        }
        hideError(passwordInput);
        return true;
    }
    
    function validateAge() {
        let value = ageInput.val();
        if (!ageRegex.test(value)) {
            showError(ageInput, 'Age must be between 18 and 120.');
            return false;
        }
        hideError(ageInput);
        return true;
    }
    
    function validateRepassword() {
        let value = repasswordInput.val();
        if (value !== passwordInput.val()) {
            showError(repasswordInput, 'Passwords do not match.');
            return false;
        }
        hideError(repasswordInput);
        return true;
    }
    
    function validation() {
        let isValid = validateName() && validateNumber() && validateEmail() && validatePassword() && validateAge() && validateRepassword();
        if (isValid) {
            $("#submitBtn").removeClass("disabled")
            $("#submitBtn").prop("disabled", false);
            $("#submitBtn").on('click',function clearForm(){
                $(".yeyeha input").val("")
                $("#submitBtn").addClass("disabled")
            })
        } else {
            $("#submitBtn").addClass("disabled")
            $("#submitBtn").prop("disabled", true);
        }
    }
    
    // Call validation function on input change
    nameInput.on('input', validateName);
    numberInput.on('input', validateNumber);
    inputEmail.on('input', validateEmail);
    passwordInput.on('input', validatePassword);
    ageInput.on('input', validateAge);
    repasswordInput.on('input', validateRepassword);
    
    // Call the combined validation function on each input change
    $('input').on('input', validation);
    
    // Initial call to disable the button if fields are not valid
    validation();



   
