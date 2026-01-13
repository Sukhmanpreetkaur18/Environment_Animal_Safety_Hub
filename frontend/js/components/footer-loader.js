/**
 * Footer Loader – FINAL VERSION
 * Works from ALL pages & subpages
 * Server root = project root
 */

document.addEventListener("DOMContentLoaded", () => {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  // 1. Load footer HTML
  fetch("/frontend/components/footer.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Footer HTML not found");
      }
      return response.text();
    })
    .then(html => {
      footerPlaceholder.innerHTML = html;
      initFooterNewsletter();
    })
    .catch(error => {
      console.error("Footer load failed:", error);
    });

  // 2. Inject footer CSS (once)
  if (!document.querySelector('link[href="/frontend/css/components/footer.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/frontend/css/components/footer.css";
    document.head.appendChild(link);
  }

  // 3. Inject Font Awesome (once)
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(fa);
  }
});

/* ================= Newsletter Logic ================= */

function initFooterNewsletter() {
  const btn = document.getElementById("newsletterSubmitBtn");
  const input = document.getElementById("newsletterEmailInput");
  const msg = document.getElementById("newsletterMessage");

  if (!btn || !input || !msg) return;

  btn.addEventListener("click", () => {
    const email = input.value.trim();

    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      msg.textContent = "⚠ Please enter a valid email address.";
      msg.className = "newsletter-footer-message error";
      return;
    }

    let subscribers = JSON.parse(
      localStorage.getItem("newsletterSubscribers") || "[]"
    );

    if (subscribers.includes(email)) {
      msg.textContent = "📧 This email is already subscribed.";
      msg.className = "newsletter-footer-message info";
      return;
    }

    subscribers.push(email);
    localStorage.setItem(
      "newsletterSubscribers",
      JSON.stringify(subscribers)
    );

    msg.textContent = "✅ Thank you for subscribing!";
    msg.className = "newsletter-footer-message success";
    input.value = "";

    setTimeout(() => {
      msg.textContent = "";
      msg.className = "newsletter-footer-message";
    }, 4000);
  });
}
