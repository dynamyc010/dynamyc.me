const titleJSON = `{
    "titles" : 
    [ 
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "How are ya?",
        "fukc",
        "icasnthsothavingstorkes", 
        "owo uwu owo",
        "meep",
        "Boo!",
        "Did you know that this is random every time?",
        "If you see this, it works!",
        "Who dares enter my dungeon?",
        "hewwo owo",
        "brb, yeeting myself out of existence",
        "meow",
        "how do you do fellow kids",
        "what is life",
        "red kinda sus ngl",
        ">w<",
        "hehe",
        "a great great asset to the company",
        "beeping intensifies (beep beep)",
        "I'm a little teapot, short and stout",
        "happy 2008!!!",
        "sometimes, I think about cheese",
        "did you know..."
    ]
}`

function changeTitle()
{
    let data = JSON.parse(titleJSON).titles;
    document.title = window.location.hostname + " | " + data[Math.floor(Math.random()*data.length)];
}