/* Global */
$(document).ready(()=> {
    $(".loading").fadeOut(1000);
    $('body').css({overflowY:"auto"})
  })
  async function getdata(name) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let final = await data.json();
    display(final.meals);

}

function display(arr) {
    let count = ``;
    for (let i = 0; i < arr.length; i++) {
        count += ` <div class="col-md-3 ">
        <div class="position-relative overflow-hidden meals rounded-2" onclick="getDetails('${arr[i].idMeal}')">
        <img src="${arr[i].strMealThumb}" alt="" class="w-100 ">
        <div class="layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${arr[i].strMeal}</h3></div>
        </div>
      </div>
        `
    }
    $('#Contact, #Details ,#categories ,#Area, #Ingredients').addClass('d-none');
    $("#Home").removeClass("d-none")
    $('#Home').html(count);

}
async function getDetails(id) {
    let details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await details.json();
    displayDetails(data.meals[0]);
}

function displayDetails(meal) {
    let Recipes = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            Recipes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tag = ``
    if (meal[`strTags`]) {
        tag += `<li class="alert alert-danger m-2 p-1"> ${meal.strTags}</li>`
    }
    else { tag += `<li class="alert alert-danger m-2 p-1">No Tags</li>` }

    let details = ` 
    <div class="col-md-4">
    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2 my-3">
    <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
    <div class="d-flex flex-row align-items-center justify-content-between mb-3">
    <h2>Instructions</h2>
    <button class="btn-close btn-close-white" onclick="Close()" ></button>
      </div>
    
    <P>${meal.strInstructions}</P>
    <h3> <span class="fw-bolder">Area :</span> ${meal.strArea}</h3>
    <h3> <span class="fw-bolder">Category :</span> ${meal.strCategory}</h3>
    <h3><span class="fw-bolder">Recipes :</span></h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${Recipes}
     </ul>
    <h3 id="Tags"><span class="fw-bolder">Tags :</span></h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap"> 
    ${tag}</ul>
    <h3><span class="fw-bolder">More :</span></h3>
    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>


</div>
    `
    $('#Home ,#Contact, #Details ,#categories ,#Area, #Ingredients ').addClass('d-none');
    $("#Details").removeClass('d-none');
    $('#Details').html(details);

}

function Close() {
    $("#Home").removeClass("d-none");
    $("#Details").addClass("d-none");
}
/* Home */
getdata(" ")
$('#navLogo').click(() => {
    $("#Home").removeClass("d-none");
    console.log("home");

    getdata(" ");
    $("#Contact, #Search ,#Details ,#categories ,#Area, #Ingredients").addClass("d-none");
})


/* NAV */
function openSidebar() {
    $("nav").animate({
        left: 0
    }, 500)


    $(".navIcon").removeClass("fa-align-justify");
    $(".navIcon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".list li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSidebar() {
    let boxWidth = $("nav .sidebar").outerWidth()
    $("nav").animate({
        left: -boxWidth
    }, 500)

    $(".navIcon").addClass("fa-align-justify");
    $(".navIcon").removeClass("fa-x");


    $(".list li").animate({
        top: 300
    }, 500)
}

closeSidebar()

$("nav i").click(() => {
    if ($("nav").css("left") == "0px") {
        closeSidebar()
    } else {
        openSidebar()
    }
})



/* Search */
$("#searchLink").click(() => {
    $("#Search").removeClass("d-none");
    $("#Contact, #Home ,#Details ,#categories ,#Area, #Ingredients").addClass("d-none");
})
$('#searchname').keyup(search => getdata(search.target.value))
async function searchFirst(char) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
    let final = await data.json();
    display(final.meals);

}
$('#searchFirst').keyup(search => searchFirst(search.target.value))




/* Categories */
$("#Categ").click(() => {
    $("#categories").removeClass("d-none");
    $("#Contact, #Home ,#Details ,#Search ,#Area, #Ingredients").addClass("d-none")
    categories();
});
async function categories() {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let final = await data.json();
    displayCotegories(final.categories);

}

function displayCotegories(arr) {
    let count = ``;
    for (let i = 0; i < arr.length; i++) {
        count += ` <div class="col-md-3 ">
        <div class="position-relative overflow-hidden meals rounded-2" onclick="getCateg('${arr[i].strCategory}')">
        <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 ">
        <div class="layer position-absolute  text-black p-2  text-center">
        <h3>${arr[i].strCategory}</h3>
        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
        </div>
      </div>`

    }
    $('#categories').html(count);
}
async function getCateg(name) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    let final = await data.json();
    display(final.meals);
}



/* Area */
$("#arealink").click(() => {
    $("#Area").removeClass("d-none");
    $("#Contact, #Home ,#Details ,#categories ,#Search, #Ingredients").addClass("d-none")
    area();
})

async function area() {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let final = await data.json();
    displayarea(final.meals);


}

function displayarea(arr) {
    let count = ``;
    for (let i = 0; i < arr.length; i++) {
        count += ` <div class="col-md-3 ">
        <div class="position-relative text-center" onclick="getarea('${arr[i].strArea}')">
        <a>
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].strArea}</h3>
        </a>
        </div>
      </div>`

    }
    $('#Area').html(count);
}
async function getarea(name) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    let final = await data.json();
    display(final.meals);
}




/* Ingredients */
async function Ingredients() {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let final = await data.json();
    displayIngredients(final.meals);
}
function displayIngredients(arr) {
    let count = ``;
    for (let i = 0; i < 20; i++) {
        count += ` <div class="col-md-3 ">
        <div class="position-relative text-center" onclick="getIngredients('${arr[i].strIngredient}')">
        <a>
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3 class="py-2">${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </a>
        </div>
      </div>`

    }
    $('#Ingredients').html(count);
}
async function getIngredients(name) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    let final = await data.json();
    display(final.meals);
}
$("#ingrLink").click(() => {
    $("#Ingredients").removeClass("d-none");
    $("#Contact, #Home ,#Details ,#categories ,#Area, #Search").addClass("d-none")
    Ingredients()
})







/* Contact */
$("#ContactLink").click(() => {
    $("#Contact").removeClass("d-none")
    $("#Search, #Home ,#Details ,#categories ,#Area, #Ingredients").addClass("d-none")

})

let phone;
let age;
let name;
let email;
let pass;
let repass;

function validname(name) {
    let validname = /^[A-z]{3,15}$/;
    if (validname.test(name)) {
        return true;
    } else {
        return false
    }

}

function validemail(email) {
    let validemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (validemail.test(email)) {
        return true;
    } else {
        return false;
    }
}
function validpassword(pass) {
    let validpassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (validpassword.test(pass)) {
        return true;
    } else {
        return false;
    }
}
function validPhone(phone) {
    let validPhone = /^\+20[0-9]{10}$/;
    if (validPhone.test(phone)) {
        return true;
    } else {
        return false;
    }
}
document.getElementById("phone").addEventListener('input', function (event) {
    if (validPhone(event.target.value)) {
        document.getElementById("phoneAlert").classList.replace('d-block', 'd-none')
        phone = true;
    } else {
        document.getElementById("phoneAlert").classList.replace('d-none', 'd-block')
            ;
    }
});
function rePass() {

    if (document.getElementById("rePass").value === document.getElementById("password").value) {
        return true
    } else {
        return false
    }

}
function valid() {
    if (name == true && email == true && pass == true && repass == true && phone == true && age == true) {
        document.getElementById('SubBtn').removeAttribute("disabled")
    } else {
        console.log("false");
    }
}
document.getElementById("age").addEventListener('input', function (event) {
    if (event.target.value >= 18) {
        document.getElementById("ageAlert").classList.replace('d-block', 'd-none')
        age = true;
    } else {
        document.getElementById("ageAlert").classList.replace('d-none', 'd-block')
            ;
    }
});

document.getElementById("name").addEventListener('input', function (event) {
    if (validname(event.target.value)) {
        document.getElementById("nameAlert").classList.replace('d-block', 'd-none')
        name = true;
    } else {
        document.getElementById("nameAlert").classList.replace('d-none', 'd-block');
    }
});

document.getElementById("email").addEventListener('input', function (event) {
    if (validemail(event.target.value)) {
        document.getElementById("emailAlert").classList.replace('d-block', 'd-none')
        email = true;

    } else {
        document.getElementById("emailAlert").classList.replace('d-none', 'd-block')
            ;
    }
});

document.getElementById("password").addEventListener('input', function (event) {
    if (validpassword(event.target.value)) {
        document.getElementById("passAlert").classList.replace('d-block', 'd-none')
        pass = true;
    } else {
        document.getElementById("passAlert").classList.replace('d-none', 'd-block')
            ;
    }
});

document.getElementById("rePass").addEventListener('input', function () {
    if (rePass()) {
        document.getElementById("repassAlert").classList.replace('d-block', 'd-none')
        repass = true;
        valid()

    } else {
        document.getElementById("repassAlert").classList.replace('d-none', 'd-block')
            ;
    }
});

function clear() {
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("rePass").value = ""
    document.getElementById("age").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("SubBtn").innerHTML = "Submit Success"
    document.getElementById("SubBtn").classList.replace('btn-outline-light', 'btn-success');

}

document.getElementById("SubBtn").addEventListener('click', clear)

function moveToNextInput(event, nextInputId) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById(nextInputId).focus();
    }
  }


  function clickButtonOnEnter(event, buttonId) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById(buttonId).click();
    }
  }



 


  