function colorChannelMix(colorChannelA, colorChannelB, mixValue){
    let channelA = colorChannelA*mixValue
    let channelB = colorChannelB*(1-mixValue)

    return parseInt(channelA+channelB)
}

function colorMix(rgbA, rgbB, mixValue){
    let r = colorChannelMix(rgbA[0],rgbB[0],mixValue)
    let g = colorChannelMix(rgbA[1],rgbB[1],mixValue)
    let b = colorChannelMix(rgbA[2],rgbB[2],mixValue)

    return "rgb("+r+","+g+","+b+")"
}

function returnColor(color) {
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    return [r,g,b]
}

function generateGradient(){
    var colorOne = $("#colorOne").val()
    var colorTwo = $("#colorTwo").val()

    var childrenCount = document.getElementById("gradient-container").childElementCount

    for (let i = 0; i<=childrenCount;i++){

        let gradientId = "#gradient"+i
        let mixValue = 1.0/childrenCount*i
        let backgroundColor = colorMix(returnColor(colorOne),returnColor(colorTwo),mixValue)

        $(gradientId).css("background-color",backgroundColor)

        
    }
}

function addGradientBox(){
    let childrenCount = document.getElementById("gradient-container").childElementCount
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
    //alert(rgb2hex($(this).css("background-color")))
    //alert(this.id)
    $("#color-text").text("This color is "+rgb2hex($(this).css("background-color"))).css("background-color",$(this).css("background-color"))
});

colorOne.addEventListener("change", generateGradient, false);
colorTwo.addEventListener("change", generateGradient, false);