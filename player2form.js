function addPlayer2Form() {
    const form2 = document.createElement("form");
      form2.id = "player-two-form";
      // Create the name label and input elements
      const nameLabel = document.createElement("label");
      nameLabel.textContent = "name";
      nameLabel.setAttribute("for", "player2-name");

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.id = "player2-name";
      nameInput.name = "name";

      // Create the fieldset element and legend
      const fieldset = document.createElement("fieldset");

      const legend = document.createElement("legend");
      legend.textContent = "symbol";

      // Create the x radio button and label elements
      const xInput = document.createElement("input");
      xInput.type = "radio";
      xInput.id = "x";
      xInput.name = "symbol2";
      xInput.value = "x";

      const xLabel = document.createElement("label");
      xLabel.textContent = "x";
      xLabel.setAttribute("for", "x");

      // Create the o radio button and label elements
      const oInput = document.createElement("input");
      oInput.type = "radio";
      oInput.id = "o";
      oInput.name = "symbol2";
      oInput.value = "o";

      const oLabel = document.createElement("label");
      oLabel.textContent = "o";
      oLabel.setAttribute("for", "o");

      // Append the radio buttons and labels to the fieldset
      fieldset.appendChild(xInput);
      fieldset.appendChild(xLabel);
      fieldset.appendChild(oInput);
      fieldset.appendChild(oLabel);

      // Create the submit button element
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.id = "player2";
      submitButton.textContent = "Add player 2";

      // Append all the elements to the form
      form2.appendChild(nameLabel);
      form2.appendChild(nameInput);
      form2.appendChild(fieldset);
      form2.appendChild(submitButton);

      return form2;
  }

  export { addPlayer2Form };