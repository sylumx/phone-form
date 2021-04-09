const ul = document.getElementById('countries_list');
const select = document.getElementById('selectedOption');
const icon_dropdown = document.getElementById('dropdown-icon');
const url = 'https://restcountries.eu/rest/v2/all';
const requestUrl = "http://ip-api.com/json";
let country = '';

function createNode(e) {
    return document.createElement(e);
}

function append(p, e) {
    return p.appendChild(e);
}

if (localStorage.getItem(country) !== null) {
    country = localStorage.getItem(country);
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) => res.json())
        .then(function (data) {
            let selected = data;
            document.getElementById("selectedOption").innerHTML = "";
            return selected.map(function (country) {
                let mainDiv = createNode('div');
                let img = createNode('img');
                let div = createNode('div');
                mainDiv.className = 'prefix-dropdown_toggle'
                mainDiv.id = country.name;
                img.loading = 'lazy';
                img.className = 'prefix-dropdown_flag';
                img.src = country.flag;
                img.alt = `${country.name} Flag`;
                div.className = 'prefix-dropdown_value';
                div.innerHTML = `+${country.callingCodes}`;
                append(mainDiv, img);
                append(mainDiv, div);
                append(mainDiv, icon_dropdown);
                append(select, mainDiv);
            })
        }).catch(function (error) {
            console.log(error);
        });
} else {
    $.ajax({
        url: requestUrl,
        type: 'GET',
        success: function (data) {
            country = data.country;
            localStorage.clear();
            localStorage.setItem(country, 'country');
            fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) => res.json())
                .then(function (data) {
                    let selected = data;
                    document.getElementById("selectedOption").innerHTML = "";
                    return selected.map(function (country) {
                        let mainDiv = createNode('div');
                        let img = createNode('img');
                        let div = createNode('div');
                        mainDiv.className = 'prefix-dropdown_toggle'
                        mainDiv.id = country.name;
                        img.loading = 'lazy';
                        img.className = 'prefix-dropdown_flag';
                        img.src = country.flag;
                        img.alt = `${country.name} Flag`;
                        div.className = 'prefix-dropdown_value';
                        div.innerHTML = `+${country.callingCodes}`;
                        append(mainDiv, img);
                        append(mainDiv, div);
                        append(mainDiv, icon_dropdown);
                        append(select, mainDiv);
                    })
                }).catch(function (error) {
                    console.log(error);
                });
        },
        error: function (err) {
            console.log("Request failed, error= " + err);
        }
    });
}

fetch(url).then((res) => res.json()).then(function (data) {
    let countries = data;
    return countries.map(function (country) {
        let li = createNode('li');
        let img = createNode('img');
        let div = createNode('div');
        li.className = 'prefix-dropdown_item'
        li.setAttribute("onclick", "ongoing_click(this.id)");
        li.id = country.name;
        img.loading = 'lazy';
        img.className = 'prefix-dropdown_flag';
        img.src = country.flag;
        img.alt = `${country.name} Flag`;
        div.className = 'prefix-dropdown_value';
        div.innerHTML = `${country.alpha2Code}`;
        append(li, img);
        append(li, div);
        append(ul, li);
    });
}).catch(function (error) {
    console.log(error);
});

$(document).click(function () {
    $("#prefix-dropdown-list").hide();
});

function ongoing_click(clicked_id) {
    country = clicked_id;
    localStorage.clear();
    localStorage.setItem(country, 'country');
    document.getElementById("selectedOption").innerHTML = "";
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) => res.json())
        .then(function (data) {
            let selected = data;
            return selected.map(function (country) {
                console.log(country.name);
                let mainDiv = createNode('div');
                let img = createNode('img');
                let div = createNode('div');
                mainDiv.className = 'prefix-dropdown_toggle'
                mainDiv.id = country.name;
                img.loading = 'lazy';
                img.className = 'prefix-dropdown_flag';
                img.src = country.flag;
                img.alt = `${country.name} Flag`;
                div.className = 'prefix-dropdown_value';
                div.innerHTML = `+${country.callingCodes}`;
                append(mainDiv, img);
                append(mainDiv, div);
                append(mainDiv, icon_dropdown);
                append(select, mainDiv);
            });
        }).catch(function (error) {
            console.log(error);
        });
}
        // document.querySelector('#selectedOption').addEventListener('keyup', function (e) {
        //     console.log(e.key)
        // })