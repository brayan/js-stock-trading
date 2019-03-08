import NegotiationController from "./controllers/NegotiationController.js";

const negotiationController = new NegotiationController();

document.querySelector(".form").onsubmit = negotiationController.add.bind(negotiationController);
document.querySelector("[type=button]").onclick = negotiationController.clear.bind(negotiationController);