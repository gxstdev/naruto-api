const inputName = document.getElementById("inputName");

const divCharacter = document.querySelector('#character-container')

const btnSearch = document.querySelector('#btnSearch')

let arrayCharacters = []

const arrayStorage = JSON.parse(localStorage.getItem('arrayCharacters'))

if (arrayStorage) {
    arrayCharacters = arrayStorage
}

const getJsonResponse = async (url) => {
    try {
        const response = await fetch(url)
        const jsonResponse = await response.json()
        return jsonResponse
        
    } catch (error) {
        alert('Personagem não encontrado!')  
    }
}

const createCharacterContainer = (character) =>{
    try {
        character.forEach(element => {
            const nameCharacter = document.createElement('p')
            nameCharacter.innerHTML = element.name
    
            const imgCharacter = document.createElement('img')
    
            if (!element.images[1]) {
                imgCharacter.setAttribute('src', element.images[0])
            }else{
                imgCharacter.setAttribute('src', element.images[1])
            }

            imgCharacter.classList.add('photo')
    
            divCharacter.appendChild(nameCharacter)
            divCharacter.appendChild(imgCharacter)
        });
        
    } catch (error) {
        
    }

}

const getCharacterObject = async (characterName) => {
    divCharacter.innerHTML = ''
    const object = await getJsonResponse(`https://narutodb.xyz/api/character/search?name=${characterName}`)

    //caso de erro no getJsonResponse pois o fetch não foi realizado com sucesso
    //se não houver o if, irá adicionar null ao array e isso dá problema
    //arrayCharacters.push(object)
    if (object) {
        arrayCharacters.push(object)
        localStorage.setItem('arrayCharacters', JSON.stringify(arrayCharacters))

    }
    const character = JSON.parse(localStorage.getItem('arrayCharacters'))
        createCharacterContainer(character)
}

function checkInputName(inputName) {
    console.log(inputName.includes(" "));
    
    if (inputName.includes(" ")) {
        return false
    }
    return true
}

function showCharacters() {
    divCharacter.innerHTML = ''
    const character = JSON.parse(localStorage.getItem('arrayCharacters'))
    createCharacterContainer(character)
}

function removePlaceholder() {
    inputName.removeAttribute('placeholder')
}

inputName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getCharacterObject(inputName.value)
        inputName.value = ''
        inputName.setAttribute('placeholder', 'nome sobrenome')
    }
})

inputName.addEventListener('focus', removePlaceholder)
inputName.addEventListener('mouseleave', () => {
    inputName.setAttribute('placeholder', 'nome sobrenome')
})

showCharacters()
