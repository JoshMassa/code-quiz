var highScores = document.querySelector("#hiscore");

highScores.addEventListener('click', function() {
    window.location.href='high-scores.html';

    if (window.location.href.includes('high-scores.html')) {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'high-scores.html';
    }
});