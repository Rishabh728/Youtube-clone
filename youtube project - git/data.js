let toggleButton = document.getElementById("toggleButton")
console.log(toggleButton)

let hide_items = document.getElementsByClassName("thirdPart")
let leftPartDataYou = document.getElementsByClassName("leftPartDataYou")
let leftPartList = document.getElementsByClassName("leftPartList")



toggleButton.addEventListener("click", toggle)
function toggle(){

    for (let val of hide_items){
        console.log(val)

        val.classList.toggle("hiddenContent")
        

    }
    toggleYouBorder()

}

function toggleYouBorder() {
    for (let val of leftPartDataYou) {
        console.log(val)
        val.classList.toggle("hiddenContentYou")

    }
    
}






// ------- API Integration----- //
let api_key = ""

let search_http = "https://www.googleapis.com/youtube/v3/search?"
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"
let video_http = "https://www.googleapis.com/youtube/v3/videos?"


let defaultVideos = async default_video =>{

    let defaultVideoParmas = new URLSearchParams({

        key:api_key,
        chart:"mostPopular",
        maxResults:18,
        regionCode:"IN",
        part: "snippet",
        order:"date",
    })
    let res = await fetch(video_http + defaultVideoParmas)
    // console.log(res)
    let data = await res.json()
    // console.log(data)
    data.items.map(item => {
        defaultgetChannelIcon(item)
        // console.log(item)

    })

}
defaultVideos()


let CallYoutubeDataAPI =async query => {
    console.log(query)
    let searchParmas = new URLSearchParams({
        key:api_key,
        part:"snippet",
        q : query,
        maxResults:18,
        type:"video",
        regionCode: "IN",
        videoDuration: "medium",
        videoDefinition : "high"
    })
    let res = await fetch(search_http + searchParmas)
    // console.log(res)
    let data = await res.json()
    data.items.map(item => {
        // console.log(item)
    getChannelIcon(item)    
    })
}

// to get channel icon based on channel ID

let getChannelIcon = async video_data => { 
    // console.log(video_data)
    let channelParams = new URLSearchParams({
        key:api_key,
        part : "snippet",
        id: video_data.snippet.channelId
    })

    let res = await fetch(channel_http + channelParams)
    let data = await res.json()
    // console.log(data)
    // console.log("channel code run")
    video_data.getChannelIconImage = data.items[0].snippet.thumbnails.default.url
    // console.log(video_data)
    searchAppendToInVideoContainer(video_data)

}
// for default video
let defaultgetChannelIcon = async video_data => { 
    // console.log(video_data)
    let channelParams = new URLSearchParams({
        key:api_key,
        part : "snippet",
        id: video_data.snippet.channelId
    })

    let res = await fetch(channel_http + channelParams)
    let data = await res.json()
    // console.log(data)
    // console.log("channel code run")
    video_data.getChannelIconImage = data.items[0].snippet.thumbnails.default.url
    // console.log(video_data)
    appendToInVideoContainer(video_data)

}
// search page

let searchAppendToInVideoContainer = video_data => {

    let { snippet, getChannelIconImage, id:{videoId}} = video_data
    // console.log(snippet)
    // console.log(getChannelIconImage)
    // console.log(videoId)
    // console.log(video_data)
    // console.log("append code run")

    
    rightPart.innerHTML += `
            
                <section class="searchRightMainBox">
                    <article class="searchRightVideoBox">
                        <a href="https://www.youtube.com/watch?v=${videoId}">
                            <img src="${snippet.thumbnails.medium.url}">
                        </a>
                    </article>

                    <article class="searchRightTitleBox">
                        <a href="https://www.youtube.com/watch?v=${videoId}"><p>${snippet.title}</p></a>
                        
                        <div class="searchRightTitle">
                            <img src="${getChannelIconImage}" alt=""><p>${snippet.channelTitle}</p>
                        </div>
                    </article>
                </section>
            `

}


// // creating right part

let rightPart = document.getElementById("rightPart")
rightPart.innerHTML = ""

let appendToInVideoContainer = video_data => {

    let { snippet, getChannelIconImage, id} = video_data
    // console.log(snippet)
    // console.log(getChannelIconImage)
    console.log(video_data)
    console.log(id)
    // console.log("append code run")

    
    rightPart.innerHTML += `
            
                <section class="rightMainBox" id="videoClick">
                    <article class="rightVideoBox"><a href="https://www.youtube.com/watch?v=${id}"><img src="${snippet.thumbnails.medium.url}"></a></article>

                    <article class="rightTitleBox">
                        <img src="${getChannelIconImage}" alt="">
                       <a href="https://www.youtube.com/watch?v=${id}"> <div class="rightTitle"><p>${snippet.title}</p> </a>
                        ${snippet.channelTitle}</div>
                    </article>
                </section>
            `

}


//  Events

let search_button = document.getElementById("searchLogo")
// console.log(search_button)

let videoClick = document.getElementsByClassName("videoClick")
// console.log(videoClick)

search_button.addEventListener("click", ()=>{
    let user_input = document.getElementById("user_input").value
    // console.log(user_input)
    let rightPart = document.getElementById("rightPart")
    rightPart.innerHTML = ""

    CallYoutubeDataAPI(user_input)
})

let homeButon = document.getElementById("homeButon")
homeButon.addEventListener("click", () => {
    let rightPart = document.getElementById("rightPart")
    rightPart.innerHTML = ""
    defaultVideos()
})





