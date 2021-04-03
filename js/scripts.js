const $inputSearch = document.querySelector('.inp-search')
$inputSearch.addEventListener('keydown', inputSearch)

const $btnSearch = document.querySelector('.btn-search')
$btnSearch.addEventListener('click', search)

function inputSearch(event){
    if (event.code == 'Enter'){
        search()
    }
}

function search(){

    const profile = $inputSearch.value.replace(' ', '')
    const url = `https://api.github.com/users/${profile}`
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', url, true)
    xhr.send()

    const repositoryUrl = `https://api.github.com/users/${profile}/repos`

    xhr.onload = () => {
        const data = xhr.response
        if (!data.message){
            putInfo(data, repositoryUrl)
        } else{
            document.querySelector('.img-profile').setAttribute('src', './images/profile.jpg')
            document.querySelector('.name-profile').textContent = 'Not Found'
            document.querySelector('.bio').textContent = data.message
            document.querySelector('.main-header').style.backgroundImage = 'url()'
            document.querySelector('.information').innerHTML = ''
            document.querySelector('.repositories').innerHTML = ''


        }
        // console.log(data)
    }
}

function putInfo(info, url){
    document.querySelector('.img-profile').setAttribute('src', info.avatar_url)
    document.querySelector('.name-profile').textContent = info.name
    document.querySelector('.bio').textContent = info.bio
    document.querySelector('.main-header').style.backgroundImage = 'url(./images/programming-languages.png)'
    const $info = document.querySelector('.information')
    let html = `<ul class="list">
        <li class="item">Type: ${info.type}</li>
        <li class="item">Location: ${info.location}</li>
        <li class="item">Hireable: ${info.hireable}</li>
        <li class="item">Public Repositories: ${info.public_repos}</li>
        <li class="item">Twitter: ${info.twitter_username}</li>
    </ul>`
    $info.innerHTML = html

    const repXhr = new XMLHttpRequest()
    repXhr.responseType = 'json'
    repXhr.open('GET', url, true)
    repXhr.send()

    repXhr.onload = () => {
        rep = repXhr.response
        const $repositories = document.querySelector('.repositories')
        let html = '<ul class="list">\n'
        repositories = []
        for (let i of rep){
            if (!i.fork && !(i.owner.login==i.name)){
                repositories.push(i)
            }
        }
        repositories.sort((a, b) => b.stargazers_count - a.stargazers_count)
        for (let i=0; i<5; i++){
            console.log(repositories[i])
            html += `<li class="item"><a href="${repositories[i].html_url}" target="_blank">${repositories[i].name}</a>\t==>\t${repositories[i].language}</li>`
        }
        $repositories.innerHTML = html + '</ul>'


    }

}

