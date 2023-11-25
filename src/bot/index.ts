import ClientFactory from "./client/venom";

const venom = new ClientFactory();

// Create and configure clients
(async () => {
    try {
        await venom.start();
    } catch (err) {
        console.error("Error:", err);
    }
})();