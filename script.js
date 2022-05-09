function onLoad() {
  let buttonElements = Array.from(document.querySelectorAll(".searchButton"));
  let inputField = document.querySelector("#input-field");
  let mushroomName = document.querySelector("#mushroomName");
  let submitButtonElement = document.querySelector("#submit-btn");
  let [searchByNameButton, searchByColorButton] = buttonElements;
  let paragraph = document.querySelector("#not-found");
  let mushroomObj = {};

  function showObj() {
    searchByNameButton.addEventListener("click", showInput);

    function showInput() {
      inputField.style.display = "flex";
    }

    submitButtonElement.addEventListener("click", search);
    function search() {
      let mushroomNameValue = mushroomName.value;
      if(mushroomNameValue == 0){
          return
      }
        let imagePlace = document.querySelector("#img");
      for (const key in mushroomObj) {
        let img = document.createElement("img");
        let latinName = mushroomObj[key].latin;
        let commonNames = mushroomObj[key].common;
        let mushroomImg = mushroomObj[key].img;
    
        if (latinName.includes(mushroomNameValue) || commonNames.toString().includes(mushroomNameValue)) {
          img.src = mushroomImg;
          imagePlace.replaceChildren(img);

          imagePlace.style.display = "flex";
          mushroomName.value = "";
          paragraph.style.display = "none";
          break;
        } else {
          paragraph.style.display = "flex";
          imagePlace.style.display = "none";
        }
      }
    }
  }
  fetch("mushrooms.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      mushroomObj = data;
      showObj();
    });
}
