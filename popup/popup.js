const definition = document.getElementById('definition');
const selectedWord = document.getElementById('word');
const token = '478198be77bf721a324df1aec7f1fbbaedf018a0';

chrome.runtime.getBackgroundPage(gotBGPage);

function gotBGPage(bgpage) {
    const word = bgpage.word;
    // console.log('word')    
    
    selectedWord.innerHTML = word;

    fetch(`https://owlbot.info/api/v4/dictionary/${word}`, {
        headers: {
            "Authorization": `Token ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        const text = data.definitions[0].definition;
        definition.innerHTML = text;
    })
    .catch(e => {
        console.log(e);
        definition.innerHTML = 'sorry, not found';
    });
}