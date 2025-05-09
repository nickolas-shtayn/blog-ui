const inviteForm = document.querySelector(".form__invite");
const inviteCode = document.querySelector("#invite-code");
const generateButton = document.querySelector("#generate");

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

generateButton.addEventListener("click", () => {
  inviteCode.value = generateRandomString();
});

inviteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value;
  const invite = event.target.elements["invite-code"].value;
  const inviteObj = { email, invite };

  inviteForm.reset();

  try {
    const response = await axios.post(
      "http://localhost:1000/invite",
      inviteObj,
      {
        headers: { authorization: token },
      }
    );
    if (response.status === 200) {
      console.log("invite sent!");
    }
  } catch (error) {
    console.log("error");
  }
});
