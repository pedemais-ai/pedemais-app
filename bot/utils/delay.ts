const delay = async (
    minDelay: number = 1000, maxDelay: number = 3000
) => {
    // Generate a random delay between minDelay and maxDelay (in milliseconds)
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    // Wait for the random delay
    await new Promise((resolve) => setTimeout(resolve, delay));
};

export default delay;
