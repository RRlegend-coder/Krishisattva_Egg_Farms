// --- THEME TOGGLE ---
const button = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    if(button) button.textContent = "☀";
}

if (button) {
    button.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            button.textContent = "☀";
            localStorage.setItem("theme", "light");
        } else {
            button.textContent = "🌙";
            localStorage.setItem("theme", "dark");
        }
    });
}

// --- EMAILJS & FORM HANDLING ---
// Replace the placeholders below with your actual IDs from the EmailJS dashboard
emailjs.init("JAULrbPy0onkOoudd"); 

const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // 1. Honeypot check
        const honey = document.getElementById('honeypot-field').value;
        if (honey !== "") {
            statusMessage.innerText = "✅ Message sent successfully!";
            statusMessage.style.color = "#4ade80";
            statusMessage.style.display = "block";
            contactForm.reset();
            return;
        }

        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        try {
            // 2. Save to Firebase (Matches the 'name' attributes in your HTML)
            await window.addDoc(window.collection(window.db, "inquiries"), {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value,
                timestamp: window.serverTimestamp()
            });

            // 3. Send Email via EmailJS
            await emailjs.sendForm('service_ou2wa44', 'template_he4bq1g', this);

            statusMessage.innerText = "✅ Message sent and saved!";
            statusMessage.style.color = "#4ade80";
            contactForm.reset();
        } catch (error) {
            console.error("Error:", error);
            statusMessage.innerText = "❌ Failed to send. Please try again.";
            statusMessage.style.color = "#f87171";
        } finally {
            statusMessage.style.display = "block";
            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;
        }
    });
}