let jsonData; // Declare a global variable to store the JSON data
const spEl = document.getElementById('singlePlayer');

//spEl.addEventListener('click', getInfo)
const baseurl = 'http://localhost:8484/';
document.onload = getInfo()
async function getInfo(){
    //e.preventDefault();
    const res = await fetch(baseurl + 'data', 
    {
        method:'GET'
    });
    const data = await res.json()
    jsonData = data;
    //console.log(res)
    console.log(jsonData);
    //inputEl.value = data.info;
}
async function postInfo(answer, category, hint){
    //e.preventDefault();
    if(category == '' || hint == '') {return}
    const res = await fetch(baseurl, 
    {
        method:'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            Answer: answer,
            Category: category,
            Hint: hint
        })
    });
}


function singlePlayer() {
  if (jsonData) {
    let row = randomInt(0, 130);

    let secretKey = "YourSecretKey";
    let a = jsonData[row].Answer;
    let c = jsonData[row].Category;
    let h = jsonData[row].Hint;

    // Encrypt and encode data
    let encryptedMessageA = CryptoJS.AES.encrypt(a, secretKey)
    const encodedData = encodeURIComponent(encryptedMessageA);
    let encryptedMessageH = CryptoJS.AES.encrypt(h, secretKey)
    const encodedHint = encodeURIComponent(encryptedMessageH);

    const encodedKey = encodeURIComponent(secretKey);
    const encodedCategory = encodeURIComponent(c);
    console.log("here");

    window.location.href = "hangman.html?data=" + encodedData + "&key=" + encodedKey + "&hint=" + encodedHint + "&category=" + encodedCategory;
  } else {
    console.log('JSON data not loaded yet');
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
