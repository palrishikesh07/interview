const translate = require("google-translate-api-x");

async function translateText() {
    const res = await translate("When I was 13, I had my first love. There was nobody that compared to my baby and nobody came between us, nor could ever come above. She had me going crazy. Oh, I was starstruck. She woke me up daily. Don't need no Starbucks. She made my heart pound and skip a beat when I see her in the street and at school on the playground. But I really want to see her on the weekend. She knows she got me dazing because she was so amazing. And now my heart is breaking. But I just keep on saying.", {
        from: "en",
        to: "hindi"
    });

    console.log(res.text);
}

translateText();