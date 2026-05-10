const button = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    button.textContent = "☀";
}

button.addEventListener("click", function(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        button.textContent = "☀";
        localStorage.setItem("theme", "light");
    }
    else{
        button.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }

});
// 1. Initialize EmailJS
(function() {
    emailjs.init("JAULrbPy0onkOoudd"); // Replace with your actual Public Key
})();

// 2. Handle Form Submission
const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Visual feedback
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm('service_ou2wa44', 'template_he4bq1g', this)
            .then(() => {
                statusMessage.innerText = "✅ Message sent successfully!";
                statusMessage.style.color = "#4ade80";
                statusMessage.style.display = "block";
                contactForm.reset();
            }, (error) => {
                statusMessage.innerText = "❌ Failed to send. Please try again.";
                statusMessage.style.color = "#f87171";
                statusMessage.style.display = "block";
                console.log('FAILED...', error);
            })
            .finally(() => {
                submitBtn.innerText = "Send Message";
                submitBtn.disabled = false;
            });
    });
}