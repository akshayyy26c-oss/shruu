
const API_URL = import.meta.env.VITE_API_URL;

// GET QUESTIONS AND JOKES
export const getWebsiteContent = async () => {
    const response = await fetch(`${API_URL}/api/content`);

    if (!response.ok) {
        throw new Error("Failed to load content");
    }

    const result = await response.json();

    return result.data;
};

// SAVE ANSWER
export const submitResponse = async (questionId, answer) => {
    const response = await fetch(`${API_URL}/api/response`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            questionId,
            answer
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

