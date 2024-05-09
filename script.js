document.addEventListener("DOMContentLoaded", function () {
  const balloonColors = [
    "linear-gradient(145deg, #ff89b5, #ff6381)", // Pink
    "linear-gradient(145deg, #89cff0, #6394ff)", // Blue
    "linear-gradient(145deg, #99ff99, #63ff63)", // Green
    "linear-gradient(145deg, #ffff99, #ffff63)", // Yellow
    "linear-gradient(145deg, #ff9999, #ff6363)", // Red
  ];

  let interactionStep = 0; // Track the steps of interaction

  const envelope = document.querySelector(".envelope");
  const birthdayCard = document.getElementById("birthdayCard");
  const balloonsContainer = document.getElementById("balloons");
  const cakeContainer = document.getElementById("cakeContainer");

  // Function to dynamically create and display balloons
  function showBalloons() {
    balloonsContainer.innerHTML = ""; // Clear existing balloons
    for (let i = 0; i < 5; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.background = balloonColors[i % balloonColors.length]; // Set color
      balloon.style.position = "absolute";
      balloon.style.left = `${Math.random() * 80 + 10}%`; // Random left position between 10% to 90%
      balloon.style.top = `${Math.random() * 80 + 10}%`; // Random top position between 10% to 90%

      const string = document.createElement("div");
      string.className = "string";
      balloon.appendChild(string);

      const face = document.createElement("div");
      face.className = "face";
      balloon.appendChild(face);

      const eye = document.createElement("div");
      eye.className = "eye";
      face.appendChild(eye);

      const mouth = document.createElement("div");
      mouth.className = "mouth happy";
      face.appendChild(mouth);

      balloon.onclick = function () {
        this.remove(); // Remove the balloon on click
      };

      balloonsContainer.appendChild(balloon);
    }
  }

  // Event listener for envelope interaction
  envelope.addEventListener("click", function () {
    this.classList.toggle("open");
    if (this.classList.contains("open")) {
      birthdayCard.style.display = "block"; // Show the birthday card immediately

      setTimeout(() => {
        envelope.style.display = "none"; // Hide the envelope
        birthdayCard.style.display = "none"; // Hide the birthday card

        setTimeout(() => {
          showBalloons(); // Show balloons after 3 seconds
        }, 300); // Delay for showing balloons

        setTimeout(() => {
          cakeContainer.style.display = "block"; // Show cake after 4 seconds (1 second after balloons)
        }, 200); // Additional delay for showing the cake
      }, 1300); // Delay before hiding the envelope and birthday card
    } else {
      envelope.style.display = "block"; // Show envelope again if closed
      birthdayCard.style.display = "none"; // Hide the birthday card
      balloonsContainer.innerHTML = ""; // Clear balloons
      cakeContainer.style.display = "none"; // Hide cake container
    }
  });

  // Attach event listener to the cake to handle interactions
  const cake = document.querySelector(".cake");
  cake.addEventListener("click", function () {
    if (interactionStep === 0) {
      blowOutFuego();
      interactionStep++;
    } else if (interactionStep === 1) {
      removeVelas();
      interactionStep++;
    } else {
      eatCake();
    }
  });

  // Function to blow out all flames
  function blowOutFuego() {
    document.querySelectorAll(".fuego").forEach((fuego) => {
      fuego.style.display = "none";
    });
  }

  // Function to remove all candles
  function removeVelas() {
    document.querySelectorAll(".velas").forEach((vela) => {
      vela.style.display = "none";
    });
  }

  // Function to simulate eating the cake with the cobertura
  function eatCake() {
    const bizcocho = document.querySelector(".bizcocho");
    const cobertura = document.querySelector(".cobertura");
    if (!bizcocho.dataset.initialWidth) {
      bizcocho.dataset.initialWidth = bizcocho.offsetWidth;
      bizcocho.style.clipPath = `inset(0 0 0 0 round 50%)`;
    }

    let initialWidth = parseInt(bizcocho.dataset.initialWidth, 3);
    let currentWidth = bizcocho.offsetWidth;
    let decrement = 10;

    if (currentWidth > decrement) {
      let newWidth = currentWidth - decrement;
      let offsetX = initialWidth - newWidth;
      let radius = newWidth / 1;
      bizcocho.style.width = `${newWidth}px`;
      cobertura.style.width = `${newWidth}px`;
      bizcocho.style.clipPath = `inset(0 ${offsetX}px 0 0 round ${radius}px)`;
      cobertura.style.clipPath = `inset(0 ${offsetX}px 0 0 round ${radius}px)`;
    } else {
      alert("have a nice day, وعساه عام جميل وسعيد لك يارب");
      cake.style.display = "none"; // Optionally hide the cake after eating
    }
  }
});
