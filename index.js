async function loadIntoTable(url, table) {
  const tableBody = table.querySelector('tbody')
  const response = await fetch(url)
  const data = await response.json()

  tableBody.innerHTML = ''
  for (let user of data) {
    const rowElement = document.createElement('tr')
    const usernameElement = document.createElement('td')
    usernameElement.textContent = user.username
    usernameElement.dataset.userId = user.id
    usernameElement.classList.add('item')
    usernameElement.addEventListener('click', (event) => getPosts(event))
    rowElement.appendChild(usernameElement)
    tableBody.appendChild(rowElement)
  }
}

loadIntoTable(
  'https://jsonplaceholder.typicode.com/users',
  document.querySelector('table')
)

function cleanPosts() {
  var users = document.querySelectorAll('.item ul')
  for (user of users) {
    if (user) {
      user.style.display = 'none'
    }
  }
}

async function getPosts(event) {
  const userId = event.target.dataset.userId
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  )
  const data = await response.json()
  renderPosts(data, event.target)
}

function renderPosts(posts, target) {
  cleanPosts()
  var list = document.createElement('ul')
  for (post of posts) {
    var item = document.createElement('li')
    var liTitle = document.createElement('strong')
    var liBody = document.createElement('p')

    liTitle.innerHTML = `Title: ${post.title}`
    liBody.innerHTML = `Body: ${post.body}`

    item.appendChild(liTitle)
    item.appendChild(liBody)
    list.appendChild(item)
  }
  target.appendChild(list)
}
