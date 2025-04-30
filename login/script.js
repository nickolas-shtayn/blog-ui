const loginForm = document.querySelector(".login__form");
const message = document.querySelector("p");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;
  const loginObj = { email, password };
  loginForm.reset();

  try {
    const response = await axios.post("http://localhost:1000/login", loginObj);
    if (response.data === "authenticated") {
      window.location.href = ".././main/index.html";
    } else if (response.data === "wrong password") {
      message.textContent = response.data;
    } else if (response.data === "wrong email") {
      message.textContent = response.data;
    }
  } catch (error) {
    console.error(error);
  }
});
