

    let wrapper = document.getElementById("wrapper");
    let selectCountry = document.getElementById("selectCountry");
    let result;
    let httpRequest = new XMLHttpRequest();
    let isfirstTimeSelected = true;







    httpRequest.open("GET", "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,currencies,population", true);

    httpRequest.onreadystatechange = () => {

      if (httpRequest.readyState == 4 && httpRequest.status == 200) {

        result = JSON.parse(httpRequest.responseText);

        for (const element of result) {

          let newOption = document.createElement("option");
          newOption.value = element.name.common;
          newOption.text = element.name.common;
          selectCountry.add(newOption);
          console.log(element.name.common);



        }

      }

    }


    httpRequest.send();





    selectCountry.addEventListener("change", () => {

     

      // Creating a Country Card
      if (isfirstTimeSelected == true) {

        let description = document.getElementById("description");
        description.remove();


        var fragment = document.createDocumentFragment();

        let country = document.createElement("div");
        country.setAttribute("id", "country")

        let flag = document.createElement("img");
        flag.setAttribute("id", "flag");

        let commonName = document.createElement("p");
        commonName.setAttribute("id", "commonName");

        let officialName = document.createElement("p");
        officialName.setAttribute("id", "officialName");

        let capital = document.createElement("p");
        capital.setAttribute("id", "capital");

        let hrElement = document.createElement("hr");

        let row = document.createElement("div");
        row.setAttribute("id", "row");

        let col1 = document.createElement("div");
        col1.setAttribute("id", "col1");

        let col2 = document.createElement("div");
        col2.setAttribute("id", "col2");

        let col3 = document.createElement("div");
        col3.setAttribute("id", "col3");

        let region = document.createElement("p");
        region.setAttribute("id", "region");

        let currency = document.createElement("p");
        currency.setAttribute("id", "currency");

        let population = document.createElement("p");
        population.setAttribute("id", "population");

        col1.appendChild(region);
        col2.appendChild(currency);
        col3.appendChild(population);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);



        country.appendChild(flag)
        country.appendChild(commonName);
        country.appendChild(officialName);
        country.appendChild(capital);
        country.appendChild(hrElement);
        country.appendChild(row);
        fragment.appendChild(country);
        wrapper.appendChild(fragment);

        isfirstTimeSelected = false;

      }

      // Displaying the retrieved data on Card

      for (const element of result) {

        if (element.name.common == selectCountry.value) {

          flag.src = element.flags.png;

          commonName.innerHTML = element.name.common;
          officialName.innerHTML = `<b>Official Name:</b> ${element.name.official}`
          capital.innerHTML = `<b>Capital:</b> ${element.capital[0]}`;
          region.innerHTML = `<b>Region</b> <br>${element.region}`;
          population.innerHTML = `<b>Population</b> <br>${element.population}`;

          let keys = Object.keys(element.currencies);//return an array of string keys
          let firstKey = keys[0];

          currency.innerHTML = `<b>Currency</b> <br>${element.currencies[firstKey].name}`;

        }

      }

    })




  