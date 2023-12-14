import ClientFactory from "./client/venom";

const client = new ClientFactory();

(async () => {
    try {
        await client.start();
    } catch (err) {
        console.error("Error:", err);
    }
})();