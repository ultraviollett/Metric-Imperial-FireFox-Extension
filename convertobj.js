const convertObj = {

    grams: {
        name: ["grams","gram","g"],
        isMetric: true,
        convert: [
            cups = {
                range: [30, Infinity],
                perUnit: 1/250,
                fractions: ["1/4", "1/3", "1/2", "2/3"]

            },
            tbsp = {
                range: [8, 30],
                perUnit: 1/15,
                fractions: ["1/4", "1/2"]
            },
            tsp = {
                range: [0, 8],
                perUnit: 1 / 4.2,
                fractions: ["1/4", "1/2"]
            }
        ],
        returnval: function(num) {

        }
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

