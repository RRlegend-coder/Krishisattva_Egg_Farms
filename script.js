const button = document.getElementById("theme-toggle");

/* check saved theme when page loads */
if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-mode");

    button.textContent = "☀";

}

/* button click */
button.addEventListener("click", function(){

    document.body.classList.toggle("light-mode");

    /* if light mode is active */
    if(document.body.classList.contains("light-mode")){

        button.textContent = "☀";

        localStorage.setItem("theme", "light");

    }
    else{

        button.textContent = "🌙";

        localStorage.setItem("theme", "dark");

    }

});