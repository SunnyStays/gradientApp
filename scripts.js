function colorChannelMix(colorChannelA, colorChannelB, mixValue){
    const channelA = colorChannelA*mixValue
    const channelB = colorChannelB*(1-mixValue)

    return parseInt(channelA+channelB)
}

function colorMix(rgbA, rgbB, mixValue){
    const r = colorChannelMix(rgbA[0],rgbB[0],mixValue)
    const g = colorChannelMix(rgbA[1],rgbB[1],mixValue)
    const b = colorChannelMix(rgbA[2],rgbB[2],mixValue)

    return "rgb("+r+","+g+","+b+")"
}

function returnColor(color) {
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    return [r,g,b]
}

function contrastColor(color) {
    rgb = returnColor(color)
    return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 186
            ? 'rgb(0,0,0)'
            : 'rgb(255,255,255)';
}

function generateGradient(){
    const colorOne = $("#colorOne").val()
    const colorTwo = $("#colorTwo").val()

    const childrenCount = document.getElementById("gradient-container").childElementCount

    for (let i = 0; i<=childrenCount;i++){

        let gradientId = "#gradient"+i
        let mixValue = 1.0/childrenCount*i
        let backgroundColor = colorMix(returnColor(colorOne),returnColor(colorTwo),mixValue)

        $(gradientId).css("background-color",backgroundColor)
    }
}

function addGradientBox(){
    const childrenCount = document.getElementById("gradient-container").childElementCount
    if (childrenCount<64){
        let gradientBox = "<div class='gradient-box' id='gradient"+parseInt(childrenCount+1)+"' ></div>"

        $("#gradient-container").append(gradientBox)

        generateGradient()
    }
}

function removeGradientBox(){
    if (document.getElementById("gradient-container").childElementCount>1){
        $('#gradient-container').children().last().remove();
    }

    generateGradient()
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

generateGradient()

$(document).on("click",'.gradient-box',function() {  
    let bgColor = rgb2hex($(this).css("background-color"))
    $("#color-text").text("This color is "+bgColor).css("background-color",$(this).css("background-color"))
    $("#color-text").css("color",contrastColor(bgColor))
});

colorOne.addEventListener("change", generateGradient);
colorTwo.addEventListener("change", generateGradient);