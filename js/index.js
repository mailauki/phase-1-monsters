document.addEventListener("DOMContentLoaded", () => {
  getMonsters()

  createForm()

  const forward = document.querySelector("#forward")
  forward.addEventListener("click", forwardFifty)

  const back = document.querySelector("#back")
  back.addEventListener("click", backFifty)
})

let pageNum = 1

function getMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
  .then(res => res.json())
  .then(json => {
    let i = 0

    json.forEach(monster => {
      console.log(monster)
      const container = document.querySelector("#monster-container")

      const div = document.createElement("div")
      container.appendChild(div)

      const h2 = document.createElement("h2")
      h2.append(json[i].name)
      div.appendChild(h2)

      const h4 = document.createElement("h4")
      h4.append(`Age: ${json[i].age}`)
      div.appendChild(h4)

      const p = document.createElement("p")
      p.append(`Bio: ${json[i].description}`)
      div.appendChild(p)
      
      i++
    })
  })
}

function createForm() {
  const create = document.querySelector("#create-monster")

  const form = document.createElement("form")
  form.id = "monster-form"

  const inputName = document.createElement("input")
  inputName.id = "name"
  inputName.setAttribute("placeholder", "name...")
  form.appendChild(inputName)

  const inputAge = document.createElement("input")
  inputAge.id = "age"
  inputAge.setAttribute("placeholder", "age...")
  form.appendChild(inputAge)
  
  const inputDescrpt = document.createElement("input")
  inputDescrpt.id = "description"
  inputDescrpt.setAttribute("placeholder", "description...")
  form.appendChild(inputDescrpt)

  const btn = document.createElement("button")
  btn.innerText = "Create"
  form.appendChild(btn)

  create.appendChild(form)

  form.addEventListener("submit", event => {
    event.preventDefault()

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: inputName.value,
        age: inputAge.value,
        description: inputDescrpt.value,
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))

    form.reset()
  })
}

function forwardFifty() {
  const container = document.querySelector("#monster-container")
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  pageNum++
  getMonsters()
}

function backFifty() {
  const container = document.querySelector("#monster-container")
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  pageNum--
  getMonsters()
}
