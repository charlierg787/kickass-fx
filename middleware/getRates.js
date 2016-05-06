
/*


[{"currency":"GBP","exchangeRates":[{"currency":"EUR","conversionRate":1.5,"validFrom":"2016-05-06T00:00:00.0000000+01:00","validTo":"2016-05-07T00:00:00.0000000+01:00"}]}]


*/




var data = [
    {
        "currency":"GBP",
        "exchangeRates":[
        {"currency":"EUR","conversionRate":1.5,"validFrom":"2016-05-06T00:00:00.0000000+01:00","validTo":"2016-05-07T00:00:00.0000000+01:00"},
        {"currency":"PHL","conversionRate":6.2,"validFrom":"2016-05-06T00:00:00.0000000+01:00","validTo":"2016-05-07T00:00:00.0000000+01:00"},
        {"currency":"NGA","conversionRate":6.2,"validFrom":"2016-05-06T00:00:00.0000000+01:00","validTo":"2016-05-07T00:00:00.0000000+01:00"}
        ]
    },

    {
        "currency":"PHL",
        "exchangeRates":[
        {"currency":"EUR","conversionRate":1.5,"validFrom":"2016-05-06T00:00:00.0000000+01:00","validTo":"2016-05-07T00:00:00.0000000+01:00"}
    ]
}

]
module.exports = {
    getRates: function(req, res, next){

        var newData = {};
        
        data.forEach(function(currency, index) {

            var rates = {};

            currency.exchangeRates.forEach(function(rate) {

                rates[rate.currency] = rate.conversionRate;
            });

            newData[currency.currency] = rates;
        });     

        res.locals.currentRates = newData;
        next();

    }
}