let clickCount = 0;
const maxClicks = 5;

const shareBtn = document.getElementById("shareBtn");
const clickCounter = document.getElementById("clickCounter");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const thankYouMsg = document.getElementById("thankYouMsg");

// Disable form if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.style.display = "none";
  thankYouMsg.classList.remove("hidden");
}

shareBtn.addEventListener("click", () => {
  if (clickCount < maxClicks) {
    clickCount++;
    const message = "Hey Buddy, Join Tech For Girls Community!";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
    clickCounter.textContent = `Click count: ${clickCount}/${maxClicks}`;
  }

  if (clickCount === maxClicks) {
    shareBtn.disabled = true;
    clickCounter.textContent = "Sharing complete. Please continue.";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < maxClicks) {
    alert("Please complete WhatsApp sharing (5/5) before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const screenshot = document.getElementById("screenshot").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshot);

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Replace this URL with your deployed Google Apps Script Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbyiGKgLxD7bV4DM4wY3Hx3C6LXSxJgzSc4YReS__CgtiI6PElmWl0q5rxmRJssn4306QA/exec";

  try {
    await fetch(scriptURL, { method: "POST", body: formData });
    localStorage.setItem("submitted", "true");

    form.reset();
    form.style.display = "none";
    thankYouMsg.classList.remove("hidden");
  } catch (error) {
    alert("Submission failed. Please try again.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Registration";
  }
});
