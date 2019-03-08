import BaseView from "./BaseView.js";
import DateHelper from "../helpers/DateHelper.js";

export default class NegotiationView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(negotiationList) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>NUMBER OF STOCKS</th>
                    <th>VALUE</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
            ${
            negotiationList.negotiations.map(negotiation =>
                `
                        <tr>
                            <td>${DateHelper.parseDateToShortDate(negotiation.date)}</td>
                            <td>${negotiation.numberOfStocks}</td>
                            <td>${negotiation.value}</td>
                            <td>${negotiation.calculateVolume()}</td>
                        </tr>
                    `
            ).join("")
            }
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>
                ${negotiationList.calculateVolume()}
                </td>
            </tfoot>
        </table> 
        `;
    }

}