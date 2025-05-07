const signupForm = document.querySelector(".form__signup");
const responseMessage = document.querySelector("h2");

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
    if (
      response.data === "signed up as admin" ||
      response.data === "signed up as user"
    ) {
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    responseMessage.textContent = error.response.data;
  }
});
