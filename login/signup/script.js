const loginForm = document.querySelector(".form__signup");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;
  const signupObj = { email, password };
  loginForm.reset();

  try {
    const response = await axios.post(
      "http://localhost:1000/signup",
      signupObj
    );
  } catch (error) {
    console.error(error);
  }
});
