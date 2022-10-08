const fillerList = ["❤", "🍷", "🍇", "🔥", "👀"]

const wordList = ["accessible", "acidic", "aeration", "aftertaste", "aggressive", "aging", "airlock", "angular", "apple", "astringent", "austere", "barrel", "balance", "biscuit", "body", "blackberry", "blend", "blueberry", "backbone", "blunt", "bright", "bouquet", "burnt", "buttery", "cassis", "cantaloupe", "caramel", "closed", "charcoal", "chewy", "chocolate", "citrus", "coconut", "corked", "coarse", "concentrated", "creamy", "cultivar", "cuvee", "dense", "depth", "decanting", "delicate", "elegant", "earthy", "enology", "eucalyptus", "extracted", "fermentation", "finesse", "finish", "flamboyant", "fresh", "fruit-driven", "fruity", "full-bodied", "fuzzy", "geranium",  "gooseberry", "grapefruit", "green", "herbaceous", "hollow", "hydrometer", "jammy", "juicy", "lavender", "leather", "length", "lingering", "maraschino", "mature", "melon", "mellow", "minerality", "mulberry", "musty", "mouth-feel", "nutty", "nouveau", "oxidized", "opulent", "peppercorn", "perfumed", "petrichor", "pineapple", "plonk", "polished", "powerful", "pruny", "raisiny", "reticent", "rhubarb", "round", "robust", "rustic", "smooth", "silky", "spicy", "stalky", "steely", "stemming", "stemmy", "strawberry", "structured", "supple", "sweet", "tabby", "tannins", "toasty", "tobacco", "toffee", "tight", "typicity", "texture", "vanilla", "vintage", "viticulture", "vegetal", "velvety", "vinification", "voluptuous", "woodsmoke", "zesty", "zippy"]

module.exports = {
    getRandomString: function () {
        let humanId = ""
        for (let i = 0; i < 4; i++) {
            humanId += wordList[Math.floor(Math.random() * wordList.length)]
            humanId += fillerList[Math.floor(Math.random() * 5)]
        }
        if (humanId.length < 33) {
            humanId += wordList[Math.floor(Math.random() * 10)]
            humanId += fillerList[Math.floor(Math.random() * 5)]
        }
        console.log(humanId)
        return humanId;
    }
}
