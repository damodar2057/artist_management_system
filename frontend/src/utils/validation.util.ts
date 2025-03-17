//

// Validation function
export function showError(input: HTMLInputElement, message: string) {
    const errorSpan = input.nextElementSibling as HTMLSpanElement;
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.color = "red";
    } else {
        const span = document.createElement("span");
        span.textContent = message;
        span.style.color = "red";
        input.insertAdjacentElement("afterend", span);
    }
}

export function clearErrors(formElement: HTMLFormElement) {
    formElement.querySelectorAll("span.error-message").forEach((el) => el.remove());
}
