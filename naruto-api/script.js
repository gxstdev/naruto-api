const inputName = document.getElementById('inputName');
const btnSearch = document.querySelector('#btnSearch');
const resultCharacter = document.getElementById('resultCharacter')
const listCharacters = document.querySelector('#listCharacters')

let arrayCharacters = []

const arrayCharactersLocalStorage = JSON.parse(localStorage.getItem('array'))

if (arrayCharactersLocalStorage) {
    arrayCharacters = arrayCharactersLocalStorage
}

const getJsonResponse = async (url) => {
    const response = await fetch(url)
    try {
        const jsonResponse = await response.json()
        return jsonResponse
        
    } catch (error) {
        if (response.status === 404) {
           alert('Personagem não encontrado!')   
        } 
    }
}

const getCharacterObject = async (characterName) => {
    const object = await getJsonResponse(`https://narutodb.xyz/api/character/search?name=${characterName}`)
    return object
}

const createContainerCharacter = (object) => {
    
    const characterContainer = document.createElement('div')
    characterContainer.setAttribute('id', 'characterContainer')

    const characterAtributtes = document.createElement('div')
    characterAtributtes.setAttribute('id', 'characterAtributtes')

    const btnContainer = document.createElement('div')
    btnContainer.setAttribute('id', 'btnContainer')

    const div = document.createElement('div') 
    div.setAttribute('class', 'characterResultContainer')
    div.appendChild(btnContainer)
    div.appendChild(characterContainer)
    div.appendChild(characterAtributtes)
    resultCharacter.appendChild(div)

    const img = document.createElement('img')
    img.classList.add('characterImg')
    img.src = object.images[0]
    if (object.images.length > 1) {
    const btnImg0 = document.createElement("button")
    const btnImg1 = document.createElement("button")
    btnImg0.classList.add('btn')
    btnImg1.classList.add('btn')
    btnImg0.textContent = 'Opção 1'
    btnImg1.textContent = 'Opção 2'


    btnImg0.addEventListener('click', () => {
    img.src = object.images[0]
    })
    btnImg1.addEventListener('click', () => {
    img.src = object.images[1]
    })

    btnContainer.appendChild(btnImg0)
    btnContainer.appendChild(btnImg1)

    }
    characterContainer.appendChild(img) 

    const spanName = document.createElement('span')
    spanName.innerHTML = '<strong>Nome: </strong>'
    const nameCharacter = document.createElement('p')
    nameCharacter.innerHTML = object.name
    characterAtributtes.appendChild(spanName)
    characterAtributtes.appendChild(nameCharacter)

    const spanBirthday = document.createElement('span')
    spanBirthday.innerHTML = '<strong>Aniversário: </strong>'
    const birthday = document.createElement('p')
    birthday.innerHTML = object.personal.birthdate
    characterAtributtes.appendChild(spanBirthday)
    characterAtributtes.appendChild(birthday)

    const spanClan = document.createElement('span')
    spanClan.innerHTML = '<strong>Clã: </strong>'
    const clan = document.createElement('p')
    clan.innerHTML = object.personal.clan
    characterAtributtes.appendChild(spanClan)
    characterAtributtes.appendChild(clan)   

    const btnAdd = document.createElement('button')
    btnAdd.textContent = 'Adicionar'
    btnAdd.classList.add('btnAdd')
    btnContainer.appendChild(btnAdd)

    btnAdd.addEventListener('click', () => {
        if(arrayCharacters.length >= 1){
           const character = arrayCharacters.find(element => element.id == object.id)
           if(character){
                alert('Personagem já foi adicionado a lista!')
           }else{
                arrayCharacters.push(object)
                localStorage.setItem('array', JSON.stringify(arrayCharacters))
                addToList()  
           }  
        }else{
            arrayCharacters.push(object)
            localStorage.setItem('array', JSON.stringify(arrayCharacters))
            addToList()  
        } 
    })
  
}
const showResultCharacter = async (characterName) => {
    try{
        const object = await getCharacterObject(characterName)
            if (object.status !== 404) {
                createContainerCharacter(object)
            }
        }catch(error){
    
        } 
}

const addToList = () => {
    listCharacters.innerHTML = ''
    const getArrayLocalStorage = JSON.parse(localStorage.getItem('array')) 
        try{
        getArrayLocalStorage.forEach(object => {
            const characterContainer = document.createElement('div')
            characterContainer.setAttribute('class', 'characterContainer')
        
            const characterAtributtes = document.createElement('div')
            characterAtributtes.setAttribute('class', 'characterAtributtes')
        
            const btnContainer = document.createElement('div')
            btnContainer.setAttribute('class', 'btnContainer')
        
            const div = document.createElement('div') 
            div.setAttribute('class', 'characterResultContainer')
            div.setAttribute('id', object.id)
            div.appendChild(btnContainer)
            div.appendChild(characterContainer)
            div.appendChild(characterAtributtes)
            resultCharacter.appendChild(div)
        
            const img = document.createElement('img')
            img.classList.add('listCharacterImg')
            img.src = object.images[0]
            if (object.images.length > 1) {
            const btnImg0 = document.createElement("button")
            const btnImg1 = document.createElement("button")
            btnImg0.classList.add('btn')
            btnImg1.classList.add('btn')
            btnImg0.textContent = 'Opção 1'
            btnImg1.textContent = 'Opção 2'
        
        
            btnImg0.addEventListener('click', () => {
            img.src = object.images[0]
            })
            btnImg1.addEventListener('click', () => {
            img.src = object.images[1]
            })
        
            btnContainer.appendChild(btnImg0)
            btnContainer.appendChild(btnImg1)
        
            }
            characterContainer.appendChild(img) 
        
            const spanName = document.createElement('span')
            spanName.innerHTML = '<strong>Nome: </strong>'
            const nameCharacter = document.createElement('p')
            nameCharacter.innerHTML = object.name
            characterAtributtes.appendChild(spanName)
            characterAtributtes.appendChild(nameCharacter)
        
            const spanBirthday = document.createElement('span')
            spanBirthday.innerHTML = '<strong>Aniversário: </strong>'
            const birthday = document.createElement('p')
            birthday.innerHTML = object.personal.birthdate
            characterAtributtes.appendChild(spanBirthday)
            characterAtributtes.appendChild(birthday)
        
            const spanClan = document.createElement('span')
            spanClan.innerHTML = '<strong>Clã: </strong>'
            const clan = document.createElement('p')
            clan.innerHTML = object.personal.clan
            characterAtributtes.appendChild(spanClan)
            characterAtributtes.appendChild(clan)   
        
            const btnRemove = document.createElement('button')
            btnRemove.textContent = 'Remover'
            btnRemove.classList.add('btnRemove')
            btnContainer.appendChild(btnRemove)
            
            btnRemove.addEventListener('click', () => {
                removeCharacter(object)
            })
            listCharacters.appendChild(div)
        });
    }catch(error){

    }

}

const removeCharacter = (object) => {
    const character = document.getElementById(object.id)
    listCharacters.removeChild(character)
    
    arrayCharacters.forEach(element => {
        if (element.id == object.id) {
           arrayCharacters.splice(element, 1) 
           localStorage.setItem('array', JSON.stringify(arrayCharacters))
        }
    })
    
}

btnSearch.addEventListener('click', () => {
    resultCharacter.innerHTML = ''
    showResultCharacter(inputName.value)
    
})

addToList()