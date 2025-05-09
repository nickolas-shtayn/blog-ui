const loginForm = document.querySelector(".login__form");
const responseMessage = document.querySelector("h2");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get("http://localhost:1000/admin");

  try {
    const signUp = document.createElement("a");
    signUp.href = "..//signup/index.html";
    signUp.textContent = "SIGN UP";
    loginForm.append(signUp);
  } catch (error) {
    console.log(error);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;
  const loginObj = { email, password };
  loginForm.reset();

  try {
    const response = await axios.post("http://localhost:1000/login", loginObj);
    if (response.status === 200) {
      localStorage.setItem("jwt", response.data);

      window.location.href = ".././main/index.html";
    }
  } catch (error) {
    responseMessage.textContent = error.response.data;
  }
});
