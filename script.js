//your code here

let clickedTiles = [];
let identicalImage = '';
let currentState = 1; 


function shuffleImages() {
    const images = document.querySelectorAll('img');
    const imageArray = Array.from(images);
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    identicalImage = imageArray[randomIndex].src; 

    
    imageArray.sort(() => Math.random() - 0.5);
    imageArray.forEach((img, index) => {
        img.src = imageArray[index].src;
    });
}


function handleClick(event) {
    const clickedImage = event.target;
    
    if (!clickedTiles.includes(clickedImage)) {
        clickedTiles.push(clickedImage);
    }
    
    
    if (clickedTiles.length > 0) {
        document.getElementById('reset').style.display = 'block';
    }
    
    
    if (clickedTiles.length === 2) {
        document.getElementById('verify').style.display = 'block';
    }
    
    
    if (clickedTiles.length === 2 && clickedTiles[0] === clickedTiles[1]) {
        clickedTiles.pop(); 
    }
}


function resetState() {
    clickedTiles = [];
    document.getElementById('para').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('h').innerHTML = "Please click on the identical tiles to verify that you are not a robot.";
    shuffleImages(); 
}


function verify() {
    const [firstImage, secondImage] = clickedTiles;

    if (firstImage.src === secondImage.src) {
        document.getElementById('para').innerHTML = "You are a human. Congratulations!";
    } else {
        document.getElementById('para').innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    
    
    document.getElementById('para').style.display = 'block';
    document.getElementById('verify').style.display = 'none';
    setTimeout(resetState, 3000); 
}


document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', handleClick);
});

document.getElementById('reset').addEventListener('click', resetState);
document.getElementById('verify').addEventListener('click', verify);


shuffleImages();