const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //Check if author field is blank and replace it with "unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    //Check the quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }    
    quoteText.textContent = quote.text;
    hideLoadingSpinner();   
}

// Get Quotes from API
async function getQuoteFromApi() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[10]);
        newQuote();
        throw new Error('Opps')               
    } catch (error) {
        //Catch Error Here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Even Listners (to be able to tweet the quote)
newQuoteBtn.addEventListener('click', newQuote) 
twitterBtn.addEventListener('click', tweetQuote) 

//On load
getQuoteFromApi();


//Alternative function using local quotes instead of API calls
/* let apiQuotes = [];

//Show New Quote
function newQuote() {
    //Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    console.log(quote);
}


//On load
newQuote(); */
