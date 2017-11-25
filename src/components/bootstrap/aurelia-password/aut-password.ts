import {
    customAttribute, autoinject, bindable,
    customElement, inject, bindingMode,
    Disposable, BindingEngine
} from 'aurelia-framework';

@inject(Element)
@customElement('aut-password')
export class PasswordCustomElement {

    private scorePassword(pass: any) {
        let score = 0;
        if (!pass) {
            return score;
        }

        // award every unique letter until 5 repetitions
        let letters = new Object();
        for (let i = 0; i < pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        // bonus points for mixing it up
        let variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass)
        };

        let variationCount = 0;
        // tslint:disable-next-line:forin
        for (let check in variations) {
            variationCount += (variations[check] === true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;

        // tslint:disable-next-line:radix
        return parseInt(score.toString());
    }

    private checkPassStrength(pass: any) {
        let score = this.scorePassword(pass);
        if (score > 100) {
            return { 'score': score, 'text': 'very strong', 'color': 'green', 'cssClass': '' };
        } // Green
        if (score > 80) {
            return { 'score': score, 'text': 'strong', 'color': 'blue' };
        } // Light Green
        if (score > 60) {
            return { 'score': score, 'text': 'good', 'color': 'orange' };
        } // Orange
        if (score >= 1) {
            return { 'score': score, 'text': 'weak', 'color': 'red' };
        } // Red
        return {};
    }
}
