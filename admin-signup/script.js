const signupForm = document.querySelector(".form__signup");
const responseMessage = document.querySelector("h2");
const emailInput = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get("http://localhost:1000/admin");

  if (response.data === "admin exists") {
    window.location.href = ".././unauthorized/index.html";
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;
  const inviteCode = event.target.elements["invite-code"]?.value;

  const signupObj = { email, password };
  if (inviteCode) {
    signupObj.inviteCode = inviteCode;
  }
  event.target.elements["password"].value = "";
  if (event.target.elements["invite-code"]) {
    event.target.elements["invite-code"].value = "";
  }

  try {
    const response = await axios.post(
      "http://localhost:1000/signup",
      signupObj
    );
    if (
      response.data === "signed up as admin" ||
      response.data === "signed up as user"
    ) {
      try {
        const response = await axios.post(
          "http://localhost:1000/login",
          signupObj
        );
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data);

          window.location.href = ".././main/index.html";
        }
      } catch (error) {
        responseMessage.textContent = error.response.data;
      }
    }
  } catch (error) {
    responseMessage.textContent = error.response.data;
  }
});
