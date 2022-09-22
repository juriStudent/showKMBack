// CONFIG ---- 
let MASTERPASS = "ikbenadmin";
let URLDOMAIN = "https://witty-rock-00a315803.1.azurestaticapps.net/"
// CONFIG ----


module.exports = async function (context, req, databaseIN) {
    let password = context.bindingData.password;
    if (password != MASTERPASS){
        return
    }

    //if(true){context.res = { body:JSON.stringify(filter(databaseIN))}; return}

    let JSONString = btoa(JSON.stringify(filter(databaseIN)))

    context.res = { body: `<meta http-equiv=\"refresh\" content=\"0; url=${URLDOMAIN}?${JSONString}" />`, headers: { "Content-Type": "text/html" } };

}

function filter(JSONArray) {

    let filteredArray = [];
    let i = 0;

    for (let i = 0; i < JSONArray.length; i++) {
        if (JSONArray[i] == "REMOVE") {
            continue;
        }

        let identifier = JSONArray[i].name + JSONArray[i].vehicleCode;
        filteredArray.push(JSONArray[i]);
        JSONArray[i] = "REMOVE";

        for (let i2 = 0; i2 < JSONArray.length; i2++) {

            let identifier2 = JSONArray[i2].name + JSONArray[i2].vehicleCode;

            if (identifier == identifier2) {
                JSONArray[i2] = "REMOVE";
            }
        }
    }

    return filteredArray;

}