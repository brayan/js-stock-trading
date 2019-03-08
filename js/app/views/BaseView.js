export default class BaseView {
    
    constructor(element) {
        this.element = element;
    }

    template(viewModel) {
        throw new Error("O JS é uma gambiarra, sendo assim, é necessário lançar um Error para indicar ao usuário de que é necessário implementar este método");
    }

    update(viewModel) {
        this.element.innerHTML = this.template(viewModel);
    }

}