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
// ... (Your theme toggle code stays the same) ...

emailjs.init("YOUR_PUBLIC_KEY");

const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 1. THE HONEYPOT CHECK
        // If this field has ANY value, it's a bot.
        const honey = document.getElementById('honeypot-field').value;
        if (honey !== "") {
            console.warn("Bot detected.");
            statusMessage.innerText = "✅ Message sent successfully!"; // Lie to the bot
            statusMessage.style.color = "#4ade80";
            statusMessage.style.display = "block";
            contactForm.reset();
            return; // Kill the function so EmailJS never runs
        }

        // 2. NORMAL FLOW FOR HUMANS
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                statusMessage.innerText = "✅ Message sent successfully!";
                statusMessage.style.color = "#4ade80";
                statusMessage.style.display = "block";
                contactForm.reset();
            }, (error) => {
                statusMessage.innerText = "❌ Failed to send.";
                statusMessage.style.color = "#f87171";
                statusMessage.style.display = "block";
            })
            .finally(() => {
                submitBtn.innerText = "Send Message";
                submitBtn.disabled = false;
            });
    });
}