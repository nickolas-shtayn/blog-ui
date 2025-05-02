const signupForm = document.querySelector(".form__signup");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;
  const signupObj = { email, password };
  console.log(signupObj);
  signupForm.reset();

  try {
    const response = await axios.post(
      "http://localhost:1000/signup",
      signupObj
    );
    if (response.data === "signed up") {
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.error(error);
  }
});
