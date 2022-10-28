let colorValue = 0x0;


makeTextFile = function (text) {
  var data = new Blob([text], {type: 'application/octet-stream' });

  let textFile = window.URL.createObjectURL(data);

  let link = document.createElement('a');
  link.download = 'SPRITE_ROM';
  link.href = textFile;
  link.click();

  //free memory since we only used it for a quick download
  URL.revokeObjectURL(url)
  URL.revokeObjectURL(link.href)
};


function changeCurrentColorValue(cv)
{
    colorValue = cv;
}


function changeColor(element)
{
    let hex = colorValue.toString(16);

    /* If the hex value is 0 it will make it just 0 and not #000000 which is required by css */
    if(hex == "0")
    {
        hex="000000";
    }

    /*if we have any leading 0's they will be removed automatically, so we add them.*/
    while(hex.length < 6)
    {
        hex = "0"+hex;
    }

    element.style.backgroundColor = "#"+hex;
}

/* export all of the drawen colors to the hex file that S-8 wants. */
function exportColors() {
   let allColors = document.getElementsByClassName("draw_area");
   let data = []

   for (let i = 0; i < allColors.length; i+=2) {
       let color1 = allColors[i];
       let color2 = allColors[i+1];

       if(color1.style != undefined )
       {
           data.push((rgbToColorCode(color1.style.backgroundColor) << 4) | rgbToColorCode(color2.style.backgroundColor));
       }
   }

   var byteArray = new Uint8Array(data);

   window.open(makeTextFile(byteArray));
}

/* This function will map the corresponding rgb to the hex value that is used by the S-8 console */
function rgbToColorCode(rgb)
{
    switch(rgb) {
        case "rgb(0, 0, 0)": 
            return 0x0
        case "rgb(244, 67, 54)":
            return 0x1
        case "rgb(156, 39, 176)":
            return 0x2
        case "rgb(103, 58, 183)":
            return 0x3
        case "rgb(63, 81, 181)":
            return 0x4
        case "rgb(33, 150, 243)":
            return 0x5
        case "rgb(3, 169, 244)":
            return 0x6
        case "rgb(0, 188, 212)":
            return 0x7
        case "rgb(0, 150, 136)":
            return 0x8
        case "rgb(76, 175, 80)":
            return 0x9
        case "rgb(139, 195, 74)":
            return 0xA
        case "rgb(205, 220, 57)":
            return 0xB
        case "rgb(255, 235, 59)":
            return 0xC
        case "rgb(255, 193, 7)":
            return 0xD
        case "rgb(255, 152, 0)":
            return 0xE
        case "rgb(255, 255, 255)":
            return 0xF
        default:
            return 0x0;
    }
 }