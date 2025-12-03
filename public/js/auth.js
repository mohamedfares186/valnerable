const loginForm = document.querySelector(".login-form");
const loginResMsg = document.querySelector(".login-res-msg");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        window.location.href = "../index.html";
        return;
      }

      const message =
        typeof data === "object" && data !== null
          ? data.message || JSON.stringify(data)
          : String(data);
      if (loginResMsg) loginResMsg.innerHTML = message;
    } catch (error) {
      console.error(error);
      if (loginResMsg)
        loginResMsg.innerHTML = `Network error: ${error.message || error}`;
    }
  });
}

const registerForm = document.querySelector(".register-form");
const registerResMsg = document.querySelector(".register-res-msg");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");

    try {
      const req = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          repeatPassword,
        }),
      });

      const contentType = req.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await req.json();
      } else {
        data = await req.text();
      }

      if (req.ok) {
        window.location.href = "../login.html";
        return;
      }

      const message =
        typeof data === "object" && data !== null
          ? data.message || JSON.stringify(data)
          : String(data);
      if (registerResMsg) registerResMsg.innerHTML = message;
    } catch (error) {
      console.log(error);
      if (registerResMsg)
        registerResMsg.innerHTML = `Network error: ${error.message || error}`;
    }
  });
}
