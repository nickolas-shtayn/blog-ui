const signupForm = document.querySelector(".form__signup");
const responseMessage = document.querySelector("h2");
const emailInput = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get("email");

  if (userEmail === null) {
    window.location.href = ".././unauthorized/index.html";
  }

  emailInput.value = userEmail;
  emailInput.setAttribute("readonly", true);
  emailInput.style.backgroundColor = "#f0f0f0";

  const inviteCodeInput = document.createElement("input");
  inviteCodeInput.type = "text";
  inviteCodeInput.id = "invite-code";
  inviteCodeInput.name = "invite-code";
  inviteCodeInput.placeholder = "Enter invite code";
  inviteCodeInput.required = true;

  const passwordInput = document.querySelector("#password");
  passwordInput.parentNode.insertBefore(
    inviteCodeInput,
    passwordInput.nextSibling
  );
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
