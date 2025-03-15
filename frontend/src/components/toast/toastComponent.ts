function toastComponent(message: string, type: "success" | "error" = "success") {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
    
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
    return container;
}

// CSS Styles (add this to your CSS file or <style> tag)
const style = document.createElement("style");
style.innerHTML = `
    #toast-container {
        position: fixed;
        bottom: 20px; /* Changed from top to bottom */
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
    }
    .toast {
        padding: 10px 15px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        min-width: 200px;
        max-width: 300px;
        transition: opacity 0.3s ease-in-out;
    }
    .toast.success { background-color: green; }
    .toast.error { background-color: red; }
`;
document.head.appendChild(style);

export default toastComponent;
