class BoredApi {

    content = "";

    ajax;
    type;
    location;
    successFunction;
    loadingFunction;
    failureFunction;

    constructor(httpType, url, success, loading, failure) {
        this.ajax = new XMLHttpRequest();
        this.type = httpType;
        this.location = url;
        this.successFunction = success;
        this.loadingFunction = loading;
        this.failureFunction = failure;
    }

    sendRequest() {
        let holder = this;
        this.ajax.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                holder.successFunction();
            } else if(this.readyState !=4 ) {
                holder.loadingFunction();
            } else {
                holder.failureFunction();
            }
        };
        this.ajax.open(this.type, this.location, true);
        this.ajax.send();
    }
}


//get a random activity
function newGet() {
    
    function onSuccess() {
        console.log(this.ajax.responseText);
        BoredApi.container = JSON.parse(this.ajax.responseText);
        BoredApi.content = JSON.parse(this.ajax.responseText).activity;
        document.getElementById("new-activity").innerHTML = BoredApi.content;
        document.getElementById("new-accessibility").innerHTML = BoredApi.container.accessibility;
        document.getElementById("new-type").innerHTML = BoredApi.container.type;
        document.getElementById("new-participants").innerHTML = BoredApi.container.participants;
        document.getElementById("new-price").innerHTML = BoredApi.container.price;
    }
    let bored = new BoredApi("GET", "http://www.boredapi.com/api/activity/", onSuccess, onLoading, onFailure);
    bored.sendRequest();
}

document.getElementById("another-bored").addEventListener("click", newGet);


//get group activities with inputed number of participants
function groupGet() {
    let number = document.getElementById("participantNum").value;

    function onSuccess() {
        console.log(this.ajax.responseText);
        BoredApi.container = JSON.parse(this.ajax.responseText);
        BoredApi.content = JSON.parse(this.ajax.responseText).activity;
        let error = BoredApi.container.error;
        console.log(error);
        if(error !== undefined) {
            document.getElementById("group-activity").innerHTML =BoredApi.container.error;
            document.getElementById("group-accessibility").innerHTML = " ";
            document.getElementById("group-type").innerHTML = " ";
            document.getElementById("group-participants").innerHTML = " ";
            document.getElementById("group-price").innerHTML = " ";
        } else {
            document.getElementById("group-activity").innerHTML =BoredApi.content;
            document.getElementById("group-accessibility").innerHTML = BoredApi.container.accessibility;
            document.getElementById("group-type").innerHTML = BoredApi.container.type;
            document.getElementById("group-participants").innerHTML = BoredApi.container.participants;
            document.getElementById("group-price").innerHTML = BoredApi.container.price;
        } 
    }
    url = "http://www.boredapi.com/api/activity?participants=" + number;
    let bored = new BoredApi("GET", url, onSuccess, onLoading, onFailure);
    bored.sendRequest();
}

document.getElementById("another-group").addEventListener("click", groupGet);


//get free activities
function freeGet() {

    function onSuccess() {
        console.log(this.ajax.responseText);
        BoredApi.container = JSON.parse(this.ajax.responseText);
        BoredApi.content = JSON.parse(this.ajax.responseText).activity;
        document.getElementById("free-activity").innerHTML = BoredApi.content;
        document.getElementById("free-accessibility").innerHTML = BoredApi.container.accessibility;
        document.getElementById("free-type").innerHTML = BoredApi.container.type;
        document.getElementById("free-participants").innerHTML = BoredApi.container.participants;
        document.getElementById("free-price").innerHTML = BoredApi.container.price;
    }
    let bored = new BoredApi("GET", "http://www.boredapi.com/api/activity?price=0.0", onSuccess, onLoading, onFailure);
    bored.sendRequest();
}

document.getElementById("another-free").addEventListener("click", freeGet);


//get recreational activities
function recreationalGet() {

    function onSuccess() {
        console.log(this.ajax.responseText);
        BoredApi.container = JSON.parse(this.ajax.responseText);
        BoredApi.content = JSON.parse(this.ajax.responseText).activity;
        document.getElementById("recreational-activity").innerHTML = BoredApi.content;
        document.getElementById("recreational-accessibility").innerHTML = BoredApi.container.accessibility;
        document.getElementById("recreational-type").innerHTML = BoredApi.container.type;
        document.getElementById("recreational-participants").innerHTML = BoredApi.container.participants;
        document.getElementById("recreational-price").innerHTML = BoredApi.container.price;
    }
    let bored = new BoredApi("GET", "http://www.boredapi.com/api/activity?type=recreational", onSuccess, onLoading, onFailure);
    bored.sendRequest();
}

document.getElementById("another-recreational").addEventListener("click", recreationalGet);


function onLoading() {}

function onFailure() {}


















