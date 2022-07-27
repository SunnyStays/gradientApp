
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

                    let mixValue = 1.0/childrenCount*i

                    $("#gradient"+i).css("background-color",colorMix(returnColor(colorOne),returnColor(colorTwo),mixValue))
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

            generateGradient()

            colorOne.addEventListener("change", generateGradient, false);
            colorTwo.addEventListener("change", generateGradient, false);