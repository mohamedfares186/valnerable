function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function decodeJWT(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format");
      return null;
    }

    const payload = parts[1];

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

function getCurrentUser() {
  const token = getCookie("access-token");

  if (!token) {
    return null;
  }

  const decoded = decodeJWT(token);

  return decoded;
}

function updateNavigation() {
  const user = getCurrentUser();
  const loginLink = document.querySelector('nav > a[href="/login"]');

  if (user && loginLink) {
    loginLink.innerHTML = `
    <div class="logged-in-nav">
      ${
        user.role === "user"
          ? `
          <a href="/user/cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M0 72C0 58.7 10.7 48 24 48L69.3 48C96.4 48 119.6 67.4 124.4 94L124.8 96L524.7 96C549.8 96 568.7 118.9 564 143.6L537.6 280.6C529.6 322 493.4 352 451.2 352L171.4 352L176.5 380.3C178.6 391.7 188.5 400 200.1 400L456 400C469.3 400 480 410.7 480 424C480 437.3 469.3 448 456 448L200.1 448C165.3 448 135.5 423.1 129.3 388.9L77.2 102.6C76.5 98.8 73.2 96 69.3 96L24 96C10.7 96 0 85.3 0 72zM162.6 304L451.2 304C470.4 304 486.9 290.4 490.5 271.6L514.9 144L133.5 144L162.6 304zM208 480C234.5 480 256 501.5 256 528C256 554.5 234.5 576 208 576C181.5 576 160 554.5 160 528C160 501.5 181.5 480 208 480zM432 480C458.5 480 480 501.5 480 528C480 554.5 458.5 576 432 576C405.5 576 384 554.5 384 528C384 501.5 405.5 480 432 480z"
              />
            </svg>
          </a>
          `
          : ""
      }
      <a href="${
        user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
      }">${user.username} dashboard</a> /
      <form class="logout-form" action="/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </div>
    `;
  }
}

async function fetchAllProducts() {
  const homeContainer = document.querySelector(".home-container");

  try {
    const res = await fetch("http://localhost:5000/api/v1/products", {
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) {
      homeContainer.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.log(`Error fetching data ${error}`);
  }
}

addEventListener("DOMContentLoaded", () => {
  updateNavigation();
  fetchAllProducts();
});

const contactForm = document.querySelector(".contact-form");
const responseMessage = document.getElementById("response-message");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/contact/response?email=" +
          encodeURIComponent(email) +
          "&message=" +
          encodeURIComponent(message),
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const res = await response.json();
        // VULNERABLE: Reflected XSS
        responseMessage.innerHTML = res.message;
        contactForm.reset();
      } else {
        responseMessage.innerHTML =
          "Failed to send message. Please try again later.";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      responseMessage.innerHTML = "An error occurred. Please try again later.";
    }
  });
}
