const postTitle = document.querySelector("#form__input--title");
const postContent = document.querySelector("#form__input--content");
const editForm = document.querySelector("form");

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const response = await axios.get(`http://localhost:1000/post/${postId}`);

  try {
    const { name, content } = response.data[0];
    postTitle.value = name;
    postContent.value = content;
  } catch (error) {
    console.log(error.response);
    if (error.response.data === "Expired") {
      localStorage.clear();
      window.location.href = ".././unauthorized/index.html";
    }
    window.location.href = ".././unauthorized/index.html";
  }
});

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const name = event.target.elements["post-title"].value.trim();
  const content = event.target.elements["post-content"].value.trim();

  if (name === "" || content === "") {
    return console.error("cannot submit empty form");
  }
  const postObj = { id: postId, name, content };
  editForm.reset();
  const token = localStorage.getItem("jwt");
  if (!token) {
    console.log("You are not logged in");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:1000/editpost",
      postObj,
      {
        headers: { authorization: token },
      }
    );
    if (response.status === 200) {
      window.location.href = `.././post/index.html?id=${postId}`;
    }
  } catch (error) {
    console.log(error.response);
    if (error.response.data === "Expired") {
      localStorage.clear();
      window.location.href = ".././unauthorized/index.html";
    }
    window.location.href = ".././unauthorized/index.html";
  }
});
