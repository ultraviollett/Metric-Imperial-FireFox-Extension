const convertObj = {

    grams: {
        name: ["grams","gram","g"],
        isMetric: true,
        convert: [
            cups = {
                range: [30, Infinity],
                perUnit: 1/250,
                hasFractions: true

            },
            tbsp = {
                range: [8, 30],
                perUnit: 1/15,
                hasFractions: true
            },
            tsp = {
                range: [0, 8],
                perUnit: 1 / 4.2,
                hasFractions: true
            }
        ]
    },

    milliliters: {
        name: ["milliliters", "milliliter", "ml"],
        isMetric: true,
        convert: [
            cups = {
                range: [30, Infinity],
                perUnit: 1/250,
                hasFractions: true

            },
            tbsp = {
                range: [8, 30],
                perUnit: 1/15,
                hasFractions: true
            },
            tsp = {
                range: [0, 8],
                perUnit: 1 / 4.2,
                hasFractions: true
            }
        ]
    }
}

