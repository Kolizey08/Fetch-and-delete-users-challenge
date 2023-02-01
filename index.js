const body = document.body;
async function list() {
  try {
    const arr = await fetch("https://reqres.in/api/users/");
    const users = await arr.json();
    console.log(users);
    for (let i = 0; i < users.data.length; i++) {
      const item = users.data[i];
      console.log(item);
      const divConteiner = document.createElement("div");
      divConteiner.className = "conteiner";
      const divConteinerMini = document.createElement("div");
      divConteinerMini.className = "div2";
      const divFoto = document.createElement("div");
      const divEmail = document.createElement("div");
      const divLastName = document.createElement("div");
      const divFirstName = document.createElement("div");
      const btn = document.createElement("button");
      btn.textContent = "❌";
      btn.className = "btn";
      divConteiner.style.display = "flex";
      divConteiner.style.justifyContent = "space-evenly";
      divConteiner.style.fontSize = "20px";

      btn.addEventListener("click", (e) => {
        deleteUser(item.id, e.target.parentElement);
      });
      const img = document.createElement("img");
      img.src = item.avatar;
      divFoto.append(img);
      divEmail.textContent = item.email;
      divEmail.className = 'email'
      divFirstName.textContent = item.first_name;
      divLastName.textContent = item.last_name;
      divConteinerMini.append(divFirstName, divLastName, divEmail);
      divConteiner.append(divFoto, divConteinerMini, btn);
      body.append(divConteiner);
    }
  } catch (error) {
    console.log(error);
    const divError = document.createElement("div");
    divError.textContent = error.message;
    body.append(divError);
  }
}

list();

async function deleteUser(id, node) {
  try {
    await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });
    return node.remove();
  } catch (error) {
    console.log(error);
  }
}
