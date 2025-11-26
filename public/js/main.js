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
    loginLink.outerHTML = `
    <div class="logged-in-nav">
      <a href="/user/dashboard">${user.username} dashboard</a> /
      <form class="logout-form" action="/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </div>
    `;
  }
}

addEventListener("DOMContentLoaded", updateNavigation);
