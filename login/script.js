const loginForm = document.querySelector(".login__form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;
  const loginObj = { email, password };
  loginForm.reset();

  try {
    const response = await axios.post("http://localhost:1000/login", loginObj);
  } catch (error) {
    console.error(error);
  }
});
