// ON SCROLL
document.addEventListener("scroll", () => {

  if(window.scrollY > 0) {
    document.getElementById("nav").style.backgroundColor = 'white'
  } else [
    document.getElementById("nav").style.backgroundColor = '#F0F0F0'
  ]
})


// ON DOWNLOAD
const onButtonHeroClickHandler = () => {

    const userAgent = navigator.userAgent || window.opera
    console.log(userAgent)

    if(userAgent.includes("Android")) {
      window.open("https://play.google.com/store/apps/details?id=com.app.blockmango", "_blank")
    } else if (userAgent.includes("iPhone") || userAgent.includes("Mac")) {
      window.open("https://apps.apple.com/app/id1571913622", "_blank")
    } else if (userAgent.includes("Windows")) {
      window.open("https://pc.blockmanmobile.com/#/", "_blank")
    }
  
}

// ON CLICK MOBILE NAV
let active = false

const onMobileNavActive = () => {
  active = !active

  if(active) {
    document.getElementById("mobile-nav-elements-wrapper-active").style.display = "initial"
    document.getElementById("main").style.display = "none"
  } 
  if(!active) {
    document.getElementById("mobile-nav-elements-wrapper-active").style.display = "none"
    document.getElementById("main").style.display = "initial"
  }

}

// ON CLICK MOBILE NAV AND LEAVE NAV
const onClickAndGo = () => {
  active = false
  document.getElementById("mobile-nav-elements-wrapper-active").style.display = "none"
  document.getElementById("main").style.display = "initial"
  
}




let chosenType = 0
let blockManGOImgURL
let blockManGOEditorImgURL

// ON CLICK CHANGE CHOSEN TYPR
const onChangeChosenType = (number) => {
  if(number == 0) {
    chosenType = 0
    document.getElementById("type-image").src = blockManGOImgURL
    document.getElementById('blockmanGO-selection').className = 'selection-active'
    document.getElementById('blockmanGOEditor-selection').className = 'selection-inactive'
    document.getElementById('type-title').innerHTML = 'Blockman GO'
    document.getElementById('type-description').innerHTML = 'เป็นเกมที่จะให้คุณได้สัมผัสกับความอิสระ ในโลกที่คุณต้องการ คุณจะสามารถเพลิดเพลินไปกับเพื่อนๆของคุณในมินิเกมต่างๆ'
    return
  }


  if(number === 1) {
    chosenType = 1
    document.getElementById("type-image").src = blockManGOEditorImgURL
    document.getElementById('blockmanGOEditor-selection').className = 'selection-active'
    document.getElementById('blockmanGO-selection').className = 'selection-inactive'
    document.getElementById('type-title').innerHTML = 'Blockman GO Editor'
    document.getElementById('type-description').innerHTML = 'ด้วยโหมดนี้ คุณจะได้เป็นผู้สร้างเกมโหมด และนอกจากนี้ คุณจะได้ฝึกทักษะในการเขียนโค้ดอีกด้วย'
    return
  }



}

// ON FETCH DATA FOR ASSETS
const fetchAssets = async () => {

  await fetch("https://gamertocoder.garena.co.th/api/assets")
    .then(response => {
      if(response.status !== 200) {
        return response.status
      }
      return response.json()
    })
    .then(data => {
      if(typeof data === 'number') {
        alert(data)
      } else {
        blockManGOImgURL = data.characters[10]
        blockManGOEditorImgURL = data.characters[18]
        
        const newImageItem = document.createElement("div")
        newImageItem.id = 'type-right-side'
        const html = 
        `
          <img id="type-image" src=${chosenType === 0 ? blockManGOImgURL: blockManGOEditorImgURL} />
        `
  
        html.trim()
        newImageItem.innerHTML = html
        document.getElementById("type-content-wrapper").appendChild(newImageItem)
        
      }
    })
}

fetchAssets()


let chosenCard = 1
cards = []

const onIncreaseCard = () => {
  if(chosenCard + 1 > 12) {
    document.getElementById(`card-${chosenCard}`).classList = 'card card-hidden'
    chosenCard = 1
    document.getElementById(`card-${chosenCard}`).classList = 'card card-visible'

  } else {
    document.getElementById(`card-${chosenCard}`).classList = 'card card-hidden'
    chosenCard += 1
    document.getElementById(`card-${chosenCard}`).classList = 'card card-visible'
  }

}

const onDecreaseCard = () => {
  if(chosenCard - 1 < 1) {
    document.getElementById(`card-${chosenCard}`).classList = 'card card-hidden'
    chosenCard = 12
    document.getElementById(`card-${chosenCard}`).classList = 'card card-visible'
  } else {
    document.getElementById(`card-${chosenCard}`).classList = 'card card-hidden'
    chosenCard -= 1
    document.getElementById(`card-${chosenCard}`).classList = 'card card-visible'
  }
}

// ON FETCH CAROUSEL INFO
const fetchCarouselInfo = async () => {
  await fetch("https://gamertocoder.garena.co.th/api/minigames")
    .then(response => {
      if(response.status !== 200) {
        return response.status
      }
      return response.json()
    })
    .then(data => {
      data.forEach(i => {

        cards.push({
          id: i.no,
          icon: i.icon,
          name: i.name,
        })

        const newCard = document.createElement('div')
        newCard.id = `card-${i.no}`

        if(chosenCard === i.no) {
          newCard.classList = `card card-visible`
        } else [
          newCard.classList = `card card-hidden`
        ]

        const html =
        `
        <div class="linear-grad"></div>
        <img class="card_img" src=${i.icon}></img>
        <div id="card-title">
          ${i.name}
        </div>

        <div id="increase-card" onclick={onIncreaseCard()}>
          <svg viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </div>
        
        <div id="decrease-card" onclick={onDecreaseCard()}>
          <svg viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </div>
        `
        console.log(chosenCard === i.no)

        html.trim()
        newCard.innerHTML = html
        document.getElementById('carousel').appendChild(newCard)
      })
    })
}

fetchCarouselInfo()

